export const toMoexDate = (date?: Date): string | undefined => {
  return date?.toISOString().substr(0, 10)
}
