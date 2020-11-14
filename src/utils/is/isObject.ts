export const isObject = <TObject extends object>(
  objectOrUnknown: TObject | unknown,
): objectOrUnknown is TObject => {
  return objectOrUnknown != null && typeof objectOrUnknown === 'object'
}
