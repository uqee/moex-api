export const isInteger = <TInteger extends number>(
  integerOrUnknown: TInteger | unknown,
): integerOrUnknown is TInteger => {
  return Number.isInteger(integerOrUnknown as number)
}
