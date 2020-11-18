import { assert } from 'chai'

import { Moex } from './index'

describe('', () => {
  const moex: Moex = new Moex()

  test('', async () => {
    const engines = await moex.getEngines()
    assert.equal(engines.length, 8)
  })
})
