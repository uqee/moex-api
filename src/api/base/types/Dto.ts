export interface Dto {
  metadata: Record<string, object>
  columns: string[]
  data: unknown[][]
}
