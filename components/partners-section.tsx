export function PartnersSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Partners</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          We work with leading organizations committed to supporting second chances.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="h-20 bg-muted/30 rounded flex items-center justify-center">
          <span className="text-muted-foreground">Partner 1</span>
        </div>
        <div className="h-20 bg-muted/30 rounded flex items-center justify-center">
          <span className="text-muted-foreground">Partner 2</span>
        </div>
        <div className="h-20 bg-muted/30 rounded flex items-center justify-center">
          <span className="text-muted-foreground">Partner 3</span>
        </div>
        <div className="h-20 bg-muted/30 rounded flex items-center justify-center">
          <span className="text-muted-foreground">Partner 4</span>
        </div>
      </div>
    </section>
  )
}
