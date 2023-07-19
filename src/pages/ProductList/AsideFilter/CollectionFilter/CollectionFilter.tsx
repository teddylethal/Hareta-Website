import { useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'

export default function CollectionFilter() {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const [isOpening, setIsopening] = useState<boolean>(false)
  const openCollectionFilter = () => {
    setVisible(true)
    setIsopening(true)
  }
  const closeCollectionFilter = () => {
    setVisible(false)
    setIsopening(false)
  }
  const toggleOpenCollectionFilter = () => {
    if ((isOpening && !visible) || (!isOpening && !visible)) openCollectionFilter()
    else closeCollectionFilter()
  }
  return (
    <div
      className='mx-2 bg-[#E8E8E8] px-2 py-2 text-textDark duration-500  dark:bg-[#363636] dark:text-textLight'
      ref={ref}
    >
      <button
        className='flex w-full flex-col items-start text-sm hover:text-haretaColor dark:hover:text-haretaColor lg:text-base'
        onClick={toggleOpenCollectionFilter}
      >
        <div className='flex items-center'>
          Collection
          {(!visible || !isOpening) && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='ml-1 h-3 w-3 lg:h-4 lg:w-4'
            >
              <path
                fillRule='evenodd'
                d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {visible && isOpening && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='ml-1 h-3 w-3 lg:h-4 lg:w-4'
            >
              <path
                fillRule='evenodd'
                d='M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        <span className='flex w-full select-none justify-start truncate rounded-sm bg-[#f6f6f6] px-2 py-1 text-base text-haretaColor dark:bg-[#444444] lg:text-lg'>
          Melee Collection
        </span>
      </button>
      <AnimateChangeInHeight>
        {visible && isOpening && (
          <motion.div
            className='max-h-40 overflow-auto px-2'
            initial={{ opacity: 0, y: '-40%' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#363636' : '#E8E8E8'
            }}
            exit={{ opacity: 0, y: '-40%' }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              <li>
                <button className='truncate py-1 hover:text-haretaColor '>Rifle Collection</button>
              </li>
              <li>
                <button className='truncate py-1 hover:text-haretaColor '>Gloves Collection</button>
              </li>
              <li>
                <button className='truncate py-1 hover:text-haretaColor '>Shotgun Collection</button>
              </li>
              <li>
                <button className='truncate py-1 hover:text-haretaColor '>Heavy Collection</button>
              </li>
              <li>
                <button className='truncate py-1 hover:text-haretaColor '>Outfit Collection</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimateChangeInHeight>
    </div>
  )
}
