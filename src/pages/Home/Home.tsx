import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import TopSellerCarousel from './components/TopSellerCarousel'
import { Fragment, useEffect, useState } from 'react'
import MostFavouriteList from './components/MostFavouriteList/FavouriteItem'
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
      <div className='bg-lightBg duration-300 dark:bg-darkBg'>
        <EventCarousel />
        <div className='my-10 xl:my-14'>
          <NewReleaseCarousel setPageIsLoading={setPageIsLoading} />
        </div>
        <div className='my-10 xl:my-14'>
          <TopSellerCarousel setPageIsLoading={setPageIsLoading} />
        </div>
        <div className='my-10 xl:my-16'>
          <MostFavouriteList setPageIsLoading={setPageIsLoading} />
        </div>
      </div>
    </Fragment>
  )
}
