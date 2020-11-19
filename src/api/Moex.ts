/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Env, manualDiContainer } from '../services'
import {
  Dto,
  LanguageSearchParams,
  // MoexBoolean,
  MoexDate,
  MoexDateTime,
  MoexDouble,
  MoexInt32,
  MoexInt64,
  MoexString,
  MoexTime,
  PaginationSearchParams,
} from '../types'
import {
  toMoexBoolean,
  toMoexDate,
  // toMoexDateTime,
  // toMoexTime,
} from '../utils'
import { Base, BaseOptions } from './Base'

export class Moex {
  private readonly base: Base

  public constructor(
    partialBaseOptions: Partial<BaseOptions> = {},
    env: Env = manualDiContainer.env,
  ) {
    this.base = new Base(partialBaseOptions, env)
  }

  // analyticalproducts

  public async getAnalyticalproductsFutoiSecurities(params: {}) {
    const {
      ...searchParams //
    } = params

    const body: {
      futoi: Dto
      'futoi.dates': Dto
    } = await this.base.fetch(
      '/analyticalproducts/futoi/securities',
      searchParams,
    )

    const futoi: {
      clgroup: MoexString
      pos: MoexInt64
      pos_long: MoexInt64
      pos_long_num: MoexInt64
      pos_short: MoexInt64
      pos_short_num: MoexInt64
      seqnum: MoexInt32
      sess_id: MoexInt32
      systime: MoexDateTime
      ticker: MoexString
      tradedate: MoexDate
      tradetime: MoexTime
    }[] = this.base.parseDto(body.futoi)

    const futoiDates: {
      from: MoexDate
      next: MoexDate
      prev: MoexDate
      till: MoexDate
    }[] = this.base.parseDto(body['futoi.dates'])

    return {
      futoi,
      futoiDates,
    }
  }

  public async getAnalyticalproductsFutoiSecuritiesSecurity(params: {
    from: Date
    latest?: boolean
    security: string
    till: Date
  }) {
    const {
      from,
      latest,
      security,
      till,
      ...searchParams //
    } = params

    const body: {
      futoi: Dto
      'futoi.dates': Dto
    } = await this.base.fetch(
      `/analyticalproducts/futoi/securities/${security}`,
      {
        from: toMoexDate(from),
        latest: toMoexBoolean(latest),
        till: toMoexDate(till),
        ...searchParams,
      },
    )

    const futoi: {
      clgroup: MoexString
      pos: MoexInt64
      pos_long: MoexInt64
      pos_long_num: MoexInt64
      pos_short: MoexInt64
      pos_short_num: MoexInt64
      seqnum: MoexInt32
      sess_id: MoexInt32
      systime: MoexDateTime
      ticker: MoexString
      tradedate: MoexDate
      tradetime: MoexTime
    }[] = this.base.parseDto(body.futoi)

    const futoiDates: {
      from: MoexDate
      till: MoexDate
    }[] = this.base.parseDto(body['futoi.dates'])

    return {
      futoi,
      futoiDates,
    }
  }

  public async getAnalyticalproductsNetflow2Securities(params: {
    date?: Date
  }) {
    const {
      date,
      ...searchParams //
    } = params

    const body: {
      netflow2: Dto
    } = await this.base.fetch('/analyticalproducts/netflow2/securities', {
      date: toMoexDate(date),
      ...searchParams,
    })

    const netflow2: {
      date: MoexDate
      oi: MoexInt64
      p100: MoexInt64
      p30: MoexInt64
      p70: MoexInt64
      pv100: MoexInt64
      pv30: MoexInt64
      pv70: MoexInt64
      ticker: MoexString
      vol: MoexInt64
    }[] = this.base.parseDto(body.netflow2)

    return {
      netflow2,
    }
  }

  public async getAnalyticalproductsNetflow2SecuritiesSecurity(params: {
    from?: Date
    security: string
    till?: Date
  }) {
    const {
      from,
      security,
      till,
      ...searchParams //
    } = params

    const body: {
      netflow2: Dto
    } = await this.base.fetch(
      `/analyticalproducts/netflow2/securities/${security}`,
      {
        from: toMoexDate(from),
        till: toMoexDate(till),
        ...searchParams,
      },
    )

    const netflow2: {
      date: MoexDate
      oi: MoexInt64
      p100: MoexInt64
      p30: MoexInt64
      p70: MoexInt64
      pv100: MoexInt64
      pv30: MoexInt64
      pv70: MoexInt64
      ticker: MoexString
      vol: MoexInt64
    }[] = this.base.parseDto(body.netflow2)

    return {
      netflow2,
    }
  }

