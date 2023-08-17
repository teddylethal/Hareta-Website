import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      queryKey: ['purchases']
    })
  }
  return (
    <div className='relative -top-1 flex w-40 flex-col space-y-3 rounded-md bg-[#efefef] p-3 text-base capitalize text-textDark shadow-md dark:bg-[#202020] dark:text-textLight lg:top-0 lg:w-52 lg:px-6 lg:text-lg'>
      <Link
        to={path.profile}
        className='flex items-center space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
      >
        <p>Account</p>
      </Link>

      <Link
        to={path.inventory}
        className='flex items-center space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
      >
        <p>Inventory</p>
      </Link>
      <Link
        to={path.wishList}
        className='flex items-center space-x-2 py-1 hover:text-haretaColor dark:hover:text-haretaColor'
      >
        <p>Wishist</p>
      </Link>

      <div className='my-1 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

      <button
        onClick={handleLogout}
        className='flex items-center justify-start space-x-2 text-base hover:text-haretaColor dark:hover:text-haretaColor lg:text-lg'
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p>Log out</p>
      </button>
    </div>
  )
}
