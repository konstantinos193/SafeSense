import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span>SafeSense</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
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
              <Button asChild>
                <Link href="/get-coverage">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Privacy Policy
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                  Last updated: March 1, 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="sticky top-24 p-6 bg-background rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {[
                      "Introduction",
                      "Information Collection",
                      "Use of Data",
                      "Blockchain Data",
                      "Data Sharing",
                      "Data Security",
                      "Data Retention",
                      "Your Rights",
                      "Cookies",
                      "Analytics",
                      "Children's Privacy",
                      "International Transfers",
                      "Changes to Policy",
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
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-primary underline-offset-4 hover:underline">
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
        <p>SafeSense ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link href="/" className="text-primary hover:underline">www.safesense.com</Link> and use our blockchain-based insurance services (collectively, the "Service").</p>
        <p>
          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy
          Policy, please do not access the Service. By accessing or using our Service, you consent to the
          collection, use, and sharing of your information as described in this Privacy Policy.
        </p>
        <p>
          We reserve the right to make changes to this Privacy Policy at any time and for any reason. We
          will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You
          are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be
          deemed to have been made aware of, will be subject to, and will be deemed to have accepted the
          changes in any revised Privacy Policy by your continued use of the Service after the date such
          revised Privacy Policy is posted.
        </p>
      </>
    )
  },
  {
    id: "information-collection",
    title: "Information Collection",
    content: (
      <>
        <p>We collect information about you in various ways when you use our Service. This information may include:</p>

        <h3 className="text-xl font-semibold mt-4">Personal Data</h3>
        <p>
          Personally identifiable information that you voluntarily provide to us when registering for an
          account, purchasing insurance policies, or otherwise using our Service ("Personal Data"). Personal
          Data may include, but is not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contact information (name, email address, phone number, mailing address)</li>
          <li>Account credentials (username, password)</li>
          <li>
            Payment information (credit card details, bank account information, cryptocurrency wallet
            addresses)
          </li>
          <li>Identity verification information (date of birth, government-issued identification)</li>
          <li>
            Insurance-specific information (details about assets to be insured, risk factors, claims
            history)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Derivative Data</h3>
        <p>
          Information our servers automatically collect when you access the Service, such as your IP
          address, browser type, operating system, access times, and the pages you have viewed directly
          before and after accessing the Service. This information is primarily needed to maintain the
          security and operation of our Service, and for our internal analytics and reporting purposes.
        </p>

        <h3 className="text-xl font-semibold mt-4">Financial Data</h3>
        <p>
          Financial information, such as data related to your payment method (e.g., valid credit card
          number, card brand, expiration date) that we may collect when you purchase insurance through our
          Service. We store only very limited, if any, financial information that we collect. Otherwise, all
          financial information is stored by our payment processors, and you are encouraged to review their
          privacy policies and contact them directly for responses to your questions.
        </p>

        <h3 className="text-xl font-semibold mt-4">Blockchain Data</h3>
        <p>
          When you interact with our blockchain-based insurance services, we collect information related to
          your blockchain transactions, including wallet addresses, transaction hashes, and smart contract
          interactions. This information is inherently public on the blockchain and is necessary for the
          operation of our insurance services.
        </p>

        <h3 className="text-xl font-semibold mt-4">Mobile Device Data</h3>
        <p>
          Device information from your mobile device such as your device ID, model, manufacturer, and
          information about the location of your device if you access the Service from a mobile device.
        </p>

        <h3 className="text-xl font-semibold mt-4">Third-Party Data</h3>
        <p>
          Information from third parties, such as personal information or network friends, if you connect
          your account to the third party and grant the Service permission to access this information.
        </p>
      </>
    )
  },
  {
    id: "use-of-data",
    title: "Use of Data",
    content: (
      <>
        <p>We use the information we collect for various purposes, including to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and manage your account</li>
          <li>Provide, operate, and maintain our Service</li>
          <li>Process insurance applications and underwrite policies</li>
          <li>Verify your identity for regulatory compliance (KYC/AML)</li>
          <li>Process and manage insurance claims</li>
          <li>Process payments and prevent fraudulent transactions</li>
          <li>Send administrative information, such as policy updates and service changes</li>
          <li>Respond to customer service requests and support needs</li>
          <li>Personalize your experience and deliver content relevant to your interests</li>
          <li>Monitor and analyze usage and trends to improve the Service</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you about updates, security alerts, and promotional offers (with your consent
            where required by law)
          </li>
          <li>Prevent fraudulent activities and enforce our terms of service</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    )
  },
  {
    id: "blockchain-data",
    title: "Blockchain Data",
    content: (
      <>
        <p>
          Our Service utilizes blockchain technology to provide transparent and secure insurance services.
          It's important to understand the following aspects of blockchain data:
        </p>

        <h3 className="text-xl font-semibold mt-4">Public Nature of Blockchain</h3>
        <p>
          Blockchain networks are inherently public and transparent. When you interact with our
          blockchain-based insurance services, certain information such as wallet addresses, transaction
          amounts, and smart contract interactions are recorded on the blockchain and are publicly visible.
        </p>

        <h3 className="text-xl font-semibold mt-4">Immutability</h3>
        <p>
          Data recorded on the blockchain is immutable, meaning it cannot be altered or deleted. This
          includes transaction records and smart contract interactions related to your insurance policies.
        </p>

        <h3 className="text-xl font-semibold mt-4">Pseudonymity</h3>
        <p>
          While blockchain transactions are public, they are pseudonymous by default. Your personal identity
          is not directly linked to your blockchain transactions unless you have taken actions that connect
          your identity to your wallet address.
        </p>

        <h3 className="text-xl font-semibold mt-4">Off-Chain Data</h3>
        <p>
          To protect your privacy, we store sensitive personal information off-chain in secure, encrypted
          databases. Only necessary data for the execution of smart contracts is stored on the blockchain.
        </p>

        <h3 className="text-xl font-semibold mt-4">Zero-Knowledge Proofs</h3>
        <p>
          For certain types of insurance that require sensitive information, we may utilize zero-knowledge
          proof technology to verify information without revealing the underlying data on the blockchain.
        </p>
      </>
    )
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content: (
      <>
        <p>We may share your information in the following situations:</p>

        <h3 className="text-xl font-semibold mt-4">Third-Party Service Providers</h3>
        <p>
          We may share your information with third-party vendors, service providers, contractors, or agents
          who perform services for us or on our behalf and require access to such information to do that
          work. Examples include payment processing, data analysis, email delivery, hosting services,
          customer service, and marketing efforts.
        </p>

        <h3 className="text-xl font-semibold mt-4">Business Transfers</h3>
        <p>
          We may share or transfer your information in connection with, or during negotiations of, any
          merger, sale of company assets, financing, or acquisition of all or a portion of our business to
          another company.
        </p>

        <h3 className="text-xl font-semibold mt-4">Affiliates</h3>
        <p>
          We may share your information with our affiliates, in which case we will require those affiliates
          to honor this Privacy Policy.
        </p>

        <h3 className="text-xl font-semibold mt-4">Business Partners</h3>
        <p>
          We may share your information with our business partners to offer you certain products, services,
          or promotions.
        </p>

        <h3 className="text-xl font-semibold mt-4">With Your Consent</h3>
        <p>We may disclose your personal information for any other purpose with your consent.</p>

        <h3 className="text-xl font-semibold mt-4">Legal Requirements</h3>
        <p>
          We may disclose your information where we are legally required to do so in order to comply with
          applicable law, governmental requests, a judicial proceeding, court order, or legal process, such
          as in response to a court order or a subpoena (including in response to public authorities to meet
          national security or law enforcement requirements).
        </p>

        <h3 className="text-xl font-semibold mt-4">Vital Interests and Legal Rights</h3>
        <p>
          We may disclose your information where we believe it is necessary to investigate, prevent, or take
          action regarding potential violations of our policies, suspected fraud, situations involving
          potential threats to the safety of any person and illegal activities, or as evidence in litigation
          in which we are involved.
        </p>
      </>
    )
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect
          the security of any personal information we process. However, despite our safeguards and efforts
          to secure your information, no electronic transmission over the Internet or information storage
          technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able to defeat our security, and
          improperly collect, access, steal, or modify your information.
        </p>

        <p>We employ the following security measures:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Encryption of sensitive data both in transit and at rest</li>
          <li>Multi-factor authentication for account access</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Secure smart contract development practices and code audits</li>
          <li>Cold storage for cryptocurrency assets</li>
          <li>Regular security training for our staff</li>
          <li>Access controls and logging for all systems containing personal data</li>
        </ul>
      </>
    )
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set
          out in this Privacy Policy, unless a longer retention period is required or permitted by law (such
          as tax, accounting, or other legal requirements).
        </p>
        <p>
          When we have no ongoing legitimate business need to process your personal information, we will
          either delete or anonymize such information, or, if this is not possible (for example, because
          your personal information has been stored in backup archives), then we will securely store your
          personal information and isolate it from any further processing until deletion is possible.
        </p>
        <p>
          Please note that data stored on the blockchain is immutable and cannot be deleted. This includes
          transaction records and smart contract interactions related to your insurance policies.
        </p>
      </>
    )
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>Depending on your location, you may have certain rights regarding your personal information:</p>

        <h3 className="text-xl font-semibold mt-4">Access</h3>
        <p>
          You have the right to request copies of your personal information. We may charge you a small fee
          for this service.
        </p>

        <h3 className="text-xl font-semibold mt-4">Rectification</h3>
        <p>
          You have the right to request that we correct any information you believe is inaccurate. You also
          have the right to request that we complete information you believe is incomplete.
        </p>

        <h3 className="text-xl font-semibold mt-4">Erasure</h3>
        <p>
          You have the right to request that we erase your personal information, under certain conditions.
          Please note that this right does not apply to data stored on the blockchain, which is immutable by
          nature.
        </p>

        <h3 className="text-xl font-semibold mt-4">Restrict Processing</h3>
        <p>
          You have the right to request that we restrict the processing of your personal information, under
          certain conditions.
        </p>

        <h3 className="text-xl font-semibold mt-4">Object to Processing</h3>
        <p>
          You have the right to object to our processing of your personal information, under certain
          conditions.
        </p>

        <h3 className="text-xl font-semibold mt-4">Data Portability</h3>
        <p>
          You have the right to request that we transfer the data that we have collected to another
          organization, or directly to you, under certain conditions.
        </p>

        <h3 className="text-xl font-semibold mt-4">Exercising Your Rights</h3>
        <p>
          If you would like to exercise any of these rights, please contact us using the contact information
          provided at the end of this Privacy Policy. We will respond to your request within a reasonable
          timeframe.
        </p>
      </>
    )
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          We use cookies and similar tracking technologies to track the activity on our Service and hold
          certain information.
        </p>
        <p>
          Cookies are files with a small amount of data which may include an anonymous unique identifier.
          Cookies are sent to your browser from a website and stored on your device. Other tracking
          technologies are also used such as beacons, tags, and scripts to collect and track information and
          to improve and analyze our Service.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
        <p>We use the following types of cookies:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for the Service to function
            properly. They cannot be switched off in our systems.
          </li>
          <li>
            <strong>Preference Cookies:</strong> These cookies enable the Service to provide enhanced
            functionality and personalization. They may be set by us or by third-party providers whose
            services we have added to our pages.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources
            so we can measure and improve the performance of our Service.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> These cookies may be set through our Service by our
            advertising partners. They may be used by those companies to build a profile of your interests
            and show you relevant advertisements on other sites.
          </li>
        </ul>
      </>
    )
  },
  {
    id: "analytics",
    title: "Analytics",
    content: (
      <>
        <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Google Analytics:</strong> Google Analytics is a web analytics service offered by Google
            that tracks and reports website traffic. Google uses the data collected to track and monitor the
            use of our Service. This data is shared with other Google services. Google may use the collected
            data to contextualize and personalize the ads of its own advertising network. For more
            information on the privacy practices of Google, please visit the Google Privacy & Terms web
            page:{" "}
            <Link
              href="https://policies.google.com/privacy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </Link>
          </li>
          <li>
            <strong>Mixpanel:</strong> Mixpanel is a business analytics service provided by Mixpanel Inc.
            For more information on what type of information Mixpanel collects, please visit the Mixpanel
            Privacy Policy web page:{" "}
            <Link
              href="https://mixpanel.com/legal/privacy-policy/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://mixpanel.com/legal/privacy-policy/
            </Link>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect
          personally identifiable information from anyone under the age of 18. If you are a parent or
          guardian and you are aware that your Child has provided us with Personal Data, please contact us.
          If we become aware that we have collected Personal Data from children without verification of
          parental consent, we take steps to remove that information from our servers.
        </p>
      </>
    )
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    content: (
      <>
        <p>
          Our Service is operated globally, and your information may be transferred to, and maintained on,
          computers located outside of your state, province, country, or other governmental jurisdiction
          where the data protection laws may differ from those of your jurisdiction.
        </p>
        <p>
          If you are located outside the United States and choose to provide information to us, please note
          that we transfer the data, including Personal Data, to the United States and process it there.
        </p>
        <p>
          Your consent to this Privacy Policy followed by your submission of such information represents
          your agreement to that transfer.
        </p>
        <p>
          We will take all the steps reasonably necessary to ensure that your data is treated securely and
          in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an
          organization or a country unless there are adequate controls in place including the security of
          your data and other personal information.
        </p>
      </>
    )
  },
  {
    id: "changes",
    title: "Changes to Policy",
    content: (
      <>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting
          the new Privacy Policy on this page and updating the "Last updated" date at the top of this
          Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this
          Privacy Policy are effective when they are posted on this page.
        </p>
        <p>
          If we make material changes to this Privacy Policy, we will notify you either through the email
          address you have provided us or by placing a prominent notice on our website.
        </p>
      </>
    )
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            By email:{" "}
            <Link href="mailto:privacy@safesense.com" className="text-primary hover:underline">
              privacy@safesense.com
            </Link>
          </li>
          <li>
            By visiting this page on our website:{" "}
            <Link href="/contact" className="text-primary hover:underline">
              www.safesense.com/contact
            </Link>
          </li>
          <li>By mail: 123 Blockchain Avenue, Innovation City, DE 19901, United States</li>
        </ul>
      </>
    )
  }
];