  // engines

  public async getEngines(params: LanguageSearchParams) {
    const {
      ...searchParams //
    } = params

    const body: {
      engines: Dto
    } = await this.base.fetch('/engines', searchParams)

    const engines: {
      id: MoexInt32
      name: MoexString
      title: MoexString
    }[] = this.base.parseDto(body.engines)

    return {
      engines,
    }
  }

  // securities

  public async getSecurities(
    params: LanguageSearchParams &
      PaginationSearchParams & {
        engine?: string
        is_trading?: boolean
        market?: string
      },
  ) {
    const {
      is_trading,
      ...searchParams //
    } = params

    const body: {
      securities: Dto
    } = await this.base.fetch('/securities', {
      is_trading: toMoexBoolean(is_trading),
      ...searchParams,
    })

    const securities: {
      emitent_id: MoexInt32
      emitent_inn: MoexString
      emitent_okpo: MoexString
      emitent_title: MoexString
      gosreg: MoexString
      group: MoexString
      id: MoexInt32
      is_traded: MoexInt32
      isin: MoexString
      marketprice_boardid: MoexString
      name: MoexString
      primary_boardid: MoexString
      regnumber: MoexString
      secid: MoexString
      shortname: MoexString
      type: MoexString
    }[] = this.base.parseDto(body.securities)

    return {
      securities,
    }
  }

  public async getSecuritiesSecurity(params: { security: string }) {
    const {
      security,
      ...searchParams //
    } = params

    const body: {
      boards: Dto
      description: Dto
    } = await this.base.fetch(`/securities/${security}`, searchParams)

    const boards: {
      board_group_id: MoexInt32
      boardid: MoexString
      currencyid: MoexString
      decimals: MoexInt32
      engine: MoexString
      engine_id: MoexInt32
      history_from: MoexDate
      history_till: MoexDate
      is_primary: MoexInt32
      is_traded: MoexInt32
      listed_from: MoexDate
      listed_till: MoexDate
      market: MoexString
      market_id: MoexInt32
      secid: MoexString
      title: MoexString
    }[] = this.base.parseDto(body.boards)

    const description: {
      is_hidden: MoexInt64
      name: MoexString
      precision: MoexInt64
      sort_order: MoexInt64
      title: MoexString
      type: MoexString
      value: MoexString
    }[] = this.base.parseDto(body.description)

    return {
      boards,
      description,
    }
  }

  public async getSecuritiesSecurityAggregates(
    params: LanguageSearchParams & {
      date?: Date
      security: string
    },
  ) {
    const {
      date,
      security,
      ...searchParams //
    } = params

    const body: {
      aggregates: Dto
      'agregates.dates': Dto
    } = await this.base.fetch(`/securities/${security}/aggregates`, {
      date: toMoexDate(date),
      ...searchParams,
    })

    const aggregates: {
      engine: MoexString
      market_name: MoexString
      market_title: MoexString
      numtrades: MoexInt64
      secid: MoexString
      tradedate: MoexDate
      value: MoexDouble
      volume: MoexInt64
    }[] = this.base.parseDto(body.aggregates)

    const aggregatesDates: {
      from: MoexDate
      till: MoexDate
    }[] = this.base.parseDto(body['agregates.dates'])

    return {
      aggregates,
      aggregatesDates,
    }
  }

  public async getSecuritiesSecurityIndices(
    params: LanguageSearchParams & {
      only_actual?: boolean
      security: string
    },
  ) {
    const {
      only_actual,
      security,
      ...searchParams //
    } = params

    const body: {
      indices: Dto
    } = await this.base.fetch(`/securities/${security}/indices`, {
      only_actual: toMoexBoolean(only_actual),
      ...searchParams,
    })

    const indices: {
      FROM: MoexDate
      SECID: MoexString
      SHORTNAME: MoexString
      TILL: MoexDate
    }[] = this.base.parseDto(body.indices)

    return {
      indices,
    }
  }
}
