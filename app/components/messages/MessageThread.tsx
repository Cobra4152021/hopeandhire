'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_role: string;
  receiver_id: string;
  receiver_role: string;
  is_read: boolean;
  created_at: string;
}

interface MessageThreadProps {
  recipientId: string;
  recipientRole: string;
  currentUserRole: string;
}

export default function MessageThread({
  recipientId,
  recipientRole,
  currentUserRole,
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch current user ID once
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    fetchUser();
  }, []);

  // Fetch messages
  const { data: messages } = useQuery({
    queryKey: ['messages', recipientId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${recipientId}),and(sender_id.eq.${recipientId},receiver_id.eq.${user.id})`
        )
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
  });

  // Mark messages as read
  useEffect(() => {
    const markAsRead = async () => {
      if (!messages?.length || !currentUserId) return;
      const unreadMessages = messages.filter((m) => m.receiver_id === currentUserId && !m.is_read);
      if (unreadMessages.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in(
            'id',
            unreadMessages.map((m) => m.id)
          );
        queryClient.invalidateQueries({ queryKey: ['messages', recipientId] });
      }
    };
    markAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, currentUserId]);

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!currentUserId) throw new Error('Not authenticated');
      const { error } = await supabase.from('messages').insert({
        content: newMessage,
        sender_id: currentUserId,
        receiver_id: recipientId,
        sender_role: currentUserRole,
        receiver_role: recipientRole,
        is_read: false,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['messages', recipientId] });
    },
  });

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${message.sender_id === currentUserId ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{message.sender_role.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs opacity-70">{message.sender_role}</span>
                  </div>
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {format(new Date(message.created_at), 'MMM d, h:mm a')}
                  </span>
                  {message.sender_id !== currentUserId && !message.is_read && (
                    <span className="text-xs text-red-500">Unread</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (newMessage.trim()) {
                  sendMessage.mutate();
                }
              }
            }}
          />
          <Button
            onClick={() => {
              if (newMessage.trim()) {
                sendMessage.mutate();
              }
            }}
            disabled={!newMessage.trim() || sendMessage.isPending}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
