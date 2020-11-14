import { EntitiesDto } from '../entities'
import { Engine } from './Engine'

export interface EnginesDto extends EntitiesDto {
  columns: ['id', 'name', 'title']
  data: [Engine['id'], Engine['name'], Engine['title']][]
}
