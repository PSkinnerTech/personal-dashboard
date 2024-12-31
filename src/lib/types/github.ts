interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  repository: {
    name: string
    full_name: string
  }
}

interface CommitStats {
  total: number
  daily: {
    date: string
    count: number
  }[]
  average: number
}

export type { GitHubCommit, CommitStats } 