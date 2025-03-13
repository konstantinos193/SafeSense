"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Shield,
  Clock,
  Plus,
  Minus,
  History,
  ChevronRight,
  CheckCircle2,
  Lock,
  Unlock,
  BarChart3,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for demonstration
const stakingData = {
  userStakedBalance: 5000,
  stakedTokens: 5000,
  tokenPrice: 1.0,
  stakingStatus: "active",
  totalRewardsEarned: 625,
  pendingRewards: 42.5,
  claimableRewards: 125,
  currentAPY: 12.5,
  stakingStartDate: "2024-12-15",
  stakingDuration: 90, // days since staking started
  lockPeriod: 180, // days
  lockEndDate: "2025-06-15",
  nextRewardDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  stakingTier: "Silver",
  stakingPositions: [
    {
      id: 1,
      amount: 2000,
      startDate: "2024-12-15",
      endDate: "2025-06-15",
      apy: 12.5,
      status: "Locked",
      type: "6-Month Fixed",
    },
    {
      id: 2,
      amount: 3000,
      startDate: "2025-01-10",
      endDate: "2025-07-10",
      apy: 12.5,
      status: "Locked",
      type: "6-Month Fixed",
    },
  ],
  rewardHistory: [
    { date: "2025-03-01", amount: 62.5, type: "Monthly Reward", status: "Claimed" },
    { date: "2025-02-01", amount: 62.5, type: "Monthly Reward", status: "Claimed" },
    { date: "2025-01-01", amount: 62.5, type: "Monthly Reward", status: "Claimed" },
    { date: "2024-12-01", amount: 62.5, type: "Monthly Reward", status: "Claimed" },
  ],
  projectedRewards: {
    monthly: 62.5,
    quarterly: 187.5,
    yearly: 750,
  },
}

