import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

export default function UserPopover() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()
  // const logoutMutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     setIsAuthenticated(false)
  //   }
  // })
  const handleLogout = () => {
    clearLS()
    setIsAuthenticated(false)
    setProfile(null)
    queryClient.removeQueries({
      queryKey: ['items_in_cart']
    })
  }
  return (
    <div className='relative -top-1 flex w-40 flex-col space-y-3 rounded-sm bg-[#efefef] p-3 text-base capitalize text-textDark shadow-md dark:bg-[#303030] dark:text-textLight lg:top-0 lg:w-52 lg:px-6 lg:text-lg'>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        My account
      </Link>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        My Profile
      </Link>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        Inventory
      </Link>
      <Link to={path.favouriteList} className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        Favourite List
      </Link>

      <div className='my-1 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

      <button
        onClick={handleLogout}
        className='flex items-center justify-start text-base hover:text-haretaColor dark:hover:text-haretaColor lg:text-lg'
      >
        Log out
      </button>
    </div>
  )
}
