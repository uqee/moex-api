export const isNumber = (
  numberOrUnknown: number | unknown,
): numberOrUnknown is number => {
  return (
    typeof numberOrUnknown === 'number' &&
    !Number.isNaN(numberOrUnknown) &&
    numberOrUnknown !== Infinity &&
    numberOrUnknown !== -Infinity
  )
}
