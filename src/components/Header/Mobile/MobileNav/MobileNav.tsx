import { Fragment, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ToggleTheme from 'src/components/ToggleTheme'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import path from 'src/constants/path'
import MobileSupport from '../MobileSupport'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import MobileUser from '../MobileUser'

interface Props {
  className?: string
}

export default function MobileNav({ className }: Props) {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)

  const openMenu = () => {
    setVisible(true)
  }
  const closeMenu = () => {
    setVisible(false)
  }

  return (
    <div className={className}>
      <button
        onClick={openMenu}
        type='button'
        className='flex items-center justify-center text-textDark dark:text-textLight'
      >
        <FontAwesomeIcon icon={faBars} className='h-6 w-6' />
      </button>
      <AnimatePresence>
        {visible && (
          <Fragment>
            <motion.div
              className='fixed inset-0'
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.3
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='fixed right-0 top-0 z-10 flex h-full w-[75%] overflow-hidden rounded-l-md py-2 shadow-md'
              initial={{ opacity: 0, x: '20%' }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: theme === 'dark' ? '#202020' : '#efefef',
                color: theme === 'dark' ? '#eeeeee' : '#222222'
              }}
              exit={{ opacity: 0, x: '20%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <div className='flex w-full flex-col items-start justify-start px-3 text-sm font-medium uppercase sm:text-base'>
                <Link to={path.home} className='w-full px-2 py-2' onClick={closeMenu}>
                  <img src='/images/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
                </Link>

                <Link
                  to={path.store}
                  className='w-full px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor'
                  onClick={closeMenu}
                >
                  <div>Store</div>
                </Link>

                <Link
                  to='/'
                  className='w-full px-2 py-2 hover:text-brownColor dark:hover:text-haretaColor'
                  onClick={closeMenu}
                >
                  <div>Event</div>
                </Link>

                <div className='flex w-full flex-col items-center hover:text-haretaColor dark:hover:text-haretaColor'>
                  <MobileSupport />
                </div>

                <div className='w-full px-2'>
                  <div className='my-2 w-full border border-x-0 border-b-gray-500 border-t-transparent' />
                </div>

                <div className='w-full'>
                  <MobileUser />
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
          </Fragment>
        )}
      </AnimatePresence>
    </div>
  )
}
