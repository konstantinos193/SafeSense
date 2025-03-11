import Link from "next/link"
import { Shield, Check, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
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
            <nav className="hidden sm:flex items-center space-x-1">
              <Link href="/#features" className="px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/#insurance-categories" className="px-3 py-2 text-sm font-medium">
                Insurance
              </Link>
              <Link href="/pricing" className="px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/#faq" className="px-3 py-2 text-sm font-medium">
                FAQ
              </Link>
              <Link href="/#contact" className="px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </nav>
            <Button asChild size="sm" className="text-xs md:text-sm">
              <Link href="/get-coverage">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                  Simple, Transparent Pricing
                </h1>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-base lg:text-lg">
                  Choose the coverage that fits your needs with flexible payment options.
                </p>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 sm:gap-6 sm:py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Basic</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    For individual coverage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold">$29/mo</div>
                  <ul className="mt-4 space-y-2 text-xs md:text-sm">
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Single insurance category
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Up to $10,000 coverage
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      24/7 monitoring
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Basic smart contract integration
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Standard claims processing
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Email support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/pricing/get-started">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl md:text-2xl">Premium</CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        For multiple assets
                      </CardDescription>
                    </div>
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold">$99/mo</div>
                  <ul className="mt-4 space-y-2 text-xs md:text-sm">
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Up to 3 insurance categories
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Up to $100,000 coverage
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Advanced smart contract integration
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Priority claims processing
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Real-time risk monitoring
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      24/7 phone and email support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/pricing/get-started">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Enterprise</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    For businesses & institutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold">Custom</div>
                  <ul className="mt-4 space-y-2 text-xs md:text-sm">
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Unlimited insurance categories
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Custom coverage limits
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Custom risk assessment
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      API integration with your systems
                    </li>
                    <li className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      Custom smart contracts
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" size="sm" asChild>
                    <Link href="/pricing/contact-sales">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8 sm:mt-12 space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl/tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="max-w-[700px] text-muted-foreground text-sm md:text-base">
                    Common questions about our pricing and plans
                  </p>
                </div>
              </div>
              
              <div className="mx-auto max-w-3xl grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm md:text-base">Can I change plans later?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm md:text-base">Is there a contract or commitment?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    No, all plans are month-to-month with no long-term contracts. You can cancel anytime.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm md:text-base">What payment methods do you accept?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    We accept all major credit cards, cryptocurrency payments (BTC, ETH, USDC), and bank transfers for annual plans.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm md:text-base">Are there any discounts available?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Yes, we offer a 10% discount for annual payments and a 5% discount for cryptocurrency payments.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm md:text-base">What's included in the Enterprise plan?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Enterprise plans include custom coverage limits, dedicated account management, API integrations, custom smart contracts, and more.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm md:text-base">Can I get a refund if I'm not satisfied?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Yes, we offer a 30-day money-back guarantee for all new subscriptions if you're not completely satisfied.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-16 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl/tight">
                  Ready to get started?
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-sm md:text-base">
                  Choose the plan that works for you and start protecting your assets today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button size="sm" asChild className="w-full sm:w-auto">
                  <Link href="/pricing/get-started">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-4 md:py-6">
        <div className="container px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
            <div className="flex gap-2 items-center text-base md:text-lg font-bold">
              <Shield className="h-4 w-4 md:h-5 md:w-5" />
              <span>SafeSense</span>
            </div>
            <p className="text-center text-xs md:text-sm text-muted-foreground md:text-left">
              © 2025 SafeSense. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
