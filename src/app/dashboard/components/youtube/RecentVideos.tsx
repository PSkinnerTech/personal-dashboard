'use client'

import { YouTubeVideo } from '@/lib/types/youtube'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface RecentVideosProps {
  videos: YouTubeVideo[]
}

export function RecentVideos({ videos }: RecentVideosProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-center mb-2">Recent Videos</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {videos.map((video) => (
            <CarouselItem key={video.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-0.5">
                <div className="flex flex-col gap-1">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={320}
                    height={180}
                    className="rounded-lg w-full object-cover aspect-video"
                  />
                  <div>
                    <p className="font-medium line-clamp-1 text-sm">{video.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {video.viewCount.toLocaleString()} views • {formatDistanceToNow(new Date(video.publishedAt))} ago
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
} 