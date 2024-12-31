import { Octokit } from '@octokit/rest'
import { GitHubCommit } from './types/github'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is required in environment variables')
}

if (!process.env.GITHUB_USERNAME) {
  throw new Error('GITHUB_USERNAME is required in environment variables')
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export async function getCommits(
  username: string,
  since: Date,
  until: Date
): Promise<GitHubCommit[]> {
  try {
    // Use search API to find all commits by the user
    const { data } = await octokit.search.commits({
      q: `author:${username} author-date:${since.toISOString().split('T')[0]}..${until.toISOString().split('T')[0]}`,
      sort: 'author-date',
      order: 'desc',
      per_page: 100
    })
    
    console.log(`Found ${data.total_count} commits for ${username}`)
    
    return data.items as GitHubCommit[]
  } catch (error) {
    if (error instanceof Error) {
      console.error('GitHub API Error:', error)
      throw new Error(`Failed to fetch commits: ${error.message}`)
    }
    throw error
  }
} 

interface ContributionDay {
  date: string
  contributionCount: number
}

interface GraphQLResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number
        weeks: {
          contributionDays: {
            contributionCount: number
            date: string
          }[]
        }[]
      }
    }
  }
}

export async function getContributionData(username: string): Promise<ContributionDay[]> {
  try {
    // Remove any quotes from the username
    const sanitizedUsername = username.replace(/['"]/g, '')
    
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `

    const data = await octokit.graphql<GraphQLResponse>(query, { 
      username: sanitizedUsername // Use sanitized username
    })
    
    const days = data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap(week => week.contributionDays)
      .map(day => ({
        date: day.date,
        contributionCount: day.contributionCount
      }))

    return days
  } catch (error) {
    if (error instanceof Error) {
      console.error('GitHub API Error:', error)
      throw new Error(`Failed to fetch contribution data: ${error.message}`)
    }
    throw error
  }
} 

interface GitHubUser {
  login: string
  name: string
  avatarUrl: string
  bio: string
  followers: number
  following: number
  location: string
  company: string
  twitterUsername: string | null
}

interface GraphQLUserResponse {
  user: {
    login: string
    name: string
    avatarUrl: string
    bio: string
    followers: {
      totalCount: number
    }
    following: {
      totalCount: number
    }
    location: string
    company: string
    twitterUsername: string | null
  }
}

export async function getUserProfile(username: string): Promise<GitHubUser> {
  try {
    const sanitizedUsername = username.replace(/['"]/g, '')
    
    const query = `
      query($username: String!) {
        user(login: $username) {
          login
          name
          avatarUrl
          bio
          followers {
            totalCount
          }
          following {
            totalCount
          }
          location
          company
          twitterUsername
        }
      }
    `

    const data = await octokit.graphql<GraphQLUserResponse>(query, { username: sanitizedUsername })
    const user = data.user

    return {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      location: user.location,
      company: user.company,
      twitterUsername: user.twitterUsername
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('GitHub API Error:', error)
      throw new Error(`Failed to fetch user profile: ${error.message}`)
    }
    throw error
  }
} 