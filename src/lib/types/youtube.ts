export interface YouTubeChannelStats {
    subscriberCount: number
    viewCount: number
    videoCount: number
    lastUpdated: string
  }
  
  export interface YouTubeVideo {
    id: string
    title: string
    publishedAt: string
    viewCount: number
    likeCount: number
    commentCount: number
    thumbnailUrl: string
  }
  
  export interface YouTubeAnalytics {
    views: {
      date: string
      count: number
    }[]
    subscribers: {
      date: string
      count: number
    }[]
    watchTime: {
      date: string
      minutes: number
    }[]
  }