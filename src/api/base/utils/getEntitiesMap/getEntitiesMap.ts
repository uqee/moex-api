import { Entity } from '../../types'

export const getEntitiesMap = <TEntity extends Entity>(
  entitiesArray: TEntity[],
): Map<TEntity['id'], TEntity> => {
  const entitiesMap = new Map<TEntity['id'], TEntity>()

  for (let i = 0; i < entitiesArray.length; i++) {
    const entity: TEntity = entitiesArray[i]
    entitiesMap.set(entity.id, entity)
  }

  return entitiesMap
}
