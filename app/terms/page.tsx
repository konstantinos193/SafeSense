import Link from "next/link"
import { Shield, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span>SafeSense</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link href="/features" className="px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/insurance" className="px-3 py-2 text-sm font-medium">
                Insurance
              </Link>
              <Link href="/pricing" className="px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/faq" className="px-3 py-2 text-sm font-medium">
                FAQ
              </Link>
              <Link href="/#contact" className="px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
          <div className="md:hidden">
            <Button asChild>
              <Link href="/get-coverage">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-8 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Terms of Service
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Last updated: March 1, 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-24">
          <div className="container px-4">
            <div className="flex flex-col gap-8">
              <div className="md:hidden">
                <Tabs defaultValue="toc">
                  <TabsList className="w-full">
                    <TabsTrigger value="toc" className="flex-1">Contents</TabsTrigger>
                    <TabsTrigger value="terms" className="flex-1">Terms</TabsTrigger>
                  </TabsList>
                  <TabsContent value="toc">
                    <div className="p-4 bg-background rounded-lg border">
                      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                      <nav className="space-y-2">
                        {[
                          "Introduction",
                          "Definitions",
                          "Account Registration",
                          "Services",
                          "Payments",
                          "Smart Contracts",
                          "User Obligations",
                          "Intellectual Property",
                          "Disclaimers",
                          "Limitation of Liability",
                          "Indemnification",
                          "Termination",
                          "Governing Law",
                          "Changes to Terms",
                          "Contact Us"
                        ].map((item, index) => (
                          <a 
                            key={index}
                            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {`${index + 1}. ${item}`}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </TabsContent>
                  <TabsContent value="terms">
                    <div className="prose prose-sm max-w-none">
                      {sections.map((section, index) => (
                        <section 
                          key={index}
                          id={section.id}
                          className="mb-6 p-4 bg-background rounded-lg border"
                        >
                          <h2 className="text-xl font-bold mb-3">
                            {`${index + 1}. ${section.title}`}
                          </h2>
                          {section.content}
                        </section>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="hidden md:flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <div className="sticky top-24 p-6 bg-background rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {[
                        "Introduction",
                        "Definitions",
                        "Account Registration",
                        "Services",
                        "Payments",
                        "Smart Contracts",
                        "User Obligations",
                        "Intellectual Property",
                        "Disclaimers",
                        "Limitation of Liability",
                        "Indemnification",
                        "Termination",
                        "Governing Law",
                        "Changes to Terms",
                        "Contact Us"
                      ].map((item, index) => (
                        <a 
                          key={index}
                          href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {`${index + 1}. ${item}`}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                
                <div className="md:w-3/4">
                  <div className="prose prose-lg max-w-none">
                    {sections.map((section, index) => (
                      <section 
                        key={index}
                        id={section.id}
                        className="mb-12 p-6 bg-background rounded-lg border"
                      >
                        <h2 className="text-2xl font-bold mb-4">
                          {`${index + 1}. ${section.title}`}
                        </h2>
                        {section.content}
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2 items-center text-lg font-bold">
            <Shield className="h-5 w-5" />
            <span>SafeSense</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 SafeSense. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-primary underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>Welcome to SafeSense ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at <Link href="/" className="text-primary hover:underline">www.safesense.com</Link> (together or individually "Service") operated by SafeSense.</p>
        <p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it <Link href="/privacy" className="text-primary hover:underline">here</Link>.</p>
        <p>Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood Agreements, and agree to be bound by them.</p>
        <p>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <Link href="mailto:support@safesense.com" className="text-primary hover:underline">support@safesense.com</Link> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
      </>
    )
  },
  {
    id: "definitions",
    title: "Definitions",
    content: (
      <>
        <p>For the purposes of these Terms of Service:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Service</strong> refers to the Website.</li>
          <li><strong>Website</strong> refers to SafeSense, accessible from <Link href="/" className="text-primary hover:underline">www.safesense.com</Link></li>
          <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
          <li><strong>Smart Contract</strong> refers to self-executing contracts with the terms of the agreement directly written into code that runs on the blockchain.</li>
          <li><strong>Blockchain</strong> refers to a distributed ledger technology that maintains a growing list of records, called blocks, that are linked using cryptography.</li>
          <li><strong>Cryptocurrency</strong> refers to a digital currency in which encryption techniques are used to regulate the generation of units of currency and verify the transfer of funds, operating independently of a central bank.</li>
          <li><strong>Insurance Policy</strong> refers to the smart contract that defines the terms, conditions, and coverage details of the insurance agreement between you and SafeSense.</li>
          <li><strong>Premium</strong> refers to the amount paid by you to maintain your insurance coverage.</li>
          <li><strong>Claim</strong> refers to a formal request by you to SafeSense for coverage or compensation for a covered loss under an insurance policy.</li>
        </ul>
      </>
    )
  },
  {
    id: "account",
    title: "Account Registration",
    content: (
      <>
        <p>When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</p>
        <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
        <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</p>
        <p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.</p>
      </>
    )
  },
  {
    id: "services",
    title: "Services",
    content: (
      <>
        <p>SafeSense provides blockchain-based insurance services for various types of assets, including but not limited to cryptocurrency, vehicles, homes, health, travel, and business assets. Our services include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Creation and management of insurance policies as smart contracts on the blockchain</li>
          <li>Processing of insurance claims through automated and manual verification processes</li>
          <li>Collection of premiums and disbursement of claim payments</li>
          <li>Risk assessment and premium calculation</li>
          <li>Customer support related to insurance policies and claims</li>
        </ul>
        <p>The specific terms, conditions, coverage details, exclusions, and limitations of each insurance policy are defined in the respective smart contract and policy documentation provided to you upon purchase. You are responsible for reviewing and understanding these terms before purchasing any insurance policy.</p>
      </>
    )
  },
  {
    id: "payments",
    title: "Payments",
    content: (
      <>
        <p>You agree to pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. We accept payments in both traditional currencies and cryptocurrencies as specified on our website.</p>
        <p><strong>Cryptocurrency Payments:</strong> When making payments in cryptocurrency, you are responsible for ensuring that the correct amount is sent to the correct wallet address provided by SafeSense. We are not responsible for funds sent to incorrect addresses or for transaction fees charged by the respective blockchain network.</p>
        <p><strong>Traditional Currency Payments:</strong> For payments made using credit cards, debit cards, or bank transfers, you represent and warrant that: (i) the information you provide is accurate and complete; (ii) you are authorized to use the payment method; and (iii) you will notify us of changes to the payment information.</p>
        <p><strong>Premium Payments:</strong> Insurance premiums must be paid according to the schedule specified in your policy. Failure to make timely premium payments may result in the suspension or termination of your insurance coverage as specified in your policy terms.</p>
        <p><strong>Refunds:</strong> Refund policies vary by insurance type and are specified in the respective policy documentation. Generally, refunds are available within the first 30 days of policy purchase if no claims have been made, subject to the specific terms of your policy.</p>
      </>
    )
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    content: (
      <>
        <p>Our insurance policies are implemented as smart contracts on the blockchain. By purchasing a policy, you acknowledge and agree to the following:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Smart contracts execute automatically based on predefined conditions and cannot be modified once deployed, except through mechanisms explicitly defined in the contract itself.</li>
          <li>You are responsible for reviewing and understanding the code and terms of the smart contract before agreeing to it.</li>
          <li>The execution of smart contracts depends on the proper functioning of the underlying blockchain network, which is beyond our control.</li>
          <li>In case of disputes regarding the interpretation or execution of a smart contract, the human-readable policy documentation provided to you will be used as the authoritative reference.</li>
          <li>We reserve the right to upgrade or modify smart contracts when necessary, following the procedures specified in the contract itself, to address bugs, security vulnerabilities, or regulatory requirements.</li>
        </ul>
      </>
    )
  },
  {
    id: "user-obligations",
    title: "User Obligations",
    content: (
      <>
        <p>By using our Service, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate and complete information when applying for insurance policies or filing claims.</li>
          <li>Not engage in any fraudulent activity, including but not limited to filing false claims or misrepresenting information.</li>
          <li>Comply with all applicable laws and regulations related to insurance, cryptocurrency, and financial transactions.</li>
          <li>Maintain the security of your account credentials and private keys.</li>
          <li>Promptly notify us of any unauthorized use of your account or any other breach of security.</li>
          <li>Not use our Service for any illegal or unauthorized purpose.</li>
          <li>Not attempt to reverse-engineer, decompile, or otherwise attempt to extract the source code of our software.</li>
        </ul>
      </>
    )
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>Service and its original content (excluding content provided by users), features and functionality are and will remain the exclusive property of SafeSense and its licensors. Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SafeSense.</p>
        <p>The smart contracts and other software components of our Service are proprietary and confidential. You may not copy, modify, distribute, sell, or lease any part of our Service or included software, nor may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit these restrictions or you have our written permission.</p>
      </>
    )
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <>
        <p>Your use of Service is at your sole risk. Service is provided on an "AS IS" and "AS AVAILABLE" basis. Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
        <p>SafeSense, its subsidiaries, affiliates, and its licensors do not warrant that:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Service will function uninterrupted, secure or available at any particular time or location;</li>
          <li>Any errors or defects will be corrected;</li>
          <li>Service is free of viruses or other harmful components;</li>
          <li>The results of using Service will meet your requirements;</li>
          <li>The blockchain networks on which our smart contracts operate will function without interruption or error;</li>
          <li>Data oracles and other external data sources used by our smart contracts will always provide accurate information.</li>
        </ul>
        <p>This disclaimer of warranty does not limit or exclude any warranties that cannot be limited or excluded under applicable law.</p>
      </>
    )
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: (
      <>
        <p>Except as prohibited by law, you will hold us and our officers, directors, employees, and agents harmless for any indirect, punitive, special, incidental, or consequential damage, however it arises (including attorneys' fees and all related costs and expenses of litigation and arbitration, or at trial or on appeal, if any, whether or not litigation or arbitration is instituted), whether in an action of contract, negligence, or other tortious action, or arising out of or in connection with this agreement, including without limitation any claim for personal injury or property damage, arising from this agreement and any violation by you of any federal, state, or local laws, statutes, rules, or regulations, even if company has been previously advised of the possibility of such damage.</p>
        <p>Except as prohibited by law, if there is liability found on the part of company, it will be limited to the amount paid for the products and/or services, and under no circumstances will there be consequential or punitive damages. Some states do not allow the exclusion or limitation of punitive, incidental or consequential damages, so the prior limitation or exclusion may not apply to you.</p>
        <p>We are specifically not liable for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Losses resulting from the failure of blockchain networks or smart contracts;</li>
          <li>Losses of cryptocurrency due to wallet hacks, phishing attacks, or other security breaches not directly related to our Service;</li>
          <li>Losses resulting from your failure to maintain the security of your private keys or account credentials;</li>
          <li>Losses resulting from inaccurate data provided by external data sources or oracles;</li>
          <li>Fluctuations in cryptocurrency value that may affect the value of premiums paid or claims received.</li>
        </ul>
      </>
    )
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <>
        <p>You agree to defend, indemnify and hold harmless SafeSense and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your use and access of Service, by you or any person using your account and password;</li>
          <li>A breach of these Terms;</li>
          <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right;</li>
          <li>Any claim that your content caused damage to a third party;</li>
          <li>Any fraudulent claims or misrepresentations made by you;</li>
          <li>Your violation of any law, rule, or regulation.</li>
        </ul>
      </>
    )
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</p>
        <p>If you wish to terminate your account, you may simply discontinue using Service or contact us to request account deletion.</p>
        <p>All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
        <p>Termination of your account does not automatically terminate your insurance policies. The terms for policy cancellation are specified in each policy's documentation. Generally, you may cancel a policy at any time, subject to the refund terms specified in the policy.</p>
      </>
    )
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <>
        <p>These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.</p>
        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</p>
      </>
    )
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: (
      <>
        <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</p>
      </>
    )
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>By email: <Link href="mailto:legal@safesense.com" className="text-primary hover:underline">legal@safesense.com</Link></li>
          <li>By visiting this page on our website: <Link href="/contact" className="text-primary hover:underline">www.safesense.com/contact</Link></li>
          <li>By mail: 123 Blockchain Avenue, Innovation City, DE 19901, United States</li>
        </ul>
      </>
    )
  }
];
