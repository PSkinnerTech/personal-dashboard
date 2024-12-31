import { Card } from '@/components/ui/card'

interface StatsCardProps {
  value: number
  subtitle: string
}

export function StatsCard({ value, subtitle }: StatsCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-1 text-center">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  )
}
