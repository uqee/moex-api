declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly MOEX_API__BASE_URL?: string
      readonly MOEX_API__DEBUG?: 'true'
      readonly MOEX_API__LOGIN?: string
      readonly MOEX_API__PASSWORD?: string
    }
  }
}

export {}
