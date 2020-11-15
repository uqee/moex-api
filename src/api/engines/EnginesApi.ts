import { EntitiesApi, EntitiesDto } from '../entities'
import { Engines } from './Engines'

export class EnginesApi {
  private static getPath(partialPath: string): string {
    return `${EnginesApi.pathPrefix}${partialPath}`
  }

  private static readonly pathPrefix: string = '/engines'
  public constructor(private entitiesApi: EntitiesApi) {}

  public async index(): Promise<Engines> {
    return this.entitiesApi.fetchEntities({
      path: EnginesApi.getPath(''),
      getEntitiesDto: (body: { engines: EntitiesDto }) => body.engines,
    })
  }
}
