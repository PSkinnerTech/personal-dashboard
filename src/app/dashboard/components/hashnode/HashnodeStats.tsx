import { getHashnodeStats } from '@/lib/hashnode'
import { StatsCard } from '../StatsCard'

export async function HashnodeStats() {
  const stats = await getHashnodeStats()
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Blog Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard 
          value={stats.totalPosts}
          subtitle="Total Posts"
        />
        <StatsCard 
          value={stats.totalViews}
          subtitle="Total Views"
        />
        <StatsCard 
          value={stats.totalReactions}
          subtitle="Total Reactions"
        />
        <StatsCard 
          value={stats.followers}
          subtitle="Followers"
        />
      </div>
    </div>
  )
} 