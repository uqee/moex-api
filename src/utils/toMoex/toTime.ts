export const toMoexTime = (date?: Date): string | undefined => {
  return date?.toISOString().substr(11, 8)
}
