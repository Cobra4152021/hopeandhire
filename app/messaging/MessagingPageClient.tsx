"use client"

import { useState } from "react"

// Sample conversation data
const initialConversations = [
  {
    id: "1",
    with: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-diverse.png",
      role: "Volunteer Recruiter",
    },
    lastMessage: {
      text: "I reviewed your resume and have some suggestions for improvements.",
      timestamp: "2023-04-15T14:30:00",
      isRead: true,
      sender: "them",
    },
    messages: [
      {
        id: "m1",
        text: "Hello! I saw that you scheduled an appointment for a resume review. Is there anything specific you would like me to focus on?",
        timestamp: "2023-04-14T10:15:00",
        sender: "them",
      },
      {
        id: "m2",
        text: "Hi Sarah, thanks for reaching out! I would appreciate feedback on how to better highlight my technical skills and project experience.",
        timestamp: "2023-04-14T10:30:00",
        sender: "you",
      },
      {
        id: "m3",
        text: "I reviewed your resume and have some suggestions for improvements.",
        timestamp: "2023-04-15T14:30:00",
        sender: "them",
      },
    ],
  },
  {
    id: "2",
    with: {
      name: "Michael Chen",
      avatar: "/professional-asian-man.png",
      role: "HR Specialist",
    },
    lastMessage: {
      text: "Looking forward to our mock interview session tomorrow!",
      timestamp: "2023-04-16T09:45:00",
      isRead: false,
      sender: "them",
    },
    messages: [
      {
        id: "m1",
        text: "Hello! I will be conducting your mock interview session. Do you have any specific companies or roles you are targeting?",
        timestamp: "2023-04-15T11:20:00",
        sender: "them",
      },
      {
        id: "m2",
        text: "Hi Michael, I am preparing for a product manager interview at a tech company. I would like to focus on behavioral questions and product case studies.",
        timestamp: "2023-04-15T13:05:00",
        sender: "you",
      },
      {
        id: "m3",
        text: "Perfect! I will prepare some relevant questions for our session. We will cover both behavioral questions and product case studies.",
        timestamp: "2023-04-16T08:30:00",
        sender: "them",
      },
      {
        id: "m4",
        text: "Looking forward to our mock interview session tomorrow!",
        timestamp: "2023-04-16T09:45:00",
        sender: "them",
      },
    ],
  },
  {
    id: "3",
    with: {
      name: "Acme Corporation",
      avatar: "/generic-company-logo.png",
      role: "Employer",
    },
    lastMessage: {
      text: "Thank you for your application. We would like to schedule an interview.",
      timestamp: "2023-04-17T15:10:00",
      isRead: false,
      sender: "them",
    },
    messages: [
      {
        id: "m1",
        text: "Thank you for your application to the Senior Software Engineer position at Acme Corporation.",
        timestamp: "2023-04-17T15:10:00",
        sender: "them",
      },
      {
        id: "m2",
        text: "Thank you for your application. We would like to schedule an interview.",
        timestamp: "2023-04-17T15:10:00",
        sender: "them",
      },
    ],
  },
]

export default function MessagingPageClient() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeConversation, setActiveConversation] = useState(conversations[0].id)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversations.filter((convo) =>
    convo.with.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentConversation = conversations.find((convo) => convo.id === activeConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const updatedConversations = conversations.map((convo) => {
      if (convo.id === activeConversation) {
        const newMsg = {
          id: `m${convo.messages.length + 1}`,
          text: newMessage,
          timestamp: new Date().toISOString(),
          sender: "you",
        }

        return {
          ...convo,
          messages: [...convo.messages, newMsg],
          lastMessage: {
            text: newMessage,
            timestamp: new Date().toISOString(),
            isRead: true,
            sender: "you",
          },
        }
      }
      return convo
    })

    setConversations(updatedConversations)
    setNewMessage("")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Messages</h1>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Conversation List */}
          <div className="w-full md:w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(600px-64px)]">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No conversations found</div>
              ) : (
                filteredConversations.map((convo) => (
                  <div
                    key={convo.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                      activeConversation === convo.id ? "bg-teal-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveConversation(convo.id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={convo.with.avatar || "/placeholder.svg"}
                        alt={convo.with.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{convo.with.name}</h3>
                          <span className="text-xs text-gray-500">{formatDate(convo.lastMessage.timestamp)}</span>
                        </div>
                        <p className="text-xs text-gray-500">{convo.with.role}</p>
                        <p
                          className={`text-sm truncate ${
                            !convo.lastMessage.isRead && convo.lastMessage.sender === "them"
                              ? "font-semibold text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {convo.lastMessage.sender === "you" ? "You: " : ""}
                          {convo.lastMessage.text}
                        </p>
                      </div>
                      {!convo.lastMessage.isRead && convo.lastMessage.sender === "them" && (
                        <span className="ml-2 w-3 h-3 bg-teal-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Conversation */}
          <div className="w-full md:w-2/3 flex flex-col">
            {currentConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <img
                    src={currentConversation.with.avatar || "/placeholder.svg"}
                    alt={currentConversation.with.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{currentConversation.with.name}</h3>
                    <p className="text-xs text-gray-500">{currentConversation.with.role}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                          message.sender === "you" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "you" ? "text-teal-100" : "text-gray-500"}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
