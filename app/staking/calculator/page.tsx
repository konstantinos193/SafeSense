"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Calculator, Info, ArrowRight, TrendingUp, Clock, Coins, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function StakingCalculator() {
  const [amount, setAmount] = useState("1000")
  const [duration, setDuration] = useState("180") // Default to 6 months
  const [calculatedRewards, setCalculatedRewards] = useState({
    monthly: 0,
    total: 0,
    apy: 0,
    bonus: 0,
  })
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate rewards when amount or duration changes
  useEffect(() => {
    if (!amount || isNaN(Number.parseFloat(amount))) {
      setCalculatedRewards({
        monthly: 0,
        total: 0,
        apy: getBaseAPY(duration),
        bonus: 0,
      })
      return
    }

    const amountValue = Number.parseFloat(amount)
    const durationDays = Number.parseInt(duration)
    const baseApy = getBaseAPY(duration)

    // Calculate bonus APY based on amount
    let bonusApy = 0
    if (amountValue >= 10000) bonusApy = 2
    else if (amountValue >= 5000) bonusApy = 1
    else if (amountValue >= 2500) bonusApy = 0.5

    const totalApy = baseApy + bonusApy
    const totalRewards = ((amountValue * totalApy) / 100) * (durationDays / 365)
    const monthlyRewards = totalRewards / (durationDays / 30)

    setCalculatedRewards({
      monthly: monthlyRewards,
      total: totalRewards,
      apy: totalApy,
      bonus: bonusApy,
    })
  }, [amount, duration])

  const getBaseAPY = (period) => {
    switch (period) {
      case "90":
        return 8 // 3 months
      case "180":
        return 12 // 6 months
      case "365":
        return 15 // 1 year
      default:
        return 12
    }
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSliderChange = (value) => {
    setAmount(value[0].toString())
  }

  // Example calculations for different scenarios
  const examples = [
    {
      amount: 1000,
      duration: "90",
      durationText: "3 months",
      apy: 8,
      rewards: 1000 * 0.08 * (90 / 365),
    },
    {
      amount: 1000,
      duration: "180",
      durationText: "6 months",
      apy: 12,
      rewards: 1000 * 0.12 * (180 / 365),
    },
    {
      amount: 1000,
      duration: "365",
      durationText: "1 year",
      apy: 15,
      rewards: 1000 * 0.15,
    },
    {
      amount: 5000,
      duration: "365",
      durationText: "1 year",
      apy: 16, // 15% base + 1% bonus
      rewards: 5000 * 0.16,
    },
  ]

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
            <nav className="flex items-center space-x-2">
              <Link
                href="/staking"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Staking
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Staking Rewards Calculator</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Calculate your potential earnings from staking SAFE tokens on our platform
              </p>
            </div>

            <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Staking Calculator
                      </CardTitle>
                      <CardDescription>Enter your staking details to calculate potential rewards</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Stake (SAFE)</Label>
                        <Input
                          id="amount"
                          type="text"
                          value={amount}
                          onChange={handleAmountChange}
                          className="text-lg"
                        />
                        <Slider
                          defaultValue={[1000]}
                          max={20000}
                          step={100}
                          value={[Number.parseFloat(amount) || 0]}
                          onValueChange={handleSliderChange}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0 SAFE</span>
                          <span>20,000 SAFE</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Staking Duration</Label>
                        <RadioGroup value={duration} onValueChange={setDuration}>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="90" id="duration-1" className="sr-only" />
                              <Label htmlFor="duration-1" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">3 Months</div>
                                  <p className="text-xs text-muted-foreground">Short-term staking</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-primary">8% APY</div>
                                </div>
                              </Label>
                            </div>

                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="180" id="duration-2" className="sr-only" />
                              <Label htmlFor="duration-2" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">6 Months</div>
                                  <p className="text-xs text-muted-foreground">Medium-term staking</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-primary">12% APY</div>
                                </div>
                              </Label>
                            </div>

                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="365" id="duration-3" className="sr-only" />
                              <Label htmlFor="duration-3" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">1 Year</div>
                                  <p className="text-xs text-muted-foreground">Long-term staking</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-primary">15% APY</div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <Alert className="bg-muted">
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          Stake 2,500+ SAFE tokens to receive a bonus APY of up to 2%
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Estimated Rewards
                      </CardTitle>
                      <CardDescription>Based on your staking amount and duration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg border p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Amount to Stake</span>
                          <span className="text-xl font-semibold">
                            {formatNumber(Number.parseFloat(amount) || 0)} SAFE
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Staking Period</span>
                          <span className="text-xl font-semibold">
                            {duration === "90" ? "3 Months" : duration === "180" ? "6 Months" : "1 Year"}
                          </span>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Base APY</span>
                          <span className="text-xl font-semibold">{getBaseAPY(duration)}%</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Bonus APY</span>
                          <span className="text-xl font-semibold">{calculatedRewards.bonus}%</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total APY</span>
                          <span className="text-xl font-semibold text-primary">{calculatedRewards.apy}%</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Monthly Rewards</span>
                          <span className="text-xl font-semibold">{formatNumber(calculatedRewards.monthly)} SAFE</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Rewards</span>
                          <span className="text-2xl font-bold text-primary">
                            {formatNumber(calculatedRewards.total)} SAFE
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <Button asChild size="lg" className="w-full">
                          <Link href="/staking/stake">
                            Start Staking Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Example Calculations
                    </CardTitle>
                    <CardDescription>
                      See how different staking amounts and durations affect your rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Amount</th>
                            <th className="text-left py-3 px-4">Duration</th>
                            <th className="text-left py-3 px-4">APY</th>
                            <th className="text-left py-3 px-4">Total Rewards</th>
                          </tr>
                        </thead>
                        <tbody>
                          {examples.map((example, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{formatNumber(example.amount)} SAFE</td>
                              <td className="py-3 px-4">{example.durationText}</td>
                              <td className="py-3 px-4">{example.apy}%</td>
                              <td className="py-3 px-4">{formatNumber(example.rewards)} SAFE</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="how-it-works" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      How Staking Works
                    </CardTitle>
                    <CardDescription>Learn about the staking process and how rewards are calculated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">What is Staking?</h3>
                      <p className="text-muted-foreground">
                        Staking is the process of locking up your SAFE tokens in the SafeSense platform to support
                        network operations and earn rewards. When you stake your tokens, you're essentially contributing
                        to the security and efficiency of our insurance protocol.
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">How Rewards are Calculated</h3>
                      <p className="text-muted-foreground">
                        Staking rewards are calculated based on three main factors:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>
                          <span className="font-medium text-foreground">Staking Amount:</span> The number of SAFE tokens
                          you stake.
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Staking Duration:</span> The length of time you
                          commit to staking your tokens.
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Annual Percentage Yield (APY):</span> The rate
                          of return you earn on your staked tokens, expressed as a yearly percentage.
                        </li>
                      </ul>
                      <p className="text-muted-foreground mt-4">
                        The basic formula for calculating staking rewards is:
                      </p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm">
                        Rewards = Staking Amount × APY × (Staking Duration in Days / 365)
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">APY Rates and Bonuses</h3>
                      <p className="text-muted-foreground">
                        SafeSense offers different APY rates based on staking duration:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>3 Months: 8% APY</li>
                        <li>6 Months: 12% APY</li>
                        <li>1 Year: 15% APY</li>
                      </ul>
                      <p className="text-muted-foreground mt-4">
                        Additionally, we offer bonus APY rates for larger staking amounts:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>2,500+ SAFE: +0.5% bonus APY</li>
                        <li>5,000+ SAFE: +1% bonus APY</li>
                        <li>10,000+ SAFE: +2% bonus APY</li>
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Reward Distribution</h3>
                      <p className="text-muted-foreground">
                        Staking rewards are calculated daily and distributed monthly. You can view your accumulated
                        rewards in your staking dashboard at any time. Rewards become claimable at the end of each
                        month.
                      </p>
                      <p className="text-muted-foreground">
                        If you choose to unstake before your lock-up period ends, a 5% early withdrawal fee will be
                        applied to your staked amount.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      Benefits of Staking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-3">
                        <div className="rounded-full bg-primary/10 p-3 w-fit">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Earn Passive Income</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate consistent returns on your SAFE tokens without active trading.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-full bg-primary/10 p-3 w-fit">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Support the Network</h3>
                        <p className="text-sm text-muted-foreground">
                          Contribute to the security and stability of the SafeSense insurance protocol.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-full bg-primary/10 p-3 w-fit">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Long-term Growth</h3>
                        <p className="text-sm text-muted-foreground">
                          Benefit from compound growth and token appreciation over time.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/staking">
                        Learn More About Staking
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
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

