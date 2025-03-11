"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, ArrowRight, Check, CreditCard, Wallet, Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GetStartedPage() {
  const [selectedPlan, setSelectedPlan] = useState("basic")
  const [step, setStep] = useState(1)
  const totalSteps = 3
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }
  
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
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Get Started with SafeSense</h1>
              <p className="text-muted-foreground mt-2">Select your plan and complete your subscription</p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step > index + 1 
                          ? "bg-primary text-primary-foreground" 
                          : step === index + 1 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className="text-xs mt-1 hidden md:block">
                      {index === 0 ? "Select Plan" : 
                       index === 1 ? "Account Details" : 
                       "Payment"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Step 1: Select Plan */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Plan</CardTitle>
                  <CardDescription>Select the plan that best fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={selectedPlan} 
                    onValueChange={setSelectedPlan}
                    className="grid gap-4"
                  >
                    <div className={`relative rounded-lg border-2 p-4 ${selectedPlan === "basic" ? "border-primary" : "border-muted"}`}>
                      <RadioGroupItem value="basic" id="basic" className="absolute right-4 top-4 sr-only" />
                      <Label htmlFor="basic" className="flex justify-between cursor-pointer">
                        <div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <span className="font-bold text-lg">Basic Plan</span>
                          </div>
                          <p className="text-muted-foreground mt-1">For individual coverage</p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Single insurance category
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Up to $10,000 coverage
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              24/7 monitoring
                            </li>
                          </ul>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$29</div>
                          <div className="text-sm text-muted-foreground">per month</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className={`relative rounded-lg border-2 p-4 ${selectedPlan === "premium" ? "border-primary" : "border-muted"}`}>
                      <RadioGroupItem value="premium" id="premium" className="absolute right-4 top-4 sr-only" />
                      <Label htmlFor="premium" className="flex justify-between cursor-pointer">
                        <div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <span className="font-bold text-lg">Premium Plan</span>
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Popular</span>
                          </div>
                          <p className="text-muted-foreground mt-1">For multiple assets</p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Up to 3 insurance categories
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Up to $100,000 coverage
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Smart contract integration
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Priority claims processing
                            </li>
                          </ul>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$99</div>
                          <div className="text-sm text-muted-foreground">per month</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="relative rounded-lg border-2 border-muted p-4 bg-muted/10">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <span className="font-bold text-lg">Enterprise Plan</span>
                          </div>
                          <p className="text-muted-foreground mt-1">For businesses & institutions</p>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/pricing/contact-sales">Contact Sales</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">Custom</div>
                          <div className="text-sm text-muted-foreground">pricing</div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-2">Plan Summary</h3>
                    <div className="flex justify-between mb-2">
                      <span>Plan:</span>
                      <span className="font-medium">{selectedPlan === "basic" ? "Basic" : "Premium"}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Billing:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${selectedPlan === "basic" ? "29" : "99"}/month</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} disabled={step === 1} asChild>
                    <Link href="/#pricing">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pricing
                    </Link>
                  </Button>
                  <Button onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 2: Account Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Create your SafeSense account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password</Label>
                    <Input id="password" type="password" />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long and include a number and special character.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Selected Plan: {selectedPlan === "basic" ? "Basic" : "Premium"}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${selectedPlan === "basic" ? "29" : "99"}/month • Cancel anytime
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay for your subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="crypto">
                        <Wallet className="h-4 w-4 mr-2" />
                        Cryptocurrency
                      </TabsTrigger>
                      <TabsTrigger value="bank">
                        <Building className="h-4 w-4 mr-2" />
                        Bank Transfer
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input id="card-name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="crypto" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-type">Select Cryptocurrency</Label>
                        <select id="crypto-type" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                          <option value="btc">Bitcoin (BTC)</option>
                          <option value="eth">Ethereum (ETH)</option>
                          <option value="usdc">USD Coin (USDC)</option>
                          <option value="usdt">Tether (USDT)</option>
                        </select>
                      </div>
                      <div className="p-4 border rounded-md bg-muted/20">
                        <p className="text-sm mb-2">
                          You'll receive payment instructions after clicking "Complete Subscription"
                        </p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Cryptocurrency payments receive a 5% discount</li>
                          <li>• Payments are processed through our secure crypto gateway</li>
                          <li>• Subscription will activate immediately after confirmation</li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bank" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Account Holder Name</Label>
                        <Input id="account-name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input id="account-number" placeholder="123456789" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routing-number">Routing Number</Label>
                        <Input id="routing-number" placeholder="123456789" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Bank transfers may take 1-3 business days to process. Your subscription will activate once payment is confirmed.
                      </p>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                      <span>{selectedPlan === "basic" ? "Basic" : "Premium"} Plan:</span>
                      <span className="font-medium">${selectedPlan === "basic" ? "29" : "99"}/month</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                      <span>Billing cycle:</span>
                      <span>Monthly</span>
                    </div>
                    <div className="border-t my-2"></div>
                    <div className="flex justify-between font-medium">
                      <span>Total today:</span>
                      <span>${selectedPlan === "basic" ? "29" : "99"}.00</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-start gap-2">
                    <input type="checkbox" id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>. I understand that my subscription will automatically renew each month until canceled.
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button>
                    Complete Subscription
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <div className="flex gap-2 items-center text-lg font-bold">
              <Shield className="h-5 w-5" />
              <span>SafeSense</span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2025 SafeSense. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
