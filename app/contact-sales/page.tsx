import Link from "next/link"
import { Shield, Building, Users, BarChart3, Check, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContactSalesPage() {
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
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Enterprise Solutions</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Custom insurance solutions for businesses and institutions of all sizes.
                </p>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tailored Coverage</h3>
                    <p className="text-sm text-muted-foreground">
                      Custom insurance solutions designed specifically for your business needs and risk profile.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dedicated Account Manager</h3>
                    <p className="text-sm text-muted-foreground">
                      Work with a dedicated insurance specialist who understands your business and industry.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Advanced Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive risk analysis and custom pricing models based on your specific business operations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg mt-6">
                <h3 className="font-medium mb-2">Enterprise Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Unlimited insurance categories</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Custom coverage limits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">API integration with your existing systems</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Custom smart contracts for your specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Employee benefits administration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Detailed analytics and reporting</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Contact Our Sales Team</CardTitle>
                  <CardTitle>Contact Our Sales Team</CardTitle>
                  <CardDescription>
                    Fill out the form below and our enterprise team will get back to you within 24 hours.
                  </CardDescription>
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
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="Chief Risk Officer" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@company.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Company Size</Label>
                    <RadioGroup defaultValue="medium">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small">1-50 employees</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">51-500 employees</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large">501-1000 employees</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <Label htmlFor="enterprise">1000+ employees</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="insurance-needs">Insurance Needs</Label>
                    <Textarea 
                      id="insurance-needs" 
                      placeholder="Please describe your company's insurance needs and any specific requirements..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="marketing" className="mt-1" />
                    <Label htmlFor="marketing" className="text-sm font-normal">
                      I agree to receive marketing communications from SafeSense. You can unsubscribe at any time.
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/#pricing">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pricing
                    </Link>
                  </Button>
                  <Button>
                    Submit Request
                  </Button>
                </CardFooter>
              </Card>
            </div>
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