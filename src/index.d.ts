import { LogLevel } from './services/Logger/types'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ISS_URL?: string
      readonly LOG_LEVEL?: string & LogLevel
      readonly PASSPORT_LOGIN?: string
      readonly PASSPORT_PASSWORD?: string
      readonly PASSPORT_URL?: string
    }
  }
}

declare function ASSERT_EXHAUSTIVE(x: never): never
