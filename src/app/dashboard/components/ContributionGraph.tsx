'use client'

import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { format, parseISO } from 'date-fns'

interface ContributionDay {
  date: string
  contributionCount: number
}

function getContributionColor(count: number): string {
  if (count === 0) return 'bg-zinc-100 dark:bg-zinc-900'
  if (count <= 3) return 'bg-green-100 dark:bg-green-900'
  if (count <= 6) return 'bg-green-300 dark:bg-green-700'
  if (count <= 9) return 'bg-green-500 dark:bg-green-500'
  return 'bg-green-700 dark:bg-green-300'
}

function formatDate(date: string) {
  return format(parseISO(date), 'MMMM d, yyyy')
}

export function ContributionGraph({ data }: { data: ContributionDay[] }) {
  const weeks = data.reduce<ContributionDay[][]>((acc, day, i) => {
    const weekIndex = Math.floor(i / 7)
    if (!acc[weekIndex]) acc[weekIndex] = []
    acc[weekIndex].push(day)
    return acc
  }, [])

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Contribution Activity</h3>
        <TooltipProvider delayDuration={0}>
          <div className="grid grid-flow-col gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day) => (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <div
                        className={`aspect-square rounded-sm ${getContributionColor(
                          day.contributionCount
                        )}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="p-2">
                      <p className="text-sm font-semibold">
                        {day.contributionCount} {day.contributionCount === 1 ? 'contribution' : 'contributions'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(day.date)}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </Card>
  )
} 