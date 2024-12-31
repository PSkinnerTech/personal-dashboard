declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string
      GITHUB_USERNAME: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {} 