/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import ToggleTheme from 'src/components/ToggleTheme'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function MobileUser({ className }: Props) {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)

  return (
    <div>
      <span onClick={() => setVisible(true)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className={classNames(
            className,
            'h-6 w-6 duration-1000 dark:fill-white sm:h-8 sm:w-8 ',
            visible ? 'fill-transparent' : 'fill-dark'
          )}
        >
          <path
            fillRule='evenodd'
            d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
            clipRule='evenodd'
          />
        </svg>
      </span>

      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute right-0 top-0 flex w-40 flex-col rounded-l-sm shadow-md sm:w-64'
            initial={{ opacity: 0, x: '50%' }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, x: '50%' }}
            transition={{ duration: 0.3 }}
            ref={ref}
          >
            <span className='flex h-10 items-center pl-3 sm:h-12'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 fill-black dark:fill-white sm:h-8 sm:w-8'
                onClick={() => setVisible(false)}
              >
                <path
                  fillRule='evenodd'
                  d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <div className='flex flex-col px-3 py-2 text-sm sm:text-base'>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                My Account
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                My Profile
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                Inventory
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                Favourite List
              </Link>

              <div className='my-1 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                Log out
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
