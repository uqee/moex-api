import { EnginesMap, EntitiesDto } from '../entities'
import { Base } from './Base'

export class EnginesApi {
  public constructor(private base: Base) {}

  public async fetchEnginesMap(): Promise<EnginesMap> {
    return this.base.issFetchEntities(
      '/engines',
      (body: { engines: EntitiesDto }) => body.engines,
    )
  }
}
