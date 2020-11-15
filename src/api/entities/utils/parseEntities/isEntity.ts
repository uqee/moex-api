import { Entity } from '../../Entity'

export const isEntity = (
  partialEntity: Partial<Entity>,
): partialEntity is Entity => {
  if (!partialEntity.id) {
    throw new Error(
      `Invalid entity without 'id': ${JSON.stringify(partialEntity)}`,
    )
  }
  return true
}
