/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { MenuContext } from '../../Header'

export default function SidebarNav() {
  const [extendingSupport, setExtendingSupport] = useState<boolean>(false)
  const toggleExtendingMobileSupport = () => {
    setExtendingSupport(!extendingSupport)
  }

  const { openingMenu, setOpeningMenu } = useContext(MenuContext)
  const toggleMenuOpening = () => {
    setExtendingSupport(false)
    setOpeningMenu(!openingMenu)
  }

  return (
    <motion.div
      className='absolute left-0 top-0 flex w-52 overflow-hidden rounded-r-sm bg-[#ddd] py-2 text-textDark shadow-md dark:bg-[#333] dark:text-textLight sm:w-60'
      initial={{ opacity: 0, x: '-20%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-20%' }}
      transition={{ duration: 0.2 }}
    >
      <nav className='flex w-full flex-col items-start justify-center space-y-4 py-2 text-sm font-semibold uppercase sm:text-base'>
        <Link to='/' className='w-full px-3'>
          <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
        </Link>

        <Link to='/' className='w-full px-3 hover:text-haretaColor dark:hover:text-haretaColor'>
          <div>Store</div>
        </Link>

        <Link to='/' className='w-full px-3 hover:text-haretaColor dark:hover:text-haretaColor'>
          <div>Event</div>
        </Link>

        <div className='mx-3 w-full border border-x-0 border-b-gray-500 border-t-transparent' />

        <div
          className='flex w-full flex-col items-center px-3 hover:text-haretaColor dark:hover:text-haretaColor'
          onClick={toggleExtendingMobileSupport}
        >
          <div className='flex w-full items-center'>
            <div>Support</div>
            {extendingSupport && (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
                <path
                  fillRule='evenodd'
                  d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
                  clipRule='evenodd'
                />
              </svg>
            )}
            {!extendingSupport && (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
          <AnimateChangeInHeight className='w-full'>
            {extendingSupport && (
              <motion.div
                className='mx-0 mt-2 flex w-full flex-col space-y-1 text-sm font-medium text-textDark dark:bg-[#333] dark:text-textLight sm:text-base'
                initial={{ opacity: 1, y: '-20%' }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 1, y: '-20%', scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link to='/' className='py-2 pl-1 hover:text-haretaColor dark:hover:text-haretaColor sm:pl-2'>
                  About us
                </Link>
                <Link to='/' className='py-2 pl-1 hover:text-haretaColor dark:hover:text-haretaColor sm:pl-2'>
                  Privacy & Terms
                </Link>
                <Link to='/' className='py-2 pl-1 hover:text-haretaColor dark:hover:text-haretaColor sm:pl-2'>
                  FAQ
                </Link>
                <Link to='/' className='py-2 pl-1 hover:text-haretaColor dark:hover:text-haretaColor sm:pl-2'>
                  Contact us
                </Link>
                <Link to='/' className='py-2 pl-1 hover:text-haretaColor dark:hover:text-haretaColor sm:pl-2'>
                  Order tracking
                </Link>
              </motion.div>
            )}
          </AnimateChangeInHeight>
        </div>
      </nav>
      <div className='p-2 hover:text-haretaColor dark:hover:text-haretaColor' onClick={toggleMenuOpening}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
          <path
            fillRule='evenodd'
            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </motion.div>
  )
}
