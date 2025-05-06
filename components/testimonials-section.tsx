export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/50 rounded-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">What People Say</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Hear from our community of job seekers and employers.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <p className="italic mb-4">
            "Hope&Hire has been instrumental in helping me find employment opportunities. The resources and support have
            been invaluable in my journey to rebuild my life."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
            <div className="ml-3">
              <p className="font-medium">James R.</p>
              <p className="text-sm text-muted-foreground">Job Seeker</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <p className="italic mb-4">
            "As an employer, partnering with Hope&Hire has allowed us to find dedicated and talented individuals who are
            committed to making a positive change in their lives."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
            <div className="ml-3">
              <p className="font-medium">Sarah T.</p>
              <p className="text-sm text-muted-foreground">Employer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
