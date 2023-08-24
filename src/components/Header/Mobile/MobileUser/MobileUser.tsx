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
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

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
    <div ref={ref}>
      {!isAuthenticated && (
        <Link to={path.login} className='flex w-full items-center space-x-2 px-2 py-2 uppercase'>
          <FontAwesomeIcon icon={faUser} className='h-6 w-6 rounded-full dark:fill-white sm:h-7 sm:w-7 ' />
        </Link>
      )}
      {isAuthenticated && (
        <button
          onClick={() => setVisible(!visible)}
          type='submit'
          className={classNames(
            'flex w-full items-center space-x-2 border-x border-t border-transparent px-2 py-2 uppercase',
            {
              'rounded-t-md  border-black/20 dark:border-white/20': visible
            }
          )}
        >
          <img
            src={
              profile && profile.avatar
                ? profile.avatar.url
                : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
            }
            alt='avatar'
            className={classNames(className, 'h-6 w-6 rounded-full dark:fill-white sm:h-8 sm:w-8 ')}
          />
          <p>{profile?.name}</p>
        </button>
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            className='flex w-full flex-col space-y-1 rounded-b-md border-x border-b border-black/20 px-4 pb-2 text-xs font-normal text-textDark dark:border-white/20 dark:text-textLight sm:text-sm'
            initial={{ opacity: 0, y: '-10%' }}
            animate={{
              opacity: 1,
              y: 0,
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to={path.profile}
              className='flex items-center py-1 hover:text-haretaColor dark:hover:text-haretaColor'
            >
              <p>Account</p>
            </Link>

            <Link
              to={path.inventory}
              className='flex items-center py-1 hover:text-haretaColor dark:hover:text-haretaColor'
            >
              <p>Inventory</p>
            </Link>
            <Link
              to={path.wishList}
              className='flex items-center py-1 hover:text-haretaColor dark:hover:text-haretaColor'
            >
              <p>Wishist</p>
            </Link>

            {/* <div className='my-1 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' /> */}

            <button
              onClick={handleLogout}
              type='button'
              className='flex items-center justify-start space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p>Log out</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
