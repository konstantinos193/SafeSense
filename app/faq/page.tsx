import Link from "next/link"
import { Shield, Search, BarChart3, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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
              <Link href="/faq" className="px-3 py-2 text-sm font-medium text-primary">
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Frequently Asked Questions
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our blockchain-powered insurance services
                </p>
              </div>

              <div className="w-full max-w-md mt-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for answers..."
                    className="w-full appearance-none bg-background pl-8 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="coverage">Coverage</TabsTrigger>
                <TabsTrigger value="claims">Claims</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is SafeSense?</AccordionTrigger>
                    <AccordionContent>
                      SafeSense is a blockchain-powered insurance platform that offers a wide range of insurance
                      products for both traditional and digital assets. We leverage blockchain technology to provide
                      transparent policies, automatic claims processing, and flexible payment options. Our mission is to
                      make insurance more efficient, transparent, and accessible to everyone.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How is SafeSense different from traditional insurance?</AccordionTrigger>
                    <AccordionContent>
                      <p>SafeSense differs from traditional insurance in several key ways:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Smart contracts automatically process and pay claims when verified conditions are met,
                          eliminating lengthy manual claims processes
                        </li>
                        <li>
                          All policy terms are stored on the blockchain, ensuring complete transparency and preventing
                          unilateral changes
                        </li>
                        <li>You can pay premiums and receive claims in cryptocurrency or traditional currency</li>
                        <li>Usage-based pricing models that use real-time data to offer fairer premiums</li>
                        <li>Global accessibility without geographic restrictions or banking limitations</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What types of insurance do you offer?</AccordionTrigger>
                    <AccordionContent>
                      <p>We offer a comprehensive range of insurance products, including:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Crypto Insurance (wallet protection, exchange coverage, DeFi protocol insurance)</li>
                        <li>Traditional Insurance (car, home, health, life, travel)</li>
                        <li>Business Insurance (employee benefits, supply chain, cybersecurity)</li>
                        <li>Digital Asset Insurance (NFTs, tokenized real estate, gaming assets)</li>
                        <li>Parametric Insurance (weather, flight delays, market events)</li>
                      </ul>
                      <p className="mt-2">
                        Visit our{" "}
                        <Link href="/insurance" className="text-primary hover:underline">
                          Insurance page
                        </Link>{" "}
                        to explore all categories.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I get started with SafeSense?</AccordionTrigger>
                    <AccordionContent>
                      <p>Getting started with SafeSense is simple:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>
                          Visit our{" "}
                          <Link href="/get-coverage" className="text-primary hover:underline">
                            Get Coverage
                          </Link>{" "}
                          page
                        </li>
                        <li>Select the insurance category that fits your needs</li>
                        <li>Customize your coverage options and limits</li>
                        <li>Complete the application with your information</li>
                        <li>Choose your payment method (crypto or traditional)</li>
                        <li>Receive your policy as a smart contract on the blockchain</li>
                      </ol>
                      <p className="mt-2">
                        The entire process typically takes less than 10 minutes, and your coverage begins immediately
                        upon payment.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is SafeSense available worldwide?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, SafeSense is available globally. Because we operate on the blockchain, we can provide
                        insurance services to anyone with an internet connection, regardless of their location. However,
                        some specific insurance types may have regional limitations due to local regulations. When you
                        apply for coverage, we'll let you know if there are any restrictions that apply to your
                        location.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="blockchain" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does blockchain-based insurance work?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Blockchain-based insurance works by using smart contracts to automate policy management and
                        claims processing:
                      </p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>
                          Your policy is created as a smart contract on the blockchain with clearly defined terms and
                          conditions
                        </li>
                        <li>Premium payments are made to the smart contract, which holds the funds in escrow</li>
                        <li>
                          Data oracles continuously monitor for covered events (e.g., flight delays, weather events,
                          crypto hacks)
                        </li>
                        <li>
                          When a covered event is verified, the smart contract automatically executes the claim payment
                        </li>
                        <li>Funds are transferred directly to your wallet or account without manual intervention</li>
                      </ol>
                      <p className="mt-2">
                        This process eliminates paperwork, reduces administrative costs, and ensures that claims are
                        processed quickly and fairly.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is a smart contract?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        A smart contract is a self-executing program stored on the blockchain that automatically
                        enforces the terms of an agreement when predetermined conditions are met. In the context of
                        insurance:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Smart contracts contain all the terms and conditions of your insurance policy</li>
                        <li>They automatically collect premiums and process claims based on verified data</li>
                        <li>They cannot be altered without mutual consent, ensuring transparency and trust</li>
                        <li>They eliminate the need for intermediaries, reducing costs and increasing efficiency</li>
                      </ul>
                      <p className="mt-2">
                        Think of a smart contract as a digital agreement that automatically enforces itself without
                        requiring trust in a third party.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are data oracles and how do they work?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Data oracles are services that connect blockchain smart contracts with real-world data. They act
                        as bridges between the blockchain and external information sources. In our insurance platform:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Oracles pull data from trusted sources like weather services, flight databases, IoT devices,
                          and financial markets
                        </li>
                        <li>They verify this data through multiple sources to ensure accuracy</li>
                        <li>
                          The verified data is then fed to smart contracts to trigger claim payments when covered events
                          occur
                        </li>
                        <li>We use decentralized oracles to prevent manipulation and ensure reliability</li>
                      </ul>
                      <p className="mt-2">
                        For example, in our flight delay insurance, oracles monitor global flight databases in
                        real-time. If your flight is delayed beyond the covered threshold, the oracle feeds this
                        information to your policy's smart contract, which automatically processes your claim.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do I need to understand blockchain technology to use SafeSense?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        No, you don't need to understand blockchain technology to use SafeSense. We've designed our
                        platform to be user-friendly for everyone, regardless of their technical knowledge. Our
                        interface is similar to traditional insurance websites, but with the added benefits of
                        blockchain technology working behind the scenes.
                      </p>
                      <p className="mt-2">
                        If you choose to pay with cryptocurrency, you'll need a basic understanding of how to use a
                        crypto wallet, but we provide detailed guides to help you through this process. If you prefer,
                        you can always use traditional payment methods like credit cards or bank transfers.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my data secure on the blockchain?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, your data is secure on the blockchain. We use a combination of public and private
                        blockchain technology to ensure both transparency and privacy:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Policy terms and claim events are stored on the blockchain in a transparent but anonymized way
                        </li>
                        <li>Personal information is encrypted and stored off-chain with secure access controls</li>
                        <li>
                          We use zero-knowledge proofs for sensitive data like health information, allowing verification
                          without revealing the actual data
                        </li>
                        <li>All transactions are cryptographically secured and immutable</li>
                      </ul>
                      <p className="mt-2">
                        Our approach ensures that your policy details are transparent and verifiable while keeping your
                        personal information private and secure.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="coverage" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What assets can I insure with SafeSense?</AccordionTrigger>
                    <AccordionContent>
                      <p>SafeSense offers insurance for a wide range of traditional and digital assets:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Digital Assets:</strong> Cryptocurrencies, NFTs, DeFi investments, tokenized assets,
                          in-game items
                        </li>
                        <li>
                          <strong>Physical Assets:</strong> Homes, vehicles, personal belongings, business equipment
                        </li>
                        <li>
                          <strong>Personal Protection:</strong> Health, life, travel, event cancellation
                        </li>
                        <li>
                          <strong>Business Assets:</strong> Intellectual property, supply chains, employee benefits,
                          cyber security
                        </li>
                      </ul>
                      <p className="mt-2">
                        If you have a specific asset that's not listed here, please{" "}
                        <Link href="/#contact" className="text-primary hover:underline">
                          contact us
                        </Link>{" "}
                        to discuss custom coverage options.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How are coverage limits determined?</AccordionTrigger>
                    <AccordionContent>
                      <p>Coverage limits are determined based on several factors:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>The value of the asset being insured</li>
                        <li>The type and level of risk associated with the asset</li>
                        <li>Your selected plan (Basic, Premium, or Enterprise)</li>
                        <li>Your coverage history and risk profile</li>
                        <li>Market conditions and risk pool capacity</li>
                      </ul>
                      <p className="mt-2">
                        You can select your desired coverage limit during the application process, and our system will
                        calculate the appropriate premium based on the factors above. For high-value assets or custom
                        coverage needs, our Enterprise plan offers flexible limits tailored to your specific
                        requirements.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is parametric insurance and how does it work?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Parametric insurance is a type of insurance that automatically pays out a fixed amount when
                        certain predefined parameters or triggers are met, without requiring you to file a claim or
                        prove actual losses.
                      </p>
                      <p className="mt-2">
                        Unlike traditional insurance that pays based on the actual loss incurred, parametric insurance
                        pays a predetermined amount when a triggering event occurs, regardless of the actual damage.
                        This makes claims processing instant and transparent.
                      </p>
                      <p className="mt-2">For example:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Weather Insurance:</strong> Automatic payout if rainfall exceeds 6 inches in 24 hours
                          in your area
                        </li>
                        <li>
                          <strong>Flight Delay Insurance:</strong> Fixed compensation if your flight is delayed by more
                          than 2 hours
                        </li>
                        <li>
                          <strong>Crypto Market Insurance:</strong> Predetermined payout if a cryptocurrency drops more
                          than 20% in 24 hours
                        </li>
                      </ul>
                      <p className="mt-2">
                        Parametric insurance is ideal for situations where quick liquidity is important and when the
                        occurrence of an event is easily verifiable through objective data sources.
                      </p>
                      <p className="mt-2">
                        Learn more on our{" "}
                        <Link href="/insurance/parametric" className="text-primary hover:underline">
                          Parametric Insurance page
                        </Link>
                        .
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are there any exclusions to coverage?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, like all insurance products, our policies have certain exclusions. These vary by insurance
                        type but typically include:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Intentional acts or fraud</li>
                        <li>Pre-existing conditions (for health insurance)</li>
                        <li>Known vulnerabilities that weren't addressed (for cyber and crypto insurance)</li>
                        <li>War, terrorism, and certain natural disasters (unless specifically covered)</li>
                        <li>Losses due to illegal activities</li>
                      </ul>
                      <p className="mt-2">
                        The key difference with SafeSense is that all exclusions are clearly coded into the smart
                        contract and visible to you before purchase. There are no hidden exclusions or surprise denials.
                        When you view a policy, you'll see exactly what is and isn't covered in plain language.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I customize my coverage?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, SafeSense offers highly customizable coverage options. During the application process, you
                        can:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Select specific assets to cover</li>
                        <li>Choose coverage limits that fit your needs</li>
                        <li>Add or remove specific perils and risks</li>
                        <li>Set deductible amounts</li>
                        <li>Choose between different coverage triggers (for parametric insurance)</li>
                      </ul>
                      <p className="mt-2">
                        Our Premium and Enterprise plans offer greater customization options. Enterprise customers can
                        work with our team to create completely bespoke coverage solutions tailored to their unique
                        needs.
                      </p>
                      <p className="mt-2">
                        As you customize your coverage, our system provides real-time premium calculations so you can
                        see exactly how your choices affect your costs.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="claims" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I file a claim?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Many claims are processed automatically through our smart contract system when verified data
                        confirms a covered event. For these automatic claims, you don't need to do anything – the
                        payment is sent directly to your designated account or wallet.
                      </p>
                      <p className="mt-2">For claims that require additional verification:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Log into your SafeSense account dashboard</li>
                        <li>Navigate to the "Claims" section</li>
                        <li>Select the policy for which you're filing a claim</li>
                        <li>Follow the guided process to provide details about the incident</li>
                        <li>Upload any required documentation (photos, reports, etc.)</li>
                        <li>Submit your claim for review</li>
                      </ol>
                      <p className="mt-2">
                        Our team reviews manual claims promptly, typically within 24-48 hours. You can track the status
                        of your claim in real-time through your dashboard.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How quickly are claims processed?</AccordionTrigger>
                    <AccordionContent>
                      <p>Claim processing times vary based on the type of claim:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Automatic Claims:</strong> Processed instantly when verified data confirms a covered
                          event. Payment is typically received within minutes to hours, depending on the payment method.
                        </li>
                        <li>
                          <strong>Parametric Claims:</strong> Processed automatically when the parameter threshold is
                          met, usually within minutes to hours.
                        </li>
                        <li>
                          <strong>Manual Claims:</strong> Typically reviewed within 24-48 hours of submission. Once
                          approved, payment is processed immediately.
                        </li>
                        <li>
                          <strong>Complex Claims:</strong> Claims requiring extensive investigation may take 3-5
                          business days, but we keep you updated throughout the process.
                        </li>
                      </ul>
                      <p className="mt-2">
                        Our blockchain-based system eliminates many of the delays associated with traditional insurance
                        claims processing, allowing us to provide much faster resolutions than conventional insurers.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What documentation do I need to provide for a claim?</AccordionTrigger>
                    <AccordionContent>
                      <p>The documentation required depends on the type of insurance and the nature of the claim:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Automatic Claims:</strong> No documentation needed – these are verified through data
                          oracles.
                        </li>
                        <li>
                          <strong>Crypto Insurance:</strong> Transaction hashes, wallet addresses, and details of the
                          incident.
                        </li>
                        <li>
                          <strong>Property Insurance:</strong> Photos of damage, repair estimates, police reports (if
                          applicable).
                        </li>
                        <li>
                          <strong>Health Insurance:</strong> Medical records, treatment details, and provider
                          information.
                        </li>
                        <li>
                          <strong>Travel Insurance:</strong> Booking confirmations, cancellation notices, and expense
                          receipts.
                        </li>
                      </ul>
                      <p className="mt-2">
                        Our claims system will guide you through exactly what documentation is needed for your specific
                        claim. We've designed the process to be as streamlined as possible, requesting only essential
                        information.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How are claim amounts determined?</AccordionTrigger>
                    <AccordionContent>
                      <p>Claim amounts are determined differently based on the type of insurance:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Parametric Insurance:</strong> Fixed payout amounts predetermined in the policy when
                          specific triggers are met.
                        </li>
                        <li>
                          <strong>Indemnity Insurance:</strong> Based on the actual loss incurred, up to the coverage
                          limit, minus any applicable deductible.
                        </li>
                        <li>
                          <strong>Crypto Insurance:</strong> Based on the verified value of assets at the time of loss,
                          using multiple price oracles for accuracy.
                        </li>
                        <li>
                          <strong>Health Insurance:</strong> Based on the actual cost of covered medical services,
                          subject to policy limits and network agreements.
                        </li>
                      </ul>
                      <p className="mt-2">
                        All claim calculations are transparent and follow the exact formulas specified in your policy's
                        smart contract. There are no hidden adjustments or subjective assessments that could reduce your
                        payout.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What if my claim is denied?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        If your claim is denied, you'll receive a detailed explanation of the reason for the denial,
                        with reference to the specific policy terms that apply. Unlike traditional insurance, our
                        blockchain-based policies have clear, unambiguous terms that are applied consistently.
                      </p>
                      <p className="mt-2">
                        If you believe your claim was incorrectly denied, you have several options:
                      </p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Appeal Process:</strong> Submit an appeal through your dashboard with any additional
                          information or documentation that supports your claim.
                        </li>
                        <li>
                          <strong>Dispute Resolution:</strong> Access our decentralized dispute resolution system, where
                          independent arbitrators review your case.
                        </li>
                        <li>
                          <strong>Customer Support:</strong> Contact our support team who can help explain the decision
                          and guide you through next steps.
                        </li>
                      </ol>
                      <p className="mt-2">
                        Our goal is to make claims decisions fair and transparent. The immutable nature of blockchain
                        means that all policy terms and claim decisions are recorded permanently and can be
                        independently verified.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="payments" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      <p>We accept a wide range of payment methods to accommodate all customers:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Cryptocurrencies:</strong> Bitcoin (BTC), Ethereum (ETH), and major stablecoins (USDC,
                          USDT, DAI)
                        </li>
                        <li>
                          <strong>Traditional Methods:</strong> Credit/debit cards, bank transfers, and ACH payments
                        </li>
                        <li>
                          <strong>Mobile Payments:</strong> Apple Pay, Google Pay, and other major mobile payment
                          platforms
                        </li>
                      </ul>
                      <p className="mt-2">
                        Cryptocurrency payments often result in lower fees and faster processing times for both premiums
                        and claims. We offer a 5% discount on premiums paid with cryptocurrency to reflect these
                        savings.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How are premiums calculated?</AccordionTrigger>
                    <AccordionContent>
                      <p>Premiums are calculated based on several factors:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>The value of assets being insured</li>
                        <li>The specific risks being covered</li>
                        <li>Historical data and risk models</li>
                        <li>Real-time risk assessment from connected devices and data sources</li>
                        <li>Your coverage history and risk profile</li>
                        <li>The deductible amount you choose</li>
                      </ul>
                      <p className="mt-2">
                        For certain insurance types like car or health insurance, we can use data from connected devices
                        to offer usage-based pricing that rewards safe behavior with lower premiums. For example, our
                        car insurance can use telematics data to offer discounts for safe driving habits.
                      </p>
                      <p className="mt-2">
                        Our premium calculations are transparent, and you can see how different factors affect your rate
                        during the quote process.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are there any discounts available?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, we offer several discounts to help you save on premiums:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Cryptocurrency Payment Discount:</strong> 5% off when you pay with cryptocurrency
                        </li>
                        <li>
                          <strong>Annual Payment Discount:</strong> 10% off when you pay annually instead of monthly
                        </li>
                        <li>
                          <strong>Multi-Policy Discount:</strong> 15% off when you insure multiple assets or categories
                        </li>
                        <li>
                          <strong>Safety Measures Discount:</strong> Up to 20% off for implementing security measures
                          (varies by insurance type)
                        </li>
                        <li>
                          <strong>Usage-Based Discounts:</strong> Variable discounts based on data from connected
                          devices showing lower risk
                        </li>
                      </ul>
                      <p className="mt-2">
                        Discounts are automatically applied during the quote process when you qualify. You can see all
                        available discounts and how they affect your premium in real-time as you customize your
                        coverage.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do cryptocurrency payments work?</AccordionTrigger>
                    <AccordionContent>
                      <p>Paying with cryptocurrency is simple and secure:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>During checkout, select your preferred cryptocurrency (BTC, ETH, USDC, etc.)</li>
                        <li>We generate a unique payment address for your transaction</li>
                        <li>Send the exact amount from your wallet to the provided address</li>
                        <li>The blockchain confirms your payment (typically within minutes)</li>
                        <li>Your policy is automatically activated once payment is confirmed</li>
                      </ol>
                      <p className="mt-2">For recurring payments, you can:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Set up automatic payments through compatible crypto wallets</li>
                        <li>Receive payment reminders before each due date</li>
                        <li>Use stablecoins to avoid price volatility concerns</li>
                      </ul>
                      <p className="mt-2">
                        All cryptocurrency transactions are processed through secure, audited payment gateways with
                        industry-standard security measures. We support both on-chain and Layer 2 transactions to
                        accommodate different fee preferences.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do claim payments work?</AccordionTrigger>
                    <AccordionContent>
                      <p>Claim payments are processed according to your preferences:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Cryptocurrency:</strong> Payments sent directly to your designated wallet address
                        </li>
                        <li>
                          <strong>Bank Transfer:</strong> Funds transferred to your linked bank account
                        </li>
                        <li>
                          <strong>Credit/Debit Card:</strong> Refunds to your original payment method
                        </li>
                        <li>
                          <strong>Digital Wallets:</strong> Payments to services like PayPal or Venmo
                        </li>
                      </ul>
                      <p className="mt-2">
                        For automatic claims (like parametric insurance), payments are processed immediately when the
                        triggering event is verified, without requiring any action from you. For manual claims, payments
                        are processed as soon as the claim is approved.
                      </p>
                      <p className="mt-2">
                        Cryptocurrency payments are typically the fastest option, often arriving within minutes of claim
                        approval. Traditional payment methods may take 1-3 business days depending on your financial
                        institution.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Still Have Questions?</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our team is here to help you find the answers you need
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mt-8">
                <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                  <Mail className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Send us a message and we'll get back to you within 24 hours
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="mailto:support@safesense.com">support@safesense.com</Link>
                  </Button>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground mb-4">
                    Chat with our support team in real-time for immediate assistance
                  </p>
                  <Button variant="outline">Start Chat</Button>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Knowledge Base</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse our detailed guides and tutorials for in-depth information
                  </p>
                  <Button variant="outline">View Resources</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Experience the Future of Insurance?
                </h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who have already made the switch to blockchain-powered insurance
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button size="lg" asChild>
                  <Link href="/get-coverage">Get Coverage Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
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
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

