import { useQuery } from '@tanstack/react-query'
import { ceil } from 'lodash'
import React, { Fragment, useEffect } from 'react'
import eventApi from 'src/apis/event.api'
import LoadingSection from 'src/components/LoadingSection'
import UsePagination from 'src/components/UsePagination'
import useEventListQueryConfig, { EVENT_LIMIT } from 'src/hooks/useEventListQueryConfig'
import { EventListConfig } from 'src/types/event.type'
import AdminEventCard from '../../components/AdminEventCard'
import { useViewport } from 'src/hooks/useViewport'

export default function AdminEventManagement() {
  const isMobile = useViewport().width < 768

  //! Get event list
  const eventListQueryConfig = useEventListQueryConfig()
  const { data: eventsData, isFetching } = useQuery({
    queryKey: ['events', eventListQueryConfig],
    queryFn: () => eventApi.getEventList(eventListQueryConfig as EventListConfig)
  })

  return (
    <div className='space-y-4'>
      <div className='w-full'>
        {isFetching && <LoadingSection />}
        {eventsData && (
          <Fragment>
            <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
              {eventsData.data.data.map((event) => (
                <div className='col-span-1' key={event.id}>
                  <AdminEventCard event={event} />
                </div>
              ))}
            </div>
            <UsePagination
              totalPage={ceil(eventsData.data.paging.total / EVENT_LIMIT)}
              isMobile={isMobile}
              queryConfig={eventListQueryConfig}
            />
          </Fragment>
        )}
      </div>
    </div>
  )
}
