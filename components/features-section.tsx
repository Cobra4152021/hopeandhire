import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Building, Briefcase } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Resume Assistance",
      description: "Professional resume reviews and guidance to help candidates present their skills effectively.",
    },
    {
      icon: Users,
      title: "Interview Preparation",
      description: "Mock interviews and coaching to build confidence and improve interview skills.",
    },
    {
      icon: Building,
      title: "Employer Partnerships",
      description: "Connections with employers committed to fair chance hiring and inclusive workplaces.",
    },
    {
      icon: Briefcase,
      title: "Job Placement",
      description: "Personalized job matching to find opportunities aligned with skills and career goals.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Help</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive approach supports both job seekers and employers throughout the hiring process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
