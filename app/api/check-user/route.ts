import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  try {
    const { email } = await request.json()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ exists: !!data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 