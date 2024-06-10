import { useTranslation } from 'react-i18next'
import LoadingSection from 'src/components/LoadingSection'
import PathBar from 'src/components/PathBar'
import mainPath from 'src/constants/path'
import { eventQuery } from 'src/hooks/queries/useEventQuery'
import EventCard from './components/EventCard'

export default function EventPage() {
  //! Multi languages
  const { t } = useTranslation('event')

  //! Get event list
  const eventListConfig = {}
  const { data: eventsData } = eventQuery.useEventList(eventListConfig)
  const eventList = eventsData?.data.data || []

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg tablet:py-3 desktopLarge:py-4'>
      <div className='container space-y-6'>
        <PathBar pathList={[{ pathName: t('path.event'), url: mainPath.events }]} />

        <p className='text-center text-lg font-bold uppercase leading-10 tracking-wide text-haretaColor tablet:text-2xl desktop:text-4xl'>
          {t('event page.Ongoing events')}
        </p>

        {!eventsData && <LoadingSection />}

        {eventsData && (
          <div className='space-y-6'>
            {eventList.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
