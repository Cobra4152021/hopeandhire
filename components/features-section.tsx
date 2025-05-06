export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Features</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          We provide comprehensive resources to help both job seekers and employers.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Job Matching</h3>
          <p className="text-muted-foreground">
            Our intelligent matching system connects job seekers with employers looking for their specific skills and
            experience.
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Skills Development</h3>
          <p className="text-muted-foreground">
            Access training resources and workshops to develop the skills employers are looking for in today's job
            market.
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Employer Resources</h3>
          <p className="text-muted-foreground">
            Tools and guidance for employers to create inclusive hiring practices and support second-chance employment.
          </p>
        </div>
      </div>
    </section>
  )
}
