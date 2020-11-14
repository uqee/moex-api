import { isEnumValue } from '../../utils'
// eslint-disable-next-line import/no-internal-modules
import { LogLevel } from '../Logger/types'

export class Env {
  // private static toBoolean(string?: string): boolean {
  //   return string === 'true'
  // }

  // private static toInteger(string?: string): number | undefined {
  //   return string ? parseInt(string, 10) : undefined
  // }

  private static isLogLevel = isEnumValue(LogLevel)
  private static toLogLevel = (string?: string): LogLevel => {
    return Env.isLogLevel(string) ? string : LogLevel._1__ERROR
  }

  private static toString(string?: string): string {
    return string || ''
  }

  //

  public readonly ISS_URL: string = Env.toString(
    process.env.ISS_URL, //
  )

  public readonly LOG_LEVEL: LogLevel = Env.toLogLevel(
    process.env.LOG_LEVEL, //
  )

  public readonly PASSPORT_LOGIN: string = Env.toString(
    process.env.PASSPORT_LOGIN, //
  )

  public readonly PASSPORT_PASSWORD: string = Env.toString(
    process.env.PASSPORT_PASSWORD, //
  )

  public readonly PASSPORT_URL: string = Env.toString(
    process.env.PASSPORT_URL, //
  )
}
