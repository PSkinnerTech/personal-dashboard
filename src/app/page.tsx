import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center p-8">
      <main className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          PSkinnerTech&apos;s Data Dashboard
        </h1>
        <p className="text-muted-foreground">
          GitHub statistics and analytics
        </p>
        <Link 
          href="/dashboard"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Dashboard
        </Link>
      </main>
    </div>
  )
}
