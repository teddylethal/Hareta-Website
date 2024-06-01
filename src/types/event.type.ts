import { JSONModel, PagingType } from './utils.type'

export interface EventType extends JSONModel {
  overall_content: string
  detail_content: string
  date_start: string
  date_end: string
  discount: number
  avatar: string
}
export interface EventList {
  data: EventType[]
  paging: PagingType
}

export interface EventListConfig {
  page?: number | string
  limit?: number | string
}
