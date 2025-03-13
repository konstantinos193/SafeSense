"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  Users,
  Award,
  Gift,
  Copy,
  Check,
  ChevronRight,
  Share2,
  Clock,
  ArrowRight,
  Zap,
  BadgeCheck,
  Star,
  Trophy,
  Crown,
  Sparkles,
  Info,
  Coins,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

// Mock data for demonstration
const userData = {
  referralCode: "SAFESENSE123",
  referralLink: "https://safesense.com/ref/SAFESENSE123",
  referralCount: 7,
  pendingReferrals: 2,
  totalReferralRewards: 350,
  loyaltyPoints: 2750,
  loyaltyTier: "Gold",
  tierProgress: 75,
  pointsToNextTier: 250,
  nextTier: "Platinum",
  memberSince: "2024-09-15",
  availableRewards: [
    { id: 1, name: "Premium Discount", cost: 500, description: "10% discount on your next premium payment" },
    {
      id: 2,
      name: "Deductible Reduction",
      cost: 1000,
      description: "Reduce your deductible by $100 on your next claim",
    },
    { id: 3, name: "Coverage Boost", cost: 1500, description: "5% increase in coverage limits for 3 months" },
    { id: 4, name: "Priority Claims", cost: 2000, description: "Priority processing for your next claim" },
  ],
  recentActivity: [
    { date: "2025-03-01", type: "Points Earned", amount: 150, description: "Monthly staking reward bonus" },
    { date: "2025-02-15", type: "Reward Redeemed", amount: -500, description: "Premium Discount" },
    { date: "2025-02-01", type: "Points Earned", amount: 200, description: "Successful referral: John Smith" },
    { date: "2025-01-15", type: "Points Earned", amount: 100, description: "Policy renewal bonus" },
  ],
  referrals: [
    { name: "John Smith", date: "2025-02-01", status: "Completed", reward: 200 },
    { name: "Sarah Johnson", date: "2025-01-15", status: "Completed", reward: 200 },
    { name: "Michael Brown", date: "2024-12-10", status: "Completed", reward: 200 },
    { name: "Emily Davis", date: "2024-11-22", status: "Completed", reward: 200 },
    { name: "David Wilson", date: "2024-10-05", status: "Completed", reward: 200 },
    { name: "Jessica Taylor", date: "2025-02-20", status: "Pending", reward: 0 },
    { name: "Robert Martinez", date: "2025-02-25", status: "Pending", reward: 0 },
  ],
}

const loyaltyTiers = [
  {
    name: "Bronze",
    icon: <BadgeCheck className="h-6 w-6" />,
    pointsRequired: 0,
    benefits: ["5% staking APY bonus", "Basic customer support", "Standard claim processing"],
  },
  {
    name: "Silver",
    icon: <Star className="h-6 w-6" />,
    pointsRequired: 1000,
    benefits: ["7.5% staking APY bonus", "Priority customer support", "5% premium discount", "Faster claim processing"],
  },
  {
    name: "Gold",
    icon: <Trophy className="h-6 w-6" />,
    pointsRequired: 2500,
    benefits: [
      "10% staking APY bonus",
      "VIP customer support",
      "10% premium discount",
      "Express claim processing",
      "Free policy upgrades",
    ],
  },
  {
    name: "Platinum",
    icon: <Crown className="h-6 w-6" />,
    pointsRequired: 5000,
    benefits: [
      "15% staking APY bonus",
      "Dedicated account manager",
      "15% premium discount",
      "Instant claim processing",
      "Free policy upgrades",
      "Exclusive investment opportunities",
    ],
  },
  {
    name: "Diamond",
    icon: <Sparkles className="h-6 w-6" />,
    pointsRequired: 10000,
    benefits: [
      "20% staking APY bonus",
      "Concierge service",
      "20% premium discount",
      "Instant claim processing",
      "Free policy upgrades",
      "Exclusive investment opportunities",
      "Annual rewards bonus",
    ],
  },
]

export default function RewardsPage() {
  const [copied, setCopied] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false)

  const copyReferralLink = () => {
    navigator.clipboard.writeText(userData.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied to your clipboard",
    })
  }

  const shareReferral = (platform) => {
    // In a real app, this would integrate with social sharing APIs
    console.log(`Sharing referral link on ${platform}`)
    setShareDialogOpen(false)
    toast({
      title: "Referral shared",
      description: `Your referral link has been shared on ${platform}`,
    })
  }

  const redeemReward = () => {
    // In a real app, this would call an API to redeem the reward
    console.log(`Redeeming reward: ${selectedReward.name}`)
    setRedeemDialogOpen(false)
    toast({
      title: "Reward redeemed",
      description: `You have successfully redeemed: ${selectedReward.name}`,
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Find current tier and next tier
  const currentTierIndex = loyaltyTiers.findIndex((tier) => tier.name === userData.loyaltyTier)
  const currentTier = loyaltyTiers[currentTierIndex]
  const nextTier = loyaltyTiers[currentTierIndex + 1]

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
              <Link href="/dashboard/staking" className="px-3 py-2 text-sm font-medium">
                Staking
              </Link>
              <Link href="/rewards" className="px-3 py-2 text-sm font-medium text-primary">
                Rewards
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
              <h1 className="text-3xl font-bold tracking-tight">Rewards & Referrals</h1>
              <p className="text-muted-foreground mt-1">Earn rewards for referrals and loyalty</p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Loyalty Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.loyaltyPoints.toLocaleString()}</div>
                <div className="flex items-center mt-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600">{userData.loyaltyTier} Tier</Badge>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress to {userData.nextTier}</span>
                    <span>{userData.pointsToNextTier} points needed</span>
                  </div>
                  <Progress value={userData.tierProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Referral Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${userData.totalReferralRewards}</div>
                <p className="text-sm text-muted-foreground mt-1">From {userData.referralCount} successful referrals</p>
                <div className="flex items-center mt-2">
                  {userData.pendingReferrals > 0 && (
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      {userData.pendingReferrals} pending
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Your Referral Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold font-mono">{userData.referralCode}</div>
                  <Button variant="ghost" size="icon" onClick={copyReferralLink} className="h-8 w-8">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share Your Referral Link</DialogTitle>
                        <DialogDescription>Choose how you want to share your unique referral link</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <Button
                          variant="outline"
                          onClick={() => shareReferral("Email")}
                          className="h-24 flex flex-col gap-2"
                        >
                          <Mail className="h-8 w-8" />
                          <span>Email</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => shareReferral("Twitter")}
                          className="h-24 flex flex-col gap-2"
                        >
                          <Twitter className="h-8 w-8" />
                          <span>Twitter</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => shareReferral("Facebook")}
                          className="h-24 flex flex-col gap-2"
                        >
                          <Facebook className="h-8 w-8" />
                          <span>Facebook</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => shareReferral("LinkedIn")}
                          className="h-24 flex flex-col gap-2"
                        >
                          <Linkedin className="h-8 w-8" />
                          <span>LinkedIn</span>
                        </Button>
                      </div>
                      <Separator />
                      <div className="pt-4">
                        <div className="flex items-center gap-2">
                          <Input value={userData.referralLink} readOnly />
                          <Button variant="outline" size="icon" onClick={copyReferralLink}>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Member Since</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDate(userData.memberSince)}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.floor((new Date() - new Date(userData.memberSince)) / (1000 * 60 * 60 * 24 * 30))} months
                </p>
                <div className="flex items-center mt-2">
                  <Link href="#loyalty-tiers" className="text-xs text-primary flex items-center">
                    View loyalty benefits
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="referrals" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="referrals">Referral Program</TabsTrigger>
              <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
              <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            </TabsList>

            {/* Referral Program Tab */}
            <TabsContent value="referrals" className="mt-6 space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>How Referrals Work</CardTitle>
                      <CardDescription>Earn rewards by inviting friends to SafeSense</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Share2 className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Share Your Link</h3>
                          <p className="text-sm text-muted-foreground">
                            Share your unique referral link with friends and family
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Friends Sign Up</h3>
                          <p className="text-sm text-muted-foreground">
                            When they sign up and purchase a policy using your link
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Gift className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Both Get Rewarded</h3>
                          <p className="text-sm text-muted-foreground">
                            You earn $50 and they get 10% off their first premium
                          </p>
                        </div>
                      </div>

                      <Alert className="bg-primary/10 border-primary/20">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertDescription className="text-sm text-primary">
                          The more friends you refer, the more rewards you earn! There's no limit to how many people you
                          can refer.
                        </AlertDescription>
                      </Alert>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">Your Referral Link</h3>
                        <div className="flex items-center gap-2">
                          <Input value={userData.referralLink} readOnly className="font-mono text-sm" />
                          <Button variant="outline" onClick={copyReferralLink}>
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copied ? "Copied" : "Copy"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Your Referrals</CardTitle>
                      <CardDescription>Track the status of your referrals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b text-sm">
                          <div>Name</div>
                          <div>Date</div>
                          <div>Status</div>
                          <div>Reward</div>
                        </div>
                        {userData.referrals.map((referral, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 p-4 text-sm border-b last:border-0">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{referral.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{referral.name}</span>
                            </div>
                            <div>{formatDate(referral.date)}</div>
                            <div>
                              <Badge
                                variant="outline"
                                className={
                                  referral.status === "Completed"
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                }
                              >
                                {referral.status}
                              </Badge>
                            </div>
                            <div>
                              {referral.status === "Completed" ? (
                                `$${referral.reward}`
                              ) : (
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Referral Bonuses</CardTitle>
                      <CardDescription>Earn more with volume bonuses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">1-5 Referrals</div>
                              <div className="text-xs text-muted-foreground">Standard reward</div>
                            </div>
                          </div>
                          <div className="font-bold">$50 each</div>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">6-10 Referrals</div>
                              <div className="text-xs text-muted-foreground">Volume bonus</div>
                            </div>
                          </div>
                          <div className="font-bold">$75 each</div>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Award className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">11+ Referrals</div>
                              <div className="text-xs text-muted-foreground">Premium bonus</div>
                            </div>
                          </div>
                          <div className="font-bold">$100 each</div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Your Current Status</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Completed Referrals</span>
                          <span className="font-medium">{userData.referralCount}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Current Reward Rate</span>
                          <span className="font-medium">
                            {userData.referralCount >= 11 ? "$100" : userData.referralCount >= 6 ? "$75" : "$50"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Next Tier In</span>
                          <span className="font-medium">
                            {userData.referralCount >= 11
                              ? "Highest tier reached"
                              : userData.referralCount >= 6
                                ? `${11 - userData.referralCount} more referrals`
                                : `${6 - userData.referralCount} more referrals`}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button className="w-full">
                          Invite More Friends
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Referral Tips</CardTitle>
                      <CardDescription>Maximize your referral success</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Target the right people</h4>
                          <p className="text-sm text-muted-foreground">
                            Focus on friends who might need insurance or are interested in crypto.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Explain the benefits</h4>
                          <p className="text-sm text-muted-foreground">
                            Share why you chose SafeSense and how it's helped you.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Gift className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Highlight their discount</h4>
                          <p className="text-sm text-muted-foreground">
                            Remind them they'll get 10% off their first premium.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Loyalty Program Tab */}
            <TabsContent value="loyalty" className="mt-6 space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Loyalty Program Overview</CardTitle>
                      <CardDescription>Earn points and unlock exclusive benefits</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Buy Insurance</h3>
                          <p className="text-sm text-muted-foreground">
                            Earn points for every dollar spent on premiums
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Coins className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Stake Tokens</h3>
                          <p className="text-sm text-muted-foreground">Get bonus points for staking SAFE tokens</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Unlock Tiers</h3>
                          <p className="text-sm text-muted-foreground">Reach higher tiers for premium benefits</p>
                        </div>
                      </div>

                      <Alert className="bg-primary/10 border-primary/20">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertDescription className="text-sm text-primary">
                          Points never expire as long as your account remains active with at least one policy or staking
                          position.
                        </AlertDescription>
                      </Alert>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">Ways to Earn Points</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Premium payments</span>
                            <span className="font-medium">1 point per $1</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Policy renewal</span>
                            <span className="font-medium">500 points</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Staking SAFE tokens</span>
                            <span className="font-medium">1 point per 10 SAFE per month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Successful referral</span>
                            <span className="font-medium">200 points</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Account anniversary</span>
                            <span className="font-medium">1,000 points</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6" id="loyalty-tiers">
                    <CardHeader>
                      <CardTitle>Loyalty Tiers</CardTitle>
                      <CardDescription>Exclusive benefits for each tier</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {loyaltyTiers.map((tier, index) => (
                          <div
                            key={index}
                            className={`rounded-lg border p-4 ${tier.name === userData.loyaltyTier ? "border-primary bg-primary/5" : ""}`}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`h-10 w-10 rounded-full ${tier.name === userData.loyaltyTier ? "bg-primary text-primary-foreground" : "bg-muted"} flex items-center justify-center`}
                              >
                                {tier.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{tier.name} Tier</h3>
                                <p className="text-xs text-muted-foreground">
                                  {tier.pointsRequired.toLocaleString()} points required
                                </p>
                              </div>
                              {tier.name === userData.loyaltyTier && <Badge className="ml-auto">Current Tier</Badge>}
                            </div>
                            <div className="space-y-2">
                              {tier.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-primary mt-0.5" />
                                  <span className="text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Loyalty Status</CardTitle>
                      <CardDescription>Current tier and progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          {currentTier.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{userData.loyaltyTier} Tier</h3>
                          <p className="text-xs text-muted-foreground">
                            Member since {formatDate(userData.memberSince)}
                          </p>
                        </div>
                      </div>

                      {nextTier && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress to {nextTier.name}</span>
                            <span>{userData.pointsToNextTier} points needed</span>
                          </div>
                          <Progress value={userData.tierProgress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{userData.loyaltyPoints} points</span>
                            <span>{nextTier.pointsRequired} points</span>
                          </div>
                        </div>
                      )}

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Points Summary</h3>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Current Balance</span>
                            <span className="font-medium">{userData.loyaltyPoints.toLocaleString()} points</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Earned This Month</span>
                            <span className="font-medium">350 points</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Redeemed This Year</span>
                            <span className="font-medium">1,500 points</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#recent-activity">
                            View Points History
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6" id="recent-activity">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your recent points transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <div className="font-medium">{activity.type}</div>
                              <div className="text-xs text-muted-foreground">{formatDate(activity.date)}</div>
                              <div className="text-xs text-muted-foreground mt-1">{activity.description}</div>
                            </div>
                            <div className={`font-bold ${activity.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                              {activity.amount > 0 ? "+" : ""}
                              {activity.amount} points
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Available Rewards Tab */}
            <TabsContent value="rewards" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userData.availableRewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardHeader>
                      <CardTitle>{reward.name}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-primary mr-2" />
                          <span className="font-bold">{reward.cost.toLocaleString()} points</span>
                        </div>
                        <Badge variant={userData.loyaltyPoints >= reward.cost ? "default" : "outline"}>
                          {userData.loyaltyPoints >= reward.cost ? "Available" : "Not Enough Points"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full"
                            disabled={userData.loyaltyPoints < reward.cost}
                            onClick={() => setSelectedReward(reward)}
                          >
                            Redeem Reward
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Redeem Reward</DialogTitle>
                            <DialogDescription>You are about to redeem the following reward</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="rounded-lg border p-4 mb-4">
                              <h3 className="font-medium">{selectedReward?.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{selectedReward?.description}</p>
                              <div className="flex items-center mt-3">
                                <Award className="h-4 w-4 text-primary mr-2" />
                                <span className="text-sm font-medium">
                                  {selectedReward?.cost.toLocaleString()} points
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                              <span>Your points balance after redemption:</span>
                              <span className="font-bold">
                                {selectedReward ? (userData.loyaltyPoints - selectedReward.cost).toLocaleString() : 0}{" "}
                                points
                              </span>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setSelectedReward(null)}>
                              Cancel
                            </Button>
                            <Button onClick={redeemReward}>Confirm Redemption</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Reward Redemption History</CardTitle>
                  <CardDescription>Your previously redeemed rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b text-sm">
                      <div>Reward</div>
                      <div>Date</div>
                      <div>Points Used</div>
                      <div>Status</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm border-b">
                      <div>Premium Discount</div>
                      <div>Feb 15, 2025</div>
                      <div>500 points</div>
                      <div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Applied
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm border-b">
                      <div>Coverage Boost</div>
                      <div>Dec 10, 2024</div>
                      <div>1,500 points</div>
                      <div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Applied
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm">
                      <div>Priority Claims</div>
                      <div>Oct 5, 2024</div>
                      <div>2,000 points</div>
                      <div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Applied
                        </Badge>
                      </div>
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

// Missing component imports
function Mail(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function Twitter(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function Facebook(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function Linkedin(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MessageSquare(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

