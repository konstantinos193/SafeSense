"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Shield, Coins, Lock, BarChart3, Users, Mail, Car, Heart, Plane, Briefcase, Calendar, Home as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-provider"
import { TranslatedText } from "@/components/translated-text"

const insuranceCards = {
  popular: [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Crypto Insurance",
      description: "Protect your digital investments against hacks, theft, and smart contract failures.",
      features: ["DeFi Protocol Insurance", "Crypto Wallet Protection", "Exchange Insurance"],
      type: "crypto"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Health Insurance",
      description: "Decentralized medical records and usage-based premiums with DeFi health savings.",
      features: ["Decentralized medical records", "Usage-based premiums", "DeFi health savings"],
      type: "health"
    },
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Car Insurance",
      description: "Smart telematics-based claims and pay-per-mile options with automatic payouts.",
      features: ["Telematics-based claims", "Pay-per-mile insurance", "Decentralized claims auditing"],
      type: "car"
    }
  ],
  personal: [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Health Insurance",
      description: "Decentralized medical records and usage-based premiums with DeFi health savings.",
      features: ["Decentralized medical records", "Usage-based premiums", "DeFi health savings"],
      type: "health"
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-primary" />,
      title: "Home Insurance",
      description: "Smart home integration with IoT sensors for automatic damage detection and claims.",
      features: ["Smart home integration", "Disaster response insurance", "Renters insurance"],
      type: "home"
    },
    {
      icon: <Plane className="h-8 w-8 text-primary" />,
      title: "Travel Insurance",
      description: "Flight delay compensation and lost luggage coverage with automatic claims processing.",
      features: ["Flight delay compensation", "Lost luggage coverage", "COVID-19 coverage"],
      type: "travel"
    }
  ],
  business: [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Business Insurance",
      description: "Smart contracts for employee benefits and supply chain insurance with automatic claims.",
      features: ["Employee benefits", "Supply chain insurance", "Cybersecurity insurance"],
      type: "business"
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Event Insurance",
      description: "Coverage for event cancellations or disruptions with automatic refunds.",
      features: ["Concert/sports event insurance", "Wedding insurance", "Automatic refunds"],
      type: "business"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Agricultural Insurance",
      description: "Crop and livestock insurance with automatic claims based on weather data.",
      features: ["Crop insurance", "Livestock insurance", "Weather data triggers"],
      type: "business"
    }
  ],
  digital: [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "NFT Insurance",
      description: "Protect your Non-Fungible Tokens against theft, damage, or market volatility.",
      features: ["NFT theft protection", "Market value insurance", "Automatic claims processing"],
      type: "crypto"
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "DeFi Protocol Insurance",
      description: "Coverage for funds invested in decentralized finance protocols against hacks or exploits.",
      features: ["Smart contract failure coverage", "Rug pull protection", "Yield farming insurance"],
      type: "crypto"
    },
    {
      icon: <Coins className="h-8 w-8 text-primary" />,
      title: "Gaming & Esports",
      description: "Esports tournament coverage and in-game asset insurance.",
      features: ["Tournament insurance", "In-game asset protection", "Technical issue coverage"],
      type: "crypto"
    }
  ]
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("popular");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Shield className="h-6 w-6" />
            <span>SafeSense</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link href="/features" className="px-3 py-2 text-sm font-medium">
                <TranslatedText text="Features" />
              </Link>
              <Link href="/insurance" className="px-3 py-2 text-sm font-medium">
                <TranslatedText text="Insurance" />
              </Link>
              <Link href="#pricing" className="px-3 py-2 text-sm font-medium">
                <TranslatedText text="Pricing" />
              </Link>
              <Link href="/faq" className="px-3 py-2 text-sm font-medium">
                <TranslatedText text="FAQ" />
              </Link>
              <Link href="#contact" className="px-3 py-2 text-sm font-medium">
                <TranslatedText text="Contact" />
              </Link>
              <LanguageSelector />
              <ThemeToggle />
              <Link href="/get-coverage">
                <Button>
                  <TranslatedText text="Get Started" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    <TranslatedText text="Blockchain-Powered Insurance for Everything" />
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    <TranslatedText text="From crypto to cars, health to homes - protect what matters with our innovative blockchain insurance solutions." />
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/get-coverage">
                    <Button size="lg">
                      <TranslatedText text="Get Coverage Now" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      <TranslatedText text="Learn More" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-b from-primary/20 to-primary/5 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-40 w-40 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  <TranslatedText text="Blockchain-Powered Insurance Benefits" />
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <TranslatedText text="Our insurance solutions leverage blockchain technology for transparency, efficiency, and security." />
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lock className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle><TranslatedText text="Automatic Claims" /></CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText text="Smart contracts automatically process and pay out claims when verified conditions are met, eliminating delays." />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle><TranslatedText text="Transparent Policies" /></CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText text="All policy terms and conditions are stored on the blockchain, ensuring complete transparency and immutability." />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Coins className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle><TranslatedText text="Crypto Payments" /></CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText text="Pay premiums and receive claims in cryptocurrency or stablecoins with lower fees and faster processing." />
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="insurance-categories" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  <TranslatedText text="Insurance Solutions" />
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <TranslatedText text="Explore our innovative blockchain-powered insurance categories" />
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant={selectedCategory === "popular" ? "default" : "outline"}
                onClick={() => setSelectedCategory("popular")}
                className="transition-all duration-200"
              >
                <TranslatedText text="Popular" />
              </Button>
              <Button 
                variant={selectedCategory === "personal" ? "default" : "outline"}
                onClick={() => setSelectedCategory("personal")}
                className="transition-all duration-200"
              >
                <TranslatedText text="Personal" />
              </Button>
              <Button 
                variant={selectedCategory === "business" ? "default" : "outline"}
                onClick={() => setSelectedCategory("business")}
                className="transition-all duration-200"
              >
                <TranslatedText text="Business" />
              </Button>
              <Button 
                variant={selectedCategory === "digital" ? "default" : "outline"}
                onClick={() => setSelectedCategory("digital")}
                className="transition-all duration-200"
              >
                <TranslatedText text="Digital Assets" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {Object.entries(insuranceCards).map(([category, cards]) => (
                cards.map((card, index) => (
                  <div
                    key={`${category}-${index}`}
                    className={`transition-all duration-300 ${
                      selectedCategory === category 
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 hidden"
                    }`}
                  >
                    <InsuranceCard {...card} />
                  </div>
                ))
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  <TranslatedText text="How It Works" />
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <TranslatedText text="Our blockchain-powered insurance process is simple, transparent, and efficient" />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <TranslatedText text="Choose Coverage" />
                </h3>
                <p className="text-muted-foreground">
                  <TranslatedText text="Select from our range of insurance categories and customize your coverage to fit your needs." />
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <TranslatedText text="Smart Contract Policy" />
                </h3>
                <p className="text-muted-foreground">
                  <TranslatedText text="Your policy is created as a smart contract on the blockchain, ensuring transparency and immutability." />
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <TranslatedText text="Automatic Claims" />
                </h3>
                <p className="text-muted-foreground">
                  <TranslatedText text="When a covered event occurs, verified by real-world data, your claim is automatically processed and paid." />
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  <TranslatedText text="Simple, Transparent Pricing" />
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <TranslatedText text="Choose the coverage that fits your needs with flexible payment options." />
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle><TranslatedText text="Basic" /></CardTitle>
                  <CardDescription><TranslatedText text="For individual coverage" /></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold"><TranslatedText text="$29/mo" /></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Single insurance category" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Up to $10,000 coverage" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="24/7 monitoring" />
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/get-coverage" className="w-full">
                    <Button className="w-full">
                      <TranslatedText text="Get Started" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle><TranslatedText text="Premium" /></CardTitle>
                  <CardDescription><TranslatedText text="For multiple assets" /></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold"><TranslatedText text="$99/mo" /></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Up to 3 insurance categories" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Up to $100,000 coverage" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Smart contract integration" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Priority claims processing" />
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/get-coverage" className="w-full">
                    <Button className="w-full">
                      <TranslatedText text="Get Started" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle><TranslatedText text="Enterprise" /></CardTitle>
                  <CardDescription><TranslatedText text="For businesses & institutions" /></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold"><TranslatedText text="Custom" /></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Unlimited insurance categories" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Custom coverage limits" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Dedicated account manager" />
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <TranslatedText text="Custom risk assessment" />
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/contact-sales" className="w-full" variant="outline">
                    <TranslatedText text="Contact Sales" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  <TranslatedText text="Frequently Asked Questions" />
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <TranslatedText text="Find answers to common questions about our blockchain-based insurance services." />
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <TranslatedText text="How does blockchain-based insurance work?" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <TranslatedText text="Blockchain-based insurance uses smart contracts to automate policy management and claims processing. You pay premiums in cryptocurrency or traditional currency, and the policy terms are stored on the blockchain. When a covered event occurs (verified by data sources like IoT devices, weather data, or official reports), the smart contract automatically processes your claim and issues payment without manual intervention." />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <TranslatedText text="What types of assets do you cover?" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <TranslatedText text="We offer comprehensive coverage across multiple categories including crypto assets, vehicles, homes, health, travel, business assets, intellectual property, NFTs, pets, and more. Each insurance type has specific coverage options tailored to the unique risks of that asset class. Contact us for a complete list of covered assets in your area of interest." />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <TranslatedText text="How do I file a claim?" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <TranslatedText text="Many claims are processed automatically through our smart contract system when verified data confirms a covered event. For claims that require additional verification, simply log into your account dashboard, navigate to the claims section, and follow the guided process. You'll need to provide details about the incident and any required documentation. Our team reviews manual claims promptly, typically within 24-48 hours." />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <TranslatedText text="Can I pay premiums in cryptocurrency?" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <TranslatedText text="Yes, we accept premium payments in major cryptocurrencies including Bitcoin, Ethereum, and stablecoins like USDC and DAI. We also offer traditional payment methods for those who prefer them. Cryptocurrency payments often result in lower fees and faster processing times for both premiums and claims." />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    <TranslatedText text="How are premiums calculated?" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <TranslatedText text="Premiums are calculated based on several factors including the value of assets being insured, the specific risks being covered, historical data, and real-time risk assessment. For certain insurance types like car or health insurance, we can use data from connected devices to offer usage-based pricing that rewards safe behavior with lower premiums. We offer personalized quotes after a brief risk assessment." />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    <TranslatedText text="Get in Touch" />
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    <TranslatedText text="Have questions about our insurance solutions? Our team is here to help." />
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>support@safesense.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>123 Blockchain Avenue, Innovation City</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border bg-background p-6">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none">
                    <TranslatedText text="Name" />
                  </label>
                  <input
                    id="name"
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    <TranslatedText text="Email" />
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
                    <TranslatedText text="Message" />
                  </label>
                  <textarea
                    id="message"
                    className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your message"
                  />
                </div>
                <Button>
                  <TranslatedText text="Send Message" />
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
            <TranslatedText text="© 2025 SafeSense. All rights reserved." />
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              <TranslatedText text="Terms" />
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              <TranslatedText text="Privacy" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Memoized InsuranceCard component to prevent unnecessary re-renders
const InsuranceCard = React.memo(function InsuranceCard({ icon, title, description, features, type }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">{icon}</div>
        <CardTitle><TranslatedText text={title} /></CardTitle>
        <CardDescription><TranslatedText text={description} /></CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Shield className="mr-2 h-4 w-4 text-primary mt-0.5 shrink-0" />
              <TranslatedText text={feature} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={`/insurance/${type}`} className="w-full">
          <Button variant="outline" className="w-full">
            <TranslatedText text="Learn More" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
});

