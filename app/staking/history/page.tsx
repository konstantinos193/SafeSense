"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Shield,
  Download,
  Filter,
  ChevronDown,
  ArrowUpDown,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  Coins,
  FileText,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DateRange } from "react-day-picker"

// Mock data for demonstration
const stakingHistory = {
  totalStaked: 5000,
  totalRewardsEarned: 625,
  averageAPY: 12.5,
  stakingPositions: [
    {
      id: 1,
      amount: 2000,
      startDate: "2024-12-15",
      endDate: "2025-06-15",
      status: "Active",
      type: "6-Month Fixed",
      apy: 12.5,
      rewards: 125,
      rewardHistory: [
        { date: "2025-03-01", amount: 25, type: "Monthly Distribution", status: "Claimed" },
        { date: "2025-02-01", amount: 25, type: "Monthly Distribution", status: "Claimed" },
        { date: "2025-01-01", amount: 25, type: "Monthly Distribution", status: "Claimed" },
      ],
    },
    {
      id: 2,
      amount: 3000,
      startDate: "2025-01-10",
      endDate: "2025-07-10",
      status: "Active",
      type: "6-Month Fixed",
      apy: 12.5,
      rewards: 187.5,
      rewardHistory: [
        { date: "2025-03-01", amount: 37.5, type: "Monthly Distribution", status: "Claimed" },
        { date: "2025-02-01", amount: 37.5, type: "Monthly Distribution", status: "Claimed" },
      ],
    },
    {
      id: 3,
      amount: 1500,
      startDate: "2024-09-10",
      endDate: "2024-12-10",
      status: "Completed",
      type: "3-Month Fixed",
      apy: 8.0,
      rewards: 30,
      rewardHistory: [
        { date: "2024-12-01", amount: 10, type: "Monthly Distribution", status: "Claimed" },
        { date: "2024-11-01", amount: 10, type: "Monthly Distribution", status: "Claimed" },
        { date: "2024-10-01", amount: 10, type: "Monthly Distribution", status: "Claimed" },
      ],
    },
  ],
  allRewardHistory: [
    { date: "2025-03-01", amount: 62.5, positionId: "Multiple", type: "Monthly Distribution", status: "Claimed" },
    { date: "2025-02-01", amount: 62.5, positionId: "Multiple", type: "Monthly Distribution", status: "Claimed" },
    { date: "2025-01-01", amount: 25, positionId: 1, type: "Monthly Distribution", status: "Claimed" },
    { date: "2024-12-01", amount: 10, positionId: 3, type: "Monthly Distribution", status: "Claimed" },
    { date: "2024-11-01", amount: 10, positionId: 3, type: "Monthly Distribution", status: "Claimed" },
    { date: "2024-10-01", amount: 10, positionId: 3, type: "Monthly Distribution", status: "Claimed" },
  ],
  monthlyRewards: [
    { month: "Oct 2024", amount: 10 },
    { month: "Nov 2024", amount: 10 },
    { month: "Dec 2024", amount: 35 },
    { month: "Jan 2025", amount: 62.5 },
    { month: "Feb 2025", amount: 62.5 },
    { month: "Mar 2025", amount: 62.5 },
  ],
  performanceMetrics: {
    poolAverageAPY: 11.2,
    userRank: 87, // out of 1243 stakers
    percentile: 93, // top 7%
    efficiency: 98.5, // 98.5% of maximum possible rewards
    totalStakers: 1243,
  },
}

