import Link from "next/link"
import { Shield, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StakingTermsPage() {
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
              <Link href="/staking" className="px-3 py-2 text-sm font-medium">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Staking Terms and Conditions
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">Last updated: March 1, 2025</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="sticky top-24">
                  <nav className="space-y-2">
                    <a href="#introduction" className="block text-sm hover:text-primary">
                      1. Introduction
                    </a>
                    <a href="#definitions" className="block text-sm hover:text-primary">
                      2. Definitions
                    </a>
                    <a href="#eligibility" className="block text-sm hover:text-primary">
                      3. Eligibility
                    </a>
                    <a href="#staking-process" className="block text-sm hover:text-primary">
                      4. Staking Process
                    </a>
                    <a href="#lock-up-periods" className="block text-sm hover:text-primary">
                      5. Lock-up Periods
                    </a>
                    <a href="#rewards" className="block text-sm hover:text-primary">
                      6. Rewards
                    </a>
                    <a href="#unstaking" className="block text-sm hover:text-primary">
                      7. Unstaking
                    </a>
                    <a href="#risks" className="block text-sm hover:text-primary">
                      8. Risks
                    </a>
                    <a href="#taxes" className="block text-sm hover:text-primary">
                      9. Taxes
                    </a>
                    <a href="#modifications" className="block text-sm hover:text-primary">
                      10. Modifications
                    </a>
                    <a href="#termination" className="block text-sm hover:text-primary">
                      11. Termination
                    </a>
                    <a href="#liability" className="block text-sm hover:text-primary">
                      12. Limitation of Liability
                    </a>
                    <a href="#governing-law" className="block text-sm hover:text-primary">
                      13. Governing Law
                    </a>
                    <a href="#contact" className="block text-sm hover:text-primary">
                      14. Contact Us
                    </a>
                  </nav>
                </div>
              </div>

              <div className="md:w-3/4">
                <Alert className="mb-8">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important Notice</AlertTitle>
                  <AlertDescription>
                    This document contains important information about staking SAFE tokens on the SafeSense platform.
                    Please read it carefully before participating in our staking program.
                  </AlertDescription>
                </Alert>

                <div className="prose max-w-none">
                  <section id="introduction">
                    <h2 className="text-2xl font-bold">1. Introduction</h2>
                    <p>
                      These Staking Terms and Conditions ("Staking Terms") govern your participation in the SafeSense
                      staking program ("Staking Program"). The Staking Program allows eligible users to stake SAFE
                      tokens and earn rewards. By participating in the Staking Program, you agree to be bound by these
                      Staking Terms.
                    </p>
                    <p>
                      These Staking Terms are supplemental to and form part of the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      . In the event of any conflict between these Staking Terms and the Terms of Service, these Staking
                      Terms shall prevail with respect to the Staking Program only.
                    </p>
                  </section>

                  <section id="definitions">
                    <h2 className="text-2xl font-bold mt-8">2. Definitions</h2>
                    <p>For the purposes of these Staking Terms:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>"SAFE Tokens"</strong> refers to the native utility tokens of the SafeSense platform.
                      </li>
                      <li>
                        <strong>"Staking"</strong> refers to the process of locking SAFE Tokens in a smart contract for
                        a specified period to support the SafeSense ecosystem and earn rewards.
                      </li>
                      <li>
                        <strong>"Staking Rewards"</strong> refers to the additional SAFE Tokens earned as a result of
                        participating in the Staking Program.
                      </li>
                      <li>
                        <strong>"Lock-up Period"</strong> refers to the duration for which SAFE Tokens are committed to
                        staking and cannot be withdrawn without penalties.
                      </li>
                      <li>
                        <strong>"APY"</strong> (Annual Percentage Yield) refers to the rate of return earned on staked
                        SAFE Tokens over a one-year period, taking into account the effect of compounding.
                      </li>
                      <li>
                        <strong>"Early Withdrawal"</strong> refers to the process of unstaking SAFE Tokens before the
                        completion of the selected Lock-up Period.
                      </li>
                      <li>
                        <strong>"Early Withdrawal Penalty"</strong> refers to the fee charged for unstaking SAFE Tokens
                        before the completion of the selected Lock-up Period.
                      </li>
                    </ul>
                  </section>

                  <section id="eligibility">
                    <h2 className="text-2xl font-bold mt-8">3. Eligibility</h2>
                    <p>To be eligible to participate in the Staking Program, you must:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Be at least 18 years of age or the age of majority in your jurisdiction, whichever is higher.
                      </li>
                      <li>Have a registered and verified account on the SafeSense platform.</li>
                      <li>Own SAFE Tokens in your SafeSense wallet.</li>
                      <li>
                        Not be a resident of or located in a jurisdiction where participation in the Staking Program
                        would be illegal or restricted.
                      </li>
                      <li>Comply with all applicable laws and regulations in your jurisdiction.</li>
                    </ul>
                    <p>
                      SafeSense reserves the right to determine eligibility for the Staking Program at its sole
                      discretion and may refuse participation to any user without providing a reason.
                    </p>
                  </section>

                  <section id="staking-process">
                    <h2 className="text-2xl font-bold mt-8">4. Staking Process</h2>
                    <p>The staking process involves the following steps:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Selection of Staking Amount:</strong> You must select the amount of SAFE Tokens you wish
                        to stake. The minimum staking amount is 100 SAFE Tokens.
                      </li>
                      <li>
                        <strong>Selection of Lock-up Period:</strong> You must select a Lock-up Period from the
                        available options (3 months, 6 months, or 12 months).
                      </li>
                      <li>
                        <strong>Confirmation:</strong> You must review and confirm the staking details, including the
                        amount, Lock-up Period, and estimated rewards.
                      </li>
                      <li>
                        <strong>Token Transfer:</strong> Upon confirmation, the selected amount of SAFE Tokens will be
                        transferred from your wallet to the staking smart contract.
                      </li>
                      <li>
                        <strong>Staking Activation:</strong> Your staking position will be activated, and you will start
                        earning rewards according to the applicable APY rate.
                      </li>
                    </ol>
                    <p>
                      By completing the staking process, you acknowledge that you have read, understood, and agreed to
                      these Staking Terms.
                    </p>
                  </section>

                  <section id="lock-up-periods">
                    <h2 className="text-2xl font-bold mt-8">5. Lock-up Periods</h2>
                    <p>The Staking Program offers three Lock-up Periods, each with a different APY rate:</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Lock-up Period
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Base APY
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Early Withdrawal Penalty
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap">3 Months</td>
                            <td className="px-4 py-4 whitespace-nowrap">8%</td>
                            <td className="px-4 py-4 whitespace-nowrap">50% of earned rewards</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap">6 Months</td>
                            <td className="px-4 py-4 whitespace-nowrap">10%</td>
                            <td className="px-4 py-4 whitespace-nowrap">75% of earned rewards</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap">12 Months</td>
                            <td className="px-4 py-4 whitespace-nowrap">12%</td>
                            <td className="px-4 py-4 whitespace-nowrap">90% of earned rewards</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4">
                      During the Lock-up Period, your staked SAFE Tokens will be locked in the staking smart contract
                      and cannot be withdrawn without incurring an Early Withdrawal Penalty.
                    </p>
                    <p>
                      The Lock-up Period begins at the time your staking position is activated and ends at the same time
                      on the corresponding day of the month after the specified period (e.g., for a 3-month Lock-up
                      Period starting on January 15, the Lock-up Period ends on April 15).
                    </p>
                  </section>

                  <section id="rewards">
                    <h2 className="text-2xl font-bold mt-8">6. Rewards</h2>
                    <h3 className="text-xl font-semibold mt-4">6.1 Reward Calculation</h3>
                    <p>
                      Staking Rewards are calculated based on the amount of SAFE Tokens staked, the selected Lock-up
                      Period, and the corresponding APY rate. The formula for calculating Staking Rewards is:
                    </p>
                    <div className="bg-muted p-4 rounded-md my-4">
                      <p className="font-mono">Rewards = Staked Amount × (APY / 365) × Days Staked</p>
                    </div>
                    <p>
                      Rewards are calculated daily and distributed according to the schedule specified in Section 6.3.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">6.2 Bonus APY</h3>
                    <p>Users who stake larger amounts of SAFE Tokens may be eligible for bonus APY rates as follows:</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Staked Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Bonus APY
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap">2,500 - 4,999 SAFE</td>
                            <td className="px-4 py-4 whitespace-nowrap">+0.5%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap">5,000 - 9,999 SAFE</td>
                            <td className="px-4 py-4 whitespace-nowrap">+1.0%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap">10,000+ SAFE</td>
                            <td className="px-4 py-4 whitespace-nowrap">+1.5%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4">
                      Bonus APY rates are added to the base APY rate for the selected Lock-up Period.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">6.3 Reward Distribution</h3>
                    <p>Staking Rewards are distributed as follows:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Accrual:</strong> Rewards accrue daily based on the calculation formula specified in
                        Section 6.1.
                      </li>
                      <li>
                        <strong>Distribution:</strong> Rewards are distributed to your wallet on a monthly basis, on the
                        same day of the month as your staking activation date.
                      </li>
                      <li>
                        <strong>Claiming:</strong> You can claim your distributed rewards at any time through the
                        SafeSense platform.
                      </li>
                      <li>
                        <strong>Compounding:</strong> You have the option to automatically reinvest (compound) your
                        rewards by staking them under the same terms as your original stake.
                      </li>
                    </ul>
                    <p>
                      SafeSense reserves the right to modify the reward distribution schedule with prior notice to
                      users.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">6.4 Reward Adjustments</h3>
                    <p>
                      SafeSense reserves the right to adjust APY rates for new staking positions based on market
                      conditions, token economics, and other factors. Any adjustments will not affect existing staking
                      positions.
                    </p>
                  </section>

                  <section id="unstaking">
                    <h2 className="text-2xl font-bold mt-8">7. Unstaking</h2>
                    <h3 className="text-xl font-semibold mt-4">7.1 Regular Unstaking</h3>
                    <p>
                      After the completion of the selected Lock-up Period, you can unstake your SAFE Tokens without any
                      penalties. The unstaking process involves the following steps:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Unstaking Request:</strong> You must submit an unstaking request through the SafeSense
                        platform.
                      </li>
                      <li>
                        <strong>Processing Period:</strong> Unstaking requests are processed within 24 hours.
                      </li>
                      <li>
                        <strong>Token Transfer:</strong> After processing, your staked SAFE Tokens and any unclaimed
                        rewards will be transferred to your wallet.
                      </li>
                    </ol>

                    <h3 className="text-xl font-semibold mt-4">7.2 Early Withdrawal</h3>
                    <p>
                      You can unstake your SAFE Tokens before the completion of the selected Lock-up Period, but an
                      Early Withdrawal Penalty will apply. The Early Withdrawal Penalty is calculated as a percentage of
                      the earned rewards, as specified in Section 5.
                    </p>
                    <p>The Early Withdrawal process involves the following steps:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Early Withdrawal Request:</strong> You must submit an early withdrawal request through
                        the SafeSense platform.
                      </li>
                      <li>
                        <strong>Penalty Calculation:</strong> The Early Withdrawal Penalty is calculated based on the
                        earned rewards.
                      </li>
                      <li>
                        <strong>Confirmation:</strong> You must review and confirm the early withdrawal details,
                        including the penalty amount.
                      </li>
                      <li>
                        <strong>Processing Period:</strong> Early withdrawal requests are processed within 24 hours.
                      </li>
                      <li>
                        <strong>Token Transfer:</strong> After processing, your staked SAFE Tokens and any unclaimed
                        rewards (minus the Early Withdrawal Penalty) will be transferred to your wallet.
                      </li>
                    </ol>
                    <p>
                      By submitting an early withdrawal request, you acknowledge and accept the applicable Early
                      Withdrawal Penalty.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">7.3 Partial Unstaking</h3>
                    <p>
                      Partial unstaking (withdrawing only a portion of your staked SAFE Tokens) is not supported. You
                      must unstake the entire amount of SAFE Tokens in a single staking position.
                    </p>
                    <p>
                      If you wish to unstake only a portion of your total staked SAFE Tokens, you must create separate
                      staking positions for different amounts.
                    </p>
                  </section>

                  <section id="risks">
                    <h2 className="text-2xl font-bold mt-8">8. Risks</h2>
                    <p>Participation in the Staking Program involves certain risks, including but not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Market Risk:</strong> The value of SAFE Tokens may fluctuate due to market conditions,
                        potentially resulting in a decrease in the value of your staked tokens and rewards.
                      </li>
                      <li>
                        <strong>Liquidity Risk:</strong> During the Lock-up Period, your staked SAFE Tokens are not
                        liquid and cannot be transferred or sold without incurring an Early Withdrawal Penalty.
                      </li>
                      <li>
                        <strong>Smart Contract Risk:</strong> The staking smart contract may contain bugs or
                        vulnerabilities that could result in the loss of staked tokens or rewards.
                      </li>
                      <li>
                        <strong>Regulatory Risk:</strong> Changes in laws or regulations may affect the legality or
                        operation of the Staking Program in certain jurisdictions.
                      </li>
                      <li>
                        <strong>Platform Risk:</strong> Technical issues or security breaches on the SafeSense platform
                        may affect the staking process or the security of staked tokens.
                      </li>
                    </ul>
                    <p>
                      By participating in the Staking Program, you acknowledge and accept these risks. SafeSense does
                      not guarantee the performance of the Staking Program or the value of SAFE Tokens.
                    </p>
                  </section>

                  <section id="taxes">
                    <h2 className="text-2xl font-bold mt-8">9. Taxes</h2>
                    <p>
                      You are solely responsible for determining what, if any, taxes apply to your participation in the
                      Staking Program, including but not limited to income tax, capital gains tax, or any other taxes
                      that may be applicable in your jurisdiction.
                    </p>
                    <p>
                      SafeSense is not responsible for determining whether taxes apply to your transactions or for
                      collecting, reporting, withholding, or remitting any taxes arising from your participation in the
                      Staking Program.
                    </p>
                    <p>
                      You should consult with a tax professional to determine your tax obligations related to staking
                      SAFE Tokens and earning Staking Rewards.
                    </p>
                  </section>

                  <section id="modifications">
                    <h2 className="text-2xl font-bold mt-8">10. Modifications</h2>
                    <p>
                      SafeSense reserves the right to modify these Staking Terms at any time at its sole discretion. If
                      we make material changes to these Staking Terms, we will provide notice through the SafeSense
                      platform or by other means.
                    </p>
                    <p>
                      Your continued participation in the Staking Program after the effective date of any modifications
                      constitutes your acceptance of the modified Staking Terms.
                    </p>
                    <p>
                      Modifications to these Staking Terms will not affect existing staking positions, except as
                      required by law or regulation.
                    </p>
                  </section>

                  <section id="termination">
                    <h2 className="text-2xl font-bold mt-8">11. Termination</h2>
                    <h3 className="text-xl font-semibold mt-4">11.1 Termination by User</h3>
                    <p>
                      You can terminate your participation in the Staking Program at any time by unstaking all your SAFE
                      Tokens, subject to the applicable Early Withdrawal Penalties if the Lock-up Period has not been
                      completed.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">11.2 Termination by SafeSense</h3>
                    <p>
                      SafeSense reserves the right to terminate or suspend the Staking Program or your participation in
                      it at any time for any reason, including but not limited to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Violation of these Staking Terms or the Terms of Service.</li>
                      <li>Suspected fraudulent or illegal activity.</li>
                      <li>Regulatory or legal requirements.</li>
                      <li>Technical or security issues.</li>
                      <li>Business or operational reasons.</li>
                    </ul>
                    <p>
                      In the event of termination by SafeSense, we will make reasonable efforts to return your staked
                      SAFE Tokens and any earned rewards to your wallet, subject to applicable laws and regulations.
                    </p>
                  </section>

                  <section id="liability">
                    <h2 className="text-2xl font-bold mt-8">12. Limitation of Liability</h2>
                    <p>
                      To the maximum extent permitted by applicable law, SafeSense and its affiliates, directors,
                      officers, employees, agents, and licensors shall not be liable for any direct, indirect,
                      incidental, special, consequential, or exemplary damages, including but not limited to damages for
                      loss of profits, goodwill, use, data, or other intangible losses, arising out of or in connection
                      with your participation in the Staking Program.
                    </p>
                    <p>
                      SafeSense's total liability to you for all claims arising from or related to the Staking Program
                      shall not exceed the amount of SAFE Tokens you have staked.
                    </p>
                    <p>
                      Some jurisdictions do not allow the exclusion or limitation of liability for certain types of
                      damages, so some of the above limitations may not apply to you.
                    </p>
                  </section>

                  <section id="governing-law">
                    <h2 className="text-2xl font-bold mt-8">13. Governing Law</h2>
                    <p>
                      These Staking Terms shall be governed by and construed in accordance with the laws of the State of
                      Delaware, United States, without regard to its conflict of law provisions.
                    </p>
                    <p>
                      Any dispute arising from or relating to these Staking Terms or your participation in the Staking
                      Program shall be subject to the exclusive jurisdiction of the courts of the State of Delaware,
                      United States.
                    </p>
                    <p>
                      If any provision of these Staking Terms is held to be invalid or unenforceable, such provision
                      shall be struck and the remaining provisions shall be enforced.
                    </p>
                  </section>

                  <section id="contact">
                    <h2 className="text-2xl font-bold mt-8">14. Contact Us</h2>
                    <p>
                      If you have any questions about these Staking Terms or the Staking Program, please contact us:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        By email:{" "}
                        <Link href="mailto:staking@safesense.com" className="text-primary hover:underline">
                          staking@safesense.com
                        </Link>
                      </li>
                      <li>
                        By visiting this page on our website:{" "}
                        <Link href="/staking/help" className="text-primary hover:underline">
                          www.safesense.com/staking/help
                        </Link>
                      </li>
                      <li>By mail: 123 Blockchain Avenue, Innovation City, DE 19901, United States</li>
                    </ul>
                  </section>
                </div>

                <div className="mt-12 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Important Disclaimer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Staking involves risk, and you should carefully consider whether it is appropriate for you in
                        light of your financial circumstances. Past performance is not indicative of future results, and
                        the value of SAFE Tokens may fluctuate. You should not stake more than you can afford to lose.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/staking" className="flex items-center gap-2">
                        Back to Staking
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/staking/stake" className="flex items-center gap-2">
                        Start Staking <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
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
            <Link href="/staking/terms" className="text-sm text-primary underline-offset-4 hover:underline">
              Staking Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

