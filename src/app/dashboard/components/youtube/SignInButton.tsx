'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function YouTubeSignInButton() {
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      console.log('Navigating to dashboard...')
      await router.push('/dashboard')
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return (
    <Button onClick={handleSignIn} variant="outline">
      View Dashboard
    </Button>
  )
} 