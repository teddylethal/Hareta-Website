import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from 'src/App'
import { StoreContext } from 'src/contexts/store.context'
import useClickOutside from 'src/hooks/useClickOutside'

export default function MobileSorter() {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const { sorting, setSorting } = useContext(StoreContext)

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  const handleChange = (event: any) => {
    // console.log(event)
    event.preventDefault()
    setSorting(event.target.innerText)
    close()
  }

  return (
    <div className=''>
      <button onClick={open} className='relative flex w-20 items-end text-vintageColor dark:text-haretaColor'>
        {sorting}
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute bottom-0 left-0 z-10 self-center rounded-b-sm py-2 shadow-sm'
            initial={{ opacity: 0, y: '20%' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, y: '20%' }}
            transition={{ duration: 0.3 }}
            ref={ref}
          >
            <ul className='w-32 text-lg'>
              <li>
                <button
                  onClick={handleChange}
                  className={classNames(
                    'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
                    sorting === 'Newest' ? 'text-haretaColor' : ''
                  )}
                >
                  Newest
                </button>
              </li>
              <li>
                <button
                  className={classNames(
                    'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
                    'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
                    'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
                    'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
