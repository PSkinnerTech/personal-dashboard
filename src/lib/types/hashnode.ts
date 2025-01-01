export interface HashnodePost {
  _id: string
  title: string
  brief: string
  slug: string
  dateAdded: string
  totalReactions: number
  responseCount: number
  views: number
  readTime: number
  coverImage: {
    url: string
    isPortrait: boolean
    attribution?: string
    photographer?: string
  }
}

export interface HashnodeStats {
  totalPosts: number
  totalViews: number
  totalReactions: number
  followers: number
}

export interface HashnodeProfile {
  username: string
  name: string
  tagline: string
  isTeam: boolean
  location: string
  photo: string
  publicationDomain: string
  socialMedia: {
    twitter?: string
    github?: string
    website?: string
  }
} 