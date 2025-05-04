import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-6">General Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
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
                      <li>Job seekers transitioning out of incarceration.</li>
                      <li>Organizations (nonprofits, case managers, reentry programs) supporting these individuals.</li>
                      <li>Volunteers (recruiters, HR professionals, career coaches) who want to help.</li>
                      <li>Employers looking to hire second-chance candidates.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-does-hopeandhire-work">
                  <AccordionTrigger>How does HopeAndHire work?</AccordionTrigger>
                  <AccordionContent>
                    Organizations submit requests on behalf of job seekers for services like resume reviews, mock
                    interviews, and job matching. Volunteers claim these tasks and provide support, and employers can
                    post jobs specifically for second-chance hiring.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">For Job Seekers</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="can-i-sign-up-directly">
                  <AccordionTrigger>Can I sign up directly as a job seeker?</AccordionTrigger>
                  <AccordionContent>
                    Currently, HopeAndHire works through partner organizations (nonprofits, case managers, or reentry
                    programs). If you're looking for career support, we recommend contacting a local organization that
                    partners with us.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-types-of-jobs">
                  <AccordionTrigger>What types of jobs are available?</AccordionTrigger>
                  <AccordionContent>
                    <p>We work with employers committed to second-chance hiring in industries such as:</p>
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

                <AccordionItem value="how-do-i-get-help">
                  <AccordionTrigger>How do I get help with my resume and job search?</AccordionTrigger>
                  <AccordionContent>
                    If you are connected with a case manager or nonprofit, they can request resume assistance, mock
                    interviews, and job placement support for you through our platform.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">For Organizations</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="how-can-my-organization-use">
                  <AccordionTrigger>How can my organization use HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    <p>Organizations can:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        Create an account to submit requests for job seekers needing resume reviews, interview prep, or
                        job placement.
                      </li>
                      <li>Track progress on resume completion, mock interviews, and job placements.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="is-there-a-cost-for-organizations">
                  <AccordionTrigger>Is there a cost for organizations to use HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    No, our core services are free for reentry programs and nonprofits. We may offer premium services in
                    the future, such as advanced training resources.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="can-i-track-client-progress">
                  <AccordionTrigger>Can I track a client's progress?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Once you submit a request, you can view updates on resume completion, mock interviews, and job
                    placements through our organization dashboard.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">For Volunteers</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="how-can-i-volunteer">
                  <AccordionTrigger>How can I volunteer with HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    You can sign up using your LinkedIn account and start claiming tasks like resume reviews, mock
                    interviews, and career coaching.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-are-the-different-ways">
                  <AccordionTrigger>What are the different ways I can help?</AccordionTrigger>
                  <AccordionContent>
                    <p>Volunteers can contribute in the following ways:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        Resume & Cover Letter Assistance – Help refine job seekers' resumes and make them stand out.
                      </li>
                      <li>Mock Interviews – Conduct practice interviews and provide feedback.</li>
                      <li>Career Mentorship – Offer advice on career paths and skill development.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-much-time">
                  <AccordionTrigger>How much time do I need to commit?</AccordionTrigger>
                  <AccordionContent>
                    Volunteering is flexible! You can claim as many or as few tasks as you'd like. Some volunteers help
                    once a month, while others contribute weekly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="will-i-get-recognition">
                  <AccordionTrigger>Will I get recognition for my contributions?</AccordionTrigger>
                  <AccordionContent>
                    Yes! HopeAndHire features a leaderboard recognizing top volunteers and awards badges for milestones
                    like "Volunteer of the Month."
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">For Employers</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="how-can-my-company-hire">
                  <AccordionTrigger>How can my company hire job-ready candidates?</AccordionTrigger>
                  <AccordionContent>
                    <p>Employers can:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Create an account to post job openings and browse pre-screened candidates.</li>
                      <li>Receive guidance on best practices for second-chance hiring.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-types-of-candidates">
                  <AccordionTrigger>What types of candidates are available?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      HopeAndHire works with individuals who have completed job readiness programs and are seeking
                      full-time or part-time employment in industries such as:
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

                <AccordionItem value="are-there-tax-incentives">
                  <AccordionTrigger>
                    Are there tax incentives for hiring formerly incarcerated individuals?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! Many employers qualify for the Work Opportunity Tax Credit (WOTC) and other federal and
                    state-level incentives. We provide resources to help employers take advantage of these benefits.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-does-hopeandhire-ensure">
                  <AccordionTrigger>How does HopeAndHire ensure job seekers are ready for employment?</AccordionTrigger>
                  <AccordionContent>
                    <p>Candidates receive:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Resume coaching to craft professional, competitive resumes.</li>
                      <li>Interview training to prepare for employer conversations.</li>
                      <li>
                        Soft skills development to ensure they are job-ready before being connected with employers.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Technical & Support Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="is-there-a-cost">
                  <AccordionTrigger>Is there a cost to use HopeAndHire?</AccordionTrigger>
                  <AccordionContent>
                    <p>We are here to help:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>For job seekers and nonprofits – Core services are free.</li>
                      <li>
                        For employers – Job postings are free, but additional recruiting services may have premium
                        options in the future.
                      </li>
                      <li>For volunteers – No cost! Your time and expertise are the most valuable contributions.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-do-i-reset">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Click "Forgot Password" on the login page and follow the instructions to reset your password via
                    email.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-do-i-contact">
                  <AccordionTrigger>Who do I contact for support?</AccordionTrigger>
                  <AccordionContent>
                    For assistance, email support@hopeandhire.org or visit our Contact Us page.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
