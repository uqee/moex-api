import { Env, Logger, manualDiContainer } from '../services'
import { Base, BaseOptions } from './base'
import { Engines } from './engines'
import { Securities } from './securities'

export class Moex {
  public readonly engines: Engines
  public readonly securities: Securities

  public constructor(
    partialBaseOptions: Partial<BaseOptions> = {},
    env: Env = manualDiContainer.env,
    logger: Logger = manualDiContainer.logger,
  ) {
    const base = new Base(partialBaseOptions, env, logger)

    this.engines = new Engines(base)
    this.securities = new Securities(base)
  }
}
