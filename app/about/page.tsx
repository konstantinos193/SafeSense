"use client"

import Link from "next/link"
import { Shield, Lock, BarChart3, Users, Check, Zap, Globe, Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("smart-contracts")

  return (
    <div className={`flex min-h-screen flex-col ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span>SafeSense</span>
            </Link>
          </div>
          <div className="block md:hidden">
            <Button variant="ghost" size="sm" className="px-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/#features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="/#insurance-categories" className="text-sm font-medium">
              Insurance
            </Link>
            <Link href="/#pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <Link href="/#faq" className="text-sm font-medium">
              FAQ
            </Link>
            <Link href="/#contact" className="text-sm font-medium">
              Contact
            </Link>
            <Button asChild>
              <Link href="/get-coverage">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <div className="container flex flex-col space-y-4 p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="self-end px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/#features" 
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/#insurance-categories" 
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insurance
              </Link>
              <Link 
                href="/#pricing" 
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/#faq" 
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/#contact" 
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="mt-4">
                <Link href="/get-coverage" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Revolutionizing Insurance with Blockchain
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SafeSense is transforming the insurance industry with transparent, efficient, and secure blockchain
                  technology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button size="lg" asChild>
                  <Link href="/get-coverage">Get Coverage Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#our-mission">Our Mission</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section id="our-mission" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">Our Mission</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Making Insurance Fair, Transparent, and Accessible
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  At SafeSense, we believe insurance should work for you, not against you. Our mission is to create a
                  new insurance paradigm that eliminates the friction, delays, and opacity of traditional insurance.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Automatic claims processing without bureaucracy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Transparent policies with no hidden clauses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Fair pricing based on actual risk and usage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Global accessibility with cryptocurrency payments</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-b from-primary/20 to-primary/5 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-40 w-40 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blockchain Technology Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Blockchain Technology</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SafeSense leverages cutting-edge blockchain technology to create a new generation of insurance
                  products.
                </p>
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto">
              <div className="flex space-x-2 mb-6">
                <Button 
                  variant={activeTab === "smart-contracts" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setActiveTab("smart-contracts")}
                >
                  Smart Contracts
                </Button>
                <Button 
                  variant={activeTab === "data-oracles" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setActiveTab("data-oracles")}
                >
                  Data Oracles
                </Button>
                <Button 
                  variant={activeTab === "defi-integration" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setActiveTab("defi-integration")}
                >
                  DeFi Integration
                </Button>
              </div>

              {/* Smart Contracts Content */}
              {activeTab === "smart-contracts" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Smart Contract Policies</CardTitle>
                    <CardDescription>Self-executing insurance policies with code-enforced terms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Our insurance policies are encoded as smart contracts on the blockchain, creating self-executing
                      agreements that automatically enforce the terms and conditions without requiring trust in a third
                      party.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Immutable Policy Terms</p>
                          <p className="text-sm text-muted-foreground">
                            Once a policy is created, its terms cannot be altered without your consent, ensuring
                            complete transparency.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Automatic Execution</p>
                          <p className="text-sm text-muted-foreground">
                            Claims are automatically processed and paid when verified conditions are met, eliminating
                            delays and disputes.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Auditable Code</p>
                          <p className="text-sm text-muted-foreground">
                            All policy code is open-source and auditable, ensuring that it functions exactly as
                            described.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Reduced Overhead</p>
                          <p className="text-sm text-muted-foreground">
                            Automation reduces administrative costs, allowing us to offer more competitive premiums.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Data Oracles Content */}
              {activeTab === "data-oracles" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Real-World Data Oracles</CardTitle>
                    <CardDescription>Connecting blockchain to real-world events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Our system uses decentralized data oracles to connect smart contracts with real-world data,
                      enabling automatic verification of insurance claims based on objective information.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">IoT Device Integration</p>
                          <p className="text-sm text-muted-foreground">
                            Smart home sensors, telematics devices, and wearables provide real-time data for risk
                            assessment and claims verification.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Weather Data</p>
                          <p className="text-sm text-muted-foreground">
                            Verified weather data triggers automatic payouts for natural disasters and weather-related
                            claims.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Flight Status Tracking</p>
                          <p className="text-sm text-muted-foreground">
                            Real-time flight data enables automatic compensation for delays and cancellations.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Blockchain Monitoring</p>
                          <p className="text-sm text-muted-foreground">
                            Continuous monitoring of blockchain transactions for crypto theft detection and
                            verification.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* DeFi Integration Content */}
              {activeTab === "defi-integration" && (
                <Card>
                  <CardHeader>
                    <CardTitle>DeFi Integration</CardTitle>
                    <CardDescription>Leveraging decentralized finance for better insurance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      SafeSense integrates with decentralized finance (DeFi) protocols to create innovative insurance
                      products with enhanced capital efficiency and yield generation.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Premium Yield Generation</p>
                          <p className="text-sm text-muted-foreground">
                            Insurance premiums are put to work in DeFi protocols, generating yield that reduces costs.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Liquidity Pools</p>
                          <p className="text-sm text-muted-foreground">
                            Decentralized liquidity pools ensure claims can be paid instantly, even for large events.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Health Savings Accounts</p>
                          <p className="text-sm text-muted-foreground">
                            DeFi-powered health savings accounts generate yield while funds are not being used.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Stablecoin Payments</p>
                          <p className="text-sm text-muted-foreground">
                            Premium payments and claims can be made in stablecoins, reducing volatility concerns.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* How We're Different Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How We're Different</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SafeSense is fundamentally reimagining insurance for the digital age.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>No More Waiting</CardTitle>
                  <CardDescription>
                    Traditional insurance can take weeks or months to process claims. Our smart contracts execute
                    instantly when conditions are met.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    When a covered event occurs, our system automatically verifies it through trusted data sources and
                    processes your claim immediately—often within minutes, not weeks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>True Transparency</CardTitle>
                  <CardDescription>
                    No more fine print or hidden exclusions. All policy terms are clearly encoded in smart contracts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our policies are written in code that executes exactly as specified. You can verify exactly what is
                    covered and what triggers a payout before you purchase.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Global Accessibility</CardTitle>
                  <CardDescription>
                    Insurance for anyone, anywhere, without geographic restrictions or banking limitations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    By accepting cryptocurrency payments and using blockchain for policy management, we can offer
                    insurance to anyone with an internet connection, regardless of location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Usage-Based Pricing</CardTitle>
                  <CardDescription>
                    Pay only for what you use with dynamic pricing based on actual risk and usage patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our telematics and IoT integrations allow us to offer pay-per-mile car insurance, usage-based health
                    premiums, and other dynamic pricing models that reward safe behavior.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Innovative Coverage</CardTitle>
                  <CardDescription>
                    Insurance for digital assets and emerging risks that traditional insurers don't understand.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We specialize in covering new types of assets like cryptocurrencies, NFTs, and digital identities,
                    as well as emerging risks in the digital economy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community Governance</CardTitle>
                  <CardDescription>
                    Insurance that evolves with community input and decentralized governance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our platform incorporates community feedback and governance to continuously improve our products and
                    ensure they meet the evolving needs of our users.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Team</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the experts behind SafeSense's innovative insurance solutions.
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="h-40 w-40 rounded-full bg-muted mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="Team member"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Dr. Sarah Chen</h3>
                <p className="text-sm text-muted-foreground mb-2">Founder & CEO</p>
                <p className="text-sm text-muted-foreground max-w-[300px]">
                  Former insurance executive with 15 years of experience and a PhD in Actuarial Science. Blockchain
                  enthusiast since 2013.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-40 w-40 rounded-full bg-muted mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="Team member"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Michael Rodriguez</h3>
                <p className="text-sm text-muted-foreground mb-2">CTO</p>
                <p className="text-sm text-muted-foreground max-w-[300px]">
                  Blockchain developer and smart contract expert. Previously led engineering teams at major DeFi
                  protocols.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-40 w-40 rounded-full bg-muted mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="Team member"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Alex Thompson</h3>
                <p className="text-sm text-muted-foreground mb-2">Chief Risk Officer</p>
                <p className="text-sm text-muted-foreground max-w-[300px]">
                  Risk management specialist with experience in both traditional insurance and cryptocurrency markets.
                </p>
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
                  Join thousands of satisfied customers who have already made the switch to blockchain-powered
                  insurance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/get-coverage">Get Coverage Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#insurance-categories">Explore Insurance Types</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container px-4">
          <div className="flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
            <div className="flex gap-2 items-center text-lg font-bold">
              <Shield className="h-5 w-5" />
              <span>SafeSense</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              © 2025 SafeSense. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

