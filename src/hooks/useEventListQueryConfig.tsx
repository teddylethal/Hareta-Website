import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { EventListConfig } from 'src/types/event.type'

export type EventListQueryConfig = {
  [key in keyof EventListConfig]: string
}

export const BLOG_LIMIT = 20

export default function useEventListQueryConfig() {
  const queryParams: EventListQueryConfig = useQueryParams()
  const queryConfig: EventListQueryConfig = omitBy(
    {
      overall_content: queryParams.overall_content,
      detail_content: queryParams.detail_content,
      date_start: queryParams.date_start,
      date_end: queryParams.date_end,
      page: queryParams.page || 1,
      limit: queryParams.limit || BLOG_LIMIT
    },
    isUndefined
  )
  return queryConfig
}
