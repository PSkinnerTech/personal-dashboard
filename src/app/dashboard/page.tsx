import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorCard } from './components/ErrorCard'
import { getCommits, getContributionData, getUserProfile, getIssues, getPullRequests, getCodeReviews } from '@/lib/github'
import { getDateRanges } from '@/lib/utils/dateUtils'
import { StatsCard } from './components/StatsCard'
import { ContributionGraph } from './components/ContributionGraph'
import { ProfileCard } from './components/ProfileCard'
import { getChannelStats, getRecentVideos } from '@/lib/youtube'
import { ChannelStats } from './components/youtube/ChannelStats'
import { RecentVideos } from './components/youtube/RecentVideos'
import { HashnodeStats } from './components/hashnode/HashnodeStats'
import { RecentPosts } from './components/hashnode/RecentPosts'
import { getRecentPosts } from '@/lib/hashnode'

export default async function DashboardPage() {
  const recentPosts = await getRecentPosts()
  
  return (
    <div className="space-y-8">
      <ErrorBoundary fallback={
        <div className="text-sm text-muted-foreground">
          GitHub data temporarily unavailable (API rate limit exceeded)
        </div>
      }>
        <GitHubSection />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={
        <div className="text-sm text-muted-foreground">
          YouTube data temporarily unavailable (API quota exceeded)
        </div>
      }>
        <YouTubeSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <HashnodeStats />
        <RecentPosts posts={recentPosts} />
      </ErrorBoundary>
    </div>
  )
}

async function GitHubSection() {
  try {
    const { sevenDays, thirtyDays, yearDays } = getDateRanges()
    
    const [
      sevenDayCommits,
      thirtyDayCommits,
      yearCommits,
      sevenDayIssues,
      thirtyDayIssues,
      yearIssues,
      sevenDayPRs,
      thirtyDayPRs,
      yearPRs,
      sevenDayReviews,
      thirtyDayReviews,
      yearReviews,
      contributionData,
      userProfile
    ] = await Promise.all([
      getCommits(process.env.GITHUB_USERNAME!, sevenDays.start, sevenDays.end),
      getCommits(process.env.GITHUB_USERNAME!, thirtyDays.start, thirtyDays.end),
      getCommits(process.env.GITHUB_USERNAME!, yearDays.start, yearDays.end),
      getIssues(process.env.GITHUB_USERNAME!, sevenDays.start, sevenDays.end),
      getIssues(process.env.GITHUB_USERNAME!, thirtyDays.start, thirtyDays.end),
      getIssues(process.env.GITHUB_USERNAME!, yearDays.start, yearDays.end),
      getPullRequests(process.env.GITHUB_USERNAME!, sevenDays.start, sevenDays.end),
      getPullRequests(process.env.GITHUB_USERNAME!, thirtyDays.start, thirtyDays.end),
      getPullRequests(process.env.GITHUB_USERNAME!, yearDays.start, yearDays.end),
      getCodeReviews(process.env.GITHUB_USERNAME!, sevenDays.start, sevenDays.end),
      getCodeReviews(process.env.GITHUB_USERNAME!, thirtyDays.start, thirtyDays.end),
      getCodeReviews(process.env.GITHUB_USERNAME!, yearDays.start, yearDays.end),
      getContributionData(process.env.GITHUB_USERNAME!),
      getUserProfile(process.env.GITHUB_USERNAME!)
    ])

    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[300px,1fr]">
          <ProfileCard user={userProfile} />
          <div className="space-y-6">
            <div className="grid grid-cols-[80px,1fr,1fr,1fr,1fr] md:grid-cols-[120px,1fr,1fr,1fr,1fr] gap-x-2 md:gap-x-4">
              <div /> {/* Empty cell for time period labels */}
              <h3 className="text-base md:text-lg font-medium text-center">Commits</h3>
              <h3 className="text-base md:text-lg font-medium text-center">Issues</h3>
              <h3 className="text-base md:text-lg font-medium text-center">PRs</h3>
              <h3 className="text-base md:text-lg font-medium text-center">Reviews</h3>

              <h4 className="text-xs md:text-sm font-medium self-center whitespace-nowrap">Last Year</h4>
              <StatsCard
                value={yearCommits}
                subtitle={`${(yearCommits / 365).toFixed(1)} per day`}
              />
              <StatsCard
                value={yearIssues}
                subtitle={`${(yearIssues / 365).toFixed(1)} per day`}
              />
              <StatsCard
                value={yearPRs}
                subtitle={`${(yearPRs / 365).toFixed(1)} per day`}
              />
              <StatsCard
                value={yearReviews}
                subtitle={`${(yearReviews / 365).toFixed(1)} per day`}
              />

              <div className="col-span-5 h-4 md:h-6" />

              <h4 className="text-xs md:text-sm font-medium self-center whitespace-nowrap">Last 30d</h4>
              <StatsCard
                value={thirtyDayCommits}
                subtitle={`${(thirtyDayCommits / 30).toFixed(1)} per day`}
              />
              <StatsCard
                value={thirtyDayIssues}
                subtitle={`${(thirtyDayIssues / 30).toFixed(1)} per day`}
              />
              <StatsCard
                value={thirtyDayPRs}
                subtitle={`${(thirtyDayPRs / 30).toFixed(1)} per day`}
              />
              <StatsCard
                value={thirtyDayReviews}
                subtitle={`${(thirtyDayReviews / 30).toFixed(1)} per day`}
              />

              <div className="col-span-5 h-4 md:h-6" />

              <h4 className="text-xs md:text-sm font-medium self-center whitespace-nowrap">Last 7d</h4>
              <StatsCard
                value={sevenDayCommits}
                subtitle={`${(sevenDayCommits / 7).toFixed(1)} per day`}
              />
              <StatsCard
                value={sevenDayIssues}
                subtitle={`${(sevenDayIssues / 7).toFixed(1)} per day`}
              />
              <StatsCard
                value={sevenDayPRs}
                subtitle={`${(sevenDayPRs / 7).toFixed(1)} per day`}
              />
              <StatsCard
                value={sevenDayReviews}
                subtitle={`${(sevenDayReviews / 7).toFixed(1)} per day`}
              />
            </div>
            
            <ContributionGraph data={contributionData} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return <ErrorCard error={error instanceof Error ? error : new Error('Failed to load GitHub data')} />
  }
}

async function YouTubeSection() {
  try {
    const [channelStats, recentVideos] = await Promise.allSettled([
      getChannelStats(process.env.YOUTUBE_CHANNEL_ID!),
      getRecentVideos(process.env.YOUTUBE_CHANNEL_ID!)
    ])

    return (
      <div className="mt-8 space-y-8">
        <h2 className="text-2xl font-bold text-center">YouTube Analytics</h2>
        <ChannelStats 
          stats={channelStats.status === 'fulfilled' ? channelStats.value : {
            subscriberCount: 0,
            viewCount: 0,
            videoCount: 0,
            lastUpdated: new Date().toISOString()
          }} 
        />
        <div className="mt-12">
          <RecentVideos 
            videos={recentVideos.status === 'fulfilled' ? recentVideos.value : []} 
          />
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="text-sm text-muted-foreground p-4 text-center">
        YouTube data temporarily unavailable (API quota exceeded). Please try again later.
      </div>
    )
  }
} 