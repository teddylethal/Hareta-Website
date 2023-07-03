import { Link } from 'react-router-dom'

export default function RegisterHeader() {
  return (
    <header className='header--dark py-3'>
      <div className='container '>
        <nav className='flex items-center'>
          <Link to='/'>
            <img src='src/assets/sun.png' alt='Hareta' className='h-8 lg:h-11' />
          </Link>
          <div className='ml-5 text-xl text-teal-50 lg:text-3xl'>REGISTER</div>
        </nav>
      </div>
    </header>
  )
}
