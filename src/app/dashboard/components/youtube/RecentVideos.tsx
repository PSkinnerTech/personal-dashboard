import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { YouTubeVideo } from '@/lib/types/youtube'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface RecentVideosProps {
  videos: YouTubeVideo[]
}

export function RecentVideos({ videos }: RecentVideosProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Recent Videos</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {videos.slice(0, 5).map((video) => (
          <div key={video.id} className="flex gap-4">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              width={120}
              height={68}
              className="rounded"
            />
            <div className="space-y-1">
              <p className="font-medium line-clamp-2">{video.title}</p>
              <p className="text-sm text-muted-foreground">
                {video.viewCount.toLocaleString()} views • {formatDistanceToNow(new Date(video.publishedAt))} ago
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 