import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import useClickOutside from 'src/hooks/useClickOutside'
import classNames from 'classnames'
import { AppContext } from 'src/contexts/app.context'
import mainPath, { userPath } from 'src/constants/path'
import { clearLS } from 'src/utils/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'

interface Props {
  className?: string
  closeMenu: () => void
}

export default function HeaderMobileUserSection({ className, closeMenu }: Props) {
  const { isAuthenticated, setIsAuthenticated, profile, handleLogout } = useContext(AppContext)
  const { visible, setVisible, ref } = useClickOutside(false)

  const logout = () => {
    clearLS()
    handleLogout()
    setIsAuthenticated(false)
    setVisible(false)
  }

  //! Multi languages
  const { t } = useTranslation('header')

  return (
    <div ref={ref} className='w-full'>
      {!isAuthenticated && (
        <NavLink to={mainPath.login} className='flex w-full items-center space-x-2 px-2 py-2 uppercase'>
          <FontAwesomeIcon
            icon={faUser}
            className='h-4 w-4 rounded-full dark:fill-white tabletSmall:h-6 tabletSmall:w-6 '
          />
          <p className=''>{t('navbar.login')}</p>
        </NavLink>
      )}
      {isAuthenticated && (
        <button
          onClick={() => setVisible(!visible)}
          type='submit'
          className={classNames('flex w-full items-center space-x-2 border-x border-t px-2 py-2 uppercase', {
            'border-transparent ': !visible,
            'rounded-t-md  border-black/20 dark:border-white/20': visible
          })}
        >
          <img
            src={
              profile && profile.avatar
                ? profile.avatar.url
                : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
            }
            alt='avatar'
            className={classNames(className, 'h-6 w-6 rounded-full dark:fill-white tabletSmall:h-8 tabletSmall:w-8 ')}
          />
          <p>{profile?.name}</p>
        </button>
      )}

      <AnimateChangeInHeight>
        <AnimatePresence>
          {visible && (
            <motion.div className='flex w-full flex-col space-y-1 rounded-b-md border-x border-b border-black/20 px-4 pb-2 text-xs font-normal text-darkText dark:border-white/20 dark:text-lightText tabletSmall:text-sm'>
              <NavLink to={userPath.profile} onClick={closeMenu} className='flex items-center py-1 font-medium'>
                <p>{t('user.profile')}</p>
              </NavLink>

              <NavLink to={userPath.wishList} onClick={closeMenu} className='flex items-center py-1 font-medium'>
                <p>{t('user.wishlist')}</p>
              </NavLink>

              <button
                onClick={logout}
                type='button'
                className='flex items-center justify-start space-x-2 py-1 font-medium'
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p>{t('user.log out')}</p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateChangeInHeight>
    </div>
  )
}
