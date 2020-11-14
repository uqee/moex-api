export const isFunction = <TFunction extends Function>(
  functionOrUnknown: TFunction | unknown,
): functionOrUnknown is TFunction => {
  return typeof functionOrUnknown === 'function'
}
