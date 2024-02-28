import { faBagShopping, faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function UserMobileNavBar() {
  return (
    <div className='text-darkText/70 dark:text-lightText/70 grid grid-cols-4 rounded-md border border-black/10 bg-[#f8f8f8] duration-200 dark:border-white/20 dark:bg-[#181818]'>
      <div className='col-span-1 flex items-center justify-center'>
        <NavLink
          to={path.account}
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-4 text-xl font-semibold', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-darkText dark:hover:text-lightText': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </div>

      <div className='col-span-1 flex items-center justify-center border-l border-black/10 dark:border-white/20'>
        <NavLink
          to={path.password}
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-4 text-xl font-semibold', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-darkText dark:hover:text-lightText': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faLock} />
        </NavLink>
      </div>
      <div className='col-span-1 flex items-center justify-center border-l border-black/10 dark:border-white/20'>
        <NavLink
          to={path.inventory}
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-4 text-xl font-semibold', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-darkText dark:hover:text-lightText': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faBagShopping} />
        </NavLink>
      </div>
      <div className='col-span-1 flex items-center justify-center border-l border-black/10 dark:border-white/20'>
        <NavLink
          to={path.wishList}
          className={({ isActive }) =>
            classNames('flex h-8 items-center space-x-3 px-4 py-4 text-xl font-semibold', {
              'text-brownColor dark:text-haretaColor': isActive,
              ' hover:text-darkText dark:hover:text-lightText': !isActive
            })
          }
        >
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
      </div>
    </div>
  )
}