export default function StakingDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [stakingPeriod, setStakingPeriod] = useState("180") // 6 months default
  const [isStakeDialogOpen, setIsStakeDialogOpen] = useState(false)
  const [isUnstakeDialogOpen, setIsUnstakeDialogOpen] = useState(false)
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false)
  const [isClaimLoading, setIsClaimLoading] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'rewards' | 'analytics'>('rewards')

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
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

  const calculateTimeRemaining = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? `${diffDays} days` : "Unlocked"
  }

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    const totalDuration = end - start
    const elapsed = now - start

    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
  }

  const handleStakeSubmit = () => {
    // Here you would handle the staking logic
    console.log(`Staking ${stakeAmount} tokens for ${stakingPeriod} days`)
    setIsStakeDialogOpen(false)
    setStakeAmount("")
  }

  const handleUnstakeSubmit = () => {
    // Here you would handle the unstaking logic
    console.log(`Unstaking ${unstakeAmount} tokens`)
    setIsUnstakeDialogOpen(false)
    setUnstakeAmount("")
  }

  const handleClaimRewards = () => {
    setIsClaimLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsClaimLoading(false)
      setClaimSuccess(true)

      // Reset success state after a delay
      setTimeout(() => {
        setIsClaimDialogOpen(false)
        setClaimSuccess(false)
      }, 2000)
    }, 1500)
  }

  if (isLoading) {
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
          </div>
        </header>
        <main className="flex-1 py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your staking dashboard...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
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
              <Link href="/dashboard" className="px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard/policies" className="px-3 py-2 text-sm font-medium">
                Policies
              </Link>
              <Link href="/dashboard/claims" className="px-3 py-2 text-sm font-medium">
                Claims
              </Link>
              <Link href="/dashboard/staking" className="px-3 py-2 text-sm font-medium text-primary">
                Staking
              </Link>
              <Link href="/profile" className="px-3 py-2 text-sm font-medium">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Staking Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your staked assets and track your rewards</p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isStakeDialogOpen} onOpenChange={setIsStakeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Stake More
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Stake Tokens</DialogTitle>
                    <DialogDescription>
                      Enter the amount you want to stake and select a staking period.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="stake-amount">Amount to Stake</Label>
                      <Input
                        id="stake-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Available balance: 2,500 SAFE</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Staking Period</Label>
                      <RadioGroup value={stakingPeriod} onValueChange={setStakingPeriod}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="30" id="period-1" />
                          <Label htmlFor="period-1">1 Month (8% APY)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="90" id="period-2" />
                          <Label htmlFor="period-2">3 Months (10% APY)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="180" id="period-3" />
                          <Label htmlFor="period-3">6 Months (12.5% APY)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="365" id="period-4" />
                          <Label htmlFor="period-4">12 Months (15% APY)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Alert className="bg-muted">
                      <AlertDescription className="text-xs">
                        Your tokens will be locked for the selected period. Early unstaking will incur a 5% penalty fee.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsStakeDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleStakeSubmit}>Stake Tokens</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isUnstakeDialogOpen} onOpenChange={setIsUnstakeDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Minus className="h-4 w-4" />
                    Unstake
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Unstake Tokens</DialogTitle>
                    <DialogDescription>
                      Enter the amount you want to unstake from your staked balance.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                      <Input
                        id="unstake-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Staked balance: {stakingData.userStakedBalance.toLocaleString()} SAFE
                      </p>
                    </div>
                    <Alert className="bg-muted">
                      <AlertDescription className="text-xs">
                        Some of your tokens are still in the lock period. Early unstaking will incur a 5% penalty fee.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUnstakeDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUnstakeSubmit}>Unstake Tokens</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Staked Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stakingData.userStakedBalance.toLocaleString()} SAFE</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatCurrency(stakingData.userStakedBalance * stakingData.tokenPrice)}
                </p>
                <div className="flex items-center mt-2">
                  <Badge variant={stakingData.stakingStatus === "active" ? "default" : "outline"} className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {stakingData.stakingStatus === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Rewards Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stakingData.totalRewardsEarned.toLocaleString()} SAFE</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatCurrency(stakingData.totalRewardsEarned * stakingData.tokenPrice)}
                </p>
                <div className="flex items-center mt-2">
                  <Link href="#reward-history" className="text-xs text-primary flex items-center">
                    View history
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Claimable Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stakingData.claimableRewards.toLocaleString()} SAFE</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatCurrency(stakingData.claimableRewards * stakingData.tokenPrice)}
                </p>
                <div className="mt-2">
                  <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Claim Rewards
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Claim Rewards</DialogTitle>
                        <DialogDescription>You are about to claim your available staking rewards.</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted mb-4">
                          <span>Available to claim:</span>
                          <span className="font-bold">{stakingData.claimableRewards.toLocaleString()} SAFE</span>
                        </div>
                        {claimSuccess ? (
                          <div className="flex items-center justify-center p-4 rounded-lg bg-green-500/10 text-green-500">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Rewards claimed successfully!</span>
                          </div>
                        ) : null}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsClaimDialogOpen(false)}
                          disabled={isClaimLoading || claimSuccess}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleClaimRewards} disabled={isClaimLoading || claimSuccess}>
                          {isClaimLoading ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Claiming...
                            </>
                          ) : (
                            "Claim Rewards"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current APY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stakingData.currentAPY}%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Next reward in {Math.ceil((stakingData.nextRewardDate - new Date()) / (1000 * 60 * 60 * 24))} days
                </p>
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="text-xs">
                    {stakingData.stakingTier} Tier
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staking Positions */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Staking Positions</CardTitle>
                <CardDescription>Overview of your active staking positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stakingData.stakingPositions.map((position) => (
                    <div key={position.id} className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{position.amount.toLocaleString()} SAFE</h3>
                            <Badge variant={position.status === "Locked" ? "outline" : "default"} className="text-xs">
                              {position.status === "Locked" ? (
                                <Lock className="h-3 w-3 mr-1" />
                              ) : (
                                <Unlock className="h-3 w-3 mr-1" />
                              )}
                              {position.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{position.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{position.apy}% APY</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Staked on {formatDate(position.startDate)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Lock Progress</span>
                          <span>{calculateTimeRemaining(position.endDate)} remaining</span>
                        </div>
                        <Progress value={calculateProgress(position.startDate, position.endDate)} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{formatDate(position.startDate)}</span>
                          <span>{formatDate(position.endDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Custom Tabs for Rewards and Analytics */}
          <div className="w-full">
            <div className="grid w-full grid-cols-2">
              <button
                onClick={() => setActiveTab('rewards')}
                className={`p-2 text-center ${
                  activeTab === 'rewards' 
                    ? 'border-b-2 border-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                Rewards
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`p-2 text-center ${
                  activeTab === 'analytics' 
                    ? 'border-b-2 border-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                Analytics
              </button>
            </div>

            {activeTab === 'rewards' && (
              <div className="mt-6 space-y-6">
                {/* Pending Rewards */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Rewards</CardTitle>
                    <CardDescription>Rewards that are accruing but not yet claimable</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="text-2xl font-bold">{stakingData.pendingRewards.toLocaleString()} SAFE</div>
                        <p className="text-sm text-muted-foreground mt-1">Accrued since last reward distribution</p>
                      </div>
                      <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Next distribution: {stakingData.nextRewardDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground mb-1">Monthly Projection</div>
                        <div className="font-medium">{stakingData.projectedRewards.monthly.toLocaleString()} SAFE</div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground mb-1">Quarterly Projection</div>
                        <div className="font-medium">{stakingData.projectedRewards.quarterly.toLocaleString()} SAFE</div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground mb-1">Yearly Projection</div>
                        <div className="font-medium">{stakingData.projectedRewards.yearly.toLocaleString()} SAFE</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reward History */}
                <Card id="reward-history">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Reward History</CardTitle>
                        <CardDescription>History of your staking rewards</CardDescription>
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
                        <div>Type</div>
                        <div>Status</div>
                      </div>
                      {stakingData.rewardHistory.map((reward, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 p-4 text-sm border-b last:border-0">
                          <div>{formatDate(reward.date)}</div>
                          <div>{reward.amount.toLocaleString()} SAFE</div>
                          <div>{reward.type}</div>
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
            )}

            {activeTab === 'analytics' && (
              <div className="mt-6 space-y-6">
                {/* Staking Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Staking Performance</CardTitle>
                    <CardDescription>Overview of your staking performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Staking performance chart will appear here</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground mb-1">Total Value Staked</div>
                        <div className="font-medium">
                          {formatCurrency(stakingData.userStakedBalance * stakingData.tokenPrice)}
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground mb-1">Total Rewards Value</div>
                        <div className="font-medium">
                          {formatCurrency(stakingData.totalRewardsEarned * stakingData.tokenPrice)}
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm text-muted-foreground mb-1">ROI</div>
                        <div className="font-medium">
                          {((stakingData.totalRewardsEarned / stakingData.userStakedBalance) * 100).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Staking Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Staking Details</CardTitle>
                    <CardDescription>Detailed information about your staking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Staking Start Date</span>
                          <span className="font-medium">{formatDate(stakingData.stakingStartDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Staking Duration</span>
                          <span className="font-medium">{stakingData.stakingDuration} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lock Period</span>
                          <span className="font-medium">{stakingData.lockPeriod} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lock End Date</span>
                          <span className="font-medium">{formatDate(stakingData.lockEndDate)}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current APY</span>
                          <span className="font-medium text-primary">{stakingData.currentAPY}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Staking Tier</span>
                          <span className="font-medium">{stakingData.stakingTier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Reward Date</span>
                          <span className="font-medium">{stakingData.nextRewardDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Positions</span>
                          <span className="font-medium">{stakingData.stakingPositions.length}</span>
                        </div>
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

