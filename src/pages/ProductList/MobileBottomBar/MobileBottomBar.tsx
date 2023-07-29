import React, { useContext } from 'react'
import MobileSorter from './MobileSorter'
import MobileFilter from './MobileFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import AsideFavouriteList from '../AsideFavouriteList'
import classNames from 'classnames'
import { StoreContext } from 'src/contexts/store.context'
import { QueryConfig } from '../ProductList'

interface Props {
  queryConfig: QueryConfig
}

export default function MobileBottomBar({ queryConfig }: Props) {
  const { isFavouriteList, setIsFavouriteList } = useContext(StoreContext)
  const handleClick = () => {
    setIsFavouriteList(!isFavouriteList)
  }
  return (
    <div className='fixed bottom-0 z-10 flex h-10 w-full items-center justify-between bg-white px-2 duration-500 dark:bg-black sm:h-12'>
      <MobileSorter />
      <div
        className={classNames(
          'm-4 rounded-lg px-2 py-2 text-sm outline-none outline duration-500 hover:outline-haretaColor sm:text-base lg:text-lg ',
          isFavouriteList ? 'bg-vintageColor' : ' bg-[#ddd]  dark:bg-[#444] '
        )}
      >
        <button
          className={classNames(
            'w-full overflow-hidden text-center  duration-500 ',
            isFavouriteList ? 'text-textVintage' : 'text-textDark dark:text-textLight'
          )}
          onClick={handleClick}
        >
          Favourite list
        </button>
      </div>
      <MobileFilter queryConfig={queryConfig} />
    </div>
  )
}
