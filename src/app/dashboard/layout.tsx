export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">GitHub Stats Dashboard</h1>
      {children}
    </div>
  )
}
