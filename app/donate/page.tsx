'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Heart } from 'lucide-react';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>('50');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleAmountChange = (value: string) => {
    setDonationAmount(value);
    if (value !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setDonationAmount('custom');
    }
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
      <section className="bg-yellow-light/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-text">
              Support Our Mission
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Your donation helps us create pathways to employment for
              individuals seeking second chances. Together, we can build
              stronger communities through meaningful work.
            </p>
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-yellow" />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              {isSubmitted ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center p-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-dark-text">
                        Thank You for Your Donation!
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Your generous contribution will help us continue our
                        mission of connecting individuals with meaningful
                        employment opportunities.
                      </p>
                      <p className="text-gray-600 mb-6">
                        A receipt has been sent to your email address. Thank you
                        for your support!
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-teal text-white hover:bg-teal-dark"
                      >
                        Make Another Donation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Make a Donation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      defaultValue="one-time"
                      onValueChange={(value) => setDonationAmount(value)}
                    >
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="one-time">One-Time</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>

                      <TabsContent value="one-time">
                        <form
                          onSubmit={handleDonationSubmit}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <Label>Select Donation Amount</Label>
                            <RadioGroup
                              value={donationAmount}
                              onValueChange={handleAmountChange}
                              className="grid grid-cols-3 gap-4"
                            >
                              {['25', '50', '100', '250', '500', 'custom'].map(
                                (amount) => (
                                  <div
                                    key={amount}
                                    className="flex items-center"
                                  >
                                    <RadioGroupItem
                                      value={amount}
                                      id={`amount-${amount}`}
                                      className="peer sr-only"
                                    />
                                  <Label
                                    htmlFor={`amount-${amount}`}
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal [&:has([data-state=checked])]:border-teal"
                                  >
                                      {amount === 'custom' ? (
                                        'Custom'
                                      ) : (
                                        <span>${amount}</span>
                                      )}
                                  </Label>
                                </div>
                                )
                              )}
                            </RadioGroup>

                            {donationAmount === 'custom' && (
                              <div className="mt-4">
                                <Label htmlFor="customAmount">
                                  Enter Custom Amount
                                </Label>
                                <div className="relative mt-1">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500">$</span>
                                  </div>
                                  <Input
                                    id="customAmount"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    className="pl-7"
                                    placeholder="Enter amount"
                                    required={donationAmount === 'custom'}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" required />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" required />
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button
                              type="submit"
                              className="w-full bg-teal text-white hover:bg-teal-dark"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? 'Processing...'
                                : `Donate $${donationAmount === 'custom' ? customAmount : donationAmount}`}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>

                      <TabsContent value="monthly">
                        <form
                          onSubmit={handleDonationSubmit}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <Label>Select Monthly Donation Amount</Label>
                            <RadioGroup
                              value={donationAmount}
                              onValueChange={handleAmountChange}
                              className="grid grid-cols-3 gap-4"
                            >
                              {['10', '25', '50', '100', '200', 'custom'].map(
                                (amount) => (
                                  <div
                                    key={amount}
                                    className="flex items-center"
                                  >
                                    <RadioGroupItem
                                      value={amount}
                                      id={`monthly-${amount}`}
                                      className="peer sr-only"
                                    />
                                  <Label
                                    htmlFor={`monthly-${amount}`}
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal [&:has([data-state=checked])]:border-teal"
                                  >
                                      {amount === 'custom' ? (
                                        'Custom'
                                      ) : (
                                        <span>${amount}</span>
                                      )}
                                  </Label>
                                </div>
                                )
                              )}
                            </RadioGroup>

                            {donationAmount === 'custom' && (
                              <div className="mt-4">
                                <Label htmlFor="customAmount">
                                  Enter Custom Amount
                                </Label>
                                <div className="relative mt-1">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500">$</span>
                                  </div>
                                  <Input
                                    id="customAmount"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    className="pl-7"
                                    placeholder="Enter amount"
                                    required={donationAmount === 'custom'}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" required />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" required />
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button
                              type="submit"
                              className="w-full bg-teal text-white hover:bg-teal-dark"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? 'Processing...'
                                : `Donate $${donationAmount === 'custom' ? customAmount : donationAmount}`}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
