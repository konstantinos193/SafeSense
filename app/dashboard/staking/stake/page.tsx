"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, ArrowLeft, ArrowRight, Calculator, Clock, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function StakePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [amount, setAmount] = useState("")
  const [stakingPeriod, setStakingPeriod] = useState("180") // 6 months default
  const [availableBalance, setAvailableBalance] = useState(2500)
  const [calculatedRewards, setCalculatedRewards] = useState({
    monthly: 0,
    total: 0,
    apy: 12.5,
  })

  // Calculate rewards when amount or staking period changes
  useEffect(() => {
    if (!amount || isNaN(Number.parseFloat(amount))) {
      setCalculatedRewards({
        monthly: 0,
        total: 0,
        apy: getAPYForPeriod(stakingPeriod),
      })
      return
    }

    const apy = getAPYForPeriod(stakingPeriod)
    const amountValue = Number.parseFloat(amount)
    const periodInDays = Number.parseInt(stakingPeriod)

    const totalRewards = ((amountValue * apy) / 100) * (periodInDays / 365)
    const monthlyRewards = totalRewards / (periodInDays / 30)

    setCalculatedRewards({
      monthly: monthlyRewards,
      total: totalRewards,
      apy: apy,
    })
  }, [amount, stakingPeriod])

  const getAPYForPeriod = (period) => {
    switch (period) {
      case "30":
        return 8
      case "90":
        return 10
      case "180":
        return 12.5
      case "365":
        return 15
      default:
        return 12.5
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > availableBalance) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard/staking")
      }, 2000)
    }, 1500)
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
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href="/staking">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Stake Your Tokens</h1>
            </div>

            {isSuccess ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-green-500/20 p-3 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Staking Successful!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your tokens have been successfully staked. You will start earning rewards immediately.
                    </p>
                    <p className="font-medium mb-6">Amount Staked: {Number.parseFloat(amount).toLocaleString()} SAFE</p>
                    <Button asChild>
                      <Link href="/dashboard/staking">
                        Go to Staking Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-8 md:grid-cols-5">
                <Card className="md:col-span-3">
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle>Stake Details</CardTitle>
                      <CardDescription>Enter the amount you want to stake and select a staking period</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Stake</Label>
                        <div className="relative">
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pr-16"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setAmount(availableBalance.toString())}
                          >
                            MAX
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Available balance: {availableBalance.toLocaleString()} SAFE
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Staking Period</Label>
                        <RadioGroup value={stakingPeriod} onValueChange={setStakingPeriod}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="30" id="period-1" className="sr-only" />
                              <Label htmlFor="period-1" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">1 Month</div>
                                  <p className="text-xs text-muted-foreground">Shorter lock period</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-primary">8% APY</div>
                                </div>
                              </Label>
                            </div>

                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="90" id="period-2" className="sr-only" />
                              <Label htmlFor="period-2" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">3 Months</div>
                                  <p className="text-xs text-muted-foreground">Balanced option</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-primary">10% APY</div>
                                </div>
                              </Label>
                            </div>

                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="180" id="period-3" className="sr-only" />
                              <Label htmlFor="period-3" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">6 Months</div>
                                  <p className="text-xs text-muted-foreground">Recommended</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-primary">12.5% APY</div>
                                </div>
                              </Label>
                            </div>

                            <div className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value="365" id="period-4" className="sr-only" />
                              <Label htmlFor="period-4" className="flex justify-between cursor-pointer">
                                <div>
                                  <div className="font-medium">12 Months</div>
                                  <p className="text-xs text-muted-foreground">Maximum returns</p>
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
                        <AlertDescription className="text-xs">
                          Your tokens will be locked for the selected period. Early unstaking will incur a 5% penalty
                          fee.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={
                          !amount ||
                          Number.parseFloat(amount) <= 0 ||
                          Number.parseFloat(amount) > availableBalance ||
                          isLoading
                        }
                      >
                        {isLoading ? "Processing..." : "Stake Tokens"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Reward Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Selected APY</span>
                        <span className="font-medium text-primary">{calculatedRewards.apy}%</span>
                      </div>
                      <Progress value={(calculatedRewards.apy / 15) * 100} className="h-2" />
                    </div>

                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount to Stake</span>
                        <span className="font-medium">
                          {amount ? Number.parseFloat(amount).toLocaleString() : 0} SAFE
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Staking Period</span>
                        <span className="font-medium">{Number.parseInt(stakingPeriod)} days</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lock Until</span>
                        <span className="font-medium">
                          {new Date(
                            Date.now() + Number.parseInt(stakingPeriod) * 24 * 60 * 60 * 1000,
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rewards</span>
                        <span className="font-medium">{calculatedRewards.monthly.toFixed(2)} SAFE</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Rewards</span>
                        <span className="font-medium">{calculatedRewards.total.toFixed(2)} SAFE</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-primary/10 p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-primary">Rewards Distribution</p>
                        <p className="text-muted-foreground mt-1">
                          Rewards are calculated daily and distributed on the 1st of each month.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

