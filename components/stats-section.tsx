export function StatsSection() {
  const stats = [
    { value: "75%", label: "Employment Rate" },
    { value: "200+", label: "Employer Partners" },
    { value: "1,500+", label: "Jobs Secured" },
    { value: "85%", label: "Retention Rate" },
  ]

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
              <p className="text-lg text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
