import { EntitiesDto, EntitiesMap, Entity } from '../../entities'

const isEntity = (partialEntity: Partial<Entity>): partialEntity is Entity => {
  if (!partialEntity.id) {
    throw new Error(
      `Invalid entity without 'id': ${JSON.stringify(partialEntity)}`,
    )
  }
  return true
}

export const toEntitiesMap = <TEntitiesMap extends EntitiesMap>(
  entitiesDto: EntitiesDto,
): TEntitiesMap => {
  const { columns, data } = entitiesDto
  const entitiesMap: TEntitiesMap = new Map<unknown, unknown>() as TEntitiesMap

  for (const datum of data) {
    const entity: Partial<Entity> = {}
    for (let i = 0; i < columns.length; i++) {
      const key: string = columns[i]
      const value: unknown = datum[i]
      entity[key] = value
    }

    if (isEntity(entity)) {
      entitiesMap.set(entity.id, entity)
    }
  }

  return entitiesMap
}
