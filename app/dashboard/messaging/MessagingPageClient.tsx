'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/lib/hooks/useUser';
import {
  createGoogleCalendarEvent,
  createGoogleMeetLink,
  formatDateTime,
  getLocalTimeZone,
} from '@/lib/utils/google-integrations';

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: 'Michael Johnson',
    avatar: '/stylized-letters-mj.png',
    lastMessage: "I'm interested in the Software Developer position",
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: '/stylized-letters-sw.png',
    lastMessage: 'When is the interview scheduled?',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'David Chen',
    avatar: '/stylized-letters-dc.png',
    lastMessage: 'Thank you for the opportunity',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    avatar: '/stylized-letters-er.png',
    lastMessage: "I've attached my updated resume",
    time: 'Monday',
    unread: 0,
    online: false,
  },
];

// Sample messages for the active conversation
const sampleMessages = [
  {
    id: 1,
    sender: 'Michael Johnson',
    content:
      "Hello, I'm interested in the Software Developer position that was posted on your website.",
    time: '10:30 AM',
    isMe: false,
  },
  {
    id: 2,
    sender: 'Me',
    content:
      'Hi Michael, thank you for your interest! Do you have any specific questions about the position?',
    time: '10:32 AM',
    isMe: true,
  },
  {
    id: 3,
    sender: 'Michael Johnson',
    content:
      'Yes, I was wondering about the tech stack used for this role. Could you provide more details?',
    time: '10:35 AM',
    isMe: false,
  },
  {
    id: 4,
    sender: 'Me',
    content:
      'Of course! We primarily use React, Node.js, and PostgreSQL. Experience with TypeScript is also highly valued.',
    time: '10:38 AM',
    isMe: true,
  },
  {
    id: 5,
    sender: 'Michael Johnson',
    content:
      "That sounds perfect for my background. I have 3+ years of experience with React and Node.js, and I've been using TypeScript for the past year.",
    time: '10:40 AM',
    isMe: false,
  },
  {
    id: 6,
    sender: 'Me',
    content:
      "That's great to hear! Would you be available for an initial phone screening next week? We could discuss your experience in more detail.",
    time: '10:42 AM',
    isMe: true,
  },
];

export default function MessagingPageClient() {
  const { user } = useUser();
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatPhone, setNewChatPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'Me',
      content: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate a response after 1-2 seconds
    setTimeout(
      () => {
        const response = {
          id: messages.length + 2,
          sender: activeConversation.name,
          content: "Thanks for the information. I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isMe: false,
        };
        setMessages((prev) => [...prev, response]);
      },
      Math.random() * 1000 + 1000
    );
  };

  const handleAddNewChat = () => {
    if (!newChatName.trim()) return;
    const newConv = {
      id: conversations.length + 1,
      name: newChatName,
      avatar: '',
      lastMessage: '',
      time: 'Now',
      unread: 0,
      online: false,
      phone: newChatPhone,
    };
    setActiveConversation(newConv);
    setMessages([]);
    setIsNewChatOpen(false);
    setNewChatName('');
    setNewChatPhone('');
  };

  const handleScheduleMeeting = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Error',
        description: 'Please select both date and time',
        variant: 'destructive',
      });
      return;
    }

    const eventDetails = {
      summary: `Meeting with ${activeConversation.name}`,
      description: 'Meeting scheduled through Hope and Hire',
      start: {
        dateTime: formatDateTime(selectedDate, selectedTime),
        timeZone: getLocalTimeZone(),
      },
      end: {
        dateTime: formatDateTime(selectedDate, selectedTime),
        timeZone: getLocalTimeZone(),
      },
    };

    const calendarUrl = createGoogleCalendarEvent(eventDetails);
    window.open(calendarUrl, '_blank');
    setIsScheduleOpen(false);
    setSelectedDate('');
    setSelectedTime('');

    // Add message about scheduled meeting
    const newMsg = {
      id: messages.length + 1,
      sender: 'Me',
      content: `Meeting scheduled for ${selectedDate} at ${selectedTime}`,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    };
    setMessages([...messages, newMsg]);
  };

  const handleStartVideoCall = () => {
    const meetUrl = createGoogleMeetLink();
    window.open(meetUrl, '_blank');

    // Add message about video call
    const newMsg = {
      id: messages.length + 1,
      sender: 'Me',
      content: 'Started a video call',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    };
    setMessages([...messages, newMsg]);
  };

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto py-6">
      <Card className="h-[calc(100vh-120px)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="font-bold text-lg">Messages</span>
              {user?.role &&
                (user.role === 'jobseeker' || user.role === 'volunteer') && (
                  <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-teal text-white">
                        New Chat
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start New Chat</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Name"
                          value={newChatName}
                          onChange={(e) => setNewChatName(e.target.value)}
                        />
                        <Input
                          placeholder="Phone (for WhatsApp)"
                          value={newChatPhone}
                          onChange={(e) => setNewChatPhone(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleAddNewChat}
                          className="bg-teal text-white"
                        >
                          Start Chat
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
            </div>
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    activeConversation?.id === conversation.id
                      ? 'bg-teal-light/10'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={conversation.avatar}
                      alt={conversation.name}
                    />
                    <AvatarFallback>
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{conversation.name}</span>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={activeConversation.avatar}
                        alt={activeConversation.name}
                      />
                      <AvatarFallback>
                        {activeConversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-medium">
                        {activeConversation.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activeConversation.online ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isScheduleOpen}
                      onOpenChange={setIsScheduleOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Schedule Meeting"
                        >
                          <Calendar className="text-gray-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Schedule Meeting</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                          <Input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleScheduleMeeting}
                            className="bg-teal text-white"
                          >
                            Schedule
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleStartVideoCall}
                      title="Google Meet Video Call"
                    >
                      <Calendar className="text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="More options">
                      <MoreVertical className="text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div
                  id="messages-container"
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isMe
                            ? 'bg-teal text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-teal text-white">
                      Send
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
