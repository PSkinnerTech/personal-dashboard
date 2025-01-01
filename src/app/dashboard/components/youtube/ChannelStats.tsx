import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { YouTubeChannelStats } from '@/lib/types/youtube'

interface ChannelStatsProps {
  stats: YouTubeChannelStats
}

export function ChannelStats({ stats }: ChannelStatsProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-center">YouTube Channel Stats</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold">
              {stats.subscriberCount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Subscribers</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">
              {stats.viewCount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">
              {stats.videoCount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Videos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}