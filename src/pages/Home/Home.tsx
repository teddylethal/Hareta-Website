import { useEffect } from 'react'
import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import TopSellerCarousel from './components/TopSellerCarousel'
import MostFavouriteList from './components/MostFavouriteList/MostFavouriteList'

export default function Home() {
  //! CHANGE TITLE
  useEffect(() => {
    document.title = 'Hareta Workshop'
  })

  return (
    <div className='duration-200 '>
      <EventCarousel />

      <div className='container py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <NewReleaseCarousel />
      </div>
      <div className='bg-lightColor700 py-4 dark:bg-darkColor700 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <TopSellerCarousel />
      </div>
      <div className='container py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <MostFavouriteList />
      </div>
    </div>
  )
}
