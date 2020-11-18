/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Env, manualDiContainer } from '../services'
import {
  _Date,
  _Double,
  _Int32,
  _Int64,
  _String,
  Dto,
  LanguageSearchParams,
  PaginationSearchParams,
} from '../types'
import { Base, BaseOptions } from './Base'

export class Moex {
  private readonly base: Base

  public constructor(
    partialBaseOptions: Partial<BaseOptions> = {},
    env: Env = manualDiContainer.env,
  ) {
    this.base = new Base(partialBaseOptions, env)
  }

  // engines

  public async getEngines(
    params?: LanguageSearchParams, //
  ) {
    const body: {
      engines: Dto //
    } = await this.base.fetch('/engines', params)

    const engines: {
      id: _Int32
      name: _String
      title: _String
    }[] = this.base.parseDto(body.engines)

    return {
      engines, //
    }
  }

  // securities

  public async getSecurities(
    params?: LanguageSearchParams &
      PaginationSearchParams & {
        engine?: string
        is_trading?: boolean
        market?: string
      },
  ) {
    const body: {
      securities: Dto //
    } = await this.base.fetch('/securities', params)

    const securities: {
      emitent_id: _Int32
      emitent_inn: _String
      emitent_okpo: _String
      emitent_title: _String
      gosreg: _String
      group: _String
      id: _Int32
      is_traded: _Int32
      isin: _String
      marketprice_boardid: _String
      name: _String
      primary_boardid: _String
      regnumber: _String
      secid: _String
      shortname: _String
      type: _String
    }[] = this.base.parseDto(body.securities)

    return {
      securities, //
    }
  }

  public async getSecuritiesSecurity(params: {
    security: string //
  }) {
    const {
      security, //
      ...searchParams
    } = params

    const body: {
      boards: Dto
      description: Dto
    } = await this.base.fetch(`/securities/${security}`, searchParams)

    const boards: {
      board_group_id: _Int32
      boardid: _String
      currencyid: _String
      decimals: _Int32
      engine: _String
      engine_id: _Int32
      history_from: _Date
      history_till: _Date
      is_primary: _Int32
      is_traded: _Int32
      listed_from: _Date
      listed_till: _Date
      market: _String
      market_id: _Int32
      secid: _String
      title: _String
    }[] = this.base.parseDto(body.boards)

    const description: {
      is_hidden: _Int64
      name: _String
      precision: _Int64
      sort_order: _Int64
      title: _String
      type: _String
      value: _String
    }[] = this.base.parseDto(body.description)

    return {
      boards,
      description,
    }
  }

  public async getSecuritiesSecurityAggregates(
    params: LanguageSearchParams & {
      date?: Date
      security: string //
    },
  ) {
    const {
      security, //
      ...searchParams
    } = params

    const body: {
      aggregates: Dto
      'agregates.dates': Dto
    } = await this.base.fetch(
      `/securities/${security}/aggregates`,
      searchParams,
    )

    const aggregates: {
      engine: _String
      market_name: _String
      market_title: _String
      numtrades: _Int64
      secid: _String
      tradedate: _Date
      value: _Double
      volume: _Int64
    }[] = this.base.parseDto(body.aggregates)

    const aggregatesDates: {
      from: _Date
      till: _Date
    }[] = this.base.parseDto(body['agregates.dates'])

    return {
      aggregates,
      aggregatesDates,
    }
  }

  public async getSecuritiesSecurityIndices(
    params: LanguageSearchParams & {
      only_actual?: boolean
      security: string //
    },
  ) {
    const {
      security, //
      ...searchParams
    } = params

    const body: {
      indices: Dto
    } = await this.base.fetch(`/securities/${security}/indices`, searchParams)

    const indices: {
      FROM: _Date
      SECID: _String
      SHORTNAME: _String
      TILL: _Date
    }[] = this.base.parseDto(body.indices)

    return {
      indices, //
    }
  }
}
