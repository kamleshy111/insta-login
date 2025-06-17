import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !(session as any).accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { postId } = await request.json()
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    // Like the post using Instagram Graph API
    // Note: This requires additional permissions and may need business verification
    const response = await fetch(
      `https://graph.instagram.com/${postId}/likes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: (session as any).accessToken,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to like post')
    }

    const data = await response.json()
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error liking Instagram post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to like post' },
      { status: 500 }
    )
  }
} 