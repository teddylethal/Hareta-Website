/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'
import { useState } from 'react'
import SupportNav from './SupportNav'
import ProfileNav from './ProfileNav'
import CartNav from './CartNav'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateChangeInHeight from '../AnimateChangeInHeight'

export default function Header() {
  const [openingNav, changeOpeningNav] = useState<boolean>(true)

  const toggleOpenCloseNav = () => {
    changeOpeningNav(!openingNav)
  }

  const [mobileSupportExtending, setMobileSupportExtending] = useState<boolean>(true)
  const toggleExtendingMobileSupport = () => {
    setMobileSupportExtending(!mobileSupportExtending)
  }

  return (
    <header className='fixed top-0 flex h-10 w-full items-center bg-white duration-500 dark:bg-black md:h-12 lg:h-16'>
      <div className='container invisible grid w-full grid-cols-3 items-center py-3 text-black dark:text-white sm:visible'>
        <nav className='col-span-1 flex items-center justify-start space-x-1 text-sm font-medium uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Store</div>
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Event</div>
          </Link>

          <div className='relative cursor-pointer border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <SupportNav />
          </div>
        </nav>

        <div className='col-span-1 flex grow select-none justify-center text-xs text-haretaColor md:text-sm lg:text-base'>
          <h2>Decor your life with us</h2>
        </div>

        <nav className='col-span-1 flex items-center justify-end space-x-1 text-sm uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
          {/* <Link to='/login' className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-haretaColor'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>

            <div>Login</div>
          </Link> */}

          <div className='flex px-3 hover:text-haretaColor'>
            <ProfileNav />
          </div>

          <div className='rounded-md bg-[#a27b5c] text-textVintage hover:bg-haretaColor'>
            <CartNav />
          </div>

          <div className='flex items-center justify-center px-1'>
            <ToggleTheme className='h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
          </div>
        </nav>
      </div>

      {/*//! Nav Button */}
      <div onClick={toggleOpenCloseNav} className='visible sm:invisible'>
        {openingNav && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </div>

      <AnimatePresence>
        <div className='absolute left-0 top-0 flex w-48 overflow-hidden bg-[#ddd] py-2 text-textDark dark:bg-[#333] dark:text-textLight'>
          <nav className='flex w-full flex-col items-start justify-center space-y-4 py-2 text-base font-semibold uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
            <Link to='/' className='w-full px-3'>
              <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
            </Link>

            <Link to='/' className='w-full border border-none px-3 hover:text-haretaColor dark:hover:text-haretaColor'>
              <div>Store</div>
            </Link>

            <Link to='/' className='w-full border border-none px-3 hover:text-haretaColor dark:hover:text-haretaColor'>
              <div>Event</div>
            </Link>

            <div className='mx-3 w-full border border-b-gray-500 border-t-transparent' />

            <div
              className='flex w-full flex-col items-center border border-none px-3 hover:text-haretaColor dark:hover:text-haretaColor'
              onClick={toggleExtendingMobileSupport}
            >
              <div className='flex w-full'>
                <div>Support</div>
                {mobileSupportExtending && (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
                    <path
                      fillRule='evenodd'
                      d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {!mobileSupportExtending && (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
                    <path
                      fillRule='evenodd'
                      d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
              <AnimateChangeInHeight>
                <motion.div layout>
                  {mobileSupportExtending && (
                    <motion.div
                      className='mt-2 inline-flex w-auto flex-col space-y-1 text-sm font-medium text-textDark dark:bg-[#333] dark:text-textLight md:text-base'
                      initial={{ opacity: 0, y: '-20%' }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: '-20%', scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to='/' className='py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                        About us
                      </Link>
                      <Link to='/' className='py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                        Privacy & Terms
                      </Link>
                      <Link to='/' className='py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                        FAQ
                      </Link>
                      <Link to='/' className='py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                        Contact us
                      </Link>
                      <Link to='/' className='py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                        Order tracking
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </AnimateChangeInHeight>
            </div>
          </nav>
          <div className='p-2 hover:text-haretaColor dark:hover:text-haretaColor'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
              <path
                fillRule='evenodd'
                d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </AnimatePresence>
    </header>
  )
}
