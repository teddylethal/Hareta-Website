/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'
import { createContext, useState, useContext } from 'react'
import ProfileNav from './Desktop/ProfileNav'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewport } from 'src/hooks/useViewport'
import SidebarNav from './Mobile/SidebarNav/SidebarNav'
import SupportNav from './Desktop/SupportNav'
import CartNav from './Desktop/CartNav'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'

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
  const { theme } = useContext(ThemeContext)
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const [openingMenu, setOpeningMenu] = useState<boolean>(false)

  const { visible, setVisible, ref } = useClickOutside(false)
  const openMenu = () => {
    setOpeningMenu(true)
    setVisible(true)
  }
  const closeMenu = () => {
    setOpeningMenu(false)
  }

  return (
    <header className='fixed top-0 flex h-10 w-full items-center bg-white duration-500 dark:bg-black md:h-12 lg:h-16'>
      {!isMobile && (
        <div className='container grid w-full grid-cols-3 items-center py-3 text-black dark:text-white'>
          <nav className='col-span-1 flex items-center justify-start space-x-2 text-base font-medium uppercase lg:space-x-4 lg:text-lg'>
            <Link to='/'>
              <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
            </Link>

            <Link
              to='/'
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

            <div className='relative cursor-pointer border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
              <SupportNav />
            </div>
          </nav>

          <div className='col-span-1 flex grow select-none justify-center text-xs text-haretaColor md:text-sm lg:text-base'>
            <h2>Decor your life with us</h2>
          </div>

          <nav className='col-span-1 flex items-center justify-end space-x-1 text-sm uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
            {/* <Link to='/login' className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-haretaColor'>
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
          </Link> */}

            <div className='flex px-3 hover:text-haretaColor'>
              <ProfileNav />
            </div>

            <div className='rounded-md bg-[#a27b5c] text-textVintage hover:bg-haretaColor'>
              <CartNav />
            </div>

            <div className='flex items-center justify-center px-1'>
              <ToggleTheme className='h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
            </div>
          </nav>
        </div>
      )}

      {/*//! Mobile */}
      {isMobile && (
        <div className='flex w-full items-center justify-between px-2'>
          <div onClick={openMenu} className=''>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-8 w-8 fill-black dark:fill-white'
            >
              <path
                fillRule='evenodd'
                d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='flex space-x-4 md:space-x-6'>
            <div className='relative flex items-end'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 fill-black dark:fill-white md:h-8 md:w-8'
              >
                <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
              </svg>
              <span className='absolute left-4 flex h-4 w-4 items-center justify-center rounded-full bg-haretaColor text-xs text-textDark md:left-6  md:h-5 md:w-5 md:text-sm'>
                6
              </span>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 fill-black dark:fill-white md:h-8 md:w-8'
              >
                <path
                  fillRule='evenodd'
                  d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {isMobile && openingMenu && visible && (
          <MenuContext.Provider value={{ openingMenu, setOpeningMenu }}>
            <motion.div
              className='absolute left-0 top-0 flex w-52 overflow-hidden rounded-r-sm   py-2 text-textDark shadow-md dark:text-textLight sm:w-60'
              initial={{ opacity: 0, x: '-20%' }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
                color: theme === 'dark' ? '#eeeeee' : '#222222'
              }}
              exit={{ opacity: 0, x: '-20%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <SidebarNav />
              <div className='absolute right-0 flex h-10 space-x-2 p-2'>
                <ToggleTheme className='h-6 w-6 duration-300' />
                <span onClick={closeMenu}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                    <path
                      fillRule='evenodd'
                      d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </div>
            </motion.div>
          </MenuContext.Provider>
        )}
      </AnimatePresence>
    </header>
  )
}
