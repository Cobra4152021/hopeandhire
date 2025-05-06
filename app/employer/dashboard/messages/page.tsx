"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          const sampleConversations = [
            {
              id: 1,
              candidate: {
                id: 101,
                name: "John Doe",
                email: "john.doe@example.com",
              },
              job: {
                id: 1,
                title: "Senior Software Developer",
              },
              unread: 2,
              lastMessage: {
                text: "Thank you for considering my application. I'm available for an interview next week.",
                timestamp: "2023-05-20T14:30:00Z",
                sender: "candidate",
              },
              messages: [
                {
                  id: 1,
                  text: "Hello, I'm interested in learning more about the Senior Software Developer position.",
                  timestamp: "2023-05-19T10:15:00Z",
                  sender: "candidate",
                },
                {
                  id: 2,
                  text: "Hi John, thanks for your interest! Do you have any specific questions about the role?",
                  timestamp: "2023-05-19T11:30:00Z",
                  sender: "employer",
                },
                {
                  id: 3,
                  text: "Yes, I'd like to know more about the tech stack and team structure.",
                  timestamp: "2023-05-19T13:45:00Z",
                  sender: "candidate",
                },
                {
                  id: 4,
                  text: "We use React, Node.js, and PostgreSQL. The team consists of 5 developers, 1 designer, and a product manager.",
                  timestamp: "2023-05-20T09:20:00Z",
                  sender: "employer",
                },
                {
                  id: 5,
                  text: "Thank you for considering my application. I'm available for an interview next week.",
                  timestamp: "2023-05-20T14:30:00Z",
                  sender: "candidate",
                },
              ],
            },
            {
              id: 2,
              candidate: {
                id: 102,
                name: "Jane Smith",
                email: "jane.smith@example.com",
              },
              job: {
                id: 2,
                title: "Marketing Specialist",
              },
              unread: 0,
              lastMessage: {
                text: "Great! I'll prepare a presentation for the interview.",
                timestamp: "2023-05-18T16:45:00Z",
                sender: "candidate",
              },
              messages: [
                {
                  id: 1,
                  text: "Hello, I've applied for the Marketing Specialist position and would like to follow up.",
                  timestamp: "2023-05-17T09:30:00Z",
                  sender: "candidate",
                },
                {
                  id: 2,
                  text: "Hi Jane, we're currently reviewing applications and will be in touch soon.",
                  timestamp: "2023-05-17T11:15:00Z",
                  sender: "employer",
                },
                {
                  id: 3,
                  text: "Thank you for the update. I'm looking forward to hearing back.",
                  timestamp: "2023-05-17T12:00:00Z",
                  sender: "candidate",
                },
                {
                  id: 4,
                  text: "We'd like to invite you for an interview next Tuesday at 2 PM. Would that work for you?",
                  timestamp: "2023-05-18T14:30:00Z",
                  sender: "employer",
                },
                {
                  id: 5,
                  text: "Great! I'll prepare a presentation for the interview.",
                  timestamp: "2023-05-18T16:45:00Z",
                  sender: "candidate",
                },
              ],
            },
            {
              id: 3,
              candidate: {
                id: 103,
                name: "Michael Johnson",
                email: "michael.j@example.com",
              },
              job: {
                id: 3,
                title: "Customer Support Representative",
              },
              unread: 1,
              lastMessage: {
                text: "Is there a dress code for the office?",
                timestamp: "2023-05-21T10:00:00Z",
                sender: "candidate",
              },
              messages: [
                {
                  id: 1,
                  text: "Hello, I'm excited about the Customer Support position. When can I expect to hear back?",
                  timestamp: "2023-05-20T13:20:00Z",
                  sender: "candidate",
                },
                {
                  id: 2,
                  text: "Hi Michael, we're impressed with your application and would like to move forward with the hiring process.",
                  timestamp: "2023-05-20T15:45:00Z",
                  sender: "employer",
                },
                {
                  id: 3,
                  text: "That's great news! What are the next steps?",
                  timestamp: "2023-05-20T16:30:00Z",
                  sender: "candidate",
                },
                {
                  id: 4,
                  text: "We'd like to schedule a phone interview first, followed by an in-person meeting if that goes well.",
                  timestamp: "2023-05-21T09:15:00Z",
                  sender: "employer",
                },
                {
                  id: 5,
                  text: "Is there a dress code for the office?",
                  timestamp: "2023-05-21T10:00:00Z",
                  sender: "candidate",
                },
              ],
            },
          ]

          setConversations(sampleConversations)
          setSelectedConversation(sampleConversations[0])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing messages page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return

    // In a real app, we would send the message to Supabase
    // For now, we'll just update the local state
    const newMessage = {
      id: selectedConversation.messages.length + 1,
      text: message,
      timestamp: new Date().toISOString(),
      sender: "employer",
    }

    const updatedConversation = {
      ...selectedConversation,
      lastMessage: newMessage,
      messages: [...selectedConversation.messages, newMessage],
    }

    setConversations(conversations.map((conv) => (conv.id === selectedConversation.id ? updatedConversation : conv)))
    setSelectedConversation(updatedConversation)
    setMessage("")
  }

  const handleSelectConversation = (conversation: any) => {
    // Mark as read when selecting a conversation
    const updatedConversation = {
      ...conversation,
      unread: 0,
    }

    setConversations(conversations.map((conv) => (conv.id === conversation.id ? updatedConversation : conv)))
    setSelectedConversation(updatedConversation)
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.job.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with job applicants</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[600px]" />
          <Skeleton className="h-[600px] md:col-span-2" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Conversations</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="divide-y">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                          selectedConversation?.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(conversation.candidate.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{conversation.candidate.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatTimestamp(conversation.lastMessage.timestamp)}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {conversation.job.title}
                              </Badge>
                              {conversation.unread > 0 && (
                                <Badge className="bg-primary text-xs">{conversation.unread} new</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No conversations found</div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="md:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(selectedConversation.candidate.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{selectedConversation.candidate.name}</CardTitle>
                        <CardDescription>
                          {selectedConversation.job.title} • {selectedConversation.candidate.email}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((msg: any) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "employer" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.sender === "employer" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                msg.sender === "employer" ? "text-primary-foreground/80" : "text-muted-foreground"
                              }`}
                            >
                              {formatTimestamp(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <div className="flex w-full items-center gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-muted-foreground mt-1">Select a conversation from the list to view messages</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
