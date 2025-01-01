declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_TOKEN: string
        GITHUB_USERNAME: string
        YOUTUBE_API_KEY: string
        YOUTUBE_CHANNEL_ID: string
        NODE_ENV: 'development' | 'production' | 'test'
        VERCEL_URL?: string
        HASHNODE_USERNAME: string
      }
    }
  }
  
  export {}