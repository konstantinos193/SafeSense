import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    if (!body.firstName || !body.lastName || !body.registrationType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    if (body.registrationType === "email") {
      if (!body.email || !body.password) {
        return NextResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        )
      }
      
      // Add your email registration logic here
      // Example: Hash password, store in database, etc.
      
    } else if (body.registrationType === "wallet") {
      if (!body.walletAddress || !body.signature || !body.nonce) {
        return NextResponse.json(
          { message: "Wallet address, signature and nonce are required" },
          { status: 400 }
        )
      }
      
      // Add your wallet registration logic here
      // Example: Verify signature, store in database, etc.
    }

    // Return success response
    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 