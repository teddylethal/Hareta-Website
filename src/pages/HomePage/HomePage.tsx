import { useEffect } from 'react'
import EventCarousel from '../Home/components/EventCarousel'
import NewReleaseCarousel from '../Home/components/NewReleaseCarousel'
import TopSellerCarousel from '../Home/components/TopSellerCarousel'
import MostFavouriteList from '../Home/components/MostFavouriteList/MostFavouriteList'
import HomeEventSlideShow from './children/HomeEventSlideShow'

export default function HomePage() {
  //! CHANGE TITLE
  useEffect(() => {
    document.title = 'Hareta Workshop'
  })

  return (
    <div className='duration-200 '>
      {/* <HomeEventSlideShow /> */}

      {/* <div className='container py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <NewReleaseCarousel />
      </div>
      <div className='bg-lightColor700 py-4 dark:bg-darkColor700 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <TopSellerCarousel />
      </div>
      <div className='container py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <MostFavouriteList />
      </div> */}
    </div>
  )
}
