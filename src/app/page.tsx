import { YouTubeSignInButton } from './dashboard/components/youtube/SignInButton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Developer Dashboard</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Connect your YouTube account to view your analytics alongside your GitHub stats.
          </p>
          <div className="flex justify-center">
            <YouTubeSignInButton />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
