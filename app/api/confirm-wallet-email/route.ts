import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { user_id, email } = await request.json()
    
    const supabase = createRouteHandlerClient({ cookies })
    
    // Use admin functions to confirm the email
    const { data, error } = await supabase.auth.admin.updateUserById(
      user_id,
      { email_confirm: true }
    )

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error confirming email:', error)
    return NextResponse.json(
      { error: 'Failed to confirm email' },
      { status: 500 }
    )
  }
} 