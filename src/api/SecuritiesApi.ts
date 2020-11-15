import { EntitiesDto, SecuritiesMap } from '../entities'
import { Base } from './Base'

export class SecuritiesApi {
  public constructor(private base: Base) {}

  public async fetchSecuritiesMap(): Promise<SecuritiesMap> {
    return this.base.issFetchEntities(
      '/securities',
      (body: { securities: EntitiesDto }) => body.securities,
    )
  }
}
