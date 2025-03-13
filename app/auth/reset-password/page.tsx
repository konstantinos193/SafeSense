"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield, Eye, EyeOff, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Get token from URL
  const token = searchParams.get("token")

  useEffect(() => {
    // Validate the token
    const validateToken = async () => {
      if (!token) {
        setError("Invalid or missing reset token")
        setIsValidating(false)
        return
      }

      try {
        const response = await fetch(`/users/validate-reset-token?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Invalid or expired token")
        }

        setIsValidating(false)
      } catch (err) {
        setError(err.message || "Invalid or expired token")
        setIsValidating(false)
      }
    }

    validateToken()
  }, [token])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) throw updateError

      // If there's a wallet address, update the profile
      const walletAddress = searchParams.get('wallet')
      if (walletAddress) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase
            .from('profiles')
            .update({
              wallet_address: walletAddress,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
        }
      }

      // Redirect to login
      router.push('/auth/login?reset=success')
    } catch (err: any) {
      console.error("Reset password error:", err)
      setError(err.message || "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
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
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-muted-foreground">Create a new password for your account</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-primary/20 text-primary">
                <Check className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {isValidating ? (
              <div className="flex justify-center items-center h-40">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Validating your reset token...</p>
                </div>
              </div>
            ) : error && !success ? (
              <Card>
                <CardHeader>
                  <CardTitle>Invalid Reset Link</CardTitle>
                  <CardDescription>The password reset link is invalid or has expired</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/auth/forgot-password">Request New Reset Link</Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <form onSubmit={handleResetPassword}>
                  <CardHeader>
                    <CardTitle>Create New Password</CardTitle>
                    <CardDescription>Enter and confirm your new password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading || success}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                    <div className="text-center text-sm">
                      <Link href="/auth/login" className="text-primary hover:underline">
                        Back to Sign In
                      </Link>
                    </div>
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

