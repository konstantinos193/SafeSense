"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GetCoverage() {
  const [step, setStep] = useState(1)
  const [insuranceType, setInsuranceType] = useState("")
  const [coverageAmount, setCoverageAmount] = useState("50000")

  const totalSteps = 4

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

      <main className="flex-1 py-8 md:py-16 lg:py-20">
        <div className="container px-2 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Get Coverage</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">Complete the steps below to get your insurance quote</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 sm:mb-10">
              <div className="flex justify-between mb-1 sm:mb-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        step > index + 1
                          ? "bg-primary text-primary-foreground"
                          : step === index + 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > index + 1 ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : index + 1}
                    </div>
                    <span className="text-[10px] sm:text-xs mt-1 hidden md:block">
                      {index === 0
                        ? "Insurance Type"
                        : index === 1
                          ? "Coverage Details"
                          : index === 2
                            ? "Personal Info"
                            : "Review & Quote"}
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

            {/* Step 1: Choose Insurance Type */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Select Insurance Type</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Choose the type of insurance coverage you need</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={insuranceType}
                    onValueChange={setInsuranceType}
                    className="grid gap-2 sm:gap-4 md:grid-cols-2"
                  >
                    <InsuranceOption
                      value="crypto"
                      title="Crypto Insurance"
                      description="Protect your digital assets against hacks, theft, and smart contract failures"
                      selected={insuranceType === "crypto"}
                    />
                    <InsuranceOption
                      value="car"
                      title="Car Insurance"
                      description="Smart telematics-based claims and pay-per-mile options"
                      selected={insuranceType === "car"}
                    />
                    <InsuranceOption
                      value="home"
                      title="Home Insurance"
                      description="Smart home integration with IoT sensors for automatic damage detection"
                      selected={insuranceType === "home"}
                    />
                    <InsuranceOption
                      value="health"
                      title="Health Insurance"
                      description="Decentralized medical records and usage-based premiums"
                      selected={insuranceType === "health"}
                    />
                    <InsuranceOption
                      value="business"
                      title="Business Insurance"
                      description="Smart contracts for employee benefits and supply chain insurance"
                      selected={insuranceType === "business"}
                    />
                    <InsuranceOption
                      value="travel"
                      title="Travel Insurance"
                      description="Flight delay compensation and lost luggage coverage"
                      selected={insuranceType === "travel"}
                    />
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep} disabled={!insuranceType}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Coverage Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Coverage Details</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Tell us more about what you want to insure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {insuranceType === "crypto" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="wallet-address">Wallet Address (optional)</Label>
                        <Input id="wallet-address" placeholder="0x..." />
                        <p className="text-xs text-muted-foreground">
                          We'll never share your wallet address with third parties
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverage-amount">Coverage Amount</Label>
                        <div className="flex items-center space-x-4">
                          <Input
                            id="coverage-amount"
                            type="range"
                            min="10000"
                            max="1000000"
                            step="10000"
                            value={coverageAmount}
                            onChange={(e) => setCoverageAmount(e.target.value)}
                            className="w-full"
                          />
                          <span className="font-medium">${Number.parseInt(coverageAmount).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Coverage Type</Label>
                        <RadioGroup defaultValue="full">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="full" id="full" />
                            <Label htmlFor="full">Full Coverage (theft, hacks, smart contract failures)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="theft" id="theft" />
                            <Label htmlFor="theft">Theft Protection Only</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="smart-contract" id="smart-contract" />
                            <Label htmlFor="smart-contract">Smart Contract Failures Only</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Assets to Cover</Label>
                        <RadioGroup defaultValue="all">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all-assets" />
                            <Label htmlFor="all-assets">All Crypto Assets</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="specific" id="specific-assets" />
                            <Label htmlFor="specific-assets">Specific Assets Only</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  {insuranceType === "car" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="car-make">Car Make</Label>
                        <Input id="car-make" placeholder="e.g., Toyota" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="car-model">Car Model</Label>
                        <Input id="car-model" placeholder="e.g., Camry" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="car-year">Year</Label>
                        <Select defaultValue="2023">
                          <SelectTrigger id="car-year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => 2025 - i).map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Coverage Type</Label>
                        <RadioGroup defaultValue="telematics">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="telematics" id="telematics" />
                            <Label htmlFor="telematics">
                              Telematics-Based (lower premiums based on driving habits)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pay-per-mile" id="pay-per-mile" />
                            <Label htmlFor="pay-per-mile">Pay-Per-Mile (best for low mileage drivers)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard">Standard Coverage</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  {insuranceType !== "crypto" && insuranceType !== "car" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="coverage-amount">Coverage Amount</Label>
                        <div className="flex items-center space-x-4">
                          <Input
                            id="coverage-amount"
                            type="range"
                            min="10000"
                            max="1000000"
                            step="10000"
                            value={coverageAmount}
                            onChange={(e) => setCoverageAmount(e.target.value)}
                            className="w-full"
                          />
                          <span className="font-medium">${Number.parseInt(coverageAmount).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverage-details">Additional Details</Label>
                        <Textarea
                          id="coverage-details"
                          placeholder="Please provide any additional details about what you want to insure..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Personal Information */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Personal Information</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Tell us a bit about yourself</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-preference">Preferred Payment Method</Label>
                    <Select defaultValue="crypto">
                      <SelectTrigger id="payment-preference">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 4: Review & Quote */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Your Insurance Quote</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Review your information and get your personalized quote</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="rounded-lg border bg-muted/50 p-3 sm:p-4">
                    <div className="grid gap-2 sm:gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurance Type:</span>
                        <span className="font-medium">
                          {insuranceType === "crypto"
                            ? "Crypto Insurance"
                            : insuranceType === "car"
                              ? "Car Insurance"
                              : insuranceType === "home"
                                ? "Home Insurance"
                                : insuranceType === "health"
                                  ? "Health Insurance"
                                  : insuranceType === "business"
                                    ? "Business Insurance"
                                    : "Travel Insurance"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coverage Amount:</span>
                        <span className="font-medium">${Number.parseInt(coverageAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Premium:</span>
                        <span className="font-medium text-lg text-primary">
                          ${Math.round(Number.parseInt(coverageAmount) * 0.001).toLocaleString()}/month
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Coverage Details</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>24/7 blockchain monitoring and protection</li>
                      <li>Automatic claims processing via smart contracts</li>
                      <li>Coverage effective immediately upon payment</li>
                      <li>No hidden fees or deductibles</li>
                      <li>Cancel anytime with no penalties</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border bg-primary/10 p-4">
                    <h3 className="font-medium text-primary mb-2">Special Offer</h3>
                    <p className="text-sm">Pay annually and save 10% on your premium!</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 w-full">
                    <input type="checkbox" id="terms" className="rounded border-gray-300" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button className="bg-primary">Purchase Coverage</Button>
                  </div>
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

function InsuranceOption({ value, title, description, selected }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className={`flex flex-col space-y-1 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${
          selected ? "border-primary" : "border-muted"
        }`}
      >
        <span className="font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </Label>
    </div>
  )
}

