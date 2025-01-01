import { getAuthUrl } from '@/lib/auth/youtube'
import { redirect } from 'next/navigation'

export async function GET() {
  const authUrl = getAuthUrl()
  return Response.redirect(authUrl)
}
