import { google } from 'googleapis'
import { YouTubeChannelStats, YouTubeVideo } from './types/youtube'

if (!process.env.YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY is required')
}

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
})

export async function getChannelStats(channelId: string): Promise<YouTubeChannelStats> {
  try {
    const response = await youtube.channels.list({
      forUsername: channelId,
      part: ['statistics']
    })

    if (!response.data.items?.length) {
      const idResponse = await youtube.channels.list({
        id: [channelId],
        part: ['statistics']
      })
      if (!idResponse.data.items?.length) {
        throw new Error('Channel not found')
      }
      return {
        subscriberCount: parseInt(idResponse.data.items[0].statistics?.subscriberCount || '0'),
        viewCount: parseInt(idResponse.data.items[0].statistics?.viewCount || '0'),
        videoCount: parseInt(idResponse.data.items[0].statistics?.videoCount || '0'),
        lastUpdated: new Date().toISOString()
      }
    }

    const channel = response.data.items[0]
    return {
      subscriberCount: parseInt(channel.statistics?.subscriberCount || '0'),
      viewCount: parseInt(channel.statistics?.viewCount || '0'),
      videoCount: parseInt(channel.statistics?.videoCount || '0'),
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error('YouTube API Error:', error)
    throw new Error('Failed to fetch channel statistics')
  }
}

export async function getRecentVideos(channelId: string): Promise<YouTubeVideo[]> {
  try {
    const response = await youtube.search.list({
      channelId,
      part: ['snippet'],
      order: 'date',
      maxResults: 10
    })

    const videoIds = response.data.items?.map(item => item.id?.videoId).filter((id): id is string => !!id) || []
    
    const videoStats = await youtube.videos.list({
      id: videoIds,
      part: ['statistics', 'snippet']
    })

    return videoStats.data.items?.map(video => ({
      id: video.id!,
      title: video.snippet!.title!,
      publishedAt: video.snippet!.publishedAt!,
      viewCount: parseInt(video.statistics?.viewCount || '0'),
      likeCount: parseInt(video.statistics?.likeCount || '0'),
      commentCount: parseInt(video.statistics?.commentCount || '0'),
      thumbnailUrl: video.snippet?.thumbnails?.default?.url || 'https://via.placeholder.com/120x68'
    })) || []
  } catch (error) {
    console.error('YouTube API Error:', error)
    throw new Error('Failed to fetch recent videos')
  }
}