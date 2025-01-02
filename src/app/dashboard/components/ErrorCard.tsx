import { Card, CardContent } from '@/components/ui/card'

interface ErrorCardProps {
  error: Error
}

export function ErrorCard({ error }: ErrorCardProps) {
  return (
    <Card>
      <CardContent className="p-4 text-sm text-muted-foreground">
        {error.message || 'An error occurred'}
      </CardContent>
    </Card>
  )
} 