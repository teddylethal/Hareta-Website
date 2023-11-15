import { faBagShopping, faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function UserSideNav() {
  //? translation
  const { t } = useTranslation('user')
  return (
    <div className='rounded-md border border-black/10 bg-[#f8f8f8]  text-textDark/70  duration-500 dark:border-white/20 dark:bg-[#181818] dark:text-textLight/70'>
      <div className=''>
        <NavLink
          to={path.profile}
          end
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-8 text-lg font-semibold xl:text-xl', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-textDark dark:hover:text-textLight': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faUser} />
          <p>{t('layout.profile')}</p>
        </NavLink>
      </div>

      <div className='border-t border-black/10 dark:border-white/20'>
        <NavLink
          to={path.password}
          aria-current='page'
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-8 text-lg font-semibold xl:text-xl', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-textDark dark:hover:text-textLight': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faLock} />
          <p>{t('layout.password')}</p>
        </NavLink>
      </div>
      <div className='border-t border-black/10 dark:border-white/20'>
        <NavLink
          to={path.inventory}
          aria-current='true'
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-8 text-lg font-semibold xl:text-xl', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-textDark dark:hover:text-textLight': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faBagShopping} />
          <p>{t('layout.inventory')}</p>
        </NavLink>
      </div>
      <div className='border-t border-black/10 dark:border-white/20'>
        <NavLink
          to={path.wishList}
          aria-current='true'
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-8 text-lg font-semibold xl:text-xl', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-textDark dark:hover:text-textLight': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faHeart} />
          <p>{t('layout.wishlist')}</p>
        </NavLink>
      </div>
    </div>
  )
}
