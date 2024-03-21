import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import TopSellerCarousel from './components/TopSellerCarousel'
import { Fragment, useEffect, useState } from 'react'
import MostFavouriteList from './components/MostFavouriteList/MostFavouriteList'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'

export default function Home() {
  const [LoadingPage, setLoadingPage] = useState<boolean>(true)

  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'Hareta Workshop'
  })

  return (
    <Fragment>
      {LoadingPage && <LoadingWithEmptyContent />}
      <div className='bg-lightBg text-darkText duration-200 dark:bg-darkBg dark:text-lightText'>
        <EventCarousel />
        <div className='py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
          <NewReleaseCarousel setLoadingPage={setLoadingPage} />
        </div>
        <div className='bg-lightColor700 py-4 dark:bg-darkColor700 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
          <TopSellerCarousel setLoadingPage={setLoadingPage} />
        </div>
        <div className='py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
          <MostFavouriteList setLoadingPage={setLoadingPage} />
        </div>
      </div>
    </Fragment>
  )
}
