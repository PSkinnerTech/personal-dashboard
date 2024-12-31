import { getCommits, getContributionData } from '@/lib/github'
import { getDateRanges } from '@/lib/utils/dateUtils'
import { StatsCard } from './components/StatsCard'
import { ContributionGraph } from './components/ContributionGraph'
import { Suspense } from 'react'

async function DashboardStats() {
  const { sevenDays, thirtyDays } = getDateRanges()
  
  const [sevenDayCommits, thirtyDayCommits, contributionData] = await Promise.all([
    getCommits(process.env.GITHUB_USERNAME!, sevenDays.start, sevenDays.end),
    getCommits(process.env.GITHUB_USERNAME!, thirtyDays.start, thirtyDays.end),
    getContributionData(process.env.GITHUB_USERNAME!)
  ])

  const sevenDayTotal = sevenDayCommits.length
  const thirtyDayTotal = thirtyDayCommits.length
  
  const sevenDayAvg = (sevenDayTotal / 7).toFixed(1)
  const thirtyDayAvg = (thirtyDayTotal / 30).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Last 7 Days"
          value={sevenDayTotal}
          subtitle={`${sevenDayAvg} commits per day`}
        />
        <StatsCard
          title="Last 30 Days"
          value={thirtyDayTotal}
          subtitle={`${thirtyDayAvg} commits per day`}
        />
      </div>
      <ContributionGraph data={contributionData} />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading stats...</div>}>
      <DashboardStats />
    </Suspense>
  )
} 