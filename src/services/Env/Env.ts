import { isEnumValue } from '../../utils'
import { NodeEnv } from './NodeEnv'

class Env {
  // private static toBoolean(string?: string): boolean {
  //   return string === 'true'
  // }

  // private static toInteger(string?: string): number | undefined {
  //   return string ? parseInt(string, 10) : undefined
  // }

  private static isNodeEnv = isEnumValue(NodeEnv)
  private static toNodeEnv = (string?: string): NodeEnv => {
    return Env.isNodeEnv(string) ? string : NodeEnv.PRODUCTION
  }

  private static toString(string?: string): string {
    return string || ''
  }

  //

  public readonly ISS_URL: string = Env.toString(
    process.env.ISS_URL, //
  )

  public readonly NODE_ENV: NodeEnv = Env.toNodeEnv(
    process.env.NODE_ENV, //
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

export const env: Env = new Env()
