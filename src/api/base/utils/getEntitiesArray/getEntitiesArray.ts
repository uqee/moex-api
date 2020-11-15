import { Dto, Entity } from '../../types'

export const getEntitiesArray = <TEntity extends Entity>(
  dto: Dto,
): TEntity[] => {
  const { columns, data } = dto
  const entitiesArray: TEntity[] = []

  for (const datum of data) {
    const entity: TEntity = {} as TEntity
    for (let i = 0; i < columns.length; i++) {
      const key: string = columns[i]
      const value: unknown = datum[i]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      ;(entity as any)[key] = value
    }
    entitiesArray.push(entity)
  }

  return entitiesArray
}
