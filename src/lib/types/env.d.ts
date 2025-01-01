declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_TOKEN: string
        GITHUB_USERNAME: string
        YOUTUBE_API_KEY: string
        YOUTUBE_CHANNEL_ID: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
        NEXT_PUBLIC_APP_URL: string
        NODE_ENV: 'development' | 'production' | 'test'
        VERCEL_URL?: string
      }
    }
  }
  
  export {}