import { Nominal } from '../../utils'

export interface Entity extends Record<string, unknown> {
  id: Nominal<string, unknown>
}
