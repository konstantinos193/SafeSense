"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Shield,
  Coins,
  TrendingUp,
  Clock,
  Users,
  Lock,
  ChevronRight,
  BarChart3,
  ArrowRight,
  Info,
  Wallet,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const stakingStats = {
  totalStaked: 2450000,
  stakersCount: 1243,
  currentAPY: 12.5,
  platformAPY: 8.2,
  bonusAPY: 4.3,
  rewardPool: 320000,
  averageStakingPeriod: 187, // days
  yourStake: 5000,
  yourRewards: 625,
  nextRewardDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
}

const rewardHistory = [
  { date: "2025-03-01", amount: 125, apy: 12.3, status: "Claimed" },
  { date: "2025-02-01", amount: 118, apy: 11.8, status: "Claimed" },
  { date: "2025-01-01", amount: 130, apy: 13.0, status: "Claimed" },
  { date: "2024-12-01", amount: 122, apy: 12.2, status: "Claimed" },
  { date: "2024-11-01", amount: 115, apy: 11.5, status: "Claimed" },
]

export default function StakingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'basics' | 'rewards' | 'security'>('basics')

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
            <nav className="flex items-center space-x-1">
              <Link href="/features" className="px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/insurance" className="px-3 py-2 text-sm font-medium">
                Insurance
              </Link>
              <Link href="/pricing" className="px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/faq" className="px-3 py-2 text-sm font-medium">
                FAQ
              </Link>
              {isAuthenticated ? (
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                  <Coins className="mr-1 h-4 w-4" />
                  <span>Earn passive income</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Stake & Earn with SafeSense
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Stake your tokens to earn rewards while helping secure the SafeSense insurance ecosystem. Earn up to{" "}
                  <span className="font-bold text-primary">{stakingStats.currentAPY}% APY</span> on your staked assets.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" asChild>
                    <Link href="/staking/stake">Start Staking</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#how-it-works">
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Staking Overview</CardTitle>
                    <CardDescription>Current staking statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Value Locked</span>
                        <span className="font-medium">{formatCurrency(stakingStats.totalStaked)}</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Current APY</span>
                        <div className="text-2xl font-bold text-primary">{stakingStats.currentAPY}%</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Total Stakers</span>
                        <div className="text-2xl font-bold">{stakingStats.stakersCount.toLocaleString()}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Reward Pool</span>
                        <div className="text-2xl font-bold">{formatCurrency(stakingStats.rewardPool)}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Avg. Staking Period</span>
                        <div className="text-2xl font-bold">{stakingStats.averageStakingPeriod} days</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/staking/stake">
                        Stake Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How Staking Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Staking is a simple way to earn rewards while supporting the SafeSense ecosystem
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Stake Your Tokens</h3>
                <p className="text-muted-foreground">
                  Deposit your SAFE tokens into the staking pool. Choose your staking period - longer periods earn
                  higher rewards.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure the Network</h3>
                <p className="text-muted-foreground">
                  Your staked tokens help secure the insurance platform by providing liquidity for the risk pool and
                  validating transactions.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Coins className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Receive regular staking rewards based on your stake amount and the current APY. Rewards are
                  distributed monthly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Benefits of Staking</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Staking offers advantages for both users and the SafeSense platform
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Benefits for Stakers</CardTitle>
                  <CardDescription>What you gain by staking your tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Earn Passive Income</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn up to {stakingStats.currentAPY}% APY on your staked tokens, with rewards distributed
                        monthly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Governance Rights</h4>
                      <p className="text-sm text-muted-foreground">
                        Participate in platform governance decisions, including voting on new insurance products, risk
                        parameters, and protocol upgrades.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Premium Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive discounts on insurance premiums based on your staking amount and duration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Bonus Rewards</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn additional rewards during special staking events and for longer staking periods.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Benefits for the Platform</CardTitle>
                  <CardDescription>How staking strengthens the SafeSense ecosystem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Enhanced Security</h4>
                      <p className="text-sm text-muted-foreground">
                        Staked tokens help secure the network by increasing the cost of potential attacks and ensuring
                        honest validation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Coins className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Risk Pool Funding</h4>
                      <p className="text-sm text-muted-foreground">
                        Staked tokens contribute to the insurance risk pool, enabling the platform to offer more
                        comprehensive coverage options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Community Alignment</h4>
                      <p className="text-sm text-muted-foreground">
                        Staking aligns user incentives with the platform's long-term success, creating a stronger and
                        more engaged community.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reduced Token Volatility</h4>
                      <p className="text-sm text-muted-foreground">
                        Staking reduces circulating supply and encourages long-term holding, leading to more stable
                        token prices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Rewards Mechanism Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Rewards Mechanism</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Understanding how staking rewards are generated and distributed
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>APY Breakdown</CardTitle>
                    <CardDescription>Current annual percentage yield composition</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="text-sm">Base Platform Yield</span>
                        </div>
                        <span className="font-medium">{stakingStats.platformAPY}%</span>
                      </div>
                      <Progress value={(stakingStats.platformAPY / stakingStats.currentAPY) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Premium Share Bonus</span>
                        </div>
                        <span className="font-medium">{stakingStats.bonusAPY}%</span>
                      </div>
                      <Progress
                        value={(stakingStats.bonusAPY / stakingStats.currentAPY) * 100}
                        className="h-2 bg-muted"
                        indicatorClassName="bg-green-500"
                      />
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-green-500"></div>
                        <span className="text-sm font-medium">Total APY</span>
                      </div>
                      <span className="font-bold text-lg">{stakingStats.currentAPY}%</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reward Distribution Schedule</CardTitle>
                      <CardDescription>When and how rewards are distributed</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Monthly Distribution</h4>
                          <p className="text-sm text-muted-foreground">
                            Staking rewards are calculated daily and distributed on the 1st of each month.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Staking Periods</h4>
                          <p className="text-sm text-muted-foreground">
                            Choose from flexible staking (no lock-up) or fixed periods of 3, 6, or 12 months for higher
                            APY.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Coins className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Compound Options</h4>
                          <p className="text-sm text-muted-foreground">
                            Choose to automatically reinvest your rewards to compound your returns over time.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">How Rewards Are Generated</h3>
                <p className="text-muted-foreground">
                  SafeSense staking rewards come from multiple sources, creating a sustainable reward mechanism that
                  benefits all participants:
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="font-medium mb-2">Premium Share (60% of rewards)</h4>
                    <p className="text-sm text-muted-foreground">
                      A portion of all insurance premiums collected on the platform is allocated to the staking reward
                      pool. This creates a direct link between platform growth and staker rewards.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="font-medium mb-2">DeFi Yield Farming (25% of rewards)</h4>
                    <p className="text-sm text-muted-foreground">
                      A portion of the staking pool is allocated to secure DeFi yield farming strategies, generating
                      additional returns that are shared with stakers.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="font-medium mb-2">Protocol Treasury (15% of rewards)</h4>
                    <p className="text-sm text-muted-foreground">
                      The SafeSense treasury allocates tokens to incentivize staking and ensure a stable reward rate,
                      especially during the early growth phase.
                    </p>
                  </div>
                </div>

                <Alert className="bg-primary/10 border-primary/20">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-sm text-primary">
                    APY rates are variable and adjusted based on market conditions, total staked amount, and platform
                    performance. Historical APY has ranged from 8% to 15%.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>

        {/* Your Staking Dashboard (if authenticated) */}
        {isAuthenticated && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Your Staking Dashboard</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Track your staking performance and rewards
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Staked Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(stakingStats.yourStake)}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {((stakingStats.yourStake / stakingStats.totalStaked) * 100).toFixed(2)}% of total staked
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Earned Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(stakingStats.yourRewards)}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next reward in {Math.ceil((stakingStats.nextRewardDate - new Date()) / (1000 * 60 * 60 * 24))}{" "}
                      days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Current APY</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{stakingStats.currentAPY}%</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Locked until {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Reward History</CardTitle>
                        <CardDescription>Your past staking rewards</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <History className="h-4 w-4" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b text-sm">
                        <div>Date</div>
                        <div>Amount</div>
                        <div>APY Rate</div>
                        <div>Status</div>
                      </div>
                      {rewardHistory.map((reward, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 p-4 text-sm border-b last:border-0">
                          <div>{formatDate(reward.date)}</div>
                          <div>{formatCurrency(reward.amount)}</div>
                          <div>{reward.apy}%</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              {reward.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/staking/stake">Stake More</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/staking/unstake">Unstake</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">FAQ</h2>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab('basics')}
                  className={`p-2 rounded-md text-center ${
                    activeTab === 'basics' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Basics
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`p-2 rounded-md text-center ${
                    activeTab === 'rewards' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Rewards
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`p-2 rounded-md text-center ${
                    activeTab === 'security' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Security
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'basics' && (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>What is staking?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Staking is the process of locking up your SAFE tokens in the platform to support its operations. In return for staking, you earn rewards in the form of additional SAFE tokens.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>How much can I stake?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          The minimum staking amount is 100 SAFE tokens. There is no maximum limit on how much you can stake. However, larger stakes may be subject to a gradual staking process to minimize market impact.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Can I unstake at any time?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          It depends on your chosen staking period. Flexible staking allows you to unstake at any time, but offers a lower APY. Fixed-term staking (3, 6, or 12 months) offers higher rewards but requires you to keep your tokens staked for the full period. Early unstaking from fixed-term staking is possible but incurs a penalty fee.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Which wallets are supported?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          SafeSense staking supports most major Ethereum-compatible wallets, including MetaMask, WalletConnect, Coinbase Wallet, and hardware wallets like Ledger and Trezor. Your private keys always remain in your control - we never take custody of your tokens during the staking process.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>What happens if there's a network upgrade?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          In the event of a network upgrade or token migration, staked tokens will be automatically migrated to the new system. You won't need to take any action, and your staking position and rewards will be preserved.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === 'rewards' && (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>How are rewards calculated?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Rewards are calculated based on your staked amount, the current APY rate, and your staking period. The formula is: (Staked Amount × APY × Staking Period in Days) ÷ 365. Rewards accrue daily but are distributed monthly.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Why does the APY change?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          The APY is dynamic and adjusts based on several factors: total amount staked in the platform, insurance premium volume, DeFi yield farming returns, and overall market conditions. The APY is designed to remain competitive while ensuring the long-term sustainability of the reward mechanism.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Are staking rewards taxable?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          In most jurisdictions, staking rewards are considered taxable income. However, tax treatment varies by country and individual circumstances. We recommend consulting with a tax professional for advice specific to your situation. SafeSense provides annual staking reports that can help with tax reporting.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>How secure is staking?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Our staking contracts have undergone multiple security audits by leading blockchain security firms. The staking pool is managed by a multi-signature wallet requiring multiple approvals for any fund movement. Additionally, we maintain an insurance fund specifically to protect against smart contract vulnerabilities.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Start Earning?</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of stakers already earning rewards with SafeSense
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button size="lg" asChild>
                  <Link href="/staking/stake">
                    Start Staking Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/faq">Learn More</Link>
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
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