export default function StakingHistoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 9, 1), // Oct 1, 2024
    to: new Date(),
  })
  const [filteredHistory, setFilteredHistory] = useState(stakingHistory.allRewardHistory)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter history based on selected position and date range
    let filtered = stakingHistory.allRewardHistory

    if (selectedPosition !== "all") {
      const positionId = Number.parseInt(selectedPosition)
      filtered = filtered.filter((item) => item.positionId === positionId || item.positionId === "Multiple")
    }

    if (dateRange?.from && dateRange?.to) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= dateRange.from && itemDate <= dateRange.to
      })
    }

    setFilteredHistory(filtered)
  }, [selectedPosition, dateRange])

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

  const handleExportData = (format) => {
    // In a real application, this would generate and download a file
    console.log(`Exporting data in ${format} format`)
    alert(`Your staking history has been exported in ${format} format. (This is a demo feature)`)
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
                <p className="text-muted-foreground">Loading your staking history...</p>
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
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="sm" className="gap-1 p-0" asChild>
                  <Link href="/dashboard/staking">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Staking Dashboard
                  </Link>
                </Button>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Staking Rewards History</h1>
              <p className="text-muted-foreground mt-1">Track your staking history and rewards over time</p>
            </div>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExportData("csv")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportData("pdf")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportData("json")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Staked (All-time)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stakingHistory.totalStaked.toLocaleString()} SAFE</div>
                <p className="text-sm text-muted-foreground mt-1">{formatCurrency(stakingHistory.totalStaked)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Rewards Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stakingHistory.totalRewardsEarned.toLocaleString()} SAFE</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatCurrency(stakingHistory.totalRewardsEarned)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average APY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stakingHistory.averageAPY}%</div>
                <p className="text-sm text-muted-foreground mt-1">Across all staking positions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Performance Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Top {100 - stakingHistory.performanceMetrics.percentile}%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Rank {stakingHistory.performanceMetrics.userRank} of {stakingHistory.performanceMetrics.totalStakers}{" "}
                  stakers
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <label className="text-sm font-medium mb-2 block">Staking Position</label>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      {stakingHistory.stakingPositions.map((position) => (
                        <SelectItem key={position.id} value={position.id.toString()}>
                          Position #{position.id} - {position.amount.toLocaleString()} SAFE
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-2/3">
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different views */}
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history">Reward History</TabsTrigger>
              <TabsTrigger value="positions">Staking Positions</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-6 space-y-6">
              {/* Reward History Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Reward Distribution History</CardTitle>
                  <CardDescription>History of all staking rewards distributed to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b text-sm">
                      <div className="flex items-center gap-1 cursor-pointer">
                        Date <ArrowUpDown className="h-3 w-3" />
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        Amount <ArrowUpDown className="h-3 w-3" />
                      </div>
                      <div>Position</div>
                      <div>Type</div>
                      <div>Status</div>
                    </div>
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((reward, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-5 gap-4 p-4 text-sm border-b last:border-0 hover:bg-muted/50"
                        >
                          <div>{formatDate(reward.date)}</div>
                          <div>{reward.amount.toLocaleString()} SAFE</div>
                          <div>
                            {reward.positionId === "Multiple" ? "Multiple Positions" : `Position #${reward.positionId}`}
                          </div>
                          <div>{reward.type}</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              {reward.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No reward history found for the selected filters.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Rewards Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Rewards</CardTitle>
                  <CardDescription>Visualization of your monthly staking rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Monthly rewards chart will appear here</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Showing rewards from {stakingHistory.monthlyRewards[0].month} to{" "}
                        {stakingHistory.monthlyRewards[stakingHistory.monthlyRewards.length - 1].month}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-2 mt-6">
                    {stakingHistory.monthlyRewards.map((month, index) => (
                      <div key={index} className="text-center">
                        <div className="h-24 flex items-end justify-center">
                          <div
                            className="w-12 bg-primary/80 rounded-t-sm"
                            style={{
                              height: `${(month.amount / Math.max(...stakingHistory.monthlyRewards.map((m) => m.amount))) * 100}%`,
                              minHeight: "4px",
                            }}
                          ></div>
                        </div>
                        <p className="text-xs mt-2">{month.month}</p>
                        <p className="text-xs font-medium">{month.amount} SAFE</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="mt-6 space-y-6">
              {/* Staking Positions History */}
              <div className="space-y-6">
                {stakingHistory.stakingPositions.map((position) => (
                  <Card key={position.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Position #{position.id}</CardTitle>
                          <CardDescription>
                            {position.type} - {formatDate(position.startDate)} to {formatDate(position.endDate)}
                          </CardDescription>
                        </div>
                        <Badge variant={position.status === "Active" ? "default" : "secondary"}>
                          {position.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Staked Amount</p>
                          <p className="text-lg font-medium">{position.amount.toLocaleString()} SAFE</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">APY Rate</p>
                          <p className="text-lg font-medium text-primary">{position.apy}%</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total Rewards</p>
                          <p className="text-lg font-medium">{position.rewards.toLocaleString()} SAFE</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-3">Reward Distribution History</h4>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-4 gap-4 p-3 font-medium border-b text-xs">
                            <div>Date</div>
                            <div>Amount</div>
                            <div>Type</div>
                            <div>Status</div>
                          </div>
                          {position.rewardHistory.map((reward, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 p-3 text-xs border-b last:border-0">
                              <div>{formatDate(reward.date)}</div>
                              <div>{reward.amount.toLocaleString()} SAFE</div>
                              <div>{reward.type}</div>
                              <div>
                                <Badge
                                  variant="outline"
                                  size="sm"
                                  className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                  {reward.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6 space-y-6">
              {/* Performance Analytics */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>How your staking performance compares to others</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Your Average APY</span>
                        <span className="font-medium">{stakingHistory.averageAPY}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pool Average APY</span>
                        <span className="font-medium">{stakingHistory.performanceMetrics.poolAverageAPY}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Performance Percentile</span>
                        <span className="font-medium">Top {100 - stakingHistory.performanceMetrics.percentile}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Staking Efficiency</span>
                        <span className="font-medium">{stakingHistory.performanceMetrics.efficiency}%</span>
                      </div>
                    </div>

                    <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Performance comparison chart will appear here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Staking Efficiency</CardTitle>
                    <CardDescription>Analysis of your staking strategy and potential optimizations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          APY Optimization
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Your current staking strategy is achieving {stakingHistory.performanceMetrics.efficiency}% of
                          the maximum possible rewards. Consider staking for longer periods to increase your APY.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Timing Analysis
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Your staking timing has been optimal, with positions created during favorable APY periods.
                          Continue monitoring APY rates for the best entry points.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Coins className="h-4 w-4 text-primary" />
                          Reward Compounding
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          You could increase your returns by 8-12% annually by reinvesting (compounding) your monthly
                          rewards into new staking positions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Projected Earnings */}
              <Card>
                <CardHeader>
                  <CardTitle>Projected Earnings</CardTitle>
                  <CardDescription>Estimated future rewards based on your current staking positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Projected earnings chart will appear here</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="rounded-md border p-4">
                      <div className="text-sm text-muted-foreground mb-1">3-Month Projection</div>
                      <div className="text-xl font-medium">187.5 SAFE</div>
                      <p className="text-xs text-muted-foreground mt-1">Based on current APY rates</p>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="text-sm text-muted-foreground mb-1">6-Month Projection</div>
                      <div className="text-xl font-medium">375 SAFE</div>
                      <p className="text-xs text-muted-foreground mt-1">Based on current APY rates</p>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="text-sm text-muted-foreground mb-1">12-Month Projection</div>
                      <div className="text-xl font-medium">750 SAFE</div>
                      <p className="text-xs text-muted-foreground mt-1">Based on current APY rates and compounding</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                  <CardDescription>Summary of staking rewards for tax reporting purposes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground mb-1">2024 Tax Year</div>
                        <div className="text-xl font-medium">95 SAFE</div>
                        <p className="text-xs text-muted-foreground mt-1">Total rewards earned in 2024</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground mb-1">2025 Tax Year (YTD)</div>
                        <div className="text-xl font-medium">150 SAFE</div>
                        <p className="text-xs text-muted-foreground mt-1">Total rewards earned in 2025</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground mb-1">Estimated Market Value</div>
                        <div className="text-xl font-medium">{formatCurrency(245)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on token price at distribution</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" className="gap-1" onClick={() => handleExportData("tax")}>
                        <FileText className="h-4 w-4" />
                        Export Tax Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

