import { Nominal } from '../../utils'
import { Entity } from '../entities'

export interface Engine extends Entity {
  id: Nominal<'EngineId', number>
  name: string
  title: string
}
