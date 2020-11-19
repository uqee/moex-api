import { assert } from 'chai'

import { Moex } from './index'

describe('', () => {
  const moex: Moex = new Moex()

  test('', async () => {
    await moex.getAnalyticalproductsFutoiSecuritiesSecurity({
      from: new Date('2020-11-01'),
      security: 'AFKS',
      till: new Date('2020-11-05'),
    })
    assert.equal(true, true)
  })
})
