import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import AuthenitcatedCart from './AuthenticatedCart'
import UnauthenticatedCart from './UnauthenticatedCart'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function Cart() {
  const { isAuthenticated } = useContext(AppContext)

  return (
    <div className='bg-lightBg py-2 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg bg-[#efefef] px-2 py-1 text-xs font-light uppercase text-textDark duration-500 dark:bg-[#202020] dark:text-textLight lg:mb-3 lg:space-x-2 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
          <NavLink
            to={path.home}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            home
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.cart}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            cart
          </NavLink>
        </div>
        {isAuthenticated && <AuthenitcatedCart />}
        {!isAuthenticated && <UnauthenticatedCart />}
      </div>
    </div>
  )
}
