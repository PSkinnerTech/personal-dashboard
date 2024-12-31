import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { MapPin, Building2 } from 'lucide-react'
import { XLogo } from '@/components/icons/x-logo'
import Link from 'next/link'

interface ProfileCardProps {
  user: {
    login: string
    name: string
    avatarUrl: string
    bio: string
    followers: number
    following: number
    location: string
    company: string
    twitterUsername: string | null
  }
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative h-16 w-16">
          <Image
            src={user.avatarUrl}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <Link 
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:underline"
          >
            @{user.login}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user.bio && (
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        )}
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-medium">{user.followers}</span>
            <span className="text-muted-foreground ml-1">followers</span>
          </div>
          <div>
            <span className="font-medium">{user.following}</span>
            <span className="text-muted-foreground ml-1">following</span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {user.location}
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {user.company}
            </div>
          )}
          {user.twitterUsername && (
            <div className="flex items-center gap-2">
              <XLogo className="h-4 w-4" />
              <Link
                href={`https://x.com/${user.twitterUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @{user.twitterUsername}
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
