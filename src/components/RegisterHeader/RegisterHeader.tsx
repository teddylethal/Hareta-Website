import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'

export default function RegisterHeader() {
  return (
    <header className='fixed top-0 z-10 flex w-full justify-between bg-white py-3 duration-500 dark:bg-black'>
      <div className='container'>
        <nav className='flex grow items-center'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Hareta' className='h-8 lg:h-11' />
          </Link>
          <div className='invisible ml-5 text-xl uppercase text-gray-600 dark:text-white md:visible lg:text-3xl'>
            register
          </div>
        </nav>
      </div>
      <div className='mr-auto flex h-10 w-10 items-center justify-center pr-4'>
        <ToggleTheme className='h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
      </div>
    </header>
  )
}
