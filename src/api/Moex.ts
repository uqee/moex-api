/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Env, manualDiContainer } from '../services'
import { Dto } from '../types'
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

  public async getEngines() {
    const body: {
      engines: Dto //
    } = await this.base.fetch('/engines')

    const engines: {
      id: number
      name: string
      title: string
    }[] = this.base.parseDto(body.engines)

    return engines
  }

  // securities

  public async getSecurities() {
    const body: {
      securities: Dto //
    } = await this.base.fetch('/securities')

    const securities: {
      emitent_id: number
      emitent_inn: string
      emitent_okpo: string
      emitent_title: string
      gosreg: string
      group: string
      id: number
      is_traded: number
      isin: string
      marketprice_boardid: string
      name: string
      primary_boardid: string
      regnumber: string
      secid: string
      shortname: string
      type: string
    }[] = this.base.parseDto(body.securities)

    return securities
  }

  public async getSecuritiesSecurity({ security }: { security: string }) {
    const body: {
      boards: Dto
      description: Dto
    } = await this.base.fetch(`/securities/${security}`)

    const boards: {
      board_group_id: number
      boardid: string
      currencyid: string
      decimals: number
      engine: string
      engine_id: number
      history_from: Date
      history_till: Date
      is_primary: number
      is_traded: number
      listed_from: Date
      listed_till: Date
      market: string
      market_id: number
      secid: string
      title: string
    }[] = this.base.parseDto(body.boards)

    const description: {
      is_hidden: number
      name: string
      precision: number
      sort_order: number
      title: string
      type: string
      value: string
    }[] = this.base.parseDto(body.description)

    return {
      boards,
      description,
    }
  }
}
