# Hope and Hire Feature Implementation Guide

This document provides detailed implementation guidance for key features across all development phases.

## Phase 1: MVP Features

### User Authentication Implementation

#### Technology Stack
- Supabase Auth
- Next.js App Router
- Server Components and Client Components

#### Implementation Steps
1. **Setup Supabase Project**
   - Create a new Supabase project
   - Configure email templates for verification and password reset
   - Set up OAuth providers (Google, LinkedIn)

2. **Create Auth Components**
   - Implement login form with email/password
   - Create registration form with role selection
   - Build password reset flow
   - Develop OAuth login buttons

3. **Server-Side Authentication**
   - Implement middleware for protected routes
   - Create server-side session validation
   - Set up role-based access control

4. **Client-Side Auth State**
   - Manage auth state with React context
   - Handle login/logout UI updates
   - Implement protected client routes

#### Code Example: Auth Provider

\`\`\`tsx
// components/auth-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientClient } from '@/utils/supabase/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
\`\`\`

### Job Board Implementation

#### Technology Stack
- Next.js Server Components
- Supabase Database
- React Hook Form
- Tailwind CSS

#### Implementation Steps
1. **Database Setup**
   - Create jobs table with necessary fields
   - Set up RLS policies for secure access
   - Create indexes for efficient queries

2. **Job Listing Components**
   - Implement job card component
   - Create job listing page with filters
   - Build job detail page
   - Develop job application form

3. **Employer Job Management**
   - Create job posting form
   - Implement job editing functionality
   - Build job status management
   - Develop applicant viewing interface

4. **Search and Filtering**
   - Implement basic search functionality
   - Create filter components by job type, location
   - Build sorting options

#### Code Example: Job Listing Component

\`\`\`tsx
// components/job-card.tsx
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

export function JobCard({ job }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-muted-foreground">{job.company.name}</p>
          </div>
          {job.company.logo && (
            <div className="h-10 w-10 rounded-md overflow-hidden">
              <img 
                src={job.company.logo || "/placeholder.svg"} 
                alt={`${job.company.name} logo`}
                className="h-full w-full object-cover" 
              />
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-medium">Location:</span>
            <span className="ml-2">{job.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium">Type:</span>
            <span className="ml-2">{job.type}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium">Posted:</span>
            <span className="ml-2">
              {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Link 
          href={`/jobs/${job.id}`}
          className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}
\`\`\`

### Volunteer Dashboard Implementation

#### Technology Stack
- Next.js App Router
- React Server Components
- Supabase Realtime
- shadcn/ui Components

#### Implementation Steps
1. **Task Management System**
   - Create tasks table in database
   - Implement task listing component
   - Build task claiming functionality
   - Develop task completion workflow

2. **Volunteer Profile**
   - Create profile management page
   - Implement skills and availability settings
   - Build experience tracking

3. **Leaderboard**
   - Implement volunteer ranking algorithm
   - Create leaderboard component
   - Build achievement tracking

4. **Task History**
   - Implement completed tasks view
   - Create impact metrics calculation
   - Build feedback display

#### Code Example: Task Claiming

\`\`\`tsx
// components/task-card.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientClient } from '@/utils/supabase/client'
import { useAuth } from '@/components/auth-provider'
import { toast } from 'sonner'

export function TaskCard({ task }) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const supabase = createClientClient()
  
  const handleClaimTask = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ 
          volunteer_id: user.id,
          status: 'claimed'
        })
        .eq('id', task.id)
        .eq('status', 'open')
      
      if (error) throw error
      
      toast.success('Task claimed successfully!')
    } catch (error) {
      console.error('Error claiming task:', error)
      toast.error('Failed to claim task. It may have been claimed by someone else.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Task Type</p>
            <p>{task.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p>{task.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estimated Time</p>
            <p>{task.estimated_time}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleClaimTask} 
          disabled={isLoading || task.status !== 'open'}
          className="w-full"
        >
          {isLoading ? 'Claiming...' : 'Claim Task'}
        </Button>
      </CardFooter>
    </Card>
  )
}
\`\`\`

## Phase 2: Intermediate Features

### Resume & Cover Letter System

#### Technology Stack
- Supabase Storage
- PDF.js for preview
- React Dropzone
- Server Actions

#### Implementation Steps
1. **File Upload System**
   - Implement secure file upload to Supabase Storage
   - Create resume versioning system
   - Build file preview component

2. **Feedback Mechanism**
   - Create feedback form for volunteers
   - Implement feedback history
   - Build notification system for feedback

3. **Cover Letter Templates**
   - Create template selection interface
   - Implement template customization
   - Build cover letter generation

4. **Version Tracking**
   - Implement resume version history
   - Create comparison view
   - Build restore functionality

#### Code Example: Resume Upload

\`\`\`tsx
'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createClientClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ResumeUpload({ userId }) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClientClient()
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }
    
    setUploading(true)
    try {
      // Upload file to Supabase Storage
      const filename = `${userId}-${Date.now()}.pdf`
      const { error: uploadError, data } = await supabase
        .storage
        .from('resumes')
        .upload(filename, file)
        
      if (uploadError) throw uploadError
      
      // Create record in resumes table
      const { error: dbError } = await supabase
        .from('resumes')
        .insert({
          candidate_id: userId,
          file_url: data.path,
          version: 1, // Logic to increment version would be here
          status: 'pending_review'
        })
        
      if (dbError) throw dbError
      
      toast.success('Resume uploaded successfully!')
    } catch (error) {
      console.error('Error uploading resume:', error)
      toast.error('Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }, [userId, supabase])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1
  })
  
  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p>Uploading resume...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="mx-auto h-12 w-12 text-muted-foreground"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
          </div>
          <p className="mb-2 text-sm font-medium">
            {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            PDF only, max 5MB
          </p>
          <Button type="button" size="sm">
            Browse Files
          </Button>
        </>
      )}
    </div>
  )
}
\`\`\`

### Mock Interview Scheduling

#### Technology Stack
- React Calendar
- Supabase Database
- Email Notifications
- Video Integration (optional)

#### Implementation Steps
1. **Scheduling Interface**
   - Create availability setting component
   - Implement calendar view
   - Build time slot selection

2. **Notification System**
   - Implement email notifications
   - Create in-app notifications
   - Build reminder system

3. **Interview Preparation**
   - Create question bank
   - Implement preparation materials
   - Build feedback form

4. **Video Integration (Optional)**
   - Integrate with video provider API
   - Create meeting link generation
   - Build recording functionality
   - Implement session management

#### Code Example: Interview Scheduling

\`\`\`tsx
'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClientClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

export function InterviewScheduler({ taskId, candidateId }) {
  const [date, setDate] = useState(null)
  const [timeSlot, setTimeSlot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientClient()
  
  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]
  
  const handleSchedule = async () => {
    if (!date || !timeSlot) {
      toast.error('Please select both date and time')
      return
    }
    
    setIsSubmitting(true)
    try {
      // Create the interview record
      const { error } = await supabase
        .from('interviews')
        .insert({
          task_id: taskId,
          candidate_id: candidateId,
          volunteer_id: user.id,
          scheduled_time: new Date(`${date.toDateString()} ${timeSlot}`).toISOString(),
          duration: 60, // 60 minutes
          status: 'scheduled'
        })
        
      if (error) throw error
      
      toast.success('Interview scheduled successfully!')
    } catch (error) {
      console.error('Error scheduling interview:', error)
      toast.error('Failed to schedule interview')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => 
            date < new Date() || 
            date.getDay() === 0 || 
            date.getDay() === 6
          }
          className="rounded-md border"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Select Time</h3>
        <Select value={timeSlot} onValueChange={setTimeSlot}>
          <SelectTrigger>
            <SelectValue placeholder="Select time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleSchedule} 
        disabled={!date || !timeSlot || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Scheduling...' : 'Schedule Interview'}
      </Button>
    </div>
  )
}
\`\`\`

### Basic AI Resume Assistance

#### Technology Stack
- OpenAI API
- Next.js API Routes
- PDF Parser
- React Form Components

#### Implementation Steps
1. **Resume Parsing**
   - Implement PDF text extraction
   - Create structured data from resume
   - Build resume section identification

2. **AI Integration**
   - Set up OpenAI API integration
   - Create prompt engineering for resume feedback
   - Implement response parsing

3. **Feedback Interface**
   - Create feedback display component
   - Implement suggestion acceptance/rejection
   - Build before/after comparison

4. **Improvement Tracking**
   - Implement version comparison
   - Create improvement metrics
   - Build progress visualization

#### Code Example: AI Resume Analysis

\`\`\`tsx
// app/api/analyze-resume/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/utils/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const { resumeId } = await request.json()
    
    // Get authenticated user
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get resume data
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single()
      
    if (resumeError) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }
    
    // Get resume content from storage
    const { data: fileData, error: fileError } = await supabase
      .storage
      .from('resumes')
      .download(resume.file_url)
      
    if (fileError) {
      return NextResponse.json(
        { error: 'Failed to download resume' },
        { status: 500 }
      )
    }
    
    // Convert PDF to text (simplified - would use a PDF parser in production)
    const text = await fileData.text()
    
    // Send to OpenAI for analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume reviewer. Analyze the resume and provide specific, actionable feedback to improve it. Focus on structure, content, clarity, and impact."
        },
        {
          role: "user",
          content: `Please analyze this resume and provide feedback: ${text}`
        }
      ],
      temperature: 0.7,
    })
    
    const feedback = completion.choices[0].message.content
    
    // Save feedback to database
    await supabase
      .from('resume_feedback')
      .insert({
        resume_id: resumeId,
        feedback,
        source: 'ai',
        created_at: new Date().toISOString()
      })
    
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error analyzing resume:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}
\`\`\`

## Phase 3: Full-Scale Features

### AI-Driven Matching

#### Technology Stack
- Machine Learning Pipeline
- Vector Database (Pinecone or similar)
- OpenAI Embeddings
- Next.js API Routes

#### Implementation Steps
1. **Skill Extraction**
   - Implement NLP for resume skill extraction
   - Create job requirement parsing
   - Build skill taxonomy mapping

2. **Vector Embeddings**
   - Create embeddings for job descriptions
   - Implement embeddings for candidate profiles
   - Build similarity matching algorithm

3. **Recommendation Engine**
   - Implement personalized job recommendations
   - Create candidate recommendations for employers
   - Build skill gap analysis

4. **Feedback Loop**
   - Implement outcome tracking
   - Create model retraining pipeline
   - Build performance analytics

#### Code Example: Job-Candidate Matching

\`\`\`tsx
// app/api/match-jobs/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/utils/supabase/server'
import OpenAI from 'openai'
import { PineconeClient } from '@pinecone-database/pinecone'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const pinecone = new PineconeClient()
await pinecone.init({
  environment: process.env.PINECONE_ENVIRONMENT,
  apiKey: process.env.PINECONE_API_KEY
})

export async function POST(request) {
  try {
    const { candidateId } = await request.json()
    
    // Get candidate data
    const supabase = createServerClient()
    const { data: candidate, error: candidateError } = await supabase
      .from('candidates')
      .select('*, resumes(*)')
      .eq('id', candidateId)
      .single()
      
    if (candidateError) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      )
    }
    
    // Get latest resume
    const latestResume = candidate.resumes.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]
    
    // Get resume text
    const { data: fileData } = await supabase
      .storage
      .from('resumes')
      .download(latestResume.file_url)
      
    const resumeText = await fileData.text()
    
    // Generate embedding for the resume
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: resumeText,
    })
    
    const embedding = embeddingResponse.data[0].embedding
    
    // Query Pinecone for similar job vectors
    const index = pinecone.Index(process.env.PINECONE_INDEX)
    const queryResponse = await index.query({
      vector: embedding,
      topK: 10,
      includeMetadata: true
    })
    
    // Get job IDs from Pinecone results
    const jobIds = queryResponse.matches.map(match => match.metadata.jobId)
    
    // Get full job details from Supabase
    const { data: jobs } = await supabase
      .from('jobs')
      .select('*, companies(*)')
      .in('id', jobIds)
      .eq('status', 'active')
    
    // Sort jobs by match score
    const matchedJobs = jobs.map(job => {
      const matchScore = queryResponse.matches.find(
        match => match.metadata.jobId === job.id
      ).score
      
      return {
        ...job,
        matchScore: Math.round(matchScore * 100)
      }
    }).sort((a, b) => b.matchScore - a.matchScore)
    
    return NextResponse.json({ matches: matchedJobs })
  } catch (error) {
    console.error('Error matching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to match jobs' },
      { status: 500 }
    )
  }
}
\`\`\`

### Comprehensive Messaging System

#### Technology Stack
- Supabase Realtime
- React Context API
- WebSockets
- Notification Service

#### Implementation Steps
1. **Message Infrastructure**
   - Create messages table with relationships
   - Implement real-time subscriptions
   - Build message threading

2. **User Interface**
   - Create conversation list component
   - Implement message thread view
   - Build composer with attachments

3. **Notifications**
   - Implement in-app notifications
   - Create email notification system
   - Build notification preferences

4. **Advanced Features**
   - Implement read receipts
   - Create typing indicators
   - Build message reactions

#### Code Example: Real-time Messaging

\`\`\`tsx
'use client'

import { useEffect, useState } from 'react'
import { createClientClient } from '@/utils/supabase/client'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

export function MessageThread({ conversationId }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const { user } = useAuth()
  const supabase = createClientClient()
  
  // Load initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*, sender:sender_id(*)')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        
      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setMessages(data || [])
      }
      
      setIsLoading(false)
    }
    
    fetchMessages()
    
    // Subscribe to new messages
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, async (payload) => {
        // Fetch the complete message with sender info
        const { data, error } = await supabase
          .from('messages')
          .select('*, sender:sender_id(*)')
          .eq('id', payload.new.id)
          .single()
          
        if (!error && data) {
          setMessages(prev => [...prev, data])
        }
      })
      .subscribe()
      
    // Mark messages as read
    const markAsRead = async () => {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('conversation_id', conversationId)
        .eq('recipient_id', user.id)
        .eq('read', false)
    }
    
    if (user) {
      markAsRead()
    }
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, supabase, user])
  
  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return
    
    setIsSending(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          recipient_id: getRecipientId(), // Function to determine recipient
          content: newMessage,
          read: false
        })
        
      if (error) throw error
      
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }
  
  // Helper to get recipient ID based on conversation participants
  const getRecipientId = () => {
    // Implementation depends on conversation structure
    // This is a placeholder
    return '123'
  }
  
  if (isLoading) {
    return <div className="flex justify-center p-4">Loading messages...</div>
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${message.sender_id === user.id ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <div 
                    className={`rounded-lg px-4 py-2 ${
                      message.sender_id === user.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
          />
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim() || isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

### Analytics Dashboard

#### Technology Stack
- Chart.js or Recharts
- Data Warehouse
- ETL Pipeline
- React Dashboard Components

#### Implementation Steps
1. **Data Collection**
   - Implement event tracking
   - Create data aggregation pipeline
   - Build historical data storage

2. **Visualization Components**
   - Create chart components
   - Implement dashboard layout
   - Build interactive filters

3. **Metrics Definition**
   - Define key performance indicators
   - Implement calculation methods
   - Build trend analysis

4. **User Interface**
   - Create admin dashboard
   - Implement role-specific views
   - Build export functionality

#### Code Example: Impact Dashboard

\`\`\`tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClientClient } from '@/utils/supabase/client'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

export function ImpactDashboard() {
  const [timeframe, setTimeframe] = useState('month')
  const [metrics, setMetrics] = useState({
    placements: [],
    interviews: [],
    applications: [],
    summary: {
      totalPlacements: 0,
      totalInterviews: 0,
      totalApplications: 0,
      averagePlacementTime: 0
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientClient()
  
  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true)
      
      try {
        // This would typically call an API endpoint that aggregates data
        // For demo purposes, we're querying directly
        
        // Get placements by time period
        const { data: placementsData } = await supabase
          .from('job_placements')
          .select('created_at')
          .gte('created_at', getTimeframeDate(timeframe))
          .order('created_at')
        
        // Get interviews by time period
        const { data: interviewsData } = await supabase
          .from('interviews')
          .select('scheduled_time, status')
          .gte('scheduled_time', getTimeframeDate(timeframe))
          .order('scheduled_time')
        
        // Get applications by time period
        const { data: applicationsData } = await supabase
          .from('applications')
          .select('created_at, status')
          .gte('created_at', getTimeframeDate(timeframe))
          .order('created_at')
        
        // Process data for charts
        const placementsByPeriod = groupDataByPeriod(placementsData, 'created_at', timeframe)
        const interviewsByPeriod = groupDataByPeriod(interviewsData, 'scheduled_time', timeframe)
        const applicationsByPeriod = groupDataByPeriod(applicationsData, 'created_at', timeframe)
        
        // Calculate summary metrics
        const totalPlacements = placementsData?.length || 0
        const totalInterviews = interviewsData?.length || 0
        const totalApplications = applicationsData?.length || 0
        
        // Calculate average placement time (simplified)
        const averagePlacementTime = 45 // In days, would calculate from actual data
        
        setMetrics({
          placements: placementsByPeriod,
          interviews: interviewsByPeriod,
          applications: applicationsByPeriod,
          summary: {
            totalPlacements,
            totalInterviews,
            totalApplications,
            averagePlacementTime
          }
        })
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchMetrics()
  }, [timeframe, supabase])
  
  // Helper to get date for timeframe
  const getTimeframeDate = (timeframe) => {
    const date = new Date()
    switch (timeframe) {
      case 'week':
        date.setDate(date.getDate() - 7)
        break
      case 'month':
        date.setMonth(date.getMonth() - 1)
        break
      case 'quarter':
        date.setMonth(date.getMonth() - 3)
        break
      case 'year':
        date.setFullYear(date.getFullYear() - 1)
        break
      default:
        date.setMonth(date.getMonth() - 1)
    }
    return date.toISOString()
  }
  
  // Helper to group data by time period
  const groupDataByPeriod = (data, dateField, timeframe) => {
    if (!data) return []
    
    const grouped = {}
    
    data.forEach(item => {
      const date = new Date(item[dateField])
      let periodKey
      
      switch (timeframe) {
        case 'week':
          periodKey = `Day ${date.getDate()}`
          break
        case 'month':
          periodKey = `Week ${Math.ceil(date.getDate() / 7)}`
          break
        case 'quarter':
          periodKey = `Month ${date.getMonth() + 1}`
          break
        case 'year':
          periodKey = `${date.toLocaleString('default', { month: 'short' })}`
          break
        default:
          periodKey = `Week ${Math.ceil(date.getDate() / 7)}`
      }
      
      if (!grouped[periodKey]) {
        grouped[periodKey] = 0
      }
      
      grouped[periodKey]++
    })
    
    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
  }
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading metrics...</div>
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Impact Dashboard</h2>
        
        <div>
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.summary.totalPlacements}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20)}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Interviews Conducted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.summary.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 15)}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Applications Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.summary.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 25)}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Placement Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.summary.averagePlacementTime} days</div>
            <p className="text-xs text-muted-foreground">
              -{Math.floor(Math.random() * 10)}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Placements Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.placements}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Placements" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Applications', value: metrics.summary.totalApplications },
                  { name: 'Interviews', value: metrics.summary.totalInterviews },
                  { name: 'Placements', value: metrics.summary.totalPlacements }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Count" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
\`\`\`

## Conclusion

This implementation guide provides a detailed roadmap for building the Hope and Hire platform across all three development phases. By following this phased approach, you can incrementally build and validate features while maintaining focus on the core mission of connecting formerly incarcerated individuals with meaningful employment opportunities.

Each phase builds upon the previous one, adding more sophisticated features that enhance the user experience and platform capabilities. The MVP establishes the foundation, the Intermediate phase adds key functionality, and the Full-Scale platform introduces advanced features that significantly improve matching efficiency and platform scalability.

Remember to prioritize user feedback throughout the development process and be prepared to adjust the roadmap based on real-world usage patterns and needs.
