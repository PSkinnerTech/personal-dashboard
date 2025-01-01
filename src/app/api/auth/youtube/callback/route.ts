import { getTokens } from '@/lib/auth/youtube'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (!code) {
      return new Response('No code provided', { status: 400 })
    }

    const tokens = await getTokens(code)
    
    const headers = new Headers()
    headers.append('Location', '/dashboard')
    headers.append(
      'Set-Cookie',
      `youtube_access_token=${tokens.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`
    )

    if (tokens.refresh_token) {
      headers.append(
        'Set-Cookie',
        `youtube_refresh_token=${tokens.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
      )
    }

    return new Response(null, {
      status: 302,
      headers
    })
  } catch (error) {
    console.error('YouTube auth error:', error)
    return Response.redirect(new URL('/?error=AuthFailed', request.url))
  }
} 