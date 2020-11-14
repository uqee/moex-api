import { assert } from 'chai'

import { isEnumValue } from './isEnumValue'

enum TestEnum {
  A = 'A',
  B = 'C',
  D = 1,
}

describe('isEnumValue', () => {
  const isTestEnumValue = isEnumValue(TestEnum)

  test('works', () => {
    assert.strictEqual(isTestEnumValue('A'), true)
    assert.strictEqual(isTestEnumValue('B'), false)
    assert.strictEqual(isTestEnumValue('D'), false)
    assert.strictEqual(isTestEnumValue('C'), true)
    assert.strictEqual(isTestEnumValue(1), true)
    assert.strictEqual(isTestEnumValue('1'), false)
    assert.strictEqual(isTestEnumValue(2), false)
  })
})
