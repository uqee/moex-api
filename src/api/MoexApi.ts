import {
  EnginesMap,
  EntitiesDto,
  EntitiesMap,
  SecuritiesMap,
} from '../entities'
import { Env, Logger, manualDiContainer } from '../services'
import { toEntitiesMap } from '../utils'

interface MoexApiOptions {
  issUrl: string
  passportLogin: string
  passportPassword: string
  passportUrl: string
}

export class MoexApi {
  private readonly logger: Logger

  public readonly issUrl: string
  public readonly passportLogin: string
  public readonly passportPassword: string
  public readonly passportUrl: string

  public constructor(
    moexApiOptions: Partial<MoexApiOptions> = {},
    env: Env = manualDiContainer.env,
    logger: Logger = manualDiContainer.logger,
  ) {
    this.logger = logger

    const finalMoexApiOptions = {
      issUrl: env.ISS_URL,
      passportLogin: env.PASSPORT_LOGIN,
      passportPassword: env.PASSPORT_PASSWORD,
      passportUrl: env.PASSPORT_URL,
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

  private async _fetch<TBody extends object>(path: string): Promise<TBody> {
    const url: string = `${this.issUrl}${path}.json?iss.json=compact&iss.meta=on`
    const requestInit: RequestInit = {
      // credentials: 'include',
      headers: this._getHeaders(),
    }

    this.logger.debug('>>', url)
    const response: Response = await fetch(url, requestInit)
    if (!response.ok) {
      throw new Error(`Failed to fetch '${path}'`)
    }

    let body: TBody
    try {
      body = (await response.json()) as TBody
    } catch (error) {
      throw new Error(`Failed to parse JSON response from '${path}'`)
    }

    this.logger.debug('<<', url, body)
    return body
  }

  private _toEntitiesMap<TEntitiesMap extends EntitiesMap>(
    entitiesDto: EntitiesDto,
  ): EntitiesMap {
    this.logger.info('metadata', entitiesDto.metadata)
    return toEntitiesMap<TEntitiesMap>(entitiesDto)
  }

  public async fetchEnginesMap(): Promise<EnginesMap> {
    return this._toEntitiesMap(
      (await this._fetch<{ engines: EntitiesDto }>('/engines')).engines,
    ) as EnginesMap
  }

  public async fetchSecuritiesMap(): Promise<SecuritiesMap> {
    return this._toEntitiesMap(
      (await this._fetch<{ securities: EntitiesDto }>('/securities'))
        .securities,
    ) as SecuritiesMap
  }
}
