export const isArray = <TElement>(
  arrayOrUnknown: TElement[] | unknown,
): arrayOrUnknown is TElement[] => {
  return Array.isArray(arrayOrUnknown)
}
