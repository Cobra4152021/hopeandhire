'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Pencil, Trash2, Send } from 'lucide-react';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  sender: {
    email: string;
    user_metadata: {
      role: string;
    };
  };
  receiver: {
    email: string;
    user_metadata: {
      role: string;
    };
  };
}

export default function MessagesPage() {
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (email, user_metadata),
          receiver:receiver_id (email, user_metadata)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Message[];
    },
  });

  // Fetch volunteers
  const { data: volunteers } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'volunteer');

      if (error) throw error;
      return data;
    },
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !selectedRecipient) throw new Error('Missing data');

      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        receiver_id: selectedRecipient,
        content: messageContent,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setMessageContent('');
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Edit message mutation
  const editMessage = useMutation({
    mutationFn: async () => {
      if (!editingMessage) throw new Error('No message selected');

      const { error } = await supabase
        .from('messages')
        .update({ content: messageContent })
        .eq('id', editingMessage.id);

      if (error) throw error;
    },
    onSuccess: () => {
      setMessageContent('');
      setEditingMessage(null);
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Delete message mutation
  const deleteMessage = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const handleSendMessage = () => {
    if (editingMessage) {
      editMessage.mutate();
    } else {
      sendMessage.mutate();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Volunteers List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {volunteers?.map((volunteer) => (
                <Button
                  key={volunteer.id}
                  variant={selectedRecipient === volunteer.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedRecipient(volunteer.id)}
                >
                  {volunteer.email}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Message List */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.sender_id === (supabase.auth.getUser() as any)?.data?.user?.id
                        ? 'bg-teal/10 ml-auto'
                        : 'bg-gray-100'
                    } max-w-[80%]`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500">
                        {message.sender.email}
                      </span>
                      {message.sender_id === (supabase.auth.getUser() as any)?.data?.user?.id && (
                        <div className="space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingMessage(message);
                              setMessageContent(message.content);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMessage.mutate(message.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Type your message..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button
                  className="w-full"
                  onClick={handleSendMessage}
                  disabled={!messageContent.trim() || !selectedRecipient}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {editingMessage ? 'Update Message' : 'Send Message'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 