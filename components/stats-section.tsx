export function StatsSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">1,000+</p>
          <p className="text-muted-foreground">Job Seekers</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">500+</p>
          <p className="text-muted-foreground">Employers</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">2,500+</p>
          <p className="text-muted-foreground">Jobs Posted</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">75%</p>
          <p className="text-muted-foreground">Success Rate</p>
        </div>
      </div>
    </section>
  )
}
