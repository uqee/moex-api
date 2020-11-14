import { Env } from './Env'
import { Logger } from './Logger'

const env: Env = new Env()
const logger: Logger = new Logger(env)

export const manualDiContainer = {
  env,
  logger,
}
