import Link from "next/link"
import {
  Shield,
  Coins,
  Lock,
  BarChart3,
  Users,
  Car,
  Heart,
  Plane,
  Briefcase,
  Calendar,
  Home,
  Dog,
  Umbrella,
  FileText,
  Cloud,
  Leaf,
  Gamepad,
  Zap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InsurancePage() {
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
              <Link href="/insurance" className="px-3 py-2 text-sm font-medium text-primary">
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
                  Blockchain-Powered Insurance Solutions
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive protection for traditional and digital assets with transparent policies and automatic
                  claims processing
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button size="lg" asChild>
                  <Link href="/get-coverage">Get Coverage Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Insurance Categories</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From crypto to traditional assets, we've got you covered with innovative blockchain-based insurance
                </p>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="crypto">Crypto & Digital</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="property">Property</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <InsuranceCard
                    icon={<Shield className="h-8 w-8 text-primary" />}
                    title="Crypto Insurance"
                    description="Protect your DeFi investments, crypto wallets, and exchange assets against hacks, theft, and smart contract failures."
                    type="crypto"
                  />
                  <InsuranceCard
                    icon={<Car className="h-8 w-8 text-primary" />}
                    title="Car Insurance"
                    description="Smart telematics-based claims and pay-per-mile options with automatic payouts via blockchain."
                    type="car"
                  />
                  <InsuranceCard
                    icon={<Heart className="h-8 w-8 text-primary" />}
                    title="Health Insurance"
                    description="Decentralized medical records and usage-based premiums with DeFi health savings."
                    type="health"
                  />
                  <InsuranceCard
                    icon={<Home className="h-8 w-8 text-primary" />}
                    title="Home Insurance"
                    description="Smart home integration with IoT sensors for automatic damage detection and claims."
                    type="home"
                  />
                  <InsuranceCard
                    icon={<Plane className="h-8 w-8 text-primary" />}
                    title="Travel Insurance"
                    description="Flight delay compensation and lost luggage coverage with automatic claims processing."
                    type="travel"
                  />
                  <InsuranceCard
                    icon={<Briefcase className="h-8 w-8 text-primary" />}
                    title="Business Insurance"
                    description="Smart contracts for employee benefits and supply chain insurance with automatic claims."
                    type="business"
                  />
                  <InsuranceCard
                    icon={<Calendar className="h-8 w-8 text-primary" />}
                    title="Event Insurance"
                    description="Coverage for event cancellations or disruptions with automatic refunds."
                    type="event"
                  />
                  <InsuranceCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="Life Insurance"
                    description="Blockchain-based life policies with automatic execution and cryptocurrency death benefits."
                    type="life"
                  />
                  <InsuranceCard
                    icon={<Leaf className="h-8 w-8 text-primary" />}
                    title="Agricultural Insurance"
                    description="Crop and livestock insurance with automatic claims based on weather data."
                    type="agricultural"
                  />
                  <InsuranceCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Intellectual Property Insurance"
                    description="Patent protection and copyright insurance with automatic legal fee coverage."
                    type="intellectual-property"
                  />
                  <InsuranceCard
                    icon={<Lock className="h-8 w-8 text-primary" />}
                    title="Tokenized Asset Insurance"
                    description="NFT insurance and tokenized real estate coverage against theft and damage."
                    type="tokenized-asset"
                  />
                  <InsuranceCard
                    icon={<Cloud className="h-8 w-8 text-primary" />}
                    title="Disaster Relief Insurance"
                    description="Natural disaster coverage with community-based insurance pools."
                    type="disaster-relief"
                  />
                  <InsuranceCard
                    icon={<Dog className="h-8 w-8 text-primary" />}
                    title="Pet Insurance"
                    description="Smart pet insurance with trackable health data and automatic claims."
                    type="pet"
                  />
                  <InsuranceCard
                    icon={<Umbrella className="h-8 w-8 text-primary" />}
                    title="Travel & Leisure Insurance"
                    description="Adventure sports coverage and travel theft insurance with automatic claims."
                    type="travel-leisure"
                  />
                  <InsuranceCard
                    icon={<Leaf className="h-8 w-8 text-primary" />}
                    title="Carbon Credit Insurance"
                    description="Environmental damage insurance for carbon offset efforts."
                    type="carbon-credit"
                  />
                  <InsuranceCard
                    icon={<Gamepad className="h-8 w-8 text-primary" />}
                    title="Gaming & Esports Insurance"
                    description="Esports tournament coverage and in-game asset insurance."
                    type="gaming-esports"
                  />
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InsuranceCard
                    icon={<Shield className="h-8 w-8 text-primary" />}
                    title="Crypto Insurance"
                    description="Protect your DeFi investments, crypto wallets, and exchange assets against hacks, theft, and smart contract failures."
                    type="crypto"
                  />
                  <InsuranceCard
                    icon={<Lock className="h-8 w-8 text-primary" />}
                    title="Tokenized Asset Insurance"
                    description="NFT insurance and tokenized real estate coverage against theft and damage."
                    type="tokenized-asset"
                  />
                  <InsuranceCard
                    icon={<Gamepad className="h-8 w-8 text-primary" />}
                    title="Gaming & Esports Insurance"
                    description="Esports tournament coverage and in-game asset insurance."
                    type="gaming-esports"
                  />
                </div>
              </TabsContent>

              <TabsContent value="personal" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InsuranceCard
                    icon={<Heart className="h-8 w-8 text-primary" />}
                    title="Health Insurance"
                    description="Decentralized medical records and usage-based premiums with DeFi health savings."
                    type="health"
                  />
                  <InsuranceCard
                    icon={<Users className="h-8 w-8 text-primary" />}
                    title="Life Insurance"
                    description="Blockchain-based life policies with automatic execution and cryptocurrency death benefits."
                    type="life"
                  />
                  <InsuranceCard
                    icon={<Plane className="h-8 w-8 text-primary" />}
                    title="Travel Insurance"
                    description="Flight delay compensation and lost luggage coverage with automatic claims processing."
                    type="travel"
                  />
                  <InsuranceCard
                    icon={<Dog className="h-8 w-8 text-primary" />}
                    title="Pet Insurance"
                    description="Smart pet insurance with trackable health data and automatic claims."
                    type="pet"
                  />
                  <InsuranceCard
                    icon={<Umbrella className="h-8 w-8 text-primary" />}
                    title="Travel & Leisure Insurance"
                    description="Adventure sports coverage and travel theft insurance with automatic claims."
                    type="travel-leisure"
                  />
                </div>
              </TabsContent>

              <TabsContent value="property" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InsuranceCard
                    icon={<Home className="h-8 w-8 text-primary" />}
                    title="Home Insurance"
                    description="Smart home integration with IoT sensors for automatic damage detection and claims."
                    type="home"
                  />
                  <InsuranceCard
                    icon={<Car className="h-8 w-8 text-primary" />}
                    title="Car Insurance"
                    description="Smart telematics-based claims and pay-per-mile options with automatic payouts via blockchain."
                    type="car"
                  />
                  <InsuranceCard
                    icon={<Cloud className="h-8 w-8 text-primary" />}
                    title="Disaster Relief Insurance"
                    description="Natural disaster coverage with community-based insurance pools."
                    type="disaster-relief"
                  />
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InsuranceCard
                    icon={<Briefcase className="h-8 w-8 text-primary" />}
                    title="Business Insurance"
                    description="Smart contracts for employee benefits and supply chain insurance with automatic claims."
                    type="business"
                  />
                  <InsuranceCard
                    icon={<Calendar className="h-8 w-8 text-primary" />}
                    title="Event Insurance"
                    description="Coverage for event cancellations or disruptions with automatic refunds."
                    type="event"
                  />
                  <InsuranceCard
                    icon={<Leaf className="h-8 w-8 text-primary" />}
                    title="Agricultural Insurance"
                    description="Crop and livestock insurance with automatic claims based on weather data."
                    type="agricultural"
                  />
                  <InsuranceCard
                    icon={<FileText className="h-8 w-8 text-primary" />}
                    title="Intellectual Property Insurance"
                    description="Patent protection and copyright insurance with automatic legal fee coverage."
                    type="intellectual-property"
                  />
                  <InsuranceCard
                    icon={<Leaf className="h-8 w-8 text-primary" />}
                    title="Carbon Credit Insurance"
                    description="Environmental damage insurance for carbon offset efforts."
                    type="carbon-credit"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How Our Insurance Works</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Blockchain technology transforms the insurance experience with unprecedented transparency and
                  efficiency
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Choose Coverage</h3>
                <p className="text-muted-foreground">
                  Select from our range of insurance categories and customize your coverage to fit your specific needs.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Contract Policy</h3>
                <p className="text-muted-foreground">
                  Your policy is created as a smart contract on the blockchain, ensuring transparency and immutability.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Monitoring</h3>
                <p className="text-muted-foreground">
                  IoT devices and data oracles continuously monitor for covered events and risk factors in real-time.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Automatic Claims</h3>
                <p className="text-muted-foreground">
                  When a covered event occurs, verified by real-world data, your claim is automatically processed and
                  paid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">The SafeSense Advantage</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  What makes our blockchain-powered insurance different from traditional providers
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Instant Claims Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No more waiting weeks for claims to be processed. Our smart contracts automatically verify and pay
                    claims, often within minutes instead of days or weeks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Complete Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All policy terms are stored on the blockchain, making them immutable and fully transparent. No
                    hidden clauses or surprise exclusions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Flexible Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pay premiums and receive claims in cryptocurrency or traditional currency, with lower fees and
                    faster processing for crypto payments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Usage-Based Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pay only for what you use with dynamic pricing based on actual risk and usage patterns, monitored
                    through IoT devices and real-time data.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Global Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Insurance for anyone, anywhere, without geographic restrictions or banking limitations, thanks to
                    blockchain technology.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Comprehensive Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Protection for both traditional assets and emerging digital assets like cryptocurrencies, NFTs, and
                    tokenized real estate.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Customers Say</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real experiences from SafeSense users
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Alex Thompson</h3>
                      <p className="text-sm text-muted-foreground">Crypto Insurance Customer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "After my DeFi protocol was hacked, I was devastated. SafeSense verified the incident and processed
                    my claim within 48 hours. Their crypto insurance literally saved my investment portfolio."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sarah Chen</h3>
                      <p className="text-sm text-muted-foreground">Travel Insurance Customer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The automatic claims process is incredible. When my flight was delayed by 4 hours, I received
                    compensation directly to my wallet without having to file anything. This is how insurance should
                    work!"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Michael Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Car Insurance Customer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The pay-per-mile car insurance has saved me hundreds of dollars since I work from home. I love that
                    I only pay for what I actually use, and the app makes everything so transparent."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Protected?</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who trust SafeSense with their insurance needs
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

function InsuranceCard({ icon, title, description, type }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-6">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/insurance/${type}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

