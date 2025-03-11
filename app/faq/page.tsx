"use client"

import Link from "next/link"
import { Shield, Search, BarChart3, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FAQAccordion } from "@/app/components/FAQAccordion"

const faqCategories = {
  general: [
    {
      question: "What is SafeSense?",
      answer: "SafeSense is a blockchain-powered insurance platform that offers a wide range of insurance products for both traditional and digital assets. We leverage blockchain technology to provide transparent policies, automatic claims processing, and flexible payment options. Our mission is to make insurance more efficient, transparent, and accessible to everyone."
    },
    {
      question: "How is SafeSense different from traditional insurance?",
      answer: "SafeSense differs from traditional insurance in several key ways: Smart contracts automatically process and pay claims when verified conditions are met, eliminating lengthy manual claims processes. All policy terms are stored on the blockchain, ensuring complete transparency and preventing unilateral changes. You can pay premiums and receive claims in cryptocurrency or traditional currency. Usage-based pricing models that use real-time data to offer fairer premiums. Global accessibility without geographic restrictions or banking limitations."
    },
    {
      question: "What types of insurance do you offer?",
      answer: "We offer a comprehensive range of insurance products, including: Crypto Insurance (wallet protection, exchange coverage, DeFi protocol insurance), Traditional Insurance (car, home, health, life, travel), Business Insurance (employee benefits, supply chain, cybersecurity), Digital Asset Insurance (NFTs, tokenized real estate, gaming assets), Parametric Insurance (weather, flight delays, market events). Visit our Insurance page to explore all categories."
    },
    {
      question: "How do I get started with SafeSense?",
      answer: "Getting started with SafeSense is simple: Visit our Get Coverage page, Select the insurance category that fits your needs, Customize your coverage options and limits, Complete the application with your information, Choose your payment method (crypto or traditional), Receive your policy as a smart contract on the blockchain. The entire process typically takes less than 10 minutes, and your coverage begins immediately upon payment."
    },
    {
      question: "Is SafeSense available worldwide?",
      answer: "Yes, SafeSense is available globally. Because we operate on the blockchain, we can provide insurance services to anyone with an internet connection, regardless of their location. However, some specific insurance types may have regional limitations due to local regulations. When you apply for coverage, we'll let you know if there are any restrictions that apply to your location."
    }
  ],
  blockchain: [
    {
      question: "How does blockchain-based insurance work?",
      answer: "Blockchain-based insurance works by using smart contracts to automate policy management and claims processing: Your policy is created as a smart contract on the blockchain with clearly defined terms and conditions. Premium payments are made to the smart contract, which holds the funds in escrow. Data oracles continuously monitor for covered events (e.g., flight delays, weather events, crypto hacks). When a covered event is verified, the smart contract automatically executes the claim payment. Funds are transferred directly to your wallet or account without manual intervention. This process eliminates paperwork, reduces administrative costs, and ensures that claims are processed quickly and fairly."
    },
    {
      question: "What is a smart contract?",
      answer: "A smart contract is a self-executing program stored on the blockchain that automatically enforces the terms of an agreement when predetermined conditions are met. In the context of insurance: Smart contracts contain all the terms and conditions of your insurance policy. They automatically collect premiums and process claims based on verified data. They cannot be altered without mutual consent, ensuring transparency and trust. They eliminate the need for intermediaries, reducing costs and increasing efficiency. Think of a smart contract as a digital agreement that automatically enforces itself without requiring trust in a third party."
    },
    {
      question: "What are data oracles and how do they work?",
      answer: "Data oracles are services that connect blockchain smart contracts with real-world data. They act as bridges between the blockchain and external information sources. In our insurance platform: Oracles pull data from trusted sources like weather services, flight databases, IoT devices, and financial markets. They verify this data through multiple sources to ensure accuracy. The verified data is then fed to smart contracts to trigger claim payments when covered events occur. We use decentralized oracles to prevent manipulation and ensure reliability. For example, in our flight delay insurance, oracles monitor global flight databases in real-time. If your flight is delayed beyond the covered threshold, the oracle feeds this information to your policy's smart contract, which automatically processes your claim."
    },
    {
      question: "Do I need to understand blockchain technology to use SafeSense?",
      answer: "No, you don't need to understand blockchain technology to use SafeSense. We've designed our platform to be user-friendly for everyone, regardless of their technical knowledge. Our interface is similar to traditional insurance websites, but with the added benefits of blockchain technology working behind the scenes. If you choose to pay with cryptocurrency, you'll need a basic understanding of how to use a crypto wallet, but we provide detailed guides to help you through this process. If you prefer, you can always use traditional payment methods like credit cards or bank transfers."
    },
    {
      question: "Is my data secure on the blockchain?",
      answer: "Yes, your data is secure on the blockchain. We use a combination of public and private blockchain technology to ensure both transparency and privacy: Policy terms and claim events are stored on the blockchain in a transparent but anonymized way. Personal information is encrypted and stored off-chain with secure access controls. We use zero-knowledge proofs for sensitive data like health information, allowing verification without revealing the actual data. All transactions are cryptographically secured and immutable. Our approach ensures that your policy details are transparent and verifiable while keeping your personal information private and secure."
    }
  ],
  coverage: [
    {
      question: "What assets can I insure with SafeSense?",
      answer: "SafeSense offers insurance for a wide range of traditional and digital assets: Digital Assets: Cryptocurrencies, NFTs, DeFi investments, tokenized assets, in-game items. Physical Assets: Homes, vehicles, personal belongings, business equipment. Personal Protection: Health, life, travel, event cancellation. Business Assets: Intellectual property, supply chains, employee benefits, cyber security. If you have a specific asset that's not listed here, please contact us to discuss custom coverage options."
    },
    {
      question: "How are coverage limits determined?",
      answer: "Coverage limits are determined based on several factors: The value of the asset being insured. The type and level of risk associated with the asset. Your selected plan (Basic, Premium, or Enterprise). Your coverage history and risk profile. Market conditions and risk pool capacity. You can select your desired coverage limit during the application process, and our system will calculate the appropriate premium based on the factors above. For high-value assets or custom coverage needs, our Enterprise plan offers flexible limits tailored to your specific requirements."
    },
    {
      question: "What is parametric insurance and how does it work?",
      answer: "Parametric insurance is a type of insurance that automatically pays out a fixed amount when certain predefined parameters or triggers are met, without requiring you to file a claim or prove actual losses. Unlike traditional insurance that pays based on the actual loss incurred, parametric insurance pays a predetermined amount when a triggering event occurs, regardless of the actual damage. This makes claims processing instant and transparent. For example: Weather Insurance: Automatic payout if rainfall exceeds 6 inches in 24 hours in your area. Flight Delay Insurance: Fixed compensation if your flight is delayed by more than 2 hours. Crypto Market Insurance: Predetermined payout if a cryptocurrency drops more than 20% in 24 hours. Parametric insurance is ideal for situations where quick liquidity is important and when the occurrence of an event is easily verifiable through objective data sources. Learn more on our Parametric Insurance page."
    },
    {
      question: "Are there any exclusions to coverage?",
      answer: "Yes, like all insurance products, our policies have certain exclusions. These vary by insurance type but typically include: Intentional acts or fraud. Pre-existing conditions (for health insurance). Known vulnerabilities that weren't addressed (for cyber and crypto insurance). War, terrorism, and certain natural disasters (unless specifically covered). Losses due to illegal activities. The key difference with SafeSense is that all exclusions are clearly coded into the smart contract and visible to you before purchase. There are no hidden exclusions or surprise denials. When you view a policy, you'll see exactly what is and isn't covered in plain language."
    },
    {
      question: "Can I customize my coverage?",
      answer: "Yes, SafeSense offers highly customizable coverage options. During the application process, you can: Select specific assets to cover. Choose coverage limits that fit your needs. Add or remove specific perils and risks. Set deductible amounts. Choose between different coverage triggers (for parametric insurance). Our Premium and Enterprise plans offer greater customization options. Enterprise customers can work with our team to create completely bespoke coverage solutions tailored to their unique needs. As you customize your coverage, our system provides real-time premium calculations so you can see exactly how your choices affect your costs."
    }
  ],
  claims: [
    {
      question: "How do I file a claim?",
      answer: "Many claims are processed automatically through our smart contract system when verified data confirms a covered event. For these automatic claims, you don't need to do anything – the payment is sent directly to your designated account or wallet. For claims that require additional verification: Log into your SafeSense account dashboard. Navigate to the 'Claims' section. Select the policy for which you're filing a claim. Follow the guided process to provide details about the incident. Upload any required documentation (photos, reports, etc.). Submit your claim for review. Our team reviews manual claims promptly, typically within 24-48 hours. You can track the status of your claim in real-time through your dashboard."
    },
    {
      question: "How quickly are claims processed?",
      answer: "Claim processing times vary based on the type of claim: Automatic Claims: Processed instantly when verified data confirms a covered event. Payment is typically received within minutes to hours, depending on the payment method. Parametric Claims: Processed automatically when the parameter threshold is met, usually within minutes to hours. Manual Claims: Typically reviewed within 24-48 hours of submission. Once approved, payment is processed immediately. Complex Claims: Claims requiring extensive investigation may take 3-5 business days, but we keep you updated throughout the process. Our blockchain-based system eliminates many of the delays associated with traditional insurance claims processing, allowing us to provide much faster resolutions than conventional insurers."
    },
    {
      question: "What documentation do I need to provide for a claim?",
      answer: "The documentation required depends on the type of insurance and the nature of the claim: Automatic Claims: No documentation needed – these are verified through data oracles. Crypto Insurance: Transaction hashes, wallet addresses, and details of the incident. Property Insurance: Photos of damage, repair estimates, police reports (if applicable). Health Insurance: Medical records, treatment details, and provider information. Travel Insurance: Booking confirmations, cancellation notices, and expense receipts. Our claims system will guide you through exactly what documentation is needed for your specific claim. We've designed the process to be as streamlined as possible, requesting only essential information."
    },
    {
      question: "How are claim amounts determined?",
      answer: "Claim amounts are determined differently based on the type of insurance: Parametric Insurance: Fixed payout amounts predetermined in the policy when specific triggers are met. Indemnity Insurance: Based on the actual loss incurred, up to the coverage limit, minus any applicable deductible. Crypto Insurance: Based on the verified value of assets at the time of loss, using multiple price oracles for accuracy. Health Insurance: Based on the actual cost of covered medical services, subject to policy limits and network agreements. All claim calculations are transparent and follow the exact formulas specified in your policy's smart contract. There are no hidden adjustments or subjective assessments that could reduce your payout."
    },
    {
      question: "What if my claim is denied?",
      answer: "If your claim is denied, you'll receive a detailed explanation of the reason for the denial, with reference to the specific policy terms that apply. Unlike traditional insurance, our blockchain-based policies have clear, unambiguous terms that are applied consistently. If you believe your claim was incorrectly denied, you have several options: Appeal Process: Submit an appeal through your dashboard with any additional information or documentation that supports your claim. Dispute Resolution: Access our decentralized dispute resolution system, where independent arbitrators review your case. Customer Support: Contact our support team who can help explain the decision and guide you through next steps. Our goal is to make claims decisions fair and transparent. The immutable nature of blockchain means that all policy terms and claim decisions are recorded permanently and can be independently verified."
    }
  ],
  payments: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept a wide range of payment methods to accommodate all customers: Cryptocurrencies: Bitcoin (BTC), Ethereum (ETH), and major stablecoins (USDC, USDT, DAI). Traditional Methods: Credit/debit cards, bank transfers, and ACH payments. Mobile Payments: Apple Pay, Google Pay, and other major mobile payment platforms. Cryptocurrency payments often result in lower fees and faster processing times for both premiums and claims. We offer a 5% discount on premiums paid with cryptocurrency to reflect these savings."
    },
    {
      question: "How are premiums calculated?",
      answer: "Premiums are calculated based on several factors: The value of assets being insured. The specific risks being covered. Historical data and risk models. Real-time risk assessment from connected devices and data sources. Your coverage history and risk profile. The deductible amount you choose. For certain insurance types like car or health insurance, we can use data from connected devices to offer usage-based pricing that rewards safe behavior with lower premiums. For example, our car insurance can use telematics data to offer discounts for safe driving habits. Our premium calculations are transparent, and you can see how different factors affect your rate during the quote process."
    },
    {
      question: "Are there any discounts available?",
      answer: "Yes, we offer several discounts to help you save on premiums: Cryptocurrency Payment Discount: 5% off when you pay with cryptocurrency. Annual Payment Discount: 10% off when you pay annually instead of monthly. Multi-Policy Discount: 15% off when you insure multiple assets or categories. Safety Measures Discount: Up to 20% off for implementing security measures (varies by insurance type). Usage-Based Discounts: Variable discounts based on data from connected devices showing lower risk. Discounts are automatically applied during the quote process when you qualify. You can see all available discounts and how they affect your premium in real-time as you customize your coverage."
    },
    {
      question: "How do cryptocurrency payments work?",
      answer: "Paying with cryptocurrency is simple and secure: During checkout, select your preferred cryptocurrency (BTC, ETH, USDC, etc.). We generate a unique payment address for your transaction. Send the exact amount from your wallet to the provided address. The blockchain confirms your payment (typically within minutes). Your policy is automatically activated once payment is confirmed. For recurring payments, you can: Set up automatic payments through compatible crypto wallets. Receive payment reminders before each due date. Use stablecoins to avoid price volatility concerns. All cryptocurrency transactions are processed through secure, audited payment gateways with industry-standard security measures. We support both on-chain and Layer 2 transactions to accommodate different fee preferences."
    },
    {
      question: "How do claim payments work?",
      answer: "Claim payments are processed according to your preferences: Cryptocurrency: Payments sent directly to your designated wallet address. Bank Transfer: Funds transferred to your linked bank account. Credit/Debit Card: Refunds to your original payment method. Digital Wallets: Payments to services like PayPal or Venmo. For automatic claims (like parametric insurance), payments are processed immediately when the triggering event is verified, without requiring any action from you. For manual claims, payments are processed as soon as the claim is approved. Cryptocurrency payments are typically the fastest option, often arriving within minutes of claim approval. Traditional payment methods may take 1-3 business days depending on your financial institution."
    }
  ]
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="hidden sm:inline">SafeSense</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link href="/features" className="hidden sm:inline px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/insurance" className="hidden sm:inline px-3 py-2 text-sm font-medium">
                Insurance
              </Link>
              <Link href="/pricing" className="hidden sm:inline px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/faq" className="hidden sm:inline px-3 py-2 text-sm font-medium text-primary">
                FAQ
              </Link>
              <Link href="/#contact" className="hidden sm:inline px-3 py-2 text-sm font-medium">
                Contact
              </Link>
              <Button asChild size="sm">
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
              <TabsList className="flex flex-col sm:flex-row gap-2 w-full">
                <TabsTrigger value="general" className="w-full sm:w-auto">General</TabsTrigger>
                <TabsTrigger value="blockchain" className="w-full sm:w-auto">Blockchain</TabsTrigger>
                <TabsTrigger value="coverage" className="w-full sm:w-auto">Coverage</TabsTrigger>
                <TabsTrigger value="claims" className="w-full sm:w-auto">Claims</TabsTrigger>
                <TabsTrigger value="payments" className="w-full sm:w-auto">Payments</TabsTrigger>
              </TabsList>

              {Object.entries(faqCategories).map(([category, items]) => (
                <TabsContent 
                  key={category} 
                  value={category} 
                  className="mt-6 data-[state=inactive]:hidden data-[state=active]:animate-fadeIn"
                >
                  <FAQAccordion
                    title={`${category.charAt(0).toUpperCase() + category.slice(1)} FAQs`}
                    description={`Common questions about ${category}`}
                    items={items}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">Still Have Questions?</h2>
                <p className="max-w-[800px] text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our team is here to help you find the answers you need
                </p>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mt-8">
                <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-lg border bg-background">
                  <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-4">
                    Send us a message and we'll get back to you within 24 hours
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:support@safesense.com">Email Us</Link>
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

