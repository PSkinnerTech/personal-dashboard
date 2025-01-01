'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export function ErrorCard({ error }: { error: Error }) {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-semibold">Error Loading Dashboard</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {error.message || 'Failed to load dashboard data. Please try again later.'}
        </p>
      </CardContent>
    </Card>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 