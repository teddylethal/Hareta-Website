import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'

export default function Header() {
  return (
    <header className='fixed top-0 z-10 flex w-full justify-between bg-[#F9F5F6] py-3 duration-500 dark:bg-black'>
      <div className='container grid grid-cols-3 items-center'>
        <nav className='col-span-1 flex items-center justify-start space-x-4 text-lg font-medium uppercase text-black dark:text-white'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Hareta' className='h-8 lg:h-11' />
          </Link>

          <Link
            to='/'
            className='rounded-md border border-none px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
          >
            <div>Store</div>
          </Link>

          <Link
            to='/'
            className='rounded-md border border-none px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
          >
            <div>Event</div>
          </Link>

          <Link
            to='/'
            className='rounded-md border border-none px-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
          >
            <div>Support</div>
          </Link>
        </nav>
        <div className='col-span-1 flex justify-center text-haretaColor'>
          <h2>Decor your life with us</h2>
        </div>
        <nav className='col-span-1 flex items-center justify-end space-x-4 text-lg uppercase text-black dark:text-white'>
          <Link to='/login' className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-haretaColor'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
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
            className='flex items-center space-x-1 rounded-lg border border-none bg-[#a27b5c] px-3 py-1 text-textVintage hover:bg-haretaColor'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>

            <div>Cart</div>
          </Link>
          <div className='mr-auto flex h-10 w-10 items-center justify-center pr-4'>
            <ToggleTheme />
          </div>
        </nav>
      </div>
    </header>
  )
}
