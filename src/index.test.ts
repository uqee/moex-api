import { assert } from 'chai'

import { Moex } from './index'

describe('', () => {
  const moex: Moex = new Moex()

  test('', async () => {
    await moex.getSecuritiesSecurity({
      security: 'AFLT',
    })
    assert.equal(true, true)
  })
})
