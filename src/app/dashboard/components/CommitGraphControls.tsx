'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'

export type TimeRange = '7d' | '30d' | '365d'
export type GroupBy = 'day' | 'week' | 'month'

interface CommitGraphControlsProps {
  timeRange: TimeRange
  groupBy: GroupBy
  onTimeRangeChange: (value: TimeRange) => void
  onGroupByChange: (value: GroupBy) => void
}

export function CommitGraphControls({
  timeRange,
  onTimeRangeChange,
  onGroupByChange,
}: Omit<CommitGraphControlsProps, 'groupBy'>) {
  // Automatically set groupBy based on timeRange
  const handleTimeRangeChange = (value: TimeRange) => {
    onTimeRangeChange(value)
    switch (value) {
      case '7d':
        onGroupByChange('day')
        break
      case '30d':
        onGroupByChange('week')
        break
      case '365d':
        onGroupByChange('month')
        break
    }
  }

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Time Range</label>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="365d">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
} 