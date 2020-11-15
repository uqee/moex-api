export class Env {
  private static toBoolean(string?: string): boolean {
    return string === 'true'
  }

  // private static toInteger(string?: string): number | undefined {
  //   return string ? parseInt(string, 10) : undefined
  // }

  private static toString(string?: string): string {
    return string || ''
  }

  //

  public readonly MOEX_API__BASE_URL: string = Env.toString(
    process.env.MOEX_API__BASE_URL, //
  )

  public readonly MOEX_API__DEBUG: boolean = Env.toBoolean(
    process.env.MOEX_API__DEBUG, //
  )

  public readonly MOEX_API__LOGIN: string = Env.toString(
    process.env.MOEX_API__LOGIN, //
  )

  public readonly MOEX_API__PASSWORD: string = Env.toString(
    process.env.MOEX_API__PASSWORD, //
  )
}
