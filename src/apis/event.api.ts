import { EventDetail, EventList, EventListConfig } from 'src/types/event.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/event'
const eventItemUrl = '/event-item'

interface CreateEventForm {
  overall_content: string
  detail_content: string
  date_start: number
  date_end: number
  discount: number
  avatar: string
}

interface UpdateEventForm {
  id: string
  title?: string
  content?: string
  avatar?: string
}

const eventApi = {
  getEventList(params: EventListConfig) {
    return http.get<EventList>(`${URL}/`, { params })
  },
  getEventDetail(eventId: string) {
    return http.get<SuccessRespone<EventDetail>>(`${URL}/${eventId}`)
  },
  createEvent(body: CreateEventForm) {
    return http.post<SuccessRespone<string>>(`${URL}/`, body)
  },
  updateEvent(body: UpdateEventForm) {
    return http.put<SuccessRespone<string>>(`${URL}/`, body)
  },
  deleteEvent(body: { id: string }) {
    return http.delete<SuccessRespone<string>>(`${URL}/`, { data: body })
  }
}

export default eventApi
