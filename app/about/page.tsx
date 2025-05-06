import Image from "next/image"
import { ensureAbsoluteUrl } from "@/lib/image-url"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Executive Director",
      bio: "With over 15 years of experience in workforce development and social services, Dr. Johnson founded Hope and Hire to address the employment gap for individuals seeking second chances.",
      image: "/team-member-1.jpg",
    },
    {
      name: "Marcus Chen",
      role: "Director of Employer Relations",
      bio: "Marcus builds partnerships with employers committed to inclusive hiring practices, creating pathways to meaningful employment for our program participants.",
      image: "/stylized-letters-mc.png",
    },
    {
      name: "Danielle Rodriguez",
      role: "Career Services Manager",
      bio: "Danielle oversees our resume building, interview preparation, and job placement services, ensuring participants receive comprehensive support.",
      image: "/stylized-letters-dr.png",
    },
    {
      name: "James Wilson",
      role: "Skills Development Coordinator",
      bio: "James designs and implements our skills training programs, focusing on both technical and soft skills essential for workplace success.",
      image: "/stylized-letters-jw.png",
    },
    {
      name: "Emily Roberts",
      role: "Volunteer Coordinator",
      bio: "Emily recruits, trains, and manages our network of volunteer mentors and coaches who provide personalized support to program participants.",
      image: "/stylized-letters-er.png",
    },
    {
      name: "David Carter",
      role: "Community Outreach Specialist",
      bio: "David builds relationships with community organizations and social service agencies to connect individuals with our employment services.",
      image: "/stylized-letters-dc.png",
    },
  ]

  return (
    <main className="py-12">
      <section className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl font-bold text-center mb-12">About Hope and Hire</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Hope and Hire is dedicated to empowering individuals seeking second chances through comprehensive
              employment services, skills development, and supportive community connections.
            </p>
            <p className="text-gray-700 mb-4">
              We believe that meaningful employment is a pathway to stability, dignity, and personal growth. Our
              programs bridge the gap between hope and opportunity, connecting motivated job seekers with employers
              committed to inclusive hiring practices.
            </p>
            <p className="text-gray-700">
              Through personalized support, skills training, and community partnerships, we create sustainable pathways
              to employment success.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={ensureAbsoluteUrl("/diverse-professionals-meeting.png") || "/placeholder.svg"}
              alt="Diverse professionals in a meeting"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 flex justify-center">
            <Image
              src={ensureAbsoluteUrl("/organization-meeting.png") || "/placeholder.svg"}
              alt="Organization team meeting"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              We take a holistic, person-centered approach to employment services, recognizing that each individual
              brings unique strengths, challenges, and goals to their job search.
            </p>
            <p className="text-gray-700 mb-4">
              Our comprehensive services include resume building, interview preparation, skills development, job
              placement assistance, and ongoing support after employment.
            </p>
            <p className="text-gray-700">
              We collaborate with employers, community organizations, and volunteers to create a supportive ecosystem
              that fosters employment success and career growth.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <Image
                    src={ensureAbsoluteUrl(member.image) || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                <p className="text-teal-600 text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
            <h3 className="text-xl font-semibold mb-3">Dignity & Respect</h3>
            <p className="text-gray-700">
              We honor the inherent worth and potential of every individual, treating all with respect and dignity
              regardless of background or circumstances.
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
            <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
            <p className="text-gray-700">
              We believe in equipping individuals with the tools, skills, and confidence to achieve their employment
              goals and build sustainable careers.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-700">
              We foster a supportive community of job seekers, employers, volunteers, and partners working together to
              create pathways to employment.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold mb-3">Growth</h3>
            <p className="text-gray-700">
              We embrace continuous learning and development, supporting individuals in their journey of personal and
              professional growth.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold mb-3">Inclusion</h3>
            <p className="text-gray-700">
              We champion inclusive workplaces and practices that recognize the value of diverse perspectives,
              experiences, and backgrounds.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="text-xl font-semibold mb-3">Accountability</h3>
            <p className="text-gray-700">
              We hold ourselves accountable for delivering high-quality services and measuring our impact through
              meaningful outcomes.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
