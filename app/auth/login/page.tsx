"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Mail, Wallet, ArrowRight, Check, Info, Eye, EyeOff, Chrome as GoogleIcon, Apple as AppleIcon, MessageSquare as DiscordIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

declare global {
  interface Window {
    ethereum?: any;
  }
}

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
    const params = new URLSearchParams(window.location.search)
    const verified = params.get('verified')
    const error = params.get('error')
    
    if (verified === 'true') {
      setSuccess('Email verified successfully! You can now log in with either your wallet or email.')
    } else if (error) {
      switch (error) {
        case 'invalid_callback':
          setError('Invalid verification link. Please try again.')
          break
        case 'callback_failed':
          setError('Verification failed. Please try again or contact support.')
          break
        default:
          setError('An error occurred during verification.')
      }
    }

    if (error === 'wallet_account') {
      setError("This email is linked to a wallet account. Please use the 'Wallet' tab to sign in.")
      setActiveTab('wallet') // Automatically switch to wallet tab
    }
  }, [])

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      // First check if this email is linked to a wallet account
      const { data: profileData } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('email', emailFormData.email.trim())
        .single()

      if (profileData?.wallet_address) {
        setError("This email belongs to a wallet account. Please switch to 'Wallet' tab to sign in.")
        setIsLoading(false)
        return
      }

      // Regular email login
      const { error } = await supabase.auth.signInWithPassword({
        email: emailFormData.email.trim(),
        password: emailFormData.password
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Incorrect email or password")
        }
        throw error
      }

      router.push("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect wallet"
      setError(errorMessage)
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
    } catch (err: unknown) {
      console.error("Login error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!emailFormData.email.trim()) {
        setError("Please enter your email address")
        return
      }
      
      setIsLoading(true)

      // Check if this is a wallet account
      const { data: profileData } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('email', emailFormData.email.trim())
        .single()

      if (profileData?.wallet_address) {
        setError("This email belongs to a wallet account. Please switch to 'Wallet' tab to sign in.")
        return
      }

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(
        emailFormData.email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      )
      
      if (error) throw error
      
      setSuccess("Password reset link sent! Please check your email.")
    } catch (err: any) {
      console.error("Reset password error:", err)
      if (err.message.includes("not found")) {
        setError("No account found with this email address")
      } else {
        setError("Failed to send reset link. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'discord') => {
    try {
      setError("")
      setIsLoading(true)

      // First get the provider's email without signing in
      const { data: { provider_token, provider_refresh_token }, error: providerError } = 
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            skipBrowserRedirect: true, // Don't redirect yet
            queryParams: provider === 'google' ? {
              access_type: 'offline',
              prompt: 'consent',
            } : undefined,
          }
        })

      if (providerError) throw providerError

      // Get user info from Google to check email
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${provider_token}`
        }
      })
      const userData = await response.json()
      const email = userData.email

      // Check if email is linked to a wallet account
      const { data: profileData } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('email', email)
        .single()

      if (profileData?.wallet_address) {
        setError(
          "This email is linked to a wallet account. Please use the 'Wallet' tab to sign in."
        )
        return
      }

      // If email is not linked to a wallet, proceed with social login
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined,
        }
      })

      if (signInError) throw signInError

    } catch (err: any) {
      console.error(`${provider} login error:`, err)
      setError(`Failed to sign in with ${provider}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

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

              {/* Email Tab Content */}
              {activeTab === "email" && (
                <div className="space-y-4">
                  {/* Social Login Buttons */}
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white hover:bg-gray-50 flex items-center justify-center h-10 text-black"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                    >
                      <Image 
                        src="https://supabase.com/dashboard/img/icons/google-icon.svg"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Continue with Google
                    </Button>

                    <Button
                      type="button"
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center h-10"
                      onClick={() => handleSocialLogin('discord')}
                      disabled={isLoading}
                    >
                      <Image 
                        src="https://supabase.com/dashboard/img/icons/discord-icon.svg"
                        alt="Discord"
                        width={20}
                        height={20}
                        className="mr-2 brightness-0 invert" // This combination will make the icon pure white
                      />
                      Continue with Discord
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  {/* Email Login Form */}
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="name@example.com" 
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
                      {isLoading ? "Signing In..." : "Sign in with Email"}
                    </Button>
                  </form>
                </div>
              )}

              {/* Wallet Tab Content */}
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
