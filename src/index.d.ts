import { NodeEnv } from './services'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ISS_URL?: string
      readonly NODE_ENV: NodeEnv
      readonly PASSPORT_LOGIN?: string
      readonly PASSPORT_PASSWORD?: string
      readonly PASSPORT_URL?: string
    }
  }
}

declare function ASSERT_EXHAUSTIVE(x: never): never
