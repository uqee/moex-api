export const isString = <TString extends string>(
  stringOrUnknown: TString | unknown,
): stringOrUnknown is TString => {
  return typeof stringOrUnknown === 'string'
}
