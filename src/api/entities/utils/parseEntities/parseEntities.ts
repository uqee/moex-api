import { Entities } from '../../Entities'
import { EntitiesDto } from '../../EntitiesDto'
import { Entity } from '../../Entity'
import { isEntity } from './isEntity'

export const parseEntities = <TEntities extends Entities>(
  entitiesDto: EntitiesDto,
): TEntities => {
  const { columns, data } = entitiesDto
  const entities: TEntities = new Map<unknown, unknown>() as TEntities

  for (const datum of data) {
    const entity: Partial<Entity> = {}
    for (let i = 0; i < columns.length; i++) {
      const key: string = columns[i]
      const value: unknown = datum[i]
      entity[key] = value
    }

    if (isEntity(entity)) {
      entities.set(entity.id, entity)
    }
  }

  return entities
}
