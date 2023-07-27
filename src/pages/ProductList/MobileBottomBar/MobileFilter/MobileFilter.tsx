import React, { useContext } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import { StoreContext } from 'src/contexts/store.context'

export default function MobileBottomBar() {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const { category, setCategory, collection, setCollection, type, setType, sorting } = useContext(StoreContext)

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
      <button onClick={open} className='relative flex items-end text-vintageColor dark:text-haretaColor'>
        Filter
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute bottom-0 right-0 z-10 self-center rounded-b-sm py-2 shadow-sm'
            initial={{ opacity: 0, x: '20%' }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, x: '20%' }}
            transition={{ duration: 0.3 }}
            ref={ref}
          >
            <ul className='w-32'>
              <li>
                <button
                  onClick={handleChange}
                  className={classNames(
                    'flex w-full justify-start px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
                    sorting === 'Newest' ? 'text-haretaColor' : ''
                  )}
                >
                  Newest
                </button>
              </li>
              <li>
                <button
                  className={classNames(
                    'flex w-full justify-start px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
                    sorting === 'Oldest' ? 'text-haretaColor' : ''
                  )}
                  onClick={handleChange}
                >
                  Oldest
                </button>
              </li>
              <li>
                <button
                  className={classNames(
                    'flex w-full justify-start px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
                    sorting === 'Top seller' ? 'text-haretaColor' : ''
                  )}
                  onClick={handleChange}
                >
                  Top seller
                </button>
              </li>
              <li>
                <button
                  className={classNames(
                    'flex w-full justify-start px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
                    sorting === 'Signature' ? 'text-haretaColor' : ''
                  )}
                  onClick={handleChange}
                >
                  Signature
                </button>
              </li>
              <li>
                <button
                  className={classNames(
                    'flex w-full justify-start px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
                    sorting === 'Favourite' ? 'text-haretaColor' : ''
                  )}
                  onClick={handleChange}
                >
                  Favourite
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
