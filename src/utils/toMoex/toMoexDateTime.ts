export const toMoexDateTime = (date?: Date): string | undefined => {
  return date?.toISOString().substr(0, 19).replace('T', ' ')
}
