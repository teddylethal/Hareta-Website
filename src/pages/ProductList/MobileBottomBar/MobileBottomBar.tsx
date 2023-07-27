import React from 'react'
import MobileSorter from './MobileSorter'
import MobileFilter from './MobileFilter'

export default function MobileBottomBar() {
  return (
    <div className='fixed bottom-10 z-10 flex h-10 w-full items-center justify-between bg-white px-2 duration-500 dark:bg-black sm:h-12'>
      <MobileSorter />
      <button className='text-textDark hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor'>
        Favourite list
      </button>
      <MobileFilter />
    </div>
  )
}
