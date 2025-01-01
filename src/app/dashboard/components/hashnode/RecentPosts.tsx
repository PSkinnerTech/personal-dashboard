'use client'

import { HashnodePost } from '@/lib/types/hashnode'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

interface RecentPostsProps {
  posts: HashnodePost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Blog Posts</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardContent className="p-4">
              <Link 
                href={`https://blog.patrickskinner.tech/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-2"
              >
                {post.coverImage && (
                  <div className="relative w-full aspect-video mb-4">
                    <Image
                      src={post.coverImage.url}
                      alt={post.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <h4 className="font-medium line-clamp-2 hover:underline">
                  {post.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.brief}
                </p>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{post.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{post.totalReactions} reactions</span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.dateAdded))} ago
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 