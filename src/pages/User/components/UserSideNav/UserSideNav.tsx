import { faBagShopping, faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function UserSideNav() {
  return (
    <div className='rounded-md border border-black/10 bg-[#efefef] text-textDark/70 dark:border-white/20 dark:bg-[#101010] dark:text-textLight/70'>
      <div className=''>
        <Link
          to={path.profile}
          className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'
        >
          <FontAwesomeIcon icon={faUser} />
          <p>Account</p>
        </Link>
      </div>

      <div className='border-t border-black/10 dark:border-white/20'>
        <Link
          to={path.password}
          className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'
        >
          <FontAwesomeIcon icon={faLock} />
          <p>Password</p>
        </Link>
      </div>
      <div className='border-t border-black/10 dark:border-white/20'>
        <Link
          to={path.inventory}
          className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'
        >
          <FontAwesomeIcon icon={faBagShopping} />
          <p>Inventory</p>
        </Link>
      </div>
      <div className='border-t border-black/10 dark:border-white/20'>
        <Link
          to={path.wishList}
          className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'
        >
          <FontAwesomeIcon icon={faHeart} />
          <p>Wishlist</p>
        </Link>
      </div>
    </div>
  )
}
