"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Shield, Edit, Save, Camera, Check, AlertTriangle, Upload, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Define user profile interface
interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  wallet_address?: string;
  avatar_url?: string;
  displayName?: string;
  emailVerified?: boolean;
  createdAt?: string;
  registrationType: 'wallet' | 'email';
  kycVerified?: boolean;
  kycStatus?: string;
  [key: string]: any; // For any other properties
}

// Helper function to get initials from name
const getInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return '??'
  return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`
}

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          router.push("/auth/login")
          return
        }
        
        if (!session?.user) {
          console.log('No session found')
          router.push("/auth/login")
          return
        }

        console.log('Session found:', session)

        // Get user profile from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Profile error:', profileError)
          throw profileError
        }

        console.log('Profile found:', profile)

        const walletAddress = profile.wallet_address
        const isWalletUser = !!walletAddress
        const displayName = isWalletUser ? 
          `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 
          `${profile.first_name || ''} ${profile.last_name || ''}`.trim()

        const userData = {
          ...profile,
          id: session.user.id,
          displayName,
          email: profile.email || session.user.email,
          emailVerified: session.user.email_confirmed_at ? true : false,
          createdAt: session.user.created_at,
          registrationType: isWalletUser ? 'wallet' : 'email',
          walletAddress
        }

        setUser(userData)
        setFormData({
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          email: profile.email || "",
          phone: profile.phone || "",
        })
      } catch (err: unknown) {
        console.error('Profile fetch error:', err)
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching your profile"
        setError(errorMessage)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      if (event === 'SIGNED_OUT') {
        router.push('/auth/login')
      } else if (session) {
        fetchUserProfile()
      }
    })

    fetchUserProfile()

    return () => {
      subscription?.unsubscribe()
    }
  }, [router])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/auth/login")
    } catch (err: unknown) {
      console.error('Sign out error:', err)
      const errorMessage = err instanceof Error ? err.message : "An error occurred during sign out"
      setError(errorMessage)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      if (!user?.id) {
        throw new Error("User ID not found")
      }

      // Get current session to ensure we have the latest user data
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session) throw new Error("No session found")

      // First update auth email if it changed
      if (formData.email !== user.email) {
        const { error: emailUpdateError } = await supabase.auth.updateUser({
          email: formData.email
        })
        if (emailUpdateError) throw emailUpdateError
      }

      // Update profile in database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Fetch the updated profile to ensure we have the latest data
      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError

      // Update local state with the fresh data
      if (updatedProfile) {
        setUser({
          ...user,
          first_name: updatedProfile.first_name,
          last_name: updatedProfile.last_name,
          email: updatedProfile.email,
          phone: updatedProfile.phone
        })
        
        // Update form data to match the new values
        setFormData({
          firstName: updatedProfile.first_name || "",
          lastName: updatedProfile.last_name || "",
          email: updatedProfile.email || "",
          phone: updatedProfile.phone || "",
        })
      }

      setSuccess("Profile updated successfully")
      setIsEditing(false)
      
      // Refresh the page to ensure all data is in sync
      router.refresh()
    } catch (err: any) {
      console.error('Profile update error:', err)
      setError(err.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file || !user?.id) return

      setIsLoading(true)
      
      // Create a folder path with the user's ID
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, { 
          upsert: true,
          cacheControl: '0'
        })

      if (uploadError) throw uploadError

      // Get the public URL using Supabase's getPublicUrl method
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Update local state with the new URL
      if (user) {
        setUser({
          ...user,
          avatar_url: `${publicUrl}?${Date.now()}`  // Add timestamp to force refresh
        })
      }
      
      setSuccess("Profile picture updated successfully")
    } catch (err: any) {
      console.error('Profile picture upload error:', err)
      setError("Failed to upload profile picture")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !user) {
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
                <p className="text-muted-foreground">Loading your profile...</p>
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
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4">
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
            <Button
              variant="outline"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Manage your account information and settings</p>
            </div>

            {/* Alerts */}
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Card - Left Column */}
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage 
                            src={user?.avatar_url} 
                            alt={user?.displayName} 
                            className="object-cover avatar-image"
                          />
                          <AvatarFallback className="text-lg">
                            {user?.registrationType === 'wallet' ? 
                              user?.walletAddress?.slice(2, 4).toUpperCase() : 
                              getInitials(user?.first_name, user?.last_name)}
                          </AvatarFallback>
                        </Avatar>
                        <label 
                          htmlFor="profile-picture" 
                          className="absolute bottom-0 right-0 p-1 rounded-full bg-background border cursor-pointer hover:bg-accent"
                        >
                          <Camera className="h-4 w-4" />
                          <input
                            id="profile-picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureUpload}
                          />
                        </label>
                      </div>
                      <div className="text-center">
                        {user?.registrationType === 'wallet' ? (
                          <div>
                            <h2 className="text-xl font-bold font-mono">
                              {user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}
                            </h2>
                            <p className="text-sm text-muted-foreground">Web3 Wallet</p>
                          </div>
                        ) : (
                          <div>
                            <h2 className="text-xl font-bold">
                              {user?.first_name && user?.last_name 
                                ? `${user?.first_name} ${user?.last_name}`
                                : 'Anonymous User'}
                            </h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Member since</span>
                            <span className="text-sm">
                              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Account type</span>
                            <Badge variant="secondary">
                              {user?.registrationType === "wallet" ? "Web3 Wallet" : "Email"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">KYC Status</span>
                            <Badge variant={user?.kycVerified ? "default" : "outline"}>
                              {user?.kycVerified ? "Verified" : "Not Verified"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content - Right Column */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="border-b">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <Button
                          variant={activeTab === "profile" ? "default" : "ghost"}
                          className="relative h-9"
                          onClick={() => setActiveTab("profile")}
                        >
                          Profile Information
                          {activeTab === "profile" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                          )}
                        </Button>
                        <Button
                          variant={activeTab === "kyc" ? "default" : "ghost"}
                          className="relative h-9"
                          onClick={() => setActiveTab("kyc")}
                        >
                          KYC Verification
                          {activeTab === "kyc" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activeTab === "profile" 
                          ? "Manage your personal information and contact details"
                          : "Complete your identity verification to unlock all features"
                        }
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {activeTab === "profile" ? (
                      <div className="space-y-6">
                        {/* Basic Information Card */}
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Your personal details</CardDescription>
                              </div>
                              <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {user?.registrationType === 'wallet' && (
                              <div className="space-y-2">
                                <Label>Wallet Address</Label>
                                <div className="rounded-md border p-3 font-mono text-sm break-all bg-muted">
                                  {user?.walletAddress}
                                </div>
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              {isEditing ? (
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  placeholder="Enter first name"
                                />
                              ) : (
                                <div className="rounded-md border p-3">
                                  {user?.first_name || 'Not set'}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              {isEditing ? (
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  placeholder="Enter last name"
                                />
                              ) : (
                                <div className="rounded-md border p-3">
                                  {user?.last_name || 'Not set'}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              {isEditing ? (
                                <Input 
                                  id="phone" 
                                  name="phone" 
                                  value={formData.phone} 
                                  onChange={handleInputChange}
                                  placeholder="Enter phone number"
                                />
                              ) : (
                                <div className="rounded-md border p-3">
                                  {user?.phone || "Not provided"}
                                </div>
                              )}
                            </div>

                            {isEditing && (
                              <div className="flex gap-2 justify-end pt-4">
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSaveProfile} disabled={isLoading}>
                                  {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Contact Information Card */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Your email and verification status</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <div className="flex items-center gap-2">
                                {isEditing ? (
                                  <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your contact email"
                                    className="flex-1"
                                  />
                                ) : (
                                  <div className="rounded-md border p-3 flex-1">
                                    {user?.email || "No email set"}
                                  </div>
                                )}
                                {user?.emailVerified && (
                                  <Badge 
                                    variant="secondary"
                                    className="text-green-500 border-green-500"
                                  >
                                    <Check className="h-3 w-3 mr-1" /> Verified
                                  </Badge>
                                )}
                              </div>
                              {user?.registrationType === 'wallet' && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  Add a contact email for notifications and updates
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-lg font-semibold">KYC Verification</h2>
                          <p className="text-sm text-muted-foreground">Verify your identity to unlock all features</p>
                        </div>

                        {user?.kycVerified ? (
                          <div className="rounded-md bg-primary/20 p-4 flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className="font-medium">KYC Verification Complete</h3>
                              <p className="text-sm text-muted-foreground">Your identity has been verified</p>
                            </div>
                          </div>
                        ) : user?.kycStatus === "pending" ? (
                          <div className="rounded-md bg-yellow-500/20 p-4 flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <div>
                              <h3 className="font-medium">Verification In Progress</h3>
                              <p className="text-sm text-muted-foreground">We're reviewing your submitted documents</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="rounded-md bg-muted p-4">
                              <h3 className="font-medium mb-2">Why verify your identity?</h3>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-primary mt-0.5" />
                                  <span>Access higher insurance coverage limits</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-primary mt-0.5" />
                                  <span>Faster claims processing and payouts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-primary mt-0.5" />
                                  <span>Required for certain insurance types</span>
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="idType">ID Document Type</Label>
                                <select
                                  id="idType"
                                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                >
                                  <option value="">Select ID type</option>
                                  <option value="passport">Passport</option>
                                  <option value="driverLicense">Driver's License</option>
                                  <option value="nationalId">National ID Card</option>
                                </select>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Front of ID</Label>
                                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground text-center">
                                      Drag & drop or click to upload
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Back of ID</Label>
                                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground text-center">
                                      Drag & drop or click to upload
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Selfie with ID</Label>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground text-center">
                                    Take a photo of yourself holding your ID
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {!user?.kycVerified && user?.kycStatus !== "pending" && (
                          <Button
                            className="w-full"
                            onClick={() => {
                              setSuccess("KYC documents submitted successfully. We'll review them shortly.")
                            }}
                          >
                            Submit Documents
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
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

