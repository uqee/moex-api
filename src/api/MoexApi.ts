import { EnginesDto, EnginesMap } from '../entities'
import { env } from '../services'
import { toEntitiesMap } from '../utils'

interface MoexApiOptions {
  issUrl: string
  passportLogin: string
  passportPassword: string
  passportUrl: string
}

export class MoexApi {
  private static readonly defaultMoexApiOptions: MoexApiOptions = {
    issUrl: env.ISS_URL,
    passportLogin: env.PASSPORT_LOGIN,
    passportPassword: env.PASSPORT_PASSWORD,
    passportUrl: env.PASSPORT_URL,
  }

  public issUrl: string
  public passportLogin: string
  public passportPassword: string
  public passportUrl: string

  public constructor(moexApiOptions: Partial<MoexApiOptions> = {}) {
    const finalMoexApiOptions = {
      ...MoexApi.defaultMoexApiOptions,
      ...moexApiOptions,
    }

    this.issUrl = finalMoexApiOptions.issUrl
    if (!this.issUrl) {
      throw new Error("'ISS_URL' is missing")
    }

    this.passportLogin = finalMoexApiOptions.passportLogin
    if (!this.passportLogin) {
      throw new Error("'PASSPORT_LOGIN' is missing")
    }

    this.passportPassword = finalMoexApiOptions.passportPassword
    if (!this.passportPassword) {
      throw new Error("'PASSPORT_PASSWORD' is missing")
    }

    this.passportUrl = finalMoexApiOptions.passportUrl
    if (!this.passportUrl) {
      throw new Error("'PASSPORT_URL' is missing")
    }
  }

  // passport

  private async _fetchCookies(): Promise<string> {
    const response: Response = await fetch(this.passportUrl, {
      credentials: 'include',
      headers: this._getHeaders(),
    })
    const cookies: string | null = response.headers.get('Set-Cookie')
    if (!cookies) {
      throw new Error(
        "Authorization failed, check your 'PASSPORT_LOGIN' and 'PASSPORT_PASSWORD'",
      )
    }
    return cookies
  }

  private _getHeaders(): Headers {
    const headers: Headers = new Headers()
    headers.append(
      'Authorization',
      `Basic ${btoa(`${this.passportLogin}:${this.passportPassword}`)}`,
    )
    return headers
  }

  public async auth(): Promise<void> {
    await this._fetchCookies()
  }

  // iss

  private async _fetch<TResult>(path: string): Promise<TResult> {
    const response: Response = await fetch(
      `${this.issUrl}${path}.json?iss.meta=off`,
      {
        // credentials: 'include',
        headers: this._getHeaders(),
      },
    )
    let result: TResult
    try {
      result = (await response.json()) as TResult
    } catch (error) {
      throw new Error(`Fetch of '${path}' failed`)
    }
    return result
  }

  public async fetchEnginesMap(): Promise<EnginesMap> {
    return toEntitiesMap<EnginesMap>(
      (await this._fetch<{ engines: EnginesDto }>('/engines')).engines,
    )
  }
}
