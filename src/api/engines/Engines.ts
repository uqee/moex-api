import { Base, Dto } from '../base'
import { Engine } from './types'

export class Engines {
  private static withPathPrefix(partialPath: string): string {
    return `${Engines.pathPrefix}${partialPath}`
  }

  private static readonly pathPrefix: string = '/engines'
  public constructor(private base: Base) {}

  public async index(): Promise<Engine[]> {
    const body = await this.base.fetch<{ engines: Dto }>(
      Engines.withPathPrefix(''),
    )
    const engines: Engine[] = this.base.getEntitiesArray(body.engines)
    return engines
  }
}
