import { EntitiesApi, EntitiesDto } from '../entities'
import { Securities } from './Securities'

export class SecuritiesApi {
  private static getPath(partialPath: string): string {
    return `${SecuritiesApi.pathPrefix}${partialPath}`
  }

  private static readonly pathPrefix: string = '/securities'
  public constructor(private entitiesApi: EntitiesApi) {}

  public async index(): Promise<Securities> {
    return this.entitiesApi.fetchEntities({
      path: SecuritiesApi.getPath(''),
      getEntitiesDto: (body: { securities: EntitiesDto }) => body.securities,
    })
  }
}
