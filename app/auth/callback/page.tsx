"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        if (session?.user?.email) {
          // Check if email is linked to a wallet account
          const { data: profileData } = await supabase
            .from('profiles')
            .select('wallet_address')
            .eq('email', session.user.email)
            .single()

          if (profileData?.wallet_address) {
            router.push('/auth/login?error=wallet_account')
            return
          }

          // If not a wallet account, proceed with normal flow
          router.push('/dashboard')
        } else {
          router.push('/auth/login?error=session_not_found')
        }
      } catch (error) {
        console.error('Callback error:', error)
        router.push('/auth/login?error=callback_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
} 