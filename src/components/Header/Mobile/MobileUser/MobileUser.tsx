import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import classNames from 'classnames'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { clearLS } from 'src/utils/auth'

interface Props {
  className?: string
}

export default function MobileUser({ className }: Props) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)

  const handleLogout = () => {
    clearLS()
    setIsAuthenticated(false)
    setVisible(false)
  }

  return (
    <div className='flex items-center'>
      {!isAuthenticated && (
        <Link to={path.login}>
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
        </Link>
      )}
      {isAuthenticated && (
        <button onClick={() => setVisible(true)} type='submit'>
          <img
            src='https://media.istockphoto.com/id/942526180/photo/3d-illustration-of-red-generic-sports-coupe-car-on-white.jpg?b=1&s=612x612&w=0&k=20&c=SJLPHZyAyLCzw76Vl4rjRyvcbUOBk9efmus5t2zr8aQ='
            alt='avatar'
            className={classNames(
              className,
              'h-6 w-6 rounded-full dark:fill-white sm:h-8 sm:w-8 ',
              visible ? 'invisible' : 'visible'
            )}
          />
        </button>
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute right-0 top-0 z-10 flex w-52 flex-col rounded-l-sm pt-3 shadow-md sm:w-72'
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
            <div className='flex items-center justify-between px-3'>
              <div className='flex items-center space-x-2'>
                <img
                  src='https://media.istockphoto.com/id/942526180/photo/3d-illustration-of-red-generic-sports-coupe-car-on-white.jpg?b=1&s=612x612&w=0&k=20&c=SJLPHZyAyLCzw76Vl4rjRyvcbUOBk9efmus5t2zr8aQ='
                  alt='avatar'
                  className='h-8 w-8 rounded-full'
                />
                <span>Teddy Lethal</span>
              </div>
              <button className='flex items-center' type='button' onClick={() => setVisible(false)}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                  <path
                    fillRule='evenodd'
                    d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-col px-3 py-2 text-base sm:text-lg'>
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

              <button
                onClick={handleLogout}
                type='button'
                className='flex items-center justify-start py-1 hover:text-haretaColor dark:hover:text-haretaColor'
              >
                Log out
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='ml-1 h-4 w-4 sm:h-5 sm:w-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z'
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
