import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import classNames from 'classnames'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { clearLS } from 'src/utils/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

interface Props {
  className?: string
}

export default function MobileUser({ className }: Props) {
  const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext)
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
            src={
              profile && profile.avatar
                ? profile.avatar.url
                : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
            }
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
                  src={
                    profile && profile.avatar
                      ? profile.avatar.url
                      : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
                  }
                  alt='avatar'
                  className='h-8 w-8 rounded-full'
                />
                <span>{profile?.name}</span>
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
              <Link
                to={path.profile}
                className='flex items-center space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
              >
                <p>Account</p>
              </Link>

              <Link
                to={path.inventory}
                className='flex items-center space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
              >
                <p>Inventory</p>
              </Link>
              <Link
                to={path.wishList}
                className='flex items-center space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
              >
                <p>Wishist</p>
              </Link>

              <div className='my-1 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

              <button
                onClick={handleLogout}
                type='button'
                className='flex items-center justify-start space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p>Log out</p>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
