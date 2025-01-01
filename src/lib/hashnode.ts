import type { HashnodeProfile, HashnodeStats, HashnodePost } from './types/hashnode'

const HASHNODE_API_URL = 'https://gql.hashnode.com'

export async function getHashnodeProfile(username: string): Promise<HashnodeProfile> {
  const query = `
    query GetUserProfile($username: String!) {
      user(username: $username) {
        username
        name
        tagline
        isTeam
        location
        photo
        publicationDomain
        socialMedia {
          twitter
          github
          website
        }
      }
    }
  `

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  })

  const data = await response.json()
  return data.data.user
}

export async function getHashnodeStats(username: string): Promise<HashnodeStats> {
  const query = `
    query GetUserStats($username: String!) {
      user(username: $username) {
        publications(first: 1) {
          edges {
            node {
              posts(first: 0) {
                totalDocuments
              }
              followersCount
            }
          }
        }
      }
    }
  `

  try {
    const data = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HASHNODE_ACCESS_TOKEN}`
      } as HeadersInit,
      body: JSON.stringify({
        query,
        variables: { username }
      })
    }).then(res => res.json())

    if (data.errors) {
      console.error('Hashnode API Errors:', data.errors)
      throw new Error('Failed to fetch Hashnode stats')
    }

    const publication = data.data.user.publications.edges[0].node
    return {
      totalPosts: publication.posts.totalDocuments || 0,
      totalViews: 0,
      totalReactions: 0,
      followers: publication.followersCount || 0
    }
  } catch (error) {
    console.error('Hashnode API Error:', error)
    throw error
  }
}

interface HashnodePostEdge {
  node: {
    id: string
    title: string
    brief: string
    slug: string
    publishedAt: string
    reactionCount: number
    responseCount: number
    views: number
    readTimeInMinutes: number
    coverImage: {
      url: string
      isPortrait: boolean
      attribution?: string
      photographer?: string
    }
  }
}

export async function getRecentPosts(username: string): Promise<HashnodePost[]> {
  const query = `
    query Publication {
      publication(host: "blog.patrickskinner.tech") {
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              reactionCount
              responseCount
              views
              readTimeInMinutes
              coverImage {
                url
                isPortrait
                attribution
                photographer
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HASHNODE_ACCESS_TOKEN}`
      } as HeadersInit,
      body: JSON.stringify({ query }),
    })

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Error fetching Hashnode posts')
    }

    if (!data.data?.publication?.posts?.edges) {
      throw new Error('Invalid response format from Hashnode API')
    }

    return data.data.publication.posts.edges.map((edge: HashnodePostEdge) => ({
      _id: edge.node.id,
      title: edge.node.title,
      brief: edge.node.brief,
      slug: edge.node.slug,
      dateAdded: edge.node.publishedAt,
      totalReactions: edge.node.reactionCount,
      responseCount: edge.node.responseCount,
      views: edge.node.views,
      readTime: edge.node.readTimeInMinutes,
      coverImage: {
        url: edge.node.coverImage?.url,
        isPortrait: edge.node.coverImage?.isPortrait || false,
        attribution: edge.node.coverImage?.attribution,
        photographer: edge.node.coverImage?.photographer
      }
    }))
  } catch (error) {
    console.error('Hashnode API Error:', error)
    throw error
  }
} 