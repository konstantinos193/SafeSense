import Link from "next/link"
import {
  Shield,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Clock,
  Coins,
  Lock,
  Unlock,
  BarChart3,
  Percent,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StakingHelpPage() {
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
              <Link href="/staking" className="px-3 py-2 text-sm font-medium text-primary">
                Staking
              </Link>
              <Link href="/pricing" className="px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/faq" className="px-3 py-2 text-sm font-medium">
                FAQ
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
                  Staking Help Center
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about staking SAFE tokens on our platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="faq" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
                <TabsTrigger value="terms">Staking Terms</TabsTrigger>
                <TabsTrigger value="guide">Quick Start Guide</TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Find answers to common questions about staking on the SafeSense platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What is staking, and how does it work?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Staking is the process of locking up your SAFE tokens in the SafeSense platform to support
                            network operations and earn rewards in return. When you stake your tokens:
                          </p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>
                              Your tokens are locked for a period of time that you choose (3 months, 6 months, or 1
                              year)
                            </li>
                            <li>
                              During this period, your staked tokens help secure the network and validate insurance
                              claims
                            </li>
                            <li>In return, you earn staking rewards in the form of additional SAFE tokens</li>
                            <li>
                              The longer you stake and the more tokens you stake, the higher your potential rewards
                            </li>
                          </ul>
                          <p className="mt-2">
                            Think of staking as similar to a certificate of deposit (CD) in traditional banking, where
                            you commit to locking up funds for a set period in exchange for interest.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2">
                        <AccordionTrigger>How are staking rewards calculated?</AccordionTrigger>
                        <AccordionContent>
                          <p>Staking rewards are calculated based on several factors:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>
                              <strong>Base APY:</strong> Each staking period has a base Annual Percentage Yield (APY):
                              <ul className="list-circle pl-6 mt-1">
                                <li>3-month staking: 8% APY</li>
                                <li>6-month staking: 10% APY</li>
                                <li>12-month staking: 12% APY</li>
                              </ul>
                            </li>
                            <li>
                              <strong>Amount Bonus:</strong> Staking larger amounts provides bonus APY:
                              <ul className="list-circle pl-6 mt-1">
                                <li>2,500+ SAFE: +1% APY</li>
                                <li>5,000+ SAFE: +2% APY</li>
                                <li>10,000+ SAFE: +3% APY</li>
                              </ul>
                            </li>
                            <li>
                              <strong>Reward Formula:</strong> (Staked Amount × (APY + Bonus APY) × Staking Period in
                              Years)
                            </li>
                          </ul>
                          <p className="mt-2">
                            For example, if you stake 5,000 SAFE tokens for 1 year at the base 12% APY plus a 2% bonus
                            for the amount, your reward would be:
                          </p>
                          <p className="mt-2 font-medium">5,000 × (12% + 2%) × 1 = 700 SAFE tokens</p>
                          <p className="mt-2">
                            Rewards accrue daily but are distributed monthly to your staking account.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can I unstake my tokens anytime?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            When you stake your SAFE tokens, you commit to locking them for a specific period (3 months,
                            6 months, or 1 year). There are two scenarios for unstaking:
                          </p>
                          <div className="mt-2 space-y-4">
                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium flex items-center gap-2">
                                <Unlock className="h-4 w-4 text-green-500" />
                                After Lock-up Period (No Penalty)
                              </h4>
                              <p className="mt-1 text-sm">
                                Once your chosen staking period has ended, you can unstake your tokens without any
                                penalty. Your full principal amount and all accrued rewards will be returned to your
                                wallet.
                              </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium flex items-center gap-2">
                                <Lock className="h-4 w-4 text-amber-500" />
                                Early Unstaking (With Penalty)
                              </h4>
                              <p className="mt-1 text-sm">
                                If you need to unstake before your lock-up period ends, you can do so, but an early
                                withdrawal penalty will apply:
                              </p>
                              <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>You will forfeit all accrued rewards</li>
                                <li>An early withdrawal fee of 5% of your staked amount will be deducted</li>
                                <li>The remaining 95% of your principal will be returned to your wallet</li>
                              </ul>
                            </div>
                          </div>
                          <p className="mt-4">
                            We recommend carefully considering your financial needs before staking to avoid early
                            withdrawal penalties.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
                        <AccordionTrigger>What happens if I don't claim my rewards right away?</AccordionTrigger>
                        <AccordionContent>
                          <p>If you don't claim your staking rewards immediately, they will:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Remain safely in your staking account</li>
                            <li>Continue to accumulate without expiration</li>
                            <li>Not compound automatically (they don't earn additional rewards)</li>
                          </ul>
                          <p className="mt-2">You have two options for unclaimed rewards:</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Claim Anytime</h4>
                              <p className="mt-1 text-sm">
                                You can claim your rewards at any time through the staking dashboard. Once claimed,
                                they'll be transferred to your wallet and available for use.
                              </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Restake for Compounding</h4>
                              <p className="mt-1 text-sm">
                                For maximum returns, you can claim your rewards and then restake them to earn compound
                                interest. This is a manual process that you control.
                              </p>
                            </div>
                          </div>
                          <p className="mt-4">
                            There's no time limit for claiming rewards, so you can choose the strategy that works best
                            for your financial goals.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-5">
                        <AccordionTrigger>Are there any penalties for unstaking early?</AccordionTrigger>
                        <AccordionContent>
                          <p>Yes, there are penalties for unstaking before your chosen lock-up period ends:</p>
                          <div className="mt-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                            <h4 className="font-medium text-amber-800 dark:text-amber-400 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Early Unstaking Penalties
                            </h4>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>
                                <strong>Forfeited Rewards:</strong> You will lose all accrued rewards that haven't been
                                claimed
                              </li>
                              <li>
                                <strong>Withdrawal Fee:</strong> A 5% fee will be deducted from your principal amount
                              </li>
                            </ul>
                            <p className="mt-2 text-sm">
                              Example: If you staked 1,000 SAFE tokens and decide to unstake early, you would:
                            </p>
                            <ul className="list-disc pl-6 mt-1 text-sm">
                              <li>Lose any unclaimed rewards</li>
                              <li>Pay a 50 SAFE token fee (5% of 1,000)</li>
                              <li>Receive 950 SAFE tokens back</li>
                            </ul>
                          </div>
                          <p className="mt-4">
                            These penalties are in place to maintain the stability of the staking pool and ensure the
                            platform can fulfill its commitments to all stakers. We recommend only staking funds that
                            you won't need access to during the lock-up period.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-6">
                        <AccordionTrigger>Is there a minimum or maximum amount I can stake?</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-primary" />
                                Minimum Staking Amount
                              </h4>
                              <p className="mt-1">
                                The minimum amount you can stake is <strong>100 SAFE tokens</strong>. This minimum
                                ensures that the rewards generated are meaningful and that transaction costs are
                                proportional to the staking amount.
                              </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-primary" />
                                Maximum Staking Amount
                              </h4>
                              <p className="mt-1">
                                There is no hard maximum limit on how much you can stake. However, for amounts exceeding
                                100,000 SAFE tokens, we recommend contacting our support team for personalized staking
                                arrangements.
                              </p>
                            </div>
                          </div>
                          <p className="mt-4">
                            Remember that staking larger amounts (2,500+, 5,000+, or 10,000+ SAFE tokens) qualifies you
                            for bonus APY rates, increasing your potential returns.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-7">
                        <AccordionTrigger>How often are staking rewards distributed?</AccordionTrigger>
                        <AccordionContent>
                          <p>Staking rewards on the SafeSense platform are handled as follows:</p>
                          <div className="mt-2 space-y-3">
                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Accrual Frequency</h4>
                                <p className="text-sm">
                                  Rewards accrue daily based on your staked amount and applicable APY rate. You can see
                                  your accruing rewards in real-time on your staking dashboard.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Coins className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Distribution Schedule</h4>
                                <p className="text-sm">
                                  Rewards are distributed to your staking account on the 1st day of each month. These
                                  rewards become available for claiming at this time.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Claiming Process</h4>
                                <p className="text-sm">
                                  You can claim your distributed rewards at any time through the staking dashboard.
                                  Claiming transfers the rewards from your staking account to your wallet.
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="mt-4">
                            For example, if you stake 1,000 SAFE tokens at 10% APY on January 15th, you'll start
                            accruing rewards immediately. On February 1st, you'll receive approximately 1.37 SAFE tokens
                            (1,000 × 10% × 5/365) in your staking account, which you can then claim.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-8">
                        <AccordionTrigger>Can I add more tokens to an existing stake?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Yes, you can add more tokens to an existing stake, but there are some important
                            considerations:
                          </p>
                          <div className="mt-2 space-y-4">
                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Adding to Existing Position</h4>
                              <p className="mt-1 text-sm">When you add tokens to an existing staking position:</p>
                              <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>
                                  The additional tokens will adopt the same lock-up period end date as your original
                                  stake
                                </li>
                                <li>This means they may be locked for less than the full 3, 6, or 12 months</li>
                                <li>The APY for the additional tokens will be the same as your original stake</li>
                              </ul>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Creating a New Position</h4>
                              <p className="mt-1 text-sm">Alternatively, you can create a new staking position:</p>
                              <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>This allows you to select a different lock-up period for the new tokens</li>
                                <li>You'll get the full duration of whatever period you choose</li>
                                <li>You can potentially get a higher APY by selecting a longer period</li>
                                <li>This creates a separate staking position that you can track individually</li>
                              </ul>
                            </div>
                          </div>
                          <p className="mt-4">
                            If adding more tokens would push you into a higher bonus APY tier (2,500+, 5,000+, or
                            10,000+ SAFE), the entire staking position will benefit from the higher rate going forward.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-9">
                        <AccordionTrigger>What happens to my stake if there's a network upgrade?</AccordionTrigger>
                        <AccordionContent>
                          <p>During network upgrades or protocol changes:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Your staked tokens and accrued rewards remain secure</li>
                            <li>
                              There may be brief periods (typically less than 24 hours) when the staking dashboard is in
                              read-only mode
                            </li>
                            <li>
                              During these periods, you can view your stake but cannot make changes or claim rewards
                            </li>
                            <li>Reward accrual continues uninterrupted during upgrades</li>
                          </ul>
                          <p className="mt-2">For major protocol upgrades:</p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>We provide at least 7 days' notice through email and platform announcements</li>
                            <li>
                              Your staking terms (APY, lock-up period, etc.) remain unchanged unless explicitly
                              communicated
                            </li>
                            <li>
                              In rare cases where changes might affect staking terms, we provide options for stakers to
                              adjust or exit positions without penalties
                            </li>
                          </ul>
                          <p className="mt-4">
                            SafeSense is committed to maintaining the integrity of all staking positions during any
                            system changes or upgrades.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-10">
                        <AccordionTrigger>How does staking benefit the SafeSense ecosystem?</AccordionTrigger>
                        <AccordionContent>
                          <p>Staking plays a crucial role in the SafeSense ecosystem by:</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Securing the Network</h4>
                              <p className="mt-1 text-sm">
                                Staked tokens help secure the blockchain network that powers our insurance smart
                                contracts. The more tokens staked, the more secure and resistant to attacks the network
                                becomes.
                              </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Supporting Claims Processing</h4>
                              <p className="mt-1 text-sm">
                                Staked tokens provide the liquidity needed for automatic claims processing. This ensures
                                that valid insurance claims can be paid out quickly and efficiently.
                              </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Reducing Premium Costs</h4>
                              <p className="mt-1 text-sm">
                                A healthy staking pool allows us to offer more competitive insurance premiums to all
                                users. The returns generated from the staking ecosystem offset operational costs.
                              </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted">
                              <h4 className="font-medium">Aligning Incentives</h4>
                              <p className="mt-1 text-sm">
                                Staking creates alignment between token holders and the platform's success. When you
                                stake, you become a stakeholder in the ecosystem and benefit from its growth.
                              </p>
                            </div>
                          </div>
                          <p className="mt-4">
                            By staking your SAFE tokens, you're not just earning rewards—you're actively contributing to
                            a more secure, efficient, and affordable insurance platform for all users.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Staking Terms Tab */}
              <TabsContent value="terms" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Percent className="h-5 w-5 text-primary" />
                      Staking Terms
                    </CardTitle>
                    <CardDescription>
                      Clear explanation of staking terms, conditions, and important information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Lock-up Periods</h3>
                      <p className="text-muted-foreground mb-2">
                        When you stake SAFE tokens, you commit to locking them for a specific period. We offer three
                        staking periods:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-medium text-center">3 Months</h4>
                          <div className="text-center mt-2">
                            <span className="text-2xl font-bold text-primary">8%</span>
                            <span className="text-sm text-muted-foreground"> APY</span>
                          </div>
                          <p className="text-sm text-center mt-2">Short-term commitment with lower returns</p>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-medium text-center">6 Months</h4>
                          <div className="text-center mt-2">
                            <span className="text-2xl font-bold text-primary">10%</span>
                            <span className="text-sm text-muted-foreground"> APY</span>
                          </div>
                          <p className="text-sm text-center mt-2">Medium-term commitment with balanced returns</p>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-medium text-center">12 Months</h4>
                          <div className="text-center mt-2">
                            <span className="text-2xl font-bold text-primary">12%</span>
                            <span className="text-sm text-muted-foreground"> APY</span>
                          </div>
                          <p className="text-sm text-center mt-2">Long-term commitment with highest returns</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        During the lock-up period, your staked tokens cannot be withdrawn without incurring early
                        withdrawal penalties.
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-2">Early Withdrawal Penalties</h3>
                      <p className="text-muted-foreground mb-4">
                        If you need to unstake your tokens before the lock-up period ends, the following penalties
                        apply:
                      </p>
                      <Alert
                        variant="destructive"
                        className="bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Early Withdrawal Penalties</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-6 mt-2">
                            <li>Forfeiture of all accrued rewards that haven't been claimed</li>
                            <li>5% fee deducted from your principal staked amount</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                      <p className="text-sm text-muted-foreground mt-4">
                        These penalties are necessary to maintain the stability of the staking pool and ensure we can
                        fulfill our commitments to all stakers.
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-2">Reward Distribution</h3>
                      <p className="text-muted-foreground mb-2">Understanding how and when rewards are distributed:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                          <strong>Accrual:</strong> Rewards accrue daily based on your staked amount and APY
                        </li>
                        <li>
                          <strong>Distribution:</strong> Accrued rewards are distributed to your staking account on the
                          1st of each month
                        </li>
                        <li>
                          <strong>Claiming:</strong> You can claim distributed rewards at any time through the staking
                          dashboard
                        </li>
                        <li>
                          <strong>Compounding:</strong> Rewards do not automatically compound; you must manually claim
                          and restake them
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-2">Staking Bonus Tiers</h3>
                      <p className="text-muted-foreground mb-2">
                        Staking larger amounts of SAFE tokens qualifies you for bonus APY rates:
                      </p>
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted">
                              <th className="px-4 py-2 text-left">Staking Amount</th>
                              <th className="px-4 py-2 text-left">Bonus APY</th>
                              <th className="px-4 py-2 text-left">Total APY (12-month)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="px-4 py-2">100 - 2,499 SAFE</td>
                              <td className="px-4 py-2">+0%</td>
                              <td className="px-4 py-2">12%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="px-4 py-2">2,500 - 4,999 SAFE</td>
                              <td className="px-4 py-2">+1%</td>
                              <td className="px-4 py-2">13%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="px-4 py-2">5,000 - 9,999 SAFE</td>
                              <td className="px-4 py-2">+2%</td>
                              <td className="px-4 py-2">14%</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2">10,000+ SAFE</td>
                              <td className="px-4 py-2">+3%</td>
                              <td className="px-4 py-2">15%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Bonus APY applies to your entire staked amount, not just the portion above the threshold. If you
                        add more tokens that push you into a higher tier, the new rate applies to your entire stake
                        going forward.
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-2">Risks and Safety</h3>
                      <p className="text-muted-foreground mb-2">
                        We believe in full transparency about the risks associated with staking:
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="p-4 rounded-lg bg-muted">
                          <h4 className="font-medium">Smart Contract Risk</h4>
                          <p className="text-sm mt-1">
                            While our smart contracts are audited by leading security firms, all blockchain applications
                            carry some level of smart contract risk. We maintain a bug bounty program and regular
                            security reviews to minimize this risk.
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-muted">
                          <h4 className="font-medium">Market Volatility</h4>
                          <p className="text-sm mt-1">
                            The value of SAFE tokens may fluctuate based on market conditions. While staking rewards are
                            denominated in SAFE tokens, the fiat value of these rewards may vary.
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-muted">
                          <h4 className="font-medium">Liquidity Constraints</h4>
                          <p className="text-sm mt-1">
                            During the lock-up period, your staked tokens are not liquid unless you pay early withdrawal
                            penalties. Consider your liquidity needs before staking.
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-medium">Safety Measures</h4>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>All staking contracts are audited by independent security firms</li>
                          <li>We maintain a reserve fund to ensure reward payments even during market downturns</li>
                          <li>Multi-signature wallets and time-locks protect all staking pools</li>
                          <li>Regular security assessments and penetration testing</li>
                          <li>Insurance coverage for the staking pool against hacks and exploits</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-2">Staking Agreement</h3>
                      <p className="text-muted-foreground mb-2">By staking SAFE tokens, you agree to:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Accept the terms and conditions of the staking program</li>
                        <li>Acknowledge the lock-up period and early withdrawal penalties</li>
                        <li>Understand that staking rewards may vary based on network performance</li>
                        <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                      </ul>
                      <div className="mt-4">
                        <Button variant="outline" asChild>
                          <Link href="/staking/terms">View Full Staking Agreement</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quick Start Guide Tab */}
              <TabsContent value="guide" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-primary" />
                      Quick Start Guide
                    </CardTitle>
                    <CardDescription>Step-by-step instructions to start staking your SAFE tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                          1
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
                          <p className="text-muted-foreground mb-4">
                            Before you can stake, you need to connect your wallet to the SafeSense platform.
                          </p>
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>
                              Navigate to the{" "}
                              <Link href="/staking" className="text-primary hover:underline">
                                Staking page
                              </Link>
                            </li>
                            <li>Click the "Connect Wallet" button in the top right corner</li>
                            <li>Select your preferred wallet provider (MetaMask, WalletConnect, etc.)</li>
                            <li>Follow the prompts to complete the connection process</li>
                          </ol>
                          <Alert className="mt-4 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                            <HelpCircle className="h-4 w-4" />
                            <AlertTitle>Tip</AlertTitle>
                            <AlertDescription>
                              Make sure you have SAFE tokens in your wallet before proceeding. If you need to purchase
                              SAFE tokens, you can do so on supported exchanges or directly through our platform.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                          2
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">Choose Your Staking Options</h3>
                          <p className="text-muted-foreground mb-4">
                            Select how much you want to stake and for how long.
                          </p>
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>Click the "Stake Now" button on the staking dashboard</li>
                            <li>Enter the amount of SAFE tokens you wish to stake</li>
                            <li>Select your preferred staking period (3, 6, or 12 months)</li>
                            <li>Review the estimated rewards and APY information</li>
                          </ol>
                          <div className="mt-4 p-4 rounded-lg bg-muted">
                            <h4 className="font-medium">Staking Calculator</h4>
                            <p className="text-sm mt-1">
                              Not sure how much to stake or which period to choose? Use our{" "}
                              <Link href="/staking/calculator" className="text-primary hover:underline">
                                Staking Calculator
                              </Link>{" "}
                              to compare different scenarios and find the option that best suits your goals.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                          3
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">Confirm Your Stake</h3>
                          <p className="text-muted-foreground mb-4">Review and confirm your staking transaction.</p>
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>Review all details of your staking position</li>
                            <li>Check the lock-up period end date</li>
                            <li>Confirm the amount and expected rewards</li>
                            <li>Click "Confirm Stake" to proceed</li>
                            <li>Approve the transaction in your wallet</li>
                          </ol>
                          <Alert className="mt-4" variant="warning">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                              Once confirmed, your tokens will be locked for the selected period. Make sure you won't
                              need access to these funds during the lock-up period to avoid early withdrawal penalties.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                          4
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">Monitor Your Staking Position</h3>
                          <p className="text-muted-foreground mb-4">
                            Track your staking position and rewards on the dashboard.
                          </p>
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>
                              Visit the{" "}
                              <Link href="/dashboard/staking" className="text-primary hover:underline">
                                Staking Dashboard
                              </Link>{" "}
                              to view your active positions
                            </li>
                            <li>Monitor your accruing rewards in real-time</li>
                            <li>Check your staking status and lock-up period progress</li>
                            <li>View your reward history and projected future rewards</li>
                          </ol>
                          <div className="mt-4 p-4 rounded-lg bg-muted">
                            <h4 className="font-medium">Managing Multiple Positions</h4>
                            <p className="text-sm mt-1">
                              You can have multiple staking positions with different amounts and lock-up periods. Each
                              position is tracked separately on your dashboard, allowing you to diversify your staking
                              strategy.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                          5
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">Claim Your Rewards</h3>
                          <p className="text-muted-foreground mb-4">
                            Claim your staking rewards when they become available.
                          </p>
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>On the Staking Dashboard, locate the "Claimable Rewards" section</li>
                            <li>Click the "Claim Rewards" button</li>
                            <li>Confirm the transaction in your wallet</li>
                            <li>Once confirmed, rewards will be transferred to your wallet</li>
                          </ol>
                          <Alert className="mt-4 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                            <Coins className="h-4 w-4" />
                            <AlertTitle>Reward Strategy</AlertTitle>
                            <AlertDescription>
                              For maximum returns, consider restaking your claimed rewards. This creates a compounding
                              effect that can significantly increase your overall earnings over time.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-medium mb-4">Ready to Start Staking?</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" asChild>
                          <Link href="/staking/stake">Stake Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link href="/staking/calculator">Try the Calculator</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Still Have Questions?</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our team is here to help you with any questions about staking
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button variant="outline" asChild>
                  <Link href="/#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/staking">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Back to Staking
                  </Link>
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

