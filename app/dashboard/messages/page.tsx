'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Send, User, Search, Clock, Check, CheckCheck } from 'lucide-react';

interface Volunteer {
  id: string;
  full_name: string;
  expertise: string[];
  avatar_url: string;
  is_online: boolean;
  last_seen: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export default function MessagesPage() {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Fetch volunteers
  const { data: volunteers, isLoading: isLoadingVolunteers } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .eq('is_available', true);

      if (error) throw error;
      return data as Volunteer[];
    },
  });

  // Fetch messages
  const { data: messages } = useQuery<Message[], Error>({
    queryKey: ['messages', selectedVolunteer?.id],
    queryFn: async () => {
      if (!selectedVolunteer) return [];

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${selectedVolunteer.id}),and(sender_id.eq.${selectedVolunteer.id},receiver_id.eq.${user.id})`
        )
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
    enabled: !!selectedVolunteer,
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !selectedVolunteer) throw new Error('Not authenticated');

      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        receiver_id: selectedVolunteer.id,
        content,
        is_read: false,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['messages', selectedVolunteer?.id] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    },
  });

  // Filter volunteers based on search query
  const filteredVolunteers = volunteers?.filter(
    (volunteer) =>
      volunteer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoadingVolunteers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volunteers List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Volunteers</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredVolunteers?.map((volunteer) => (
                <button
                  key={volunteer.id}
                  onClick={() => setSelectedVolunteer(volunteer)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                    selectedVolunteer?.id === volunteer.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {volunteer.avatar_url ? (
                        <img
                          src={volunteer.avatar_url}
                          alt={volunteer.full_name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    {volunteer.is_online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{volunteer.full_name}</div>
                    <div className="text-sm text-gray-500">{volunteer.expertise.join(', ')}</div>
                  </div>
                  {!volunteer.is_online && (
                    <div className="text-xs text-gray-400">
                      {new Date(volunteer.last_seen).toLocaleTimeString()}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedVolunteer
                ? volunteers?.find((v) => v.id === selectedVolunteer.id)?.full_name
                : 'Select a volunteer to start chatting'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedVolunteer ? (
              <div className="flex flex-col h-[600px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages?.map((msg) => {
                    const isSender = msg.sender_id === selectedVolunteer.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isSender ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            isSender ? 'bg-gray-100' : 'bg-blue-500 text-white'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <div
                            className={`text-xs mt-1 flex items-center gap-1 ${
                              isSender ? 'text-gray-500' : 'text-blue-100'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            {new Date(msg.created_at).toLocaleTimeString()}
                            {!isSender && (
                              <span>
                                {msg.is_read ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newMessage.trim()) {
                      sendMessage.mutate(newMessage);
                    }
                  }}
                  className="flex gap-2"
                >
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    rows={1}
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                  <p>Select a volunteer to start chatting</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
