'use client'

import { Card } from '@/components/ui/card'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'
import { CommitGraphControls, TimeRange, GroupBy } from './CommitGraphControls'

interface CommitData {
  date: string
  count: number
}

interface CommitGraphProps {
  dailyData: CommitData[]
  weeklyData: CommitData[]
  monthlyData: CommitData[]
}

function formatDate(date: string, groupBy: GroupBy): string {
  const parsed = parseISO(date)
  switch (groupBy) {
    case 'day':
      return format(parsed, 'MMM d')
    case 'week':
      return format(parsed, 'MMM d')
    case 'month':
      return format(parsed, 'MMM yyyy')
    default:
      return date
  }
}

export function CommitGraph({ dailyData, weeklyData, monthlyData }: CommitGraphProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [groupBy, setGroupBy] = useState<GroupBy>('day')

  const getData = () => {
    switch (timeRange) {
      case '7d':
        return dailyData
          .slice(-7)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case '30d':
        return weeklyData
          .slice(-4)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case '365d':
        return monthlyData
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      default:
        return dailyData
          .slice(-7)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
  }

  const data = getData()

  return (
    <div className="space-y-4">
      <CommitGraphControls
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onGroupByChange={setGroupBy}
      />
      <Card className="p-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => formatDate(date, groupBy)}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip
              labelFormatter={(date) => formatDate(date as string, groupBy)}
              formatter={(value) => [`${value} commits`]}
            />
            <Bar
              dataKey="count"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
} 