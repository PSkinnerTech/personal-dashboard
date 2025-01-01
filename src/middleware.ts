import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasYouTubeToken = request.cookies.has('youtube_access_token')

  if (request.nextUrl.pathname.startsWith('/dashboard') && !hasYouTubeToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
} 