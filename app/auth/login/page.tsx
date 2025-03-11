"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Mail, Wallet, ArrowRight, Check, Info, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailFormData, setEmailFormData] = useState({
    email: "",
    password: "",
  })

  const [walletConnecting, setWalletConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const [success, setSuccess] = useState("")

  const [activeTab, setActiveTab] = useState("email")

  useEffect(() => {
    // Check for verification status in URL
    const params = new URLSearchParams(window.location.search)
    const verified = params.get('verified')
    
    if (verified === 'true') {
      setSuccess('Email verified successfully! You can now log in.')
    } else if (verified === 'false') {
      setError('Email verification failed. Please try again or contact support.')
    }
  }, [])

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target
    setEmailFormData({
      ...emailFormData,
      [name]: value
    })
  }

  const checkUserStatus = async (email: string) => {
    try {
      const response = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      console.log('User status:', data)
      return data
    } catch (error) {
      console.error('Error checking user status:', error)
      return null
    }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError("")
    
    try {
      // Log the attempt (remove in production)
      console.log("Attempting login with email:", emailFormData.email.trim())

      // Get current session first
      const { data: { session } } = await supabase.auth.getSession()
      console.log("Current session:", session)

      // Try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailFormData.email.trim(),
        password: emailFormData.password
      })

      if (error) {
        console.error("Sign in error:", error)
        throw error
      }

      console.log("Sign in successful:", data)
      
      // Get user after sign in
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log("User after sign in:", user)

      if (userError) {
        console.error("Get user error:", userError)
        throw userError
      }

      router.push("/dashboard")
    } catch (err) {
      console.error("Full error:", err)
      setError("Invalid email or password. Please try again.")
    }
  }

  const connectWallet = async () => {
    setError("")
    setWalletConnecting(true)
    
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const address = accounts[0]
      setWalletAddress(address)
    } catch (err) {
      setError(err.message || "Failed to connect wallet")
    } finally {
      setWalletConnecting(false)
    }
  }

  const handleWalletLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a message to sign
      const message = `Login to SafeSense: ${walletAddress}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      });

      // Use the same password generation as registration
      const password = signature.slice(2, 34);
      const email = `${walletAddress.toLowerCase()}@safesense.com`;

      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        if (signInError.message === "Invalid login credentials") {
          // If login fails, try registering through our API
          const response = await fetch('/api/wallet-signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              userData: {
                wallet_address: walletAddress,
                signature: signature
              }
            })
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
          }

          // Wait for changes to propagate
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Try signing in again
          const { error: finalSignInError } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (finalSignInError) throw finalSignInError;
        } else {
          throw signInError;
        }
      }

      // Update profile with latest signature
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            wallet_address: walletAddress,
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error("Profile update error:", profileError);
        }
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailFormData.email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      
      if (error) throw error;
      
      setSuccess("Password reset link sent to your email!");
    } catch (err) {
      setError("Failed to send reset password email");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4">
          <div className="flex gap-2 items-center text-lg md:text-xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-5 w-5 md:h-6 md:w-6" />
              <span>SafeSense</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/auth/register" className="text-xs sm:text-sm text-muted-foreground hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-md space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">Sign In</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Choose how you want to sign in to SafeSense</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default">
                <Check className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="w-full">
              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={activeTab === "email" ? "default" : "outline"}
                  className="flex-1 text-xs sm:text-sm"
                  onClick={() => setActiveTab("email")}
                >
                  <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Email
                </Button>
                <Button 
                  variant={activeTab === "wallet" ? "default" : "outline"}
                  className="flex-1 text-xs sm:text-sm"
                  onClick={() => setActiveTab("wallet")}
                >
                  <Wallet className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Wallet
                </Button>
              </div>

              {/* Email Login */}
              {activeTab === "email" && (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="john.doe@example.com" 
                      value={emailFormData.email}
                      onChange={handleEmailInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button 
                        type="button" 
                        variant="link" 
                        onClick={handleResetPassword}
                        className="text-sm"
                      >
                        Forgot Password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        id="password" 
                        name="password"
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={emailFormData.password}
                        onChange={handleEmailInputChange}
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
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              )}

              {/* Wallet Login */}
              {activeTab === "wallet" && (
                <form onSubmit={handleWalletLogin} className="space-y-4">
                  <div className="space-y-2">
                    {walletAddress ? (
                      <div className="flex items-center justify-between rounded-md border p-3 text-sm">
                        <span className="font-mono">{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    ) : (
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full" 
                        onClick={connectWallet}
                        disabled={walletConnecting}
                      >
                        {walletConnecting ? "Connecting..." : "Connect Wallet"}
                      </Button>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !walletAddress}
                  >
                    {isLoading ? "Signing In..." : "Sign In with Wallet"}
                  </Button>
                </form>
              )}
            </div>
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
