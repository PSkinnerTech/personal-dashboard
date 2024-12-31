import { subDays, startOfDay, endOfDay, parseISO, format } from 'date-fns'

export function getDateRanges() {
  const now = new Date()
  const sevenDaysAgo = subDays(now, 7)
  const thirtyDaysAgo = subDays(now, 30)

  return {
    sevenDays: {
      start: startOfDay(sevenDaysAgo),
      end: endOfDay(now)
    },
    thirtyDays: {
      start: startOfDay(thirtyDaysAgo),
      end: endOfDay(now)
    }
  }
}

export function formatDate(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'yyyy-MM-dd')
}
