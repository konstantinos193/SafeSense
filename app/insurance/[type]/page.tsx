"use client"

import Link from "next/link"
import { Shield, Check, Info, AlertTriangle, Car, Heart, Home, Plane, Briefcase, Users, Image, Lock, Gamepad2, Calendar, Leaf, Coins, Gamepad, Dog, Cloud, FileKey } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, use } from "react"
import React from "react"

// Define the insurance types and their details
const insuranceTypes = {
  crypto: {
    title: "Crypto Insurance",
    description: "Protect your digital investments against hacks, theft, and smart contract failures",
    icon: <Shield className="h-8 w-8" />,
    color: "bg-blue-500",
    coverageOptions: [
      "DeFi Protocol Insurance against hacks and exploits",
      "Crypto Wallet Insurance for stolen funds",
      "Exchange Insurance for system failures",
      "Smart Contract Failure Coverage",
      "Market Volatility Protection",
      "NFT Theft and Damage Protection",
    ],
    benefits: [
      "Automatic claims processing via smart contracts",
      "Coverage for multiple cryptocurrencies and tokens",
      "Real-time monitoring of blockchain transactions",
      "Immediate payouts in cryptocurrency or stablecoins",
      "No lengthy claims verification process",
    ],
    howItWorks: [
      "Select the specific crypto assets you want to insure",
      "Choose your coverage amount and protection types",
      "Connect your wallet for verification (optional)",
      "Pay your premium in crypto or traditional currency",
      "Receive your policy as a smart contract on the blockchain",
      "If a covered event occurs, the smart contract automatically processes your claim",
    ],
    faqs: [
      {
        question: "How do you verify if my crypto was stolen?",
        answer:
          "We use a combination of blockchain analysis, transaction monitoring, and security audits to verify theft claims. Our system tracks unusual transaction patterns and unauthorized transfers from insured wallets.",
      },
      {
        question: "Are all cryptocurrencies covered?",
        answer:
          "We cover major cryptocurrencies including Bitcoin, Ethereum, and most top 100 tokens by market cap. Some newer or highly volatile tokens may have limited coverage. Contact us for a complete list of covered assets.",
      },
      {
        question: "How quickly are claims paid out?",
        answer:
          "For verified theft or hack events, claims are typically processed within 24-48 hours. Smart contract failure claims may require additional verification but are usually processed within 3-5 business days.",
      },
      {
        question: "Do you cover losses from my own mistakes?",
        answer:
          "Our standard policies do not cover losses due to user error (like sending crypto to the wrong address). However, we do offer premium plans that include limited coverage for certain types of user errors.",
      },
    ],
  },
  car: {
    title: "Car Insurance",
    description: "Smart telematics-based claims and pay-per-mile options with automatic payouts",
    icon: <Car className="h-8 w-8" />,
    color: "bg-green-500",
    coverageOptions: [
      "Telematics-based insurance with driving behavior monitoring",
      "Pay-per-mile coverage for low mileage drivers",
      "Collision coverage with automatic claims processing",
      "Comprehensive coverage for theft and natural disasters",
      "Liability protection with blockchain verification",
      "Roadside assistance with GPS integration",
    ],
    benefits: [
      "Lower premiums based on safe driving habits",
      "Real-time accident detection and response",
      "Automatic claims processing with minimal paperwork",
      "Pay only for the miles you actually drive",
      "Transparent policy terms stored on blockchain",
    ],
    howItWorks: [
      "Install our telematics device or mobile app to monitor driving",
      "Choose between pay-per-mile or behavior-based coverage",
      "Receive personalized premium quotes based on your driving data",
      "Pay your premium in cryptocurrency or traditional currency",
      "If an accident occurs, the telematics data automatically triggers a claim",
      "Receive your payout directly to your preferred payment method",
    ],
    faqs: [
      {
        question: "How does the telematics device track my driving?",
        answer:
          "Our telematics device or mobile app tracks factors like speed, acceleration, braking patterns, cornering, and time of day. This data is used to calculate a driving score that affects your premium rates.",
      },
      {
        question: "Is my driving data secure and private?",
        answer:
          "Yes, all driving data is encrypted and stored securely on the blockchain. We only use this data for calculating premiums and processing claims, and never sell it to third parties.",
      },
      {
        question: "How much can I save with pay-per-mile insurance?",
        answer:
          "Drivers who travel less than 10,000 miles per year typically save 30-40% compared to traditional insurance. Your exact savings will depend on your mileage and driving habits.",
      },
      {
        question: "What happens if I'm in an accident?",
        answer:
          "The telematics device automatically detects accidents and sends an alert to our claims department. You'll receive a notification to confirm the incident, and the claim process begins immediately without you having to file paperwork.",
      },
    ],
  },
  home: {
    title: "Home Insurance",
    description: "Smart home integration with IoT sensors for automatic damage detection and claims",
    icon: <Home className="h-8 w-8" />,
    color: "bg-orange-500",
    coverageOptions: [
      "Smart home integration with IoT sensors",
      "Fire and water damage detection and prevention",
      "Theft protection with security system integration",
      "Natural disaster coverage with weather data verification",
      "Property damage with automatic assessment",
      "Personal belongings coverage with digital inventory",
    ],
    benefits: [
      "Early detection of potential damage through IoT sensors",
      "Automatic emergency response for detected issues",
      "Reduced premiums for homes with smart security systems",
      "Streamlined claims process with digital evidence",
      "Preventative alerts to avoid damage before it occurs",
    ],
    howItWorks: [
      "Install compatible smart home sensors (or use existing ones)",
      "Connect your sensors to our insurance platform",
      "Choose your coverage types and limits",
      "Receive real-time monitoring and preventative alerts",
      "If damage occurs, sensors automatically document and report the incident",
      "Claims are processed based on sensor data and digital evidence",
    ],
    faqs: [
      {
        question: "What types of smart home devices are compatible?",
        answer:
          "We support most major smart home ecosystems including Google Nest, Amazon Alexa, Samsung SmartThings, and Apple HomeKit. Specific compatible devices include water leak sensors, smoke detectors, security cameras, and environmental monitors.",
      },
      {
        question: "Do I need to have smart home devices to get insurance?",
        answer:
          "No, smart home devices are not required, but they can significantly reduce your premiums and enable automatic claims processing. We offer traditional policies for homes without smart devices as well.",
      },
      {
        question: "How much can I save with smart home integration?",
        answer:
          "Homeowners with comprehensive smart home monitoring systems typically save 15-25% on their insurance premiums. Additional discounts are available for homes with professional monitoring services.",
      },
      {
        question: "What happens if my smart devices fail or lose connection?",
        answer:
          "Your coverage remains active even if devices go offline. We implement redundancy in our monitoring systems, and you can always file claims manually if automatic detection fails. We also send alerts if critical devices go offline.",
      },
    ],
  },
  health: {
    title: "Health Insurance",
    description: "Decentralized medical records and usage-based premiums with DeFi health savings",
    icon: <Heart className="h-8 w-8" />,
    color: "bg-red-500",
    coverageOptions: [
      "Decentralized medical records for secure access",
      "Usage-based premiums with fitness tracker integration",
      "Preventative care incentives and rewards",
      "Chronic condition management programs",
      "Emergency medical coverage with global protection",
      "Mental health services with telehealth integration",
    ],
    benefits: [
      "Lower premiums for maintaining healthy lifestyle habits",
      "Secure and portable medical records you control",
      "Earn rewards for preventative care and fitness goals",
      "Transparent pricing for medical procedures",
      "DeFi-powered health savings accounts with yield generation",
    ],
    howItWorks: [
      "Securely store your medical records on our decentralized platform",
      "Connect fitness trackers or health monitoring devices (optional)",
      "Choose your coverage level and optional add-ons",
      "Earn premium discounts by meeting health goals",
      "Access your DeFi health savings account for qualified expenses",
      "When medical care is needed, providers access records with your permission",
    ],
    faqs: [
      {
        question: "How is my health data kept private and secure?",
        answer:
          "Your health data is encrypted and stored on a private blockchain with zero-knowledge proofs. You control exactly who can access your data and for what purpose, with detailed access logs for complete transparency.",
      },
      {
        question: "How do fitness trackers affect my premiums?",
        answer:
          "Members who opt into our fitness tracking program can earn up to 25% off premiums by meeting personalized activity, sleep, and heart health goals. The program is completely optional and you can opt out at any time.",
      },
      {
        question: "What is a DeFi health savings account?",
        answer:
          "Our DeFi health savings accounts allow you to save pre-tax dollars for medical expenses while earning yield through decentralized finance protocols. These funds can be used for qualified medical expenses with automatic verification and payment.",
      },
      {
        question: "Are pre-existing conditions covered?",
        answer:
          "Yes, we cover pre-existing conditions with transparent pricing models. Rather than exclusions, we use personalized care management programs to help members with chronic conditions maintain optimal health and minimize costs.",
      },
    ],
  },
  business: {
    title: "Business Insurance",
    description: "Smart contracts for employee benefits and supply chain insurance with automatic claims",
    icon: <Briefcase className="h-8 w-8" />,
    color: "bg-purple-500",
    coverageOptions: [
      "Employee benefits administration via smart contracts",
      "Supply chain disruption insurance with real-time tracking",
      "Cybersecurity insurance with breach detection",
      "Business interruption coverage with automatic triggers",
      "Professional liability and errors & omissions coverage",
      "Commercial property protection with IoT integration",
    ],
    benefits: [
      "Streamlined employee benefits administration",
      "Real-time supply chain visibility and risk assessment",
      "Automatic business interruption payouts based on verified events",
      "Reduced premiums for implementing security best practices",
      "Parametric insurance options with instant settlement",
    ],
    howItWorks: [
      "Complete a digital risk assessment of your business operations",
      "Select coverage types and limits for your specific industry",
      "Integrate with your existing systems (ERP, supply chain, IoT)",
      "Implement recommended security measures for premium discounts",
      "Monitor real-time risk dashboards and receive preventative alerts",
      "Claims are automatically triggered by verified business disruption events",
    ],
    faqs: [
      {
        question: "How does supply chain insurance work?",
        answer:
          "Our supply chain insurance uses IoT devices, shipping data, and blockchain verification to monitor your supply chain in real-time. If disruptions occur that meet policy criteria, claims are automatically processed without requiring manual filing.",
      },
      {
        question: "What types of cyber incidents are covered?",
        answer:
          "We cover a wide range of cyber incidents including data breaches, ransomware attacks, business email compromise, DDoS attacks, and employee negligence. Coverage includes incident response, data recovery, legal expenses, and liability protection.",
      },
      {
        question: "How are employee benefits administered through smart contracts?",
        answer:
          "Smart contracts automate the administration of employee benefits by encoding eligibility rules, coverage terms, and claims processing logic. This reduces administrative overhead and ensures consistent application of benefits policies.",
      },
      {
        question: "Is this suitable for small businesses?",
        answer:
          "Yes, we offer tailored solutions for businesses of all sizes. Small businesses particularly benefit from our modular approach, allowing you to select only the coverage types you need with premiums scaled to your business size and risk profile.",
      },
    ],
  },
  travel: {
    title: "Travel Insurance",
    description: "Flight delay compensation and lost luggage coverage with automatic claims processing",
    icon: <Plane className="h-8 w-8" />,
    color: "bg-teal-500",
    coverageOptions: [
      "Flight delay and cancellation compensation",
      "Lost or delayed luggage protection",
      "Medical emergency coverage while traveling",
      "Trip cancellation and interruption insurance",
      "Rental car damage protection",
      "Adventure sports and activities coverage",
    ],
    benefits: [
      "Automatic flight delay compensation without filing claims",
      "Real-time baggage tracking and instant lost luggage payouts",
      "Global medical coverage with direct provider payments",
      "Multi-trip annual policies for frequent travelers",
      "Coverage for remote work travel and digital nomads",
    ],
    howItWorks: [
      "Enter your flight details or connect to your travel booking account",
      "Select coverage options for your specific trip needs",
      "Receive a digital policy instantly to your mobile device",
      "Our system automatically monitors your flights and baggage status",
      "If delays or issues occur, compensation is automatically processed",
      "For medical claims, simply scan and submit documentation through our app",
    ],
    faqs: [
      {
        question: "How does automatic flight delay compensation work?",
        answer:
          "Our system integrates with global flight databases to monitor your flight status in real-time. If your flight is delayed beyond the covered threshold (typically 3+ hours), compensation is automatically sent to your preferred payment method without you having to file a claim.",
      },
      {
        question: "What medical expenses are covered while traveling?",
        answer:
          "Our travel medical coverage includes emergency medical treatment, hospital stays, prescription medications, emergency dental care, and medical evacuation if necessary. Pre-existing conditions may have limited coverage depending on your policy level.",
      },
      {
        question: "How do you track lost luggage?",
        answer:
          "We offer optional smart luggage tags that integrate with our tracking system. Alternatively, you can report lost luggage through our app, and we'll coordinate with airlines and verify the claim through their systems for rapid reimbursement.",
      },
      {
        question: "Can I purchase insurance after booking my trip?",
        answer:
          "Yes, you can purchase travel insurance anytime before your departure date. However, for maximum coverage benefits including trip cancellation protection, we recommend purchasing insurance within 14 days of your initial trip deposit.",
      },
    ],
  },
  nft: {
    title: "NFT Insurance",
    description: "Protect your digital art and collectibles with comprehensive NFT coverage",
    icon: <Image className="h-8 w-8" />,
    color: "bg-indigo-500",
    coverageOptions: [
      "NFT Theft Protection",
      "Smart Contract Vulnerability Coverage",
      "Marketplace Transaction Insurance",
      "Fraudulent Sale Protection",
      "Authentication Coverage",
      "Gas Fee Protection for Failed Transactions",
    ],
    benefits: [
      "Instant verification of NFT ownership",
      "Automatic claims processing via smart contracts",
      "Coverage across major NFT marketplaces",
      "Protection against smart contract exploits",
      "Real-time monitoring of NFT transfers",
    ],
    howItWorks: [
      "Connect your wallet to verify NFT ownership",
      "Select the NFTs you want to insure",
      "Choose your coverage amount based on floor price or last sale",
      "Pay premium in crypto or stablecoins",
      "Receive coverage confirmation as an NFT",
      "Automatic claim processing if theft or loss occurs",
    ],
    faqs: [
      {
        question: "What types of NFTs are covered?",
        answer: "We cover NFTs from verified collections on major marketplaces including OpenSea, Rarible, and Foundation. Both ERC-721 and ERC-1155 tokens are eligible for coverage.",
      },
      {
        question: "How is the coverage amount determined?",
        answer: "Coverage amounts can be based on the floor price, last sale price, or appraised value of your NFT. We use oracle networks to maintain accurate, real-time valuations.",
      },
      {
        question: "What happens if my NFT is stolen?",
        answer: "Our system monitors blockchain activity 24/7. If unauthorized transfers are detected, we initiate immediate recovery procedures and process compensation claims within 48 hours.",
      },
      {
        question: "Are gas fees covered?",
        answer: "Yes, we cover gas fees for failed transactions and provide reimbursement for excessive gas fees during high network congestion periods.",
      },
    ],
  },
  defi: {
    title: "DeFi Protocol Insurance",
    description: "Secure your DeFi investments against smart contract risks and protocol failures",
    icon: <Lock className="h-8 w-8" />,
    color: "bg-blue-600",
    coverageOptions: [
      "Smart Contract Vulnerability Coverage",
      "Protocol Hack Protection",
      "Stablecoin De-peg Insurance",
      "Liquidity Pool Protection",
      "Governance Attack Coverage",
      "Flash Loan Attack Protection",
    ],
    benefits: [
      "Real-time monitoring of protocol health",
      "Automatic claim processing for covered events",
      "Multi-chain coverage options",
      "Customizable coverage limits",
      "Immediate payout in stablecoins",
    ],
    howItWorks: [
      "Select the DeFi protocols you want to insure",
      "Choose coverage amount for each protocol",
      "Connect wallet for position verification",
      "Set up automatic premium payments",
      "Monitor your coverage through our dashboard",
      "Receive instant payouts for verified incidents",
    ],
    faqs: [
      {
        question: "Which DeFi protocols are covered?",
        answer: "We cover major DeFi protocols including Uniswap, Aave, Compound, Curve, and more. Coverage availability is based on protocol audit status and security measures.",
      },
      {
        question: "How are claims verified?",
        answer: "Claims are verified through a combination of smart contract monitoring, oracle networks, and our security partner network. Verified incidents trigger automatic payouts.",
      },
      {
        question: "What is stablecoin de-peg protection?",
        answer: "This coverage protects against stablecoin value dropping below a specified threshold (typically $0.95) for an extended period. Compensation is based on your holding amount.",
      },
      {
        question: "Are impermanent losses covered?",
        answer: "Standard policies don't cover impermanent loss, but we offer specialized LP protection that can cover significant impermanent loss events under specific conditions.",
      },
    ],
  },
  gaming: {
    title: "Gaming & Esports Insurance",
    description: "Protect your in-game assets and esports investments",
    icon: <Gamepad2 className="h-8 w-8" />,
    color: "bg-pink-600",
    coverageOptions: [
      "In-Game Asset Protection",
      "Tournament Prize Pool Insurance",
      "Stream Revenue Protection",
      "Gaming Equipment Coverage",
      "Account Hack Protection",
      "Virtual Land and Property Insurance",
    ],
    benefits: [
      "Coverage for multiple gaming platforms",
      "Real-time asset value tracking",
      "Instant claim verification",
      "Cross-game coverage options",
      "Professional esports team coverage",
    ],
    howItWorks: [
      "Connect your gaming accounts",
      "Select assets and activities to insure",
      "Choose coverage levels for each category",
      "Set up premium payments",
      "Receive coverage confirmation",
      "Submit claims through our gaming portal",
    ],
    faqs: [
      {
        question: "What games are covered?",
        answer: "We cover major blockchain games, traditional MMOs, and esports titles. Coverage varies by game and asset type.",
      },
      {
        question: "How are in-game assets valued?",
        answer: "Asset values are determined using marketplace data, rarity metrics, and historical sales data specific to each game.",
      },
      {
        question: "Is tournament coverage available for teams?",
        answer: "Yes, we offer specialized coverage for esports teams including prize pool protection and player contract insurance.",
      },
      {
        question: "What types of streaming revenue are covered?",
        answer: "We cover revenue loss due to platform outages, account hacks, and other disruptions to professional gaming streams.",
      },
    ],
  },
  event: {
    title: "Event Insurance",
    description: "Comprehensive coverage for events of all sizes",
    icon: <Calendar className="h-8 w-8" />,
    color: "bg-yellow-600",
    coverageOptions: [
      "Event Cancellation Coverage",
      "Weather-related Disruption",
      "Vendor No-show Protection",
      "Property Damage Coverage",
      "Liability Insurance",
      "Virtual Event Technical Failure",
    ],
    benefits: [
      "Weather monitoring integration",
      "Real-time vendor tracking",
      "Automatic claim processing",
      "Flexible coverage options",
      "Multi-venue protection",
    ],
    howItWorks: [
      "Provide event details and requirements",
      "Select coverage types needed",
      "Choose coverage period and limits",
      "Receive instant quote and policy",
      "Monitor event status through dashboard",
      "Submit claims with digital documentation",
    ],
    faqs: [
      {
        question: "What types of events are covered?",
        answer: "We cover corporate events, conferences, weddings, concerts, and more. Both in-person and virtual events are eligible.",
      },
      {
        question: "How does weather coverage work?",
        answer: "We use weather data APIs to monitor conditions. If specified weather parameters are breached, claims are automatically processed.",
      },
      {
        question: "Is COVID-19 related cancellation covered?",
        answer: "Coverage for pandemic-related cancellations is available as an optional add-on with specific terms and conditions.",
      },
      {
        question: "What's included in virtual event coverage?",
        answer: "We cover technical failures, platform outages, cyber attacks, and other disruptions that affect virtual event delivery.",
      },
    ],
  },
  agricultural: {
    title: "Agricultural Insurance",
    description: "Smart contract-based crop and livestock protection",
    icon: <Leaf className="h-8 w-8" />,
    color: "bg-green-600",
    coverageOptions: [
      "Crop Yield Protection",
      "Weather Risk Coverage",
      "Livestock Insurance",
      "Equipment Breakdown",
      "Supply Chain Disruption",
      "Smart Farming System Failure",
    ],
    benefits: [
      "Satellite data integration",
      "IoT sensor monitoring",
      "Automated weather tracking",
      "Blockchain-verified claims",
      "Parametric insurance options",
    ],
    howItWorks: [
      "Register farm location and assets",
      "Select crops or livestock to insure",
      "Choose coverage types and limits",
      "Connect IoT devices if available",
      "Monitor conditions via dashboard",
      "Receive automatic payouts for covered events",
    ],
    faqs: [
      {
        question: "How is crop yield calculated?",
        answer: "We use a combination of satellite imagery, weather data, and IoT sensors to monitor crop health and predict yields.",
      },
      {
        question: "What weather events are covered?",
        answer: "Coverage includes drought, excessive rainfall, frost, hail, and other extreme weather events that affect crop yield.",
      },
      {
        question: "How does livestock tracking work?",
        answer: "We integrate with RFID tags and IoT sensors to monitor livestock health and location in real-time.",
      },
      {
        question: "Are organic farming practices covered?",
        answer: "Yes, we offer specialized coverage for organic farming with additional protection for certification-related risks.",
      },
    ],
  },
  "tokenized-asset": {
    title: "Tokenized Asset Insurance",
    description: "Protect your tokenized real-world assets and securities",
    icon: <Coins className="h-8 w-8" />,
    color: "bg-violet-600",
    coverageOptions: [
      "Real Estate Token Protection",
      "Security Token Coverage",
      "Asset-Backed Token Insurance",
      "Fractional Ownership Protection",
      "Smart Contract Vulnerability Coverage",
      "Regulatory Compliance Protection",
    ],
    benefits: [
      "24/7 asset monitoring",
      "Cross-chain coverage",
      "Regulatory compliance support",
      "Automated value tracking",
      "Instant claim verification",
    ],
    howItWorks: [
      "Connect your wallet holding tokenized assets",
      "Select assets to insure",
      "Choose coverage levels based on asset value",
      "Set up automated premium payments",
      "Monitor your coverage through our dashboard",
      "Receive instant claim processing",
    ],
    faqs: [
      {
        question: "What types of tokenized assets are covered?",
        answer: "We cover real estate tokens, security tokens, asset-backed tokens, and other regulated tokenized assets.",
      },
      {
        question: "How are tokenized assets valued?",
        answer: "Assets are valued using a combination of real-world asset prices, oracle networks, and market data.",
      },
      {
        question: "Is regulatory compliance included?",
        answer: "Yes, we provide coverage for regulatory compliance issues and help ensure your tokenized assets meet legal requirements.",
      },
      {
        question: "What happens if the underlying asset is compromised?",
        answer: "Our coverage includes protection for both the token and the underlying asset, with comprehensive claim processing.",
      },
    ],
  },
  "gaming-esports": {
    title: "Gaming & Esports Insurance",
    description: "Comprehensive coverage for gaming assets and esports operations",
    icon: <Gamepad className="h-8 w-8" />,
    color: "bg-fuchsia-600",
    coverageOptions: [
      "Professional Player Insurance",
      "Tournament Organization Coverage",
      "Gaming Asset Protection",
      "Stream Revenue Insurance",
      "Team Organization Coverage",
      "Gaming Infrastructure Protection",
    ],
    benefits: [
      "Global tournament coverage",
      "Real-time asset monitoring",
      "Revenue protection",
      "Equipment coverage",
      "Team liability protection",
    ],
    howItWorks: [
      "Select your gaming or esports category",
      "Choose specific coverage needs",
      "Upload relevant documentation",
      "Receive customized coverage plan",
      "Access real-time monitoring dashboard",
      "File claims through our gaming portal",
    ],
    faqs: [
      {
        question: "What's covered under player insurance?",
        answer: "Coverage includes injury protection, contract insurance, and performance-related issues.",
      },
      {
        question: "How do you handle tournament cancellations?",
        answer: "We provide compensation for verified tournament cancellations, including prize pool protection.",
      },
      {
        question: "Is streaming equipment covered?",
        answer: "Yes, we cover professional gaming and streaming equipment against damage, theft, and malfunction.",
      },
      {
        question: "What about team organizations?",
        answer: "We offer comprehensive coverage for esports organizations, including liability, property, and employee protection.",
      },
    ],
  },
  life: {
    title: "Life Insurance",
    description: "Smart contract-enabled life insurance with instant claim processing",
    icon: <Heart className="h-8 w-8" />,
    color: "bg-red-600",
    coverageOptions: [
      "Term Life Insurance",
      "Whole Life Coverage",
      "Critical Illness Protection",
      "Disability Coverage",
      "Family Protection Plans",
      "Investment-Linked Policies",
    ],
    benefits: [
      "Instant claim processing",
      "Blockchain-verified policies",
      "Flexible coverage options",
      "Investment opportunities",
      "Family security guarantees",
    ],
    howItWorks: [
      "Complete digital health assessment",
      "Choose coverage type and amount",
      "Add optional riders and benefits",
      "Set up premium payments",
      "Receive digital policy contract",
      "Beneficiaries receive automatic payouts",
    ],
    faqs: [
      {
        question: "How are claims verified?",
        answer: "We use a combination of official records and smart contracts for automated claim verification.",
      },
      {
        question: "Can I modify my coverage?",
        answer: "Yes, you can adjust your coverage and add riders through our digital platform.",
      },
      {
        question: "How are beneficiaries paid?",
        answer: "Beneficiaries can receive payments in traditional currency or cryptocurrency.",
      },
      {
        question: "What's included in critical illness coverage?",
        answer: "We cover major illnesses with automated payouts based on verified medical records.",
      },
    ],
  },
  pet: {
    title: "Pet Insurance",
    description: "Digital-first pet protection with IoT integration",
    icon: <Dog className="h-8 w-8" />,
    color: "bg-amber-600",
    coverageOptions: [
      "Veterinary Care Coverage",
      "Accident Protection",
      "Chronic Condition Care",
      "Pet Tracking Insurance",
      "Third-Party Liability",
      "Wellness & Preventive Care",
    ],
    benefits: [
      "24/7 vet telemedicine access",
      "Smart collar integration",
      "Automated claim processing",
      "Preventive care rewards",
      "Digital pet health records",
    ],
    howItWorks: [
      "Register your pet with digital records",
      "Choose coverage level",
      "Connect pet tracking devices",
      "Set up automated payments",
      "Access vet services through our network",
      "Receive instant claim approvals",
    ],
    faqs: [
      {
        question: "What pets are covered?",
        answer: "We cover dogs, cats, and other common pets with specialized plans for exotic pets.",
      },
      {
        question: "How do smart collars work with insurance?",
        answer: "Smart collars help track pet health metrics and location, potentially reducing premiums.",
      },
      {
        question: "Is preventive care included?",
        answer: "Yes, we offer wellness plans covering routine care and preventive treatments.",
      },
      {
        question: "How quickly are vet bills paid?",
        answer: "Direct vet payments are processed instantly through our network.",
      },
    ],
  },
  "disaster-relief": {
    title: "Disaster Relief Insurance",
    description: "Parametric insurance for natural disasters with immediate aid",
    icon: <Cloud className="h-8 w-8" />,
    color: "bg-sky-600",
    coverageOptions: [
      "Natural Disaster Coverage",
      "Emergency Evacuation",
      "Property Damage Protection",
      "Business Interruption",
      "Community Relief Support",
      "Recovery Assistance",
    ],
    benefits: [
      "Instant parametric payouts",
      "Satellite monitoring",
      "Emergency response coordination",
      "Community support network",
      "Rebuilding assistance",
    ],
    howItWorks: [
      "Select coverage area and risks",
      "Choose coverage amounts",
      "Set up monitoring parameters",
      "Receive early warning alerts",
      "Get automatic payouts post-disaster",
      "Access recovery support network",
    ],
    faqs: [
      {
        question: "How are disasters verified?",
        answer: "We use satellite data, weather stations, and official reports for automated verification.",
      },
      {
        question: "How quickly are claims paid?",
        answer: "Parametric claims are paid within 24-48 hours of event verification.",
      },
      {
        question: "What disasters are covered?",
        answer: "Coverage includes earthquakes, floods, hurricanes, wildfires, and other natural disasters.",
      },
      {
        question: "Is evacuation assistance included?",
        answer: "Yes, we provide evacuation coordination and coverage for verified disasters.",
      },
    ],
  },
  "intellectual-property": {
    title: "Intellectual Property Insurance",
    description: "Blockchain-verified IP protection and enforcement",
    icon: <FileKey className="h-8 w-8" />,
    color: "bg-emerald-600",
    coverageOptions: [
      "Patent Protection",
      "Copyright Coverage",
      "Trademark Defense",
      "IP Infringement Protection",
      "Licensing Dispute Coverage",
      "Digital Rights Management",
    ],
    benefits: [
      "Blockchain IP verification",
      "Global coverage network",
      "Automated infringement detection",
      "Legal defense coverage",
      "Licensing revenue protection",
    ],
    howItWorks: [
      "Register your IP on our platform",
      "Select coverage types",
      "Set up monitoring parameters",
      "Receive infringement alerts",
      "Access legal support network",
      "File claims for verified violations",
    ],
    faqs: [
      {
        question: "What types of IP are covered?",
        answer: "We cover patents, copyrights, trademarks, and trade secrets across digital and physical domains.",
      },
      {
        question: "How do you detect infringement?",
        answer: "We use AI and blockchain technology to monitor and detect potential IP infringements.",
      },
      {
        question: "Is legal representation included?",
        answer: "Yes, we provide access to a network of IP attorneys and cover legal defense costs.",
      },
      {
        question: "How are claims validated?",
        answer: "Claims are validated through our blockchain verification system and legal expert review.",
      },
    ],
  },
  "carbon-credit": {
    title: "Carbon Credit Insurance",
    description: "Protect your carbon credit investments and trading",
    icon: <Leaf className="h-8 w-8" />,
    color: "bg-lime-600",
    coverageOptions: [
      "Carbon Credit Verification",
      "Trading Risk Coverage",
      "Project Development Insurance",
      "Regulatory Compliance",
      "Market Value Protection",
      "Offset Project Insurance",
    ],
    benefits: [
      "Real-time credit tracking",
      "Automated verification",
      "Market price protection",
      "Regulatory compliance support",
      "Project risk mitigation",
    ],
    howItWorks: [
      "Register carbon credit portfolio",
      "Select coverage options",
      "Connect to verification systems",
      "Monitor credits in real-time",
      "Receive market alerts",
      "Process automated claims",
    ],
    faqs: [
      {
        question: "What types of credits are covered?",
        answer: "We cover verified carbon credits from recognized registries and emerging market credits.",
      },
      {
        question: "How are credits verified?",
        answer: "Credits are verified through blockchain and recognized carbon credit registries.",
      },
      {
        question: "Is project failure covered?",
        answer: "Yes, we provide coverage for verified project failures and underperformance.",
      },
      {
        question: "How are price fluctuations handled?",
        answer: "We offer market value protection for significant price fluctuations in carbon markets.",
      },
    ],
  },
  "travel-leisure": {
    title: "Travel & Leisure Insurance",
    description: "Comprehensive coverage for all your travel and leisure activities",
    icon: <Plane className="h-8 w-8" />,
    color: "bg-cyan-600",
    coverageOptions: [
      "Vacation Package Protection",
      "Adventure Sports Coverage",
      "Cruise Insurance",
      "Hotel Booking Protection",
      "Activity Cancellation Coverage",
      "Luxury Travel Insurance",
    ],
    benefits: [
      "Global coverage network",
      "24/7 travel assistance",
      "Real-time travel alerts",
      "Instant claim processing",
      "Multi-trip annual options",
    ],
    howItWorks: [
      "Select your travel activities",
      "Choose coverage duration",
      "Add specific activities or trips",
      "Receive digital policy instantly",
      "Access travel support services",
      "Submit claims through mobile app",
    ],
    faqs: [
      {
        question: "What activities are covered?",
        answer: "We cover a wide range of leisure activities including skiing, scuba diving, golf, cruises, and adventure sports.",
      },
      {
        question: "How does luxury travel coverage work?",
        answer: "Our luxury travel coverage includes high-value item protection, concierge services, and premium accommodation guarantees.",
      },
      {
        question: "Are pre-existing conditions covered?",
        answer: "Yes, we offer coverage options for pre-existing conditions with proper medical documentation.",
      },
      {
        question: "What's included in cruise protection?",
        answer: "Cruise protection covers trip cancellation, medical emergencies at sea, missed port departures, and cabin confinement.",
      },
    ],
  },
}

