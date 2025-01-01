'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function YouTubeSignInButton() {
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      router.push('/api/auth/youtube')
    } catch (error) {
      console.error('Failed to sign in:', error)
    }
  }

  return (
    <Button onClick={handleSignIn} variant="outline">
      Connect YouTube Account
    </Button>
  )
} 