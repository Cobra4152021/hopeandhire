'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Notification {
  id: string;
  type: 'application_status' | 'message' | 'system';
  title: string;
  message: string;
  data?: {
    job_id?: string;
    job_title?: string;
    company_name?: string;
    sender_id?: string;
    sender_name?: string;
  };
}

interface MessageDialogProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageDialog({
  notification,
  open,
  onOpenChange,
}: MessageDialogProps) {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!notification?.data?.sender_id) throw new Error('No sender ID');

      // Create a new notification for the recipient
      const { error } = await supabase.from('notifications').insert({
        user_id: notification.data.sender_id,
        type: 'message',
        title: 'New Message',
        message,
        data: {
          job_id: notification.data.job_id,
          job_title: notification.data.job_title,
          company_name: notification.data.company_name,
          sender_id: (await supabase.auth.getUser()).data.user?.id,
          sender_name: (await supabase.auth.getUser()).data.user?.user_metadata
            .full_name,
        },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      onOpenChange(false);
      setMessage('');
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage.mutate();
  };

  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply to Message</DialogTitle>
          <DialogDescription>
            Send a message to {notification.data?.sender_name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={sendMessage.isPending}>
              {sendMessage.isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
