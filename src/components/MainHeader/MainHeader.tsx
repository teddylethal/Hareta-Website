/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, NavLink } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { useViewport } from 'src/hooks/useViewport'
import SupportNav from '../Header/Desktop/SupportNav'
import { AppContext } from 'src/contexts/app.context'
import UserNav from '../Header/Desktop/ProfileNav/UserNav'
import mainPath from 'src/constants/path'
import CartPopoverWithLogin from '../Header/Desktop/CartPopover/CartPopoverWithLogin'
import CartPopoverWithoutLogin from '../Header/Desktop/CartPopover/CartPopoverWithoutLogin/CartPopoverWithoutLogin'
import MobileHeader from '../Header/Mobile/MobileHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import HeaderDesktop from './children/HeaderDesktop'

interface MenuContextInterface {
  openingMenu: boolean
  setOpeningMenu: React.Dispatch<React.SetStateAction<boolean>>
}
const initialMenuContext: MenuContextInterface = {
  openingMenu: false,
  setOpeningMenu: () => null
}
export const MenuContext = createContext<MenuContextInterface>(initialMenuContext)

export default function MainHeader() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  return (
    <div className='top-0 z-10 flex h-10 w-full items-center bg-lightHeader shadow-md duration-200 dark:bg-darkHeader tablet:h-12 desktop:h-16'>
      {!isMobile && <HeaderDesktop />}

      {/*//! Mobile */}
      {isMobile && <MobileHeader />}
    </div>
  )
}
