/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'
import { createContext, useContext } from 'react'
import { useViewport } from 'src/hooks/useViewport'
import SupportNav from './Desktop/SupportNav'
import { AppContext } from 'src/contexts/app.context'
import UserNav from './Desktop/ProfileNav/UserNav'
import path from 'src/constants/path'
import CartPopoverWithLogin from './Desktop/CartPopover/CartPopoverWithLogin'
import CartPopoverWithoutLogin from './Desktop/CartPopover/CartPopoverWithoutLogin/CartPopoverWithoutLogin'
import MobileHeader from './Mobile/MobileHeader'

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
  const { isAuthenticated } = useContext(AppContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  return (
    <header className='fixed top-0 z-10 flex h-10 w-full items-center bg-white duration-500 dark:bg-black md:h-12 lg:h-16'>
      {!isMobile && (
        <div className='container grid w-full grid-cols-3 items-center text-black duration-500  dark:text-white'>
          <nav className='col-span-1 flex items-center justify-start space-x-2 text-base font-medium uppercase lg:space-x-4 lg:text-lg'>
            <Link to={path.home}>
              <img src='/images/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
            </Link>

            <Link
              to={path.store}
              className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'
            >
              <div>Store</div>
            </Link>

            <Link
              to='/'
              className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'
            >
              <div>Event</div>
            </Link>

            <SupportNav />
          </nav>

          <div className='col-span-1 flex grow select-none justify-center text-xs text-haretaColor md:text-sm lg:text-base'>
            <h2>Decor your life with us</h2>
          </div>

          <nav className='col-span-1 flex items-center justify-end space-x-1 uppercase lg:space-x-4  lg:text-lg '>
            {!isAuthenticated && (
              <Link to={path.login} className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-haretaColor'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
                </svg>

                <div>Login</div>
              </Link>
            )}

            {isAuthenticated && (
              <div className='flex px-3'>
                <UserNav />
              </div>
            )}

            {isAuthenticated ? <CartPopoverWithLogin /> : <CartPopoverWithoutLogin />}

            <div className='flex items-center justify-center px-1'>
              <ToggleTheme className='h-6 w-6 lg:h-8 lg:w-8' />
            </div>
          </nav>
        </div>
      )}

      {/*//! Mobile */}
      {isMobile && <MobileHeader />}
    </header>
  )
}
