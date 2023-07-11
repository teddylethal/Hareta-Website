/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'
import { useState } from 'react'

export default function Header() {
  const [openingNav, changeOpeningNav] = useState<boolean>(false)

  const toggleOpenCloseNav = () => {
    changeOpeningNav(openingNav ? false : true)
  }

  return (
    <header className='fixed top-0 z-10 flex h-10 w-full items-center bg-[#F9F5F6] duration-500 dark:bg-black md:h-12 lg:h-16'>
      <div className='container invisible grid w-full grid-cols-3 items-center py-3 text-black dark:text-white sm:visible'>
        <nav className='col-span-1 flex items-center justify-start space-x-1 text-sm font-medium uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Store</div>
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Event</div>
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Support</div>
          </Link>
        </nav>

        <div className='col-span-1 flex grow select-none justify-center text-xs text-haretaColor md:text-sm lg:text-base'>
          <h2>Decor your life with us</h2>
        </div>

        <nav className='col-span-1 flex items-center justify-end space-x-1 text-sm uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
          <Link to='/login' className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-haretaColor'>
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

          <Link
            to='/'
            className='flex items-center space-x-1 rounded-lg border border-none bg-[#a27b5c] px-1 py-0.5 text-textVintage hover:bg-haretaColor lg:px-2 lg:py-1'
          >
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
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>

            <div>Cart</div>
          </Link>
          <div className='flex items-center justify-center px-1'>
            <ToggleTheme className='h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
          </div>
        </nav>
      </div>

      {/*//! Nav Button */}
      <div onClick={toggleOpenCloseNav} className='visible sm:invisible'>
        {openingNav && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z'
              clipRule='evenodd'
            />
          </svg>
        )}
        {!openingNav && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </div>
      <div className='absolute left-0'>
        <nav className='flex flex-col justify-center space-y-1 text-sm font-medium uppercase md:space-x-2 md:text-base lg:space-x-4 lg:text-lg'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Home' className='h-8 max-w-none lg:h-11' />
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Store</div>
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Event</div>
          </Link>

          <Link to='/' className='rounded-md border border-none p-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            <div>Support</div>
          </Link>
        </nav>
      </div>
    </header>
  )
}
