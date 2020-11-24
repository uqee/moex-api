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

  public async getEnginesEngine(
    params: LanguageSearchParams & {
      engine: string
    },
  ) {
    const {
      engine,
      ...searchParams //
    } = params

    const body: {
      dailytable: Dto
      engine: Dto
      timetable: Dto
    } = await this.base.fetch(`/engines/${engine}`, searchParams)

    const dailytable: {
      date: MoexDate
      is_work_day: MoexInt32
      start_time: MoexTime
      stop_time: MoexTime
    }[] = this.base.parseDto(body.dailytable)

    const engine_: {
      NAME: MoexString
      short_title: MoexString
      title: MoexString
    }[] = this.base.parseDto(body.engine)

    const timetable: {
      is_work_day: MoexInt32
      start_time: MoexTime
      stop_time: MoexTime
      week_day: MoexInt32
    }[] = this.base.parseDto(body.timetable)

    return {
      dailytable,
      engine: engine_,
      timetable,
    }
  }

  public async getEnginesEngineMarkets(
    params: LanguageSearchParams & {
      engine: string
    },
  ) {
    const {
      engine,
      ...searchParams //
    } = params

    const body: {
      markets: Dto
    } = await this.base.fetch(`/engines/${engine}/markets`, searchParams)

    const markets: {
      NAME: MoexString
      id: MoexInt32
      title: MoexString
    }[] = this.base.parseDto(body.markets)

    return {
      markets,
    }
  }

  public async getEnginesEngineMarketsMarket(
    params: LanguageSearchParams & {
      engine: string
      market: string
    },
  ) {
    const {
      engine,
      market,
      ...searchParams //
    } = params

    const body: {
      boardgroups: Dto
      boards: Dto
      history: Dto
      history_yields: Dto
      marketdata: Dto
      marketdata_yields: Dto
      orderbook: Dto
      securities: Dto
      trades: Dto
      trades_hist: Dto
      trades_yields: Dto
    } = await this.base.fetch(
      `/engines/${engine}/markets/${market}`,
      searchParams,
    )

    const boardgroups: {
      id: MoexInt32
      is_default: MoexInt32
      is_traded: MoexInt32
      slug: MoexString
      title: MoexString
    }[] = this.base.parseDto(body.boardgroups)

    const boards: {
      board_group_id: MoexInt32
      boardid: MoexString
      id: MoexInt32
      is_traded: MoexInt32
      title: MoexString
    }[] = this.base.parseDto(body.boards)

    const history: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.history)

    const history_yields: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.history_yields)

    const marketdata: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.marketdata)

    const marketdata_yields: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.marketdata_yields)

    const orderbook: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt64
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.orderbook)

    const securities: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.securities)

    const trades: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.trades)

    const trades_hist: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.trades_hist)

    const trades_yields: {
      has_percent: MoexInt32
      id: MoexInt32
      is_hidden: MoexInt32
      is_linked: MoexInt32
      is_ordered: MoexInt32
      is_signed: MoexInt32
      is_system: MoexInt32
      name: MoexString
      precision: MoexInt32
      short_title: MoexString
      title: MoexString
      trend_by: MoexInt32
      type: MoexString
    }[] = this.base.parseDto(body.trades_yields)

    return {
      boardgroups,
      boards,
      history,
      history_yields,
      marketdata,
      marketdata_yields,
      orderbook,
      securities,
      trades,
      trades_hist,
      trades_yields,
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
