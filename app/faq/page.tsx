import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="job-seekers">Job Seekers</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="employers">Employers</TabsTrigger>
            </TabsList>

            {/* Getting Started */}
            <TabsContent value="getting-started" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-hopeandhire">
                  <AccordionTrigger>What is HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    HopeAndHire is a workforce readiness platform dedicated to helping formerly incarcerated individuals
                    transition into meaningful employment. We connect job seekers with recruiters, career mentors, and
                    employers through resume assistance, mock interviews, and job placement services.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-is-hopeandhire-for">
                  <AccordionTrigger>Who is HopeAndHire for?</AccordionTrigger>
                  <AccordionContent>
                    <p>HopeAndHire serves:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Job seekers transitioning out of incarceration</li>
                      <li>Organizations (nonprofits, case managers, reentry programs) supporting these individuals</li>
                      <li>Volunteers (recruiters, HR professionals, career coaches) who want to help</li>
                      <li>Employers looking to hire second-chance candidates</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-does-hopeandhire-work">
                  <AccordionTrigger>How does HopeAndHire work?</AccordionTrigger>
                  <AccordionContent>
                    Organizations submit requests on behalf of job seekers for resume reviews, mock interviews, and job
                    placement support. Volunteers pick up those tasks, and employers can post jobs focused on
                    second-chance hiring.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="help-undocumented">
                  <AccordionTrigger>Will HopeAndHire help someone who is undocumented?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Our goal is to help people find work, regardless of immigration status. We don't verify work
                    eligibility — that decision rests with the employer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="not-incarcerated">
                  <AccordionTrigger>What if someone who hasn't been incarcerated asks for help?</AccordionTrigger>
                  <AccordionContent>
                    While our mission focuses on supporting justice-impacted individuals, we would never turn away
                    someone who genuinely asks for help. Everyone deserves a second chance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Job Seekers */}
            <TabsContent value="job-seekers" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sign-up-directly">
                  <AccordionTrigger>Can I sign up directly as a job seeker?</AccordionTrigger>
                  <AccordionContent>
                    At this time, HopeAndHire works through partner organizations (nonprofits, case managers, or reentry
                    programs). If you're looking for career support, we recommend reaching out to one of our partners.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="types-of-jobs">
                  <AccordionTrigger>What types of jobs are available?</AccordionTrigger>
                  <AccordionContent>
                    <p>We work with employers committed to second-chance hiring in fields such as:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Construction</li>
                      <li>Logistics</li>
                      <li>Customer service</li>
                      <li>Manufacturing</li>
                      <li>Technology</li>
                      <li>Healthcare</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="get-help-resume">
                  <AccordionTrigger>How do I get help with my resume and job search?</AccordionTrigger>
                  <AccordionContent>
                    Just ask your case manager or nonprofit partner to request resume help, interview coaching, or job
                    placement support for you through our platform. We'll take it from there.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Organizations */}
            <TabsContent value="organizations" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="org-use-hopeandhire">
                  <AccordionTrigger>How can my organization use HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    <p>Organizations can:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        Create an account to submit requests for job seekers needing resume reviews, interview prep, or
                        job placement
                      </li>
                      <li>Track progress on resume completion, mock interviews, and job placements in real time</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cost-for-orgs">
                  <AccordionTrigger>Is there a cost for organizations to use HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    Nope—our core services are entirely free for reentry programs and nonprofits. We may offer premium
                    features in the future, like advanced training resources.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="track-progress">
                  <AccordionTrigger>Can I track a client's progress?</AccordionTrigger>
                  <AccordionContent>
                    You'll be able to monitor each step, from resume and mock interview completion to job placements,
                    through your organization dashboard.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Volunteers */}
            <TabsContent value="volunteers" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-to-volunteer">
                  <AccordionTrigger>How can I volunteer with HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    You can sign up using your LinkedIn account and start picking up tasks like resume reviews, mock
                    interviews, or career coaching sessions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ways-to-help">
                  <AccordionTrigger>What are the different ways I can help?</AccordionTrigger>
                  <AccordionContent>
                    <p>Volunteers can contribute through:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Resume & Cover Letter Assistance</strong> – Help job seekers stand out on paper
                      </li>
                      <li>
                        <strong>Mock Interviews</strong> – Conduct practice sessions and provide feedback
                      </li>
                      <li>
                        <strong>Career Mentorship</strong> – Offer insight on career paths and skill development
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="time-commitment">
                  <AccordionTrigger>How much time do I need to commit?</AccordionTrigger>
                  <AccordionContent>
                    As much or as little as you want. Some volunteers help once a month, while others help weekly. You
                    choose what works for you.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recognition">
                  <AccordionTrigger>Will I get recognition for my contributions?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Our volunteer leaderboard showcases top contributors, and we award badges for milestones, such
                    as "Volunteer of the Month."
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Employers */}
            <TabsContent value="employers" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="hire-candidates">
                  <AccordionTrigger>How can my company hire job-ready candidates?</AccordionTrigger>
                  <AccordionContent>
                    <p>Employers can:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Create an account to post job openings and browse pre-screened candidates</li>
                      <li>Receive guidance on best practices for second-chance hiring</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="types-of-candidates">
                  <AccordionTrigger>What types of candidates are available?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      HopeAndHire supports job seekers who've completed job readiness programs and are looking for
                      part-time or full-time roles in:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Construction</li>
                      <li>Hospitality</li>
                      <li>Technology</li>
                      <li>Logistics</li>
                      <li>Customer service</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tax-incentives">
                  <AccordionTrigger>
                    Are there tax incentives for hiring formerly incarcerated individuals?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! Many employers qualify for federal and state incentives, such as the Work Opportunity Tax
                    Credit (WOTC). We'll direct you to resources that can help you take advantage of these programs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="job-readiness">
                  <AccordionTrigger>How does HopeAndHire ensure job seekers are ready for employment?</AccordionTrigger>
                  <AccordionContent>
                    <p>Every candidate receives:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Resume coaching</li>
                      <li>Interview preparation</li>
                      <li>Soft skills development</li>
                    </ul>
                    <p className="mt-2">They're prepped and polished before they ever show up in your inbox.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Technical & Support Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="cost">
                <AccordionTrigger>Is there a cost associated with using HopeAndHire?</AccordionTrigger>
                <AccordionContent>
                  <p>We're here to help, not charge:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      <strong>For job seekers and nonprofits</strong> – Core services are free
                    </li>
                    <li>
                      <strong>For employers</strong> – Job postings are free; premium options may be offered later
                    </li>
                    <li>
                      <strong>For volunteers</strong> – No cost at all. Your time is your contribution
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reset-password">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  Click "Forgot Password" on the login page and follow the instructions to reset it via email.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact-support">
                <AccordionTrigger>Who do I contact for support?</AccordionTrigger>
                <AccordionContent>
                  You can reach us anytime at support@hopeandhire.org or through our Contact Us page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="other-questions">
                <AccordionTrigger>What if I have a question that's not listed here?</AccordionTrigger>
                <AccordionContent>
                  Don't worry—we've got you. Please send us a note at support@hopeandhire.org, and we'll be happy to
                  help in any way we can.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
