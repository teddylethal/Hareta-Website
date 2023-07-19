import { useEffect, useState } from 'react'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import CollectionFilter from './CollectionFilter'

export default function AsideFilter() {
  return (
    <div className='m-4 rounded-sm bg-[#f6f6f6] py-2 duration-500 dark:bg-[#444444] '>
      <div className=''>
        <CollectionFilter />
      </div>
    </div>
  )
}
