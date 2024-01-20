import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import TopSellerCarousel from './components/TopSellerCarousel'
import { Fragment, useEffect, useState } from 'react'
import MostFavouriteList from './components/MostFavouriteList/MostFavouriteList'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'

export default function Home() {
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)

  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'Hareta Workshop'
  })

  return (
    <Fragment>
      {pageIsLoading && <LoadingWithEmptyContent />}
      <div className='bg-lightBg text-textDark duration-300 dark:bg-darkBg dark:text-textLight'>
        <EventCarousel />
        <div className='py-4 md:py-6 lg:py-8 xl:py-10'>
          <NewReleaseCarousel setPageIsLoading={setPageIsLoading} />
        </div>
        <div className='bg-lightWhite700 py-4 dark:bg-darkGray700 md:py-6 lg:py-8 xl:py-10'>
          <TopSellerCarousel setPageIsLoading={setPageIsLoading} />
        </div>
        <div className='py-4 md:py-6 lg:py-8 xl:py-10'>
          <MostFavouriteList setPageIsLoading={setPageIsLoading} />
        </div>
      </div>
    </Fragment>
  )
}
