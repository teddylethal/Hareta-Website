import { useContext, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import ToggleTheme from 'src/components/ToggleTheme'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'

interface Props {
  className?: string
}

export default function MobileNav({ className }: Props) {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const [extendingSupport, setExtendingSupport] = useState<boolean>(false)
  const toggleExtendingMobileSupport = () => {
    setExtendingSupport(!extendingSupport)
  }

  const openMenu = () => {
    setVisible(true)
    setExtendingSupport(false)
  }
  const closeMenu = () => {
    setVisible(false)
    setExtendingSupport(false)
  }

  return (
    <div className={className}>
      <button onClick={openMenu} type='button'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-8 w-8 fill-black dark:fill-white'
        >
          <path
            fillRule='evenodd'
            d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute left-0 top-0 z-10 flex w-52 overflow-hidden rounded-r-sm py-2 shadow-md sm:w-64'
            initial={{ opacity: 0, x: '-20%' }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, x: '-20%' }}
            transition={{ duration: 0.3 }}
            ref={ref}
          >
            <div className='flex w-full flex-col items-start justify-center px-3 text-sm font-medium uppercase sm:text-base'>
              <Link to='/' className='w-full py-2 '>
                <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
              </Link>

              <Link to='/' className='w-full py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                <div>Store</div>
              </Link>

              <Link to='/' className='w-full py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                <div>Event</div>
              </Link>

              <div className='my-2 w-full border border-x-0 border-b-gray-500 border-t-transparent' />

              <div className='flex w-full flex-col items-center py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
                <button className='flex w-full items-center uppercase' onClick={toggleExtendingMobileSupport}>
                  <span>Support</span>
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
                </button>
                <AnimateChangeInHeight className='w-full'>
                  {visible && extendingSupport && (
                    <motion.div
                      className='mx-0 mt-2 flex w-full flex-col space-y-1 text-sm font-medium text-textDark dark:bg-[#333] dark:text-textLight sm:text-base'
                      initial={{ opacity: 0, y: '-20%' }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
                        color: theme === 'dark' ? '#eeeeee' : '#222222'
                      }}
                      exit={{ opacity: 0, y: '-20%' }}
                      transition={{ duration: 0.3 }}
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
            </div>
            <div className='absolute right-0 flex h-10 space-x-2 p-2'>
              <ToggleTheme className='h-6 w-6 duration-300' />
              <button onClick={closeMenu}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                  <path
                    fillRule='evenodd'
                    d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
