import { foo } from 'src/index'

test('expect 1 + 2 to equal 3', () => {
  expect(foo(1 + 2)).toBe(3)
})
