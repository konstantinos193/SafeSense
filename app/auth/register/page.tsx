"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Mail, Wallet, ArrowRight, Check, Info, Eye, EyeOff, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { TranslatedText } from "@/components/ui/translated-text"
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeTerms: false
  })

  const [walletConnecting, setWalletConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const [authMethod, setAuthMethod] = useState<"email" | "wallet">("email")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.firstName || !formData.lastName) {
      setError("All fields are required")
      return false
    }
    
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }

    return true
  }

  const handleEmailRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      console.log("Starting registration process...")

      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      console.log("Auth signup response:", { authData, authError })

      if (authError) throw authError

      if (!authData.user?.id) {
        throw new Error("No user ID returned from signup")
      }

      // Then create the profile entry
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email.trim()
        })
        .select()
        .single()

      console.log("Profile creation response:", { profileData, profileError })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        throw new Error("Failed to create profile")
      }

      setSuccess(`
        Registration successful! 
        Please check your email (${formData.email}) to verify your account.
        You won't be able to login until you verify your email.
      `)

      // Clear form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        agreeTerms: false
      })

    } catch (err) {
      console.error("Full registration error:", err)
      setError(err.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const connectWallet = async () => {
    setError("")
    setWalletConnecting(true)
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const address = accounts[0]
      setWalletAddress(address)
      
      // Get chain ID to verify the network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      
      // You can add network validation here if needed
      // For example, check if user is on Ethereum mainnet (chainId = 0x1)
      
    } catch (err) {
      setError(err.message || "Failed to connect wallet")
    } finally {
      setWalletConnecting(false)
    }
  }

  const handleWalletRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!walletAddress) {
      setError("Please connect your wallet first")
      return
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Sign out first
      await supabase.auth.signOut()

      // Create a message to sign
      const message = `Register with SafeSense: ${walletAddress}`
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      })

      const password = signature.slice(2, 34)
      const email = `${walletAddress.toLowerCase()}@safesense.com`

      // Register through API
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
            first_name: formData.firstName,
            last_name: formData.lastName,
            signature: signature
          }
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Wait for changes to propagate
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Multiple sign-in attempts
      let signInAttempts = 0
      const maxAttempts = 3
      let lastError = null

      while (signInAttempts < maxAttempts) {
        try {
          console.log(`Attempting sign in (attempt ${signInAttempts + 1})`)
          
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
          })

          if (!signInError && signInData.session) {
            console.log('Sign in successful')
            router.push("/dashboard")
            return
          }

          lastError = signInError
          signInAttempts++
          
          if (signInAttempts < maxAttempts) {
            console.log(`Waiting before next attempt...`)
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        } catch (err) {
          lastError = err
          signInAttempts++
          if (signInAttempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }
      }

      throw lastError || new Error('Failed to sign in after multiple attempts')
    } catch (err: any) {
      console.error("Registration/Login error:", err)
      setError(err.message || 'Authentication failed')
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
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">
                <TranslatedText text="Sign In" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground">Choose how you want to register with SafeSense</p>
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

            <Tabs value={authMethod} className="w-full" onValueChange={(value) => setAuthMethod(value as "email" | "wallet")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="wallet">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </TabsTrigger>
              </TabsList>

              {authMethod === "email" && (
                <Card>
                  <form onSubmit={handleEmailRegister}>
                    <CardHeader>
                      <CardTitle>Register with Email</CardTitle>
                      <CardDescription>
                        Enter your email and create a password to register
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            name="firstName"
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            name="lastName"
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="john.doe@example.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input 
                            id="password" 
                            name="password"
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            value={formData.password}
                            onChange={handleInputChange}
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
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 8 characters long
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="agreeTerms" 
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => 
                            setFormData({...formData, agreeTerms: checked === true})
                          }
                        />
                        <label
                          htmlFor="agreeTerms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                        {isLoading ? "Creating Account..." : 
                         isSubmitting ? "Please wait..." : 
                         "Create Account"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}

              {authMethod === "wallet" && (
                <Card>
                  <form onSubmit={handleWalletRegister}>
                    <CardHeader>
                      <CardTitle>Register with Wallet</CardTitle>
                      <CardDescription>
                        Connect your Web3 wallet to register
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="walletFirstName">First Name</Label>
                          <Input 
                            id="walletFirstName" 
                            name="firstName"
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="walletLastName">Last Name</Label>
                          <Input 
                            id="walletLastName" 
                            name="lastName"
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Wallet Address</Label>
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
                      
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-start space-x-3">
                          <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div className="text-sm text-muted-foreground">
                            <p>You'll need to sign a message with your wallet to verify ownership.</p>
                            <p className="mt-1">This does not require any gas fees.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="walletAgreeTerms" 
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => 
                            setFormData({...formData, agreeTerms: checked === true})
                          }
                        />
                        <label
                          htmlFor="walletAgreeTerms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading || !walletAddress}
                      >
                        {isLoading ? "Creating Account..." : "Create Account with Wallet"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}
            </Tabs>
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
