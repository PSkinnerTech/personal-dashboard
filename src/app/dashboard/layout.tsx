import { ThemeToggle } from '@/components/ThemeToggle'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">PSkinnerTech&apos;s Dashboard</h1>
        <ThemeToggle />
      </div>
      {children}
    </div>
  )
}
