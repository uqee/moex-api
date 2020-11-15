import { EntitiesDto, EntitiesMap } from '../entities'
import { Env, Logger } from '../services'
import { toEntitiesMap } from '../utils'

export interface BaseOptions {
  issUrl: string
  passportLogin: string
  passportPassword: string
  passportUrl: string
}

export class Base {
  private readonly logger: Logger

  public readonly issUrl: string
  public readonly passportLogin: string
  public readonly passportPassword: string
  public readonly passportUrl: string

  public constructor(
    partialBaseApiOptions: Partial<BaseOptions>,
    env: Env,
    logger: Logger,
  ) {
    this.logger = logger

    const finalBaseApiOptions = {
      issUrl: env.ISS_URL,
      passportLogin: env.PASSPORT_LOGIN,
      passportPassword: env.PASSPORT_PASSWORD,
      passportUrl: env.PASSPORT_URL,
      ...partialBaseApiOptions,
    }

    this.issUrl = finalBaseApiOptions.issUrl
    if (!this.issUrl) {
      throw new Error("'ISS_URL' is missing")
    }

    this.passportLogin = finalBaseApiOptions.passportLogin
    if (!this.passportLogin) {
      throw new Error("'PASSPORT_LOGIN' is missing")
    }

    this.passportPassword = finalBaseApiOptions.passportPassword
    if (!this.passportPassword) {
      throw new Error("'PASSPORT_PASSWORD' is missing")
    }

    this.passportUrl = finalBaseApiOptions.passportUrl
    if (!this.passportUrl) {
      throw new Error("'PASSPORT_URL' is missing")
    }
  }

  // passport

  private async _passportFetchCookies(): Promise<string> {
    const response: Response = await fetch(this.passportUrl, {
      credentials: 'include',
      headers: this._passportGetHeaders(),
    })
    const cookies: string | null = response.headers.get('Set-Cookie')
    if (!cookies) {
      throw new Error(
        "Authorization failed, check your 'PASSPORT_LOGIN' and 'PASSPORT_PASSWORD'",
      )
    }
    return cookies
  }

  private _passportGetHeaders(): Headers {
    const headers: Headers = new Headers()
    headers.append(
      'Authorization',
      `Basic ${btoa(`${this.passportLogin}:${this.passportPassword}`)}`,
    )
    return headers
  }

  public async passportAuth(): Promise<void> {
    await this._passportFetchCookies()
  }

  // iss

  public async issFetchEntities<
    TBody extends object = object,
    TEntitiesMap extends EntitiesMap = EntitiesMap
  >(
    path: string,
    getEntitiesDto: (body: TBody) => EntitiesDto,
  ): Promise<TEntitiesMap> {
    // request
    const url: string = `${this.issUrl}${path}.json?iss.json=compact&iss.meta=on`
    const requestInit: RequestInit = {
      // credentials: 'include',
      headers: this._passportGetHeaders(),
    }

    // response
    this.logger.debug('>>', url)
    const response: Response = await fetch(url, requestInit)
    if (!response.ok) {
      throw new Error(`Failed to fetch '${path}'`)
    }

    // parse body
    let body: TBody
    try {
      body = (await response.json()) as TBody
    } catch (error) {
      throw new Error(`Failed to parse JSON response from '${path}'`)
    }

    // get entities
    const entitiesDto: EntitiesDto = getEntitiesDto(body)
    const entitiesMap: TEntitiesMap = toEntitiesMap<TEntitiesMap>(entitiesDto)
    this.logger.debug('<<', url, entitiesDto)

    //
    return entitiesMap
  }
}
