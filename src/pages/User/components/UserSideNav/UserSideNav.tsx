import { faBagShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UserSideNav() {
  return (
    <div className='rounded-md border border-black/10 bg-[#efefef] text-textDark/70 dark:border-white/20 dark:bg-[#101010] dark:text-textLight/70'>
      <div className=''>
        <button className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'>
          <FontAwesomeIcon icon={faUser} />
          <p>Account</p>
        </button>
      </div>

      <div className='border-y border-black/10 dark:border-white/20'>
        <button className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'>
          <FontAwesomeIcon icon={faBagShopping} />
          <p>Inventory</p>
        </button>
      </div>
      <div className=''>
        <button className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'>
          <FontAwesomeIcon icon={faHeart} />
          <p>Wishlist</p>
        </button>
      </div>
    </div>
  )
}
