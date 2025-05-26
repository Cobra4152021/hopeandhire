'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo Section - Centrally positioned below header */}
      <div className="flex justify-center py-8 bg-white">
        <Image
          src="/logo.png"
          alt="Hope and Hire Logo"
          width={200}
          height={80}
          className="h-auto"
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="bg-light-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-dark-text">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              Have questions or want to learn more about Hope and Hire?
              We&apos;re here to help. Reach out to our team using the form
              below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-dark-text">
                    Send Us a Message
                  </h2>

                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-2">Thank You!</h3>
                      <p>
                        Your message has been sent successfully. Our team will
                        get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number (optional)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger id="inquiryType">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="job_seeker">
                              Job Seeker Support
                            </SelectItem>
                            <SelectItem value="volunteer">
                              Volunteer Information
                            </SelectItem>
                            <SelectItem value="employer">
                              Employer Partnership
                            </SelectItem>
                            <SelectItem value="organization">
                              Organization Partnership
                            </SelectItem>
                            <SelectItem value="donation">
                              Donation Inquiry
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={5}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-teal text-white hover:bg-teal-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-text">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-text">Email</h3>
                      <p className="text-gray-600">
                        email@protectingsanfrancisco.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-text">Phone</h3>
                      <p className="text-gray-600">415-696-2428</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-text">Address</h3>
                      <p className="text-gray-600">
                        35 Gilbert Street
                        <br />
                        San Francisco CA 94103
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-text">Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-text">
                  Connect With Us
                </h2>
                <p className="text-gray-600 mb-4">
                  Follow us on social media to stay updated on our latest news,
                  events, and success stories.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-teal-light/20 p-3 rounded-full text-teal hover:bg-teal hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-teal-light/20 p-3 rounded-full text-teal hover:bg-teal hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-teal-light/20 p-3 rounded-full text-teal hover:bg-teal hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-teal-light/20 p-3 rounded-full text-teal hover:bg-teal hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
