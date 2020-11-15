import { Env, Logger, manualDiContainer } from '../services'
import { Base, BaseOptions } from './Base'
import { EnginesApi } from './EnginesApi'
import { SecuritiesApi } from './SecuritiesApi'

export class Moex {
  public readonly engines: EnginesApi
  public readonly securities: SecuritiesApi

  public constructor(
    partialBaseOptions: Partial<BaseOptions> = {},
    env: Env = manualDiContainer.env,
    logger: Logger = manualDiContainer.logger,
  ) {
    const base = new Base(partialBaseOptions, env, logger)

    this.engines = new EnginesApi(base)
    this.securities = new SecuritiesApi(base)
  }
}
