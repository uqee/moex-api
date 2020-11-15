import { Env, Logger, manualDiContainer } from '../services'
import { EnginesApi } from './engines'
import { EntitiesApi, EntitiesApiOptions } from './entities'
import { SecuritiesApi } from './securities'

export class Moex {
  public readonly engines: EnginesApi
  public readonly securities: SecuritiesApi

  public constructor(
    partialEntitiesApiOptions: Partial<EntitiesApiOptions> = {},
    env: Env = manualDiContainer.env,
    logger: Logger = manualDiContainer.logger,
  ) {
    const entitiesApi = new EntitiesApi(partialEntitiesApiOptions, env, logger)

    this.engines = new EnginesApi(entitiesApi)
    this.securities = new SecuritiesApi(entitiesApi)
  }
}
