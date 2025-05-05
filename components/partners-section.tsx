import Image from "next/image"

export function PartnersSection() {
  const partners = [
    { name: "Forbes", logo: "/forbes-logo.png" },
    { name: "TechCrunch", logo: "/techcrunch-logo.png" },
    { name: "NPR", logo: "/npr-logo.png" },
    { name: "Wall Street Journal", logo: "/wsj-logo.png" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Featured In</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={40}
                className="h-auto w-auto max-h-10 object-contain"
                sizes="(max-width: 768px) 100px, 120px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
