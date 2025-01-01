import { getAuthUrl } from '@/lib/auth/youtube'

export async function GET() {
  const authUrl = getAuthUrl()
  return Response.redirect(authUrl)
}
