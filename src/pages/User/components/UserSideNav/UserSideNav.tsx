import { faBagShopping, faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { NavigateItem } from 'src/types/utils.type'

interface NaviagteItemWithIcon extends NavigateItem {
  icon: ReactNode
}

export default function UserSideNav() {
  //! translation
  const { t } = useTranslation('user')

  //! Navigation menu
  const menus: NaviagteItemWithIcon[] = [
    {
      name: t('layout.profile'),
      url: mainPath.profile,
      icon: <FontAwesomeIcon icon={faUser} />
    },
    {
      name: t('layout.password'),
      url: mainPath.password,
      icon: <FontAwesomeIcon icon={faLock} />
    },
    {
      name: t('layout.inventory'),
      url: mainPath.inventory,
      icon: <FontAwesomeIcon icon={faBagShopping} />
    },
    {
      name: t('layout.wishlist'),
      url: mainPath.wishList,
      icon: <FontAwesomeIcon icon={faHeart} />
    }
  ]

  return (
    <div className='rounded-md border border-black/10 bg-[#f8f8f8]  text-darkText/70  duration-200 dark:border-white/20 dark:bg-[#181818] dark:text-lightText/70'>
      {menus.map((item, index) => (
        <div key={index} className='border-t border-black/10 first:border-none dark:border-white/20'>
          <NavLink
            to={item.url}
            end
            className={({ isActive }) =>
              classNames('flex h-8 items-center space-x-3 px-4 py-8 text-lg font-semibold desktopLarge:text-xl', {
                'text-brownColor dark:text-haretaColor': isActive,
                ' hover:text-darkText dark:hover:text-lightText': !isActive
              })
            }
          >
            {item.icon}
            <p>{item.name}</p>
          </NavLink>
        </div>
      ))}
    </div>
  )
}
