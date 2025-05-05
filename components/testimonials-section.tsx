import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Hope And Hire gave me the confidence and skills I needed to secure a job that values my abilities. Their support changed my life.",
      name: "Michael R.",
      role: "Warehouse Supervisor",
      image: "/confident-smile.png",
    },
    {
      quote:
        "As an employer, partnering with Hope And Hire has connected us with motivated, qualified candidates who have become valuable team members.",
      name: "Sarah J.",
      role: "HR Director",
      image: "/confident-businessman.png",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from job seekers and employers who have experienced the impact of second-chance hiring.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-primary/20">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80px, 80px"
                    priority={index === 0}
                  />
                </div>
                <blockquote className="text-xl italic">"{testimonial.quote}"</blockquote>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
