import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import { StoreContext } from 'src/contexts/store.context'
import CategoryFilter from '../../AsideFilter/CategoryFilter'
import CollectionFilter from '../../AsideFilter/CollectionFilter'
import TypeFilter from '../../AsideFilter/TypeFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { QueryConfig } from '../../ProductList'
import PriceRange from '../../AsideFilter/PriceRange'
import { useNavigate } from 'react-router-dom'
import { setCategoryFilteringToLS, setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import path from 'src/constants/path'

interface Props {
  queryConfig: QueryConfig
}

export default function MobileBottomBar({ queryConfig }: Props) {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const { setCategory, setCollection, setType } = useContext(StoreContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const open = () => {
    setVisible(true)
    setIsOpen(true)
  }
  const close = () => {
    setVisible(false)
    setIsOpen(false)
  }

  const handleClear = () => {
    setCategory('All')
    setCollection('All')
    setType('All')
    setCategoryFilteringToLS('All')
    setCollectionFilteringToLS('All')
    setTypeFilteringToLS('All')
    close()
    navigate({
      pathname: path.home
    })
  }

  return (
    <div className=''>
      <button
        onClick={open}
        className='group relative flex items-center text-textDark hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor '
      >
        <FontAwesomeIcon
          icon={faFilter}
          className='mr-1 text-textDark group-hover:text-haretaColor dark:text-textLight dark:group-hover:text-haretaColor'
        />
        Filter
      </button>
      <AnimatePresence>
        {visible && isOpen && (
          <motion.div
            className='fixed bottom-0 right-0 z-10 flex h-full w-44 flex-col self-center rounded-b-sm px-2 py-2 shadow-sm sm:w-80'
            initial={{ opacity: 0, x: '20%' }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: theme === 'dark' ? '#444' : '#f9f9f9',
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, x: '20%' }}
            transition={{ duration: 0.3 }}
            ref={ref}
          >
            <CategoryFilter queryConfig={queryConfig} isMobile setMobileFilterOpen={setIsOpen} />
            <CollectionFilter queryConfig={queryConfig} isMobile setMobileFilterOpen={setIsOpen} />
            <TypeFilter queryConfig={queryConfig} isMobile setMobileFilterOpen={setIsOpen} />
            <PriceRange queryConfig={queryConfig} />
            <button
              onClick={handleClear}
              className='my-2 flex w-full shrink-0 items-center justify-start rounded-md bg-[#ddd] px-4 py-2 text-textDark outline outline-1 outline-transparent duration-500 hover:text-vintageColor hover:outline-vintageColor dark:bg-[#202020] dark:text-textLight dark:hover:text-haretaColor'
            >
              Clear filtering
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
