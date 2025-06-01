"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Award, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with a supportive community of individuals on similar journeys to employment success.",
  },
  {
    icon: Target,
    title: "Targeted Job Matching",
    description:
      "Our AI-powered system matches candidates with employers who value second chances and diverse backgrounds.",
  },
  {
    icon: Award,
    title: "Skills Development",
    description:
      "Access comprehensive training programs designed to build job-ready skills and professional confidence.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Ongoing support and mentorship to help you advance in your career and achieve long-term success.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Empowering Second Chances</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides the tools, support, and opportunities needed to bridge the gap from hope
            to hire.
          </p>
        </div>

        {/* Fixed grid layout with explicit classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
