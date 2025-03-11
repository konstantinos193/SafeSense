import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: Request) {
  try {
    const { email, password, userData } = await request.json()

    // First, check if user exists
    const { data: { users }, error: listError } = await adminSupabase.auth.admin.listUsers()
    const existingUser = users?.find(u => u.email === email)

    if (existingUser) {
      // Delete existing user
      const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(
        existingUser.id
      )
      if (deleteError) throw deleteError
    }

    // Create new user with admin API
    const { data: { user }, error: createError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: userData,
      app_metadata: {
        provider: 'wallet',
        confirmed_at: new Date().toISOString()
      }
    })

    if (createError) throw createError
    if (!user) throw new Error('No user returned from creation')

    // Create profile
    const { error: profileError } = await adminSupabase
      .from('profiles')
      .upsert({
        id: user.id,
        wallet_address: userData.wallet_address,
        first_name: userData.first_name,
        last_name: userData.last_name,
        updated_at: new Date().toISOString()
      })

    if (profileError) throw profileError

    // Return credentials for immediate sign-in
    return NextResponse.json({ 
      success: true,
      email,
      password
    })

  } catch (error: any) {
    console.error('Wallet signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    )
  }
} 