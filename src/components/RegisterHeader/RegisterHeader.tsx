import { Link } from 'react-router-dom'
import ToggleTheme from '../ToggleTheme'

export default function RegisterHeader() {
  return (
    <header className='flex justify-between bg-white py-3 dark:bg-dark_theme'>
      <div className='container'>
        <nav className='flex items-center'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Hareta' className='h-8 lg:h-11' />
          </Link>
          <div className='ml-5 text-xl uppercase text-gray-600 dark:text-white lg:text-3xl'>register</div>
        </nav>
      </div>
      <div className='mr-auto flex h-10 w-10 items-center justify-center pr-4'>
        <ToggleTheme />
      </div>
    </header>
  )
}