export default function InsuranceDetails({ params }) {
  const { type } = use(params)
  const [activeTab, setActiveTab] = useState<string | null>(null)

  // Check if the insurance type exists
  if (!insuranceTypes[type]) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Insurance Type Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The insurance type you're looking for doesn't exist or may have been moved.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const insurance = insuranceTypes[type]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-lg md:text-xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-5 w-5 md:h-6 md:w-6" />
              <span>SafeSense</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
            <Link href="/" className="text-xs md:text-sm text-muted-foreground hover:underline">
              Home
            </Link>
            <Button asChild size="sm" className="text-xs md:text-sm">
              <Link href="/get-coverage">Get Coverage</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className={`w-full py-8 md:py-24 ${insurance.color} text-white`}>
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/10 backdrop-blur-sm">
                {React.cloneElement(insurance.icon, { className: "h-6 w-6 md:h-8 md:w-8" })}
              </div>
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                {insurance.title}
              </h1>
              <p className="max-w-[700px] text-white/80 text-sm md:text-base lg:text-xl">
                {insurance.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button size="sm" variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/get-coverage">Get Coverage Now</Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto"
                >
                  <Link href="#coverage-options">View Coverage Options</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-2 sm:px-4 md:px-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Coverage Options Accordion */}
              <AccordionItem value="coverage">
                <AccordionTrigger className="text-lg md:text-xl font-semibold">
                  Coverage Options
                </AccordionTrigger>
                <AccordionContent>
                  <Card id="coverage-options">
                    <CardHeader>
                      <CardTitle>Coverage Options</CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Comprehensive protection tailored to your needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                        {insurance.coverageOptions.map((option, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className={`p-1.5 rounded-full ${insurance.color} text-white shrink-0`}>
                              <Check className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm md:text-base">{option}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild size="sm" className="w-full sm:w-auto">
                        <Link href="/get-coverage">Get a Quote</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Benefits Accordion */}
              <AccordionItem value="benefits">
                <AccordionTrigger className="text-lg md:text-xl font-semibold">
                  Benefits
                </AccordionTrigger>
                <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Benefits</CardTitle>
                    <CardDescription>Why choose our {insurance.title.toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {insurance.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${insurance.color} text-white shrink-0`}>
                            <Shield className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{benefit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                </AccordionContent>
              </AccordionItem>

              {/* How It Works Accordion */}
              <AccordionItem value="how-it-works">
                <AccordionTrigger className="text-lg md:text-xl font-semibold">
                  How It Works
                </AccordionTrigger>
                <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>Simple steps to get protected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {insurance.howItWorks.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${insurance.color} text-white shrink-0`}
                          >
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/get-coverage">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
                </AccordionContent>
                        </AccordionItem>

              {/* FAQ Accordion */}
              <AccordionItem value="faq">
                <AccordionTrigger className="text-lg md:text-xl font-semibold">
                  FAQ
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>Common questions about {insurance.title.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {insurance.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2">
                      <p className="text-sm text-muted-foreground">Don't see your question? Contact our support team.</p>
                      <Button variant="outline" asChild>
                        <Link href="#contact">Contact Support</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-8 md:py-12 lg:py-24 bg-muted/50">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-2 mb-4 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">What Our Customers Say</h2>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Real experiences from SafeSense users
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
                    <div className="rounded-full bg-primary/10 p-1.5 md:p-2">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Alex Thompson</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Customer since 2023</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    "The automatic claims process is incredible. When my flight was delayed by 4 hours, I received
                    compensation directly to my wallet without having to file anything. This is how insurance should
                    work!"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
                    <div className="rounded-full bg-primary/10 p-1.5 md:p-2">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Sarah Chen</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Customer since 2022</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    "After my DeFi protocol was hacked, I was devastated. SafeSense verified the incident and processed
                    my claim within 48 hours. Their crypto insurance literally saved my investment portfolio."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
                    <div className="rounded-full bg-primary/10 p-1.5 md:p-2">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Michael Rodriguez</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Customer since 2024</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    "The pay-per-mile car insurance has saved me hundreds of dollars since I work from home. I love that
                    I only pay for what I actually use, and the app makes everything so transparent."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Ready to Get Protected?</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-[600px]">
                Join thousands of satisfied customers who trust SafeSense with their {insurance.title.toLowerCase()}{" "}
                needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button size="sm" asChild>
                  <Link href="/get-coverage">Get Coverage Now</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="#contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-8 md:py-12 lg:py-24 bg-muted/50">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Have Questions?</h2>
                  <p className="text-muted-foreground">
                    Our insurance experts are here to help you find the perfect coverage for your needs.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    <span>Specialized in {insurance.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border bg-background p-6">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none">
                    Name
                  </label>
                  <input
                    id="name"
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={`I'm interested in learning more about ${insurance.title}...`}
                  />
                </div>
                <Button>Send Message</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-4 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-2 md:h-24 md:flex-row px-2 sm:px-4">
          <div className="flex gap-2 items-center text-base md:text-lg font-bold">
            <Shield className="h-4 w-4 md:h-5 md:w-5" />
            <span>SafeSense</span>
          </div>
          <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 SafeSense. All rights reserved.
          </p>
          <div className="flex gap-2 md:gap-4">
            <Link href="#" className="text-xs md:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-xs md:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

