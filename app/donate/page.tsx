import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, Users } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">
            Support Second-Chance Hiring & Workforce Reintegration
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Your donation helps returning citizens find stable jobs, build their futures, and reduce recidivism. Every
            contribution supports resume coaching, interview training, and direct job placement for individuals in need.
          </p>

          <Tabs defaultValue="one-time" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Giving</TabsTrigger>
              <TabsTrigger value="corporate">Corporate Sponsorship</TabsTrigger>
            </TabsList>

            <TabsContent value="one-time" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[25, 50, 100, 250].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          className="h-16 text-lg font-bold hover:bg-primary hover:text-white"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Or enter a custom amount:</p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="number"
                          className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Other amount"
                          min="1"
                        />
                      </div>
                    </div>

                    <Button size="lg" className="w-full">
                      Donate Now
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[10, 25, 50, 100].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          className="h-16 text-lg font-bold hover:bg-primary hover:text-white"
                        >
                          ${amount}/mo
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Or enter a custom monthly amount:</p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="number"
                          className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Other amount"
                          min="1"
                        />
                      </div>
                    </div>

                    <Button size="lg" className="w-full">
                      Become a Monthly Donor
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Cancel or modify your donation at any time</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="corporate" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <p className="text-center">
                      Corporate sponsorships provide critical support for our mission while offering visibility and
                      recognition for your company's commitment to second-chance hiring.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <h3 className="text-xl font-bold mb-2">Bronze</h3>
                          <p className="text-3xl font-bold mb-4">$1,000</p>
                          <ul className="text-sm space-y-2 mb-4">
                            <li>Logo on website</li>
                            <li>Recognition in newsletter</li>
                          </ul>
                          <Button variant="outline" className="w-full">
                            Select
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-primary">
                        <CardContent className="pt-6 text-center">
                          <h3 className="text-xl font-bold mb-2">Silver</h3>
                          <p className="text-3xl font-bold mb-4">$5,000</p>
                          <ul className="text-sm space-y-2 mb-4">
                            <li>Logo on website</li>
                            <li>Recognition in newsletter</li>
                            <li>Social media spotlight</li>
                          </ul>
                          <Button className="w-full">Select</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6 text-center">
                          <h3 className="text-xl font-bold mb-2">Gold</h3>
                          <p className="text-3xl font-bold mb-4">$10,000</p>
                          <ul className="text-sm space-y-2 mb-4">
                            <li>Logo on website</li>
                            <li>Recognition in newsletter</li>
                            <li>Social media spotlight</li>
                            <li>Featured in annual report</li>
                          </ul>
                          <Button variant="outline" className="w-full">
                            Select
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <p className="text-center text-sm">
                      For custom sponsorship packages, please{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        contact us
                      </Link>
                      .
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Join other companies making a difference</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Your Donation Makes a Difference</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold">Resume Support</h3>
                <p className="text-sm text-muted-foreground">
                  $25 provides professional resume assistance for one job seeker.
                </p>
              </div>

              <div className="space-y-2">
                <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold">Interview Training</h3>
                <p className="text-sm text-muted-foreground">
                  $50 funds a mock interview session with personalized feedback.
                </p>
              </div>

              <div className="space-y-2">
                <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="font-bold">Job Placement</h3>
                <p className="text-sm text-muted-foreground">
                  $100 supports comprehensive job placement services for one individual.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Protecting San Francisco (501c3) | EIN: 85-0565860 | All donations are tax-deductible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
