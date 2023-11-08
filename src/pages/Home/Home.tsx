import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import TopSellerCarousel from './components/TopSellerCarousel'
import { Fragment, useEffect, useState } from 'react'
import MostFavouriteList from './components/MostFavouriteList/FavouriteItem'
import { FloatingOverlay } from '@floating-ui/react'
import { motion } from 'framer-motion'
import { ColorRing } from 'react-loader-spinner'
import { useViewport } from 'src/hooks/useViewport'

export default function Home() {
  const viewport = useViewport()
  const height = viewport.height
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)

  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'Hareta Workshop'
  })

  return (
    <Fragment>
      {pageIsLoading && (
        <div className='h-max' style={{ height: height }}>
          <FloatingOverlay lockScroll>
            <Fragment>
              <motion.div
                className='fixed inset-0 z-10 bg-black'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.9
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className='fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-sm'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ColorRing
                  visible={true}
                  height='80'
                  width='80'
                  ariaLabel='blocks-loading'
                  wrapperStyle={{}}
                  wrapperClass='blocks-wrapper'
                  colors={['#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00']}
                />
              </motion.div>
            </Fragment>
          </FloatingOverlay>
        </div>
      )}
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
