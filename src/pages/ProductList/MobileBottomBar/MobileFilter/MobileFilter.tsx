import React, { useContext } from 'react'
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

export default function MobileBottomBar() {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  // const { category, setCategory, collection, setCollection, type, setType, sorting } = useContext(StoreContext)

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  const handleChange = (event: any) => {
    // console.log(event)
    event.preventDefault()
    close()
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
        {visible && (
          <motion.div
            className='absolute bottom-0 right-0 z-10 flex h-96 w-44 flex-col self-center rounded-b-sm py-2 shadow-sm sm:w-80'
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
            <CategoryFilter />
            <CollectionFilter />
            <TypeFilter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
