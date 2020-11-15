import { Nominal } from '../../../utils'
import { Entity } from '../../base'

// metadata {
//   emitent_id: { type: 'int32' },
//   emitent_inn: { type: 'string', bytes: 30, max_size: 0 },
//   emitent_okpo: { type: 'string', bytes: 24, max_size: 0 },
//   emitent_title: { type: 'string', bytes: 765, max_size: 0 },
//   gosreg: { type: 'string', bytes: 189, max_size: 0 },
//   group: { type: 'string', bytes: 93, max_size: 0 },
//   id: { type: 'int32' },
//   is_traded: { type: 'int32' },
//   isin: { type: 'string', bytes: 765, max_size: 0 },
//   marketprice_boardid: { type: 'string', bytes: 12, max_size: 0 },
//   name: { type: 'string', bytes: 765, max_size: 0 },
//   primary_boardid: { type: 'string', bytes: 12, max_size: 0 },
//   regnumber: { type: 'string', bytes: 189, max_size: 0 },
//   secid: { type: 'string', bytes: 36, max_size: 0 },
//   shortname: { type: 'string', bytes: 189, max_size: 0 },
//   type: { type: 'string', bytes: 93, max_size: 0 }
// }

export interface Security extends Entity {
  emitent_id: number
  emitent_inn: string
  emitent_okpo: string
  emitent_title: string
  gosreg: string
  group: string
  id: Nominal<'SecurityId', number>
  is_traded: number
  isin: string
  marketprice_boardid: string
  name: string
  primary_boardid: string
  regnumber: string
  secid: string
  shortname: string
  type: string
}
