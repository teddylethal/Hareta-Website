import { Link, useMatch } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'
import path from 'src/constants/path'

export default function RegisterHeader() {
  const isRegister = Boolean(useMatch('/register'))
  return (
    <header className='fixed top-0 z-10 flex h-10 w-full items-center justify-between bg-white py-3 duration-500 dark:bg-black sm:h-12 lg:h-16'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <nav className='flex items-center'>
            <Link to={path.home}>
              <img src='/images/sun.png' alt='Hareta' className='h-6 sm:h-8 lg:h-12' />
            </Link>
            <p className='ml-4 items-center text-base uppercase text-gray-600 dark:text-white sm:ml-6 sm:text-lg md:visible lg:ml-8 lg:text-2xl'>
              {isRegister ? 'register' : 'login'}
            </p>
          </nav>
          <ToggleTheme className='mr-4 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
        </div>
      </div>
    </header>
  )
}
