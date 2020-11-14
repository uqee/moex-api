import { EntitiesMap } from '../entities'
import { Engine } from './Engine'

export type EnginesMap = EntitiesMap & Map<Engine['id'], Engine>
