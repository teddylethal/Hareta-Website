/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, NavLink } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { useViewport } from 'src/hooks/useViewport'
import SupportNav from './Desktop/SupportNav'
import { AppContext } from 'src/contexts/app.context'
import UserNav from './Desktop/ProfileNav/UserNav'
import mainPath from 'src/constants/path'
import CartPopoverWithLogin from './Desktop/CartPopover/CartPopoverWithLogin'
import CartPopoverWithoutLogin from './Desktop/CartPopover/CartPopoverWithoutLogin/CartPopoverWithoutLogin'
import MobileHeader from './Mobile/MobileHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface MenuContextInterface {
  openingMenu: boolean
  setOpeningMenu: React.Dispatch<React.SetStateAction<boolean>>
}
const initialMenuContext: MenuContextInterface = {
  openingMenu: false,
  setOpeningMenu: () => null
}
export const MenuContext = createContext<MenuContextInterface>(initialMenuContext)

export default function Header() {
  //? Use translation
  const { t } = useTranslation('header')
  const { isAuthenticated } = useContext(AppContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  return (
    <div className='top-0 z-10 flex h-10 w-full items-center bg-lightHeader shadow-md duration-200 dark:bg-darkHeader tablet:h-12 desktop:h-16'>
      {!isMobile && (
        <div className='container grid w-full grid-cols-3 items-center text-black duration-200  dark:text-white'>
          <nav className='col-span-2 flex items-center justify-start space-x-2 text-base font-medium uppercase tablet:font-semibold desktop:space-x-4 desktop:text-lg'>
            <NavLink
              to={mainPath.home}
              className={({ isActive }) =>
                classNames('rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor', {
                  'text-primaryColor dark:text-primaryColor': isActive
                })
              }
            >
              <p>{t('navbar.home')}</p>
            </NavLink>

            <NavLink
              to={mainPath.store}
              className={({ isActive }) =>
                classNames('rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor', {
                  'text-primaryColor dark:text-primaryColor': isActive
                })
              }
            >
              <p>{t('navbar.store')}</p>
            </NavLink>

            <NavLink
              to='/'
              className='rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor'
            >
              <div>{t('navbar.event')}</div>
            </NavLink>

            <SupportNav />
          </nav>

          {/* <div className='col-span-1 flex grow select-none justify-center text-xs text-primaryColor tablet:text-sm tablet:font-semibold desktop:text-base'>
            <h2>Decor your life with us</h2>
          </div> */}

          <nav className='col-span-1 flex items-center justify-end space-x-1 uppercase desktop:space-x-4  desktop:text-lg '>
            {!isAuthenticated && (
              <Link
                to={mainPath.login}
                className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-primaryColor dark:hover:text-primaryColor tablet:font-semibold desktop:space-x-2'
              >
                <FontAwesomeIcon icon={faUser} />

                <p>{t('navbar.login')}</p>
              </Link>
            )}

            {isAuthenticated && (
              <div className='flex px-3'>
                <UserNav />
              </div>
            )}

            {isAuthenticated ? <CartPopoverWithLogin /> : <CartPopoverWithoutLogin />}

            {/* <div className='flex items-center justify-center px-1'>
              <ToggleTheme className='h-6 w-6 rounded-full duration-200 hover:bg-black/20 dark:hover:bg-white/50 desktop:h-8 desktop:w-8' />
            </div> */}
          </nav>
        </div>
      )}

      {/*//! Mobile */}
      {isMobile && <MobileHeader />}
    </div>
  )
}
