'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample message data
const sampleContacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'HR Manager at TechCorp',
    avatar: '/stylized-letters-sj.png',
    lastMessage: 'Thanks for sending those candidates over!',
    unread: true,
    time: '10:30 AM',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Volunteer Career Coach',
    avatar: '/microphone-concert-stage.png',
    lastMessage: "I've reviewed the resume you sent. Let's discuss it tomorrow.",
    unread: false,
    time: 'Yesterday',
  },
  {
    id: 3,
    name: 'Jessica Williams',
    role: 'Job Seeker',
    avatar: '/intertwined-letters.png',
    lastMessage: 'Thank you for the interview tips!',
    unread: false,
    time: 'Yesterday',
  },
  {
    id: 4,
    name: 'Robert Garcia',
    role: 'Hiring Manager at HealthPlus',
    avatar: '/abstract-geometric-rg.png',
    lastMessage: "We'd like to schedule a second interview with the candidate.",
    unread: false,
    time: 'Monday',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Volunteer Mentor',
    avatar: '/letter-blocks-LT.png',
    lastMessage: 'I can help with the resume workshop next week.',
    unread: false,
    time: 'Last week',
  },
];

const sampleMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hi there! I'm looking for candidates with experience in software development.",
    timestamp: '10:30 AM',
    isMe: false,
  },
  {
    id: 2,
    senderId: 'me',
    text: 'Hello Sarah! I have several qualified candidates I can recommend. What specific skills are you looking for?',
    timestamp: '10:32 AM',
    isMe: true,
  },
  {
    id: 3,
    senderId: 1,
    text: 'We need someone with React, Node.js, and experience with cloud platforms like AWS.',
    timestamp: '10:35 AM',
    isMe: false,
  },
  {
    id: 4,
    senderId: 'me',
    text: "Great! I have 3 candidates who match those requirements. I'll send you their profiles right away.",
    timestamp: '10:38 AM',
    isMe: true,
  },
  {
    id: 5,
    senderId: 1,
    text: "That would be perfect. We're looking to fill the position within the next two weeks.",
    timestamp: '10:40 AM',
    isMe: false,
  },
  {
    id: 6,
    senderId: 'me',
    text: "I'll make sure they're available for interviews soon. All three candidates are actively looking and could start quickly.",
    timestamp: '10:42 AM',
    isMe: true,
  },
  {
    id: 7,
    senderId: 1,
    text: 'Thanks for sending those candidates over!',
    timestamp: '10:45 AM',
    isMe: false,
  },
];

export default function MessagingPageClient() {
  const [selectedContact, setSelectedContact] = useState(sampleContacts[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = sampleContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      senderId: 'me',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal">Messaging</h1>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex h-[calc(80vh)]">
          {/* Contacts sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <ScrollArea className="flex-1">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact.id === contact.id ? 'bg-teal-light/10' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar || '/placeholder.svg'} alt={contact.name} />
                      <AvatarFallback className="bg-teal-light/20 text-teal">
                        {contact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{contact.role}</p>
                      <p className="text-sm text-gray-600 mt-1 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat area */}
          <div className="w-2/3 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={selectedContact.avatar || '/placeholder.svg'}
                  alt={selectedContact.name}
                />
                <AvatarFallback className="bg-teal-light/20 text-teal">
                  {selectedContact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                <p className="text-xs text-gray-500">{selectedContact.role}</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe
                          ? 'bg-teal text-white rounded-tr-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${message.isMe ? 'text-teal-light/70' : 'text-gray-500'}`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200 flex">
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1 mr-2"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage} className="bg-teal text-white hover:bg-teal-dark">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
