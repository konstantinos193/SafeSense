import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Generate a random nonce
    const nonce = Math.floor(Math.random() * 1000000).toString()
    
    // In a real application, you should store this nonce in your database
    // associated with the user's session or wallet address
    
    return NextResponse.json({ nonce }, { status: 200 })
  } catch (error) {
    console.error('Nonce generation error:', error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 