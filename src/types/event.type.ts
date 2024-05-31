import { JSONModel, PagingType } from './utils.type'

export interface EventSimple extends JSONModel {
  overall_content: string
  discount: number
  avatar: string
}

export interface EventList {
  data: EventSimple[]
  paging: PagingType
}

export interface EventListConfig {
  overall_content?: string
  detail_content?: string
  date_start?: number
  date_end?: number
  page?: number | string
  limit?: number | string
}

export interface EventDetail extends JSONModel {
  overall_content: string
  detail_content: string
  date_start: number
  date_end: number
  discount: number
  avatar: string
}
