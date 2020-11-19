export const toMoexBoolean = (boolean?: boolean): string | undefined => {
  return boolean === undefined ? undefined : boolean ? '1' : '0'
}
