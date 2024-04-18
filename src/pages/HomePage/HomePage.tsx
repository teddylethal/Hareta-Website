import { useEffect } from 'react'
import HomeEventSlideShow from './children/HomeEventSlideShow'
import HomeNewProductSlideShow from './children/HomeNewProductSlideShow'
import HomeTopSellerSlideShow from './children/HomeTopSellerSlideShow'
import HomeFavouriteList from './children/HomeFavouriteList'

export default function HomePage() {
  //! CHANGE TITLE
  useEffect(() => {
    document.title = 'Hareta Workshop'
  })

  return (
    <div className='duration-200 '>
      <div className='py-4'>
        <HomeEventSlideShow />
      </div>

      {/* <div className='container py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <HomeNewProductSlideShow />
      </div>

      <div className='bg-lightColor700 py-4 dark:bg-darkColor700 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <HomeTopSellerSlideShow />
      </div>

      <div className='container py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
        <HomeFavouriteList />
      </div> */}
    </div>
  )
}
