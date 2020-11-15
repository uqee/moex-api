import { Env } from '../services'
import { Dto } from '../types'
import { parseDto } from '../utils'

export interface BaseOptions {
  baseUrl: string
  debug: boolean
  login: string
  password: string
}

export class Base {
  private static _buildSearch(params?: Record<string, unknown>): string {
    const urlSearchParams: URLSearchParams = new URLSearchParams()
    if (params) {
      Object.keys(params).forEach((key: string): void => {
        urlSearchParams.set(key, String(params[key]))
      })
    }
    return urlSearchParams.toString()
  }

  private readonly baseUrl: string
  private readonly debug: boolean
  private readonly login: string
  private readonly password: string

  public constructor(partialBaseOptions: Partial<BaseOptions>, env: Env) {
    const finalBaseOptions: BaseOptions = {
      baseUrl: env.MOEX_API__BASE_URL,
      debug: env.MOEX_API__DEBUG,
      login: env.MOEX_API__LOGIN,
      password: env.MOEX_API__PASSWORD,
      ...partialBaseOptions,
    }

    this.baseUrl = finalBaseOptions.baseUrl
    if (!this.baseUrl) throw new Error("'MOEX_API__BASE_URL' is missing")

    this.debug = finalBaseOptions.debug

    this.login = finalBaseOptions.login
    if (!this.login) throw new Error("'MOEX_API__LOGIN' is missing")

    this.password = finalBaseOptions.password
    if (!this.password) throw new Error("'MOEX_API__PASSWORD' is missing")
  }

  private _buildRequestInit(): RequestInit {
    const headers: Headers = new Headers()
    headers.append(
      'Authorization',
      `Basic ${btoa(`${this.login}:${this.password}`)}`,
    )
    const requestInit: RequestInit = { headers }
    return requestInit
  }

  private _buildUrl(
    path: string,
    searchParams?: Record<string, unknown>,
  ): string {
    const search: string = Base._buildSearch(searchParams)
    return `${this.baseUrl}${path}.json?${search}`
  }

  public async fetch<TBody extends object>(
    path: string,
    searchParams?: Record<string, unknown>,
  ): Promise<TBody> {
    // request
    const url: string = this._buildUrl(path, searchParams)
    const requestInit: RequestInit = this._buildRequestInit()
    if (this.debug) console.log('[fetch] >>', url)

    // response
    const response: Response = await fetch(url, requestInit)
    if (!response.ok) throw new Error(`Failed to fetch '${url}'`)

    // parse body
    let body: TBody
    try {
      body = (await response.json()) as TBody
    } catch (error) {
      throw new Error(`Failed to parse '${url}'`)
    }

    //
    if (this.debug) console.log('[fetch] <<', url, body)
    return body
  }

  public parseDto<TEntity extends object>(dto: Dto): TEntity[] {
    const entities: TEntity[] = parseDto(dto)
    if (this.debug) console.log('[parseDto]', dto.metadata, entities)
    return entities
  }
}
