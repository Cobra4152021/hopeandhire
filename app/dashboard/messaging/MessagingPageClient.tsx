"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Phone, Video, MoreVertical, PaperclipIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
<<<<<<< HEAD
=======
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
>>>>>>> 999b990 (updates)

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Michael Johnson",
    avatar: "/stylized-letters-mj.png",
    lastMessage: "I'm interested in the Software Developer position",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/stylized-letters-sw.png",
    lastMessage: "When is the interview scheduled?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/stylized-letters-dc.png",
    lastMessage: "Thank you for the opportunity",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar: "/stylized-letters-er.png",
    lastMessage: "I've attached my updated resume",
    time: "Monday",
    unread: 0,
    online: false,
  },
]

// Sample messages for the active conversation
const sampleMessages = [
  {
    id: 1,
    sender: "Michael Johnson",
    content: "Hello, I'm interested in the Software Developer position that was posted on your website.",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Hi Michael, thank you for your interest! Do you have any specific questions about the position?",
    time: "10:32 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Michael Johnson",
    content: "Yes, I was wondering about the tech stack used for this role. Could you provide more details?",
    time: "10:35 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content:
      "Of course! We primarily use React, Node.js, and PostgreSQL. Experience with TypeScript is also highly valued.",
    time: "10:38 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Michael Johnson",
    content:
      "That sounds perfect for my background. I have 3+ years of experience with React and Node.js, and I've been using TypeScript for the past year.",
    time: "10:40 AM",
    isMe: false,
  },
  {
    id: 6,
    sender: "Me",
    content:
      "That's great to hear! Would you be available for an initial phone screening next week? We could discuss your experience in more detail.",
    time: "10:42 AM",
    isMe: true,
  },
]

export default function MessagingPageClient() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
<<<<<<< HEAD
=======
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [newChatName, setNewChatName] = useState("")
  const [newChatPhone, setNewChatPhone] = useState("")
>>>>>>> 999b990 (updates)

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: "Me",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate a response after 1-2 seconds
    setTimeout(
      () => {
        const response = {
          id: messages.length + 2,
          sender: activeConversation.name,
          content: "Thanks for the information. I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
        }
        setMessages((prev) => [...prev, response])
      },
      Math.random() * 1000 + 1000,
    )
  }

<<<<<<< HEAD
=======
  const handleAddNewChat = () => {
    if (!newChatName.trim()) return
    const newConv = {
      id: conversations.length + 1,
      name: newChatName,
      avatar: "",
      lastMessage: "",
      time: "Now",
      unread: 0,
      online: false,
      phone: newChatPhone,
    }
    setActiveConversation(newConv)
    setMessages([])
    setIsNewChatOpen(false)
    setNewChatName("")
    setNewChatPhone("")
  }

>>>>>>> 999b990 (updates)
  useEffect(() => {
    // Scroll to bottom of messages when messages change
    const messagesContainer = document.getElementById("messages-container")
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [messages])

  return (
    <div className="container mx-auto py-6">
      <Card className="h-[calc(100vh-120px)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r border-gray-200">
            <CardHeader className="px-4 py-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-2">
<<<<<<< HEAD
=======
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <span className="font-bold text-lg">Messages</span>
                  <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-teal text-white">New Chat</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start New Chat</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Name" value={newChatName} onChange={e => setNewChatName(e.target.value)} />
                        <Input placeholder="Phone (for WhatsApp)" value={newChatPhone} onChange={e => setNewChatPhone(e.target.value)} />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddNewChat} className="bg-teal text-white">Start Chat</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
>>>>>>> 999b990 (updates)
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id ? "bg-teal-light/10" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback className="bg-teal-light/20 text-teal">
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="font-medium text-gray-900 truncate">{conversation.name}</p>
                        <p className="text-xs text-gray-500">{conversation.time}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 bg-teal text-white text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col h-full">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                  <AvatarFallback className="bg-teal-light/20 text-teal">
                    {activeConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{activeConversation.name}</p>
                  <p className="text-xs text-gray-500">{activeConversation.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex space-x-2">
<<<<<<< HEAD
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5 text-gray-500" />
=======
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (activeConversation.phone) {
                      window.open(`https://wa.me/${activeConversation.phone.replace(/[^\d]/g, "")}`)
                    } else {
                      alert("No phone number available for WhatsApp chat.")
                    }
                  }}
                  title="WhatsApp Chat"
                >
                  <Phone className="text-gray-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("https://meet.google.com/new", "_blank")}
                  title="Google Meet Video Call"
                >
                  <Video className="text-gray-500" />
>>>>>>> 999b990 (updates)
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" id="messages-container">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.isMe
                          ? "bg-teal text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isMe ? "text-teal-100" : "text-gray-500"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PaperclipIcon className="h-5 w-5 text-gray-500" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-teal text-white hover:bg-teal-dark"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
