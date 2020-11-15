import { Env, Logger } from '../../services'
import { Dto, Entity } from './types'
import { getEntitiesArray, getEntitiesMap } from './utils'

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

  // private async _fetchCookies(): Promise<string> {
  //   const response: Response = await fetch(this.passportUrl, {
  //     credentials: 'include',
  //     headers: this._getHeaders(),
  //   })
  //   const cookies: string | null = response.headers.get('Set-Cookie')
  //   if (!cookies) {
  //     throw new Error(
  //       "Authorization failed, check your 'PASSPORT_LOGIN' and 'PASSPORT_PASSWORD'",
  //     )
  //   }
  //   return cookies
  // }

  private _getRequestInit(): RequestInit {
    const headers: Headers = new Headers()
    headers.append(
      'Authorization',
      `Basic ${btoa(`${this.passportLogin}:${this.passportPassword}`)}`,
    )
    const requestInit: RequestInit = {
      // credentials: 'include',
      headers,
    }
    return requestInit
  }

  private _getUrl(path: string): string {
    return `${this.issUrl}${path}.json?iss.json=compact&iss.meta=on`
  }

  // public async fetchAuth(): Promise<void> {
  //   await this._fetchCookies()
  // }

  public async fetch<TBody extends object = object>(
    path: string,
  ): Promise<TBody> {
    // request
    const url: string = this._getUrl(path)
    const requestInit: RequestInit = this._getRequestInit()
    this.logger.trace('>>', path, requestInit)

    // response
    const response: Response = await fetch(url, requestInit)
    if (!response.ok) {
      throw new Error(`Failed to fetch '${path}'`)
    }

    // parse body
    let body: TBody
    try {
      body = (await response.json()) as TBody
      this.logger.trace('<<', path, body)
    } catch (error) {
      throw new Error(`Failed to parse JSON response from '${path}'`)
    }

    //
    return body
  }

  public getEntitiesArray<TEntity extends Entity>(dto: Dto): TEntity[] {
    const entitiesArray: TEntity[] = getEntitiesArray(dto)
    this.logger.trace('getEntitiesArray...', entitiesArray)
    return entitiesArray
  }

  protected getEntitiesMap<TEntity extends Entity>(
    entitiesArray: TEntity[],
  ): Map<TEntity['id'], TEntity> {
    const entitiesMap: Map<TEntity['id'], TEntity> = getEntitiesMap(
      entitiesArray,
    )
    this.logger.trace('getEntitiesMap...', entitiesMap)
    return entitiesMap
  }
}
