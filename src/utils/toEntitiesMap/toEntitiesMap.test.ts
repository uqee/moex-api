import { assert } from 'chai'

import { EnginesMap, EntitiesDto } from '../../entities'
import { toEntitiesMap } from './toEntitiesMap'

describe('toEntitiesMap', () => {
  const entitiesDto: EntitiesDto = {
    columns: ['id', 'name', 'title'],
    data: [
      [1, 'stock', 'Фондовый рынок и рынок депозитов'],
      [2, 'state', 'Рынок ГЦБ (размещение)'],
      [3, 'currency', 'Валютный рынок'],
      [4, 'futures', 'Срочный рынок'],
      [5, 'commodity', 'Товарный рынок'],
      [6, 'interventions', 'Товарные интервенции'],
      [7, 'offboard', 'ОТС-система'],
      [9, 'agro', 'Агро'],
    ],
  }

  test('works', () => {
    const enginesMap: EnginesMap = toEntitiesMap<EnginesMap>(entitiesDto)
    assert.deepEqual(Array.from(enginesMap.keys()), [1, 2, 3, 4, 5, 6, 7, 9])
    assert.deepEqual(Array.from(enginesMap.values()), [
      { id: 1, name: 'stock', title: 'Фондовый рынок и рынок депозитов' },
      { id: 2, name: 'state', title: 'Рынок ГЦБ (размещение)' },
      { id: 3, name: 'currency', title: 'Валютный рынок' },
      { id: 4, name: 'futures', title: 'Срочный рынок' },
      { id: 5, name: 'commodity', title: 'Товарный рынок' },
      { id: 6, name: 'interventions', title: 'Товарные интервенции' },
      { id: 7, name: 'offboard', title: 'ОТС-система' },
      { id: 9, name: 'agro', title: 'Агро' },
    ])
  })

  test('throws', () => {
    assert.throws(() =>
      toEntitiesMap<EnginesMap>({
        ...entitiesDto,
        columns: ['id1', 'name', 'title'],
      }),
    )
  })
})
