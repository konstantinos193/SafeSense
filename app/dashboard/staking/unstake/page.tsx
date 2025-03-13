"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, ArrowLeft, ArrowRight, AlertTriangle, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for demonstration
const stakingPositions = [
  {
    id: 1,
    amount: 2000,
    startDate: "2024-12-15",
    endDate: "2025-06-15",
    apy: 12.5,
    status: "Locked",
    type: "6-Month Fixed",
    daysRemaining: 75,
  },
  {
    id: 2,
    amount: 3000,
    startDate: "2025-01-10",
    endDate: "2025-07-10",
    apy: 12.5,
    status: "Locked",
    type: "6-Month Fixed",
    daysRemaining: 100,
  },
]

export default function UnstakePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [amount, setAmount] = useState("")
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [earlyUnstakeFee, setEarlyUnstakeFee] = useState(0)
  const [totalStakedBalance, setTotalStakedBalance] = useState(5000)

  useEffect(() => {
    if (!amount || !selectedPosition) {
      setEarlyUnstakeFee(0)
      return
    }

    const amountValue = Number.parseFloat(amount)

    // Calculate early unstake fee if position is still locked
    if (selectedPosition.status === "Locked" && selectedPosition.daysRemaining > 0) {
      const fee = amountValue * 0.05 // 5% penalty
      setEarlyUnstakeFee(fee)
    } else {
      setEarlyUnstakeFee(0)
    }
  }, [amount, selectedPosition])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !amount ||
      !selectedPosition ||
      Number.parseFloat(amount) <= 0 ||
      Number.parseFloat(amount) > selectedPosition.amount
    ) {
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
              <h1 className="text-3xl font-bold tracking-tight">Unstake Your Tokens</h1>
            </div>

            {isSuccess ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-green-500/20 p-3 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Unstaking Successful!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your tokens have been successfully unstaked and returned to your wallet.
                    </p>
                    <p className="font-medium mb-6">
                      Amount Unstaked: {Number.parseFloat(amount).toLocaleString()} SAFE
                    </p>
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
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Unstake Details</CardTitle>
                    <CardDescription>
                      Select a staking position and enter the amount you want to unstake
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Select Staking Position</Label>
                      <RadioGroup
                        value={selectedPosition?.id.toString()}
                        onValueChange={(value) => {
                          const position = stakingPositions.find((p) => p.id.toString() === value)
                          setSelectedPosition(position)
                          setAmount("")
                        }}
                      >
                        <div className="space-y-4">
                          {stakingPositions.map((position) => (
                            <div
                              key={position.id}
                              className="rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <RadioGroupItem
                                value={position.id.toString()}
                                id={`position-${position.id}`}
                                className="sr-only"
                              />
                              <Label htmlFor={`position-${position.id}`} className="cursor-pointer">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                  <div>
                                    <div className="font-medium">{position.amount.toLocaleString()} SAFE</div>
                                    <p className="text-xs text-muted-foreground mt-1">{position.type}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm">{position.apy}% APY</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Staked on {formatDate(position.startDate)}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-3 flex justify-between text-xs">
                                  <span className={position.status === "Locked" ? "text-yellow-500" : "text-green-500"}>
                                    {position.status}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {position.status === "Locked"
                                      ? `${position.daysRemaining} days remaining`
                                      : "Available for unstaking"}
                                  </span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {selectedPosition && (
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Unstake</Label>
                        <div className="relative">
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pr-16"
                            disabled={!selectedPosition}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setAmount(selectedPosition.amount.toString())}
                            disabled={!selectedPosition}
                          >
                            MAX
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Available in this position: {selectedPosition.amount.toLocaleString()} SAFE
                        </p>
                      </div>
                    )}

                    {selectedPosition && selectedPosition.status === "Locked" && (
                      <Alert variant="destructive" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-500">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          This position is still locked for {selectedPosition.daysRemaining} days. Early unstaking will
                          incur a 5% penalty fee.
                        </AlertDescription>
                      </Alert>
                    )}

                    {selectedPosition && amount && Number.parseFloat(amount) > 0 && (
                      <div className="rounded-lg border p-4 space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount to Unstake</span>
                          <span className="font-medium">{Number.parseFloat(amount).toLocaleString()} SAFE</span>
                        </div>

                        {earlyUnstakeFee > 0 && (
                          <>
                            <div className="flex justify-between text-yellow-500">
                              <span>Early Unstake Fee (5%)</span>
                              <span>-{earlyUnstakeFee.toFixed(2)} SAFE</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-medium">
                              <span>You will receive</span>
                              <span>{(Number.parseFloat(amount) - earlyUnstakeFee).toFixed(2)} SAFE</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <Alert className="bg-muted">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Unstaking will remove your tokens from the staking pool and return them to your wallet. This
                        action cannot be undone.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        !amount ||
                        !selectedPosition ||
                        Number.parseFloat(amount) <= 0 ||
                        Number.parseFloat(amount) > selectedPosition.amount ||
                        isLoading
                      }
                    >
                      {isLoading ? "Processing..." : "Unstake Tokens"}
                    </Button>
                  </CardFooter>
                </form>
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

