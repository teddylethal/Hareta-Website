import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logout } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { clearAccessTokenFromLS } from 'src/utils/auth'

export default function UserPopover() {
  const { setIsAuthenticated } = useContext(AppContext)
  // const logoutMutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     setIsAuthenticated(false)
  //   }
  // })
  const handleLogout = () => {
    clearAccessTokenFromLS()
    setIsAuthenticated(false)
  }
  return (
    <div className='text-md relative -top-1 w-40 space-y-3 rounded-sm border-gray-200 bg-[#eee] p-3 text-textDark shadow-md dark:bg-[#333] dark:text-textLight md:text-base lg:top-0 lg:w-52 lg:px-6 lg:text-lg'>
      <Link to='/' className='block hover:text-haretaColor dark:hover:text-haretaColor'>
        My Account
      </Link>
      <Link to='/' className='block hover:text-haretaColor dark:hover:text-haretaColor'>
        My Profile
      </Link>
      <Link to='/' className='block hover:text-haretaColor dark:hover:text-haretaColor'>
        Inventory
      </Link>
      <Link to='/' className='block hover:text-haretaColor dark:hover:text-haretaColor'>
        Favourite List
      </Link>

      <div className='my-1 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

      <button onClick={handleLogout} className='block hover:text-haretaColor dark:hover:text-haretaColor'>
        Log out
      </button>
    </div>
  )
}
