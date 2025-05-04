"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, reason: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        reason: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about HopeAndHire? We're here to help. Fill out the form and we'll get back to you as
                soon as possible.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://www.facebook.com/hopeandhire/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5 hover:text-primary" />
                    </Link>
                    <Link
                      href="https://x.com/HopeAndHire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5 hover:text-primary" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/hopeandhire/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5 hover:text-primary" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/hopeandhire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 hover:text-primary" />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@HopeAndHire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-5 w-5 hover:text-primary" />
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p className="text-muted-foreground">support@hopeandhire.org</p>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <h3 className="text-xl font-bold text-primary">Thank You!</h3>
                    <p>Your message has been sent. We'll get back to you soon.</p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Contact</Label>
                      <Select value={formState.reason} onValueChange={handleSelectChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="volunteer">Volunteer Inquiry</SelectItem>
                          <SelectItem value="employer">Employer Interest</SelectItem>
                          <SelectItem value="media">Media Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
