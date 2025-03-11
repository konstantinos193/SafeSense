"use client"

import Link from "next/link"
import { Shield, Coins, Lock, BarChart3, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function FeaturesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className={`flex min-h-screen flex-col ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Shield className="h-6 w-6" />
            <span>SafeSense</span>
          </div>
          <div className="block md:hidden">
            <Button variant="ghost" size="sm" className="px-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium">
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
              <Link href="/get-started">Get Started</Link>
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
                href="/" 
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/features" 
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
                <Link href="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
      
      <main className="flex-1">
        <section className="w-full py-8 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                  Blockchain-Powered Insurance Features
                </h1>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how our innovative blockchain technology transforms insurance
                </p>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 sm:gap-6 sm:py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<Lock className="h-8 w-8 text-primary" />}
                title="Automatic Claims"
                description="Smart contracts automatically process and pay out claims when verified conditions are met, eliminating delays."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-8 w-8 text-primary" />}
                title="Transparent Policies"
                description="All policy terms and conditions are stored on the blockchain, ensuring complete transparency and immutability."
              />
              <FeatureCard 
                icon={<Coins className="h-8 w-8 text-primary" />}
                title="Crypto Payments"
                description="Pay premiums and receive claims in cryptocurrency or stablecoins with lower fees and faster processing."
              />
              <FeatureCard 
                icon={<Shield className="h-8 w-8 text-primary" />}
                title="Enhanced Security"
                description="Blockchain technology provides unmatched security for your policy data and claims processing."
              />
              <FeatureCard 
                icon={<Shield className="h-8 w-8 text-primary" />}
                title="Global Coverage"
                description="Access insurance protection anywhere in the world with our borderless blockchain solution."
              />
              <FeatureCard 
                icon={<Shield className="h-8 w-8 text-primary" />}
                title="Customizable Policies"
                description="Create tailored insurance coverage that meets your specific needs with flexible smart contracts."
              />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t py-4 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2 items-center text-lg font-bold">
            <Shield className="h-5 w-5" />
            <span>SafeSense</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 SafeSense. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs sm:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-xs sm:text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Simple feature card component
function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
