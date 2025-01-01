'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { YouTubeAnalytics } from '@/lib/types/youtube'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface SubscriberGrowthProps {
  data: YouTubeAnalytics['subscribers']
}

export function SubscriberGrowth({ data }: SubscriberGrowthProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Subscriber Growth</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                fontSize={12}
              />
              <YAxis 
                width={40}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                fontSize={12}
              />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                formatter={(value: number) => [value.toLocaleString(), 'Subscribers']}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 