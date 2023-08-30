// import { AnimatePresence, motion } from 'framer-motion'
// import { Fragment, useEffect, useState } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
// import { useScrollDirection } from 'src/hooks/useScrollDirection'

// import Headroom from 'react-headroom'
interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  // const scrollDirection = useScrollDirection()
  // console.log(scrollDirection, 123)

  return (
    <div className='relative bg-white dark:bg-black'>
      {/* <div className='absolute h-full w-full'> */}
      {/* <Headroom> */}
      <Header />
      {/* </Headroom> */}
      {/* </div> */}
      {/* {children} */}
      <div className='pt-10 md:pt-12 lg:pt-16'>{children}</div>
      <Footer />
    </div>
  )
}
