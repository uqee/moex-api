import { Nominal } from '../../../utils'
import { Entity } from '../../base'

// metadata {
//   id: { type: 'int32' },
//   name: { type: 'string', bytes: 45, max_size: 0 },
//   title: { type: 'string', bytes: 765, max_size: 0 }
// }

export interface Engine extends Entity {
  id: Nominal<'EngineId', number>
  name: string
  title: string
}
