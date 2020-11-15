export interface EntitiesDto {
  metadata: Record<string, unknown>
  columns: string[]
  data: unknown[][]
}
