import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 space-y-4">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </div>
  )
}
