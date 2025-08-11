import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the lead data (in production, you'd save to database)
    console.log('New lead captured:', {
      timestamp: new Date().toISOString(),
      ...body
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully' 
    })
  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    )
  }
}