'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the token from the URL
        const params = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        if (!accessToken) {
          throw new Error('No access token found')
        }

        // Set the session
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken as string,
        })

        if (error) throw error

        // Redirect to login page with success message
        router.push('/auth/login?verified=true')
      } catch (error) {
        console.error('Error during email confirmation:', error)
        // Redirect to login page with error message
        router.push('/auth/login?verified=false')
      }
    }

    handleEmailConfirmation()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p className="text-muted-foreground">Please wait while we confirm your email address.</p>
      </div>
    </div>
  )
} 