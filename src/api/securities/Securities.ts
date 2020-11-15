import { Base, Dto, Entity } from '../base'
import { Security } from './types'

export class Securities {
  private static withPathPrefix(partialPath: string): string {
    return `${Securities.pathPrefix}${partialPath}`
  }

  private static readonly pathPrefix: string = '/securities'
  public constructor(private base: Base) {}

  public async index(): Promise<Security[]> {
    const body = await this.base.fetch<{ securities: Dto }>(
      Securities.withPathPrefix(''),
    )
    const securities: Security[] = this.base.getEntitiesArray(body.securities)
    return securities
  }

  public async security(): Promise<{
    boards: Entity[]
    description: Entity[]
  }> {
    const body: {
      boards: Dto
      description: Dto
    } = await this.base.fetch(Securities.withPathPrefix('/IMOEX'))
    const boards: Entity[] = this.base.getEntitiesArray(body.boards)
    const description: Entity[] = this.base.getEntitiesArray(body.description)
    return {
      boards,
      description,
    }
  }
}
