import 'react-slideshow-image/dist/styles.css'
import HomeEventSlide from '../../components/HomeEventSlide'
import CustomSlideShow from 'src/components/CustomSlideShow'
import { EventListConfig } from 'src/types/event.type'
import { useQuery } from '@tanstack/react-query'
import useEventListQueryConfig from 'src/hooks/useEventListQueryConfig'
import eventApi from 'src/apis/event.api'
import { Fragment } from 'react'
import LoadingSection from 'src/components/LoadingSection'

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 464,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 0,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]

export default function HomeEventSlideShow() {
  //! Get events
  const eventListQueryConfig = useEventListQueryConfig()
  const { data: eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: () => eventApi.getEventList(eventListQueryConfig as EventListConfig)
  })

  if (eventsData?.data.data.length == 0) return
  return (
    <Fragment>
      {!eventsData && <LoadingSection className='flex h-[50vh] items-center justify-center desktop:h-[75vh]' />}
      {eventsData && (
        <CustomSlideShow responsive={responsiveSettings} duration={5000}>
          {eventsData.data.data.map((event) => (
            <div key={event.id} className='h-[50vh] desktop:h-[75vh]'>
              <HomeEventSlide event={event} />
            </div>
          ))}
        </CustomSlideShow>
      )}
      <div className='flex w-full items-center justify-center'>
        <div className='w-full border-t border-black/80 dark:border-white/80 tablet:w-8/12 desktop:w-1/2' />
      </div>
    </Fragment>
  )
}
