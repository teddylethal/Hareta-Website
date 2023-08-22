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
    <div className='relative -top-1 flex w-40 flex-col rounded-md bg-[#efefef] p-2 text-base font-medium capitalize text-textDark text-textDark/70 shadow-md dark:bg-[#202020] dark:text-textLight dark:text-textLight/70 lg:top-0 lg:w-52 lg:text-lg'>
      <Link
        to={path.profile}
        className='flex items-center rounded-md px-4 py-2 hover:bg-[#e8e8e8]  hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        <p>Account</p>
      </Link>

      <Link
        to={path.inventory}
        className='flex items-center rounded-md px-4 py-2 hover:bg-[#e8e8e8]  hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        <p>Inventory</p>
      </Link>
      <Link
        to={path.wishList}
        className='flex items-center rounded-md px-4 py-2 hover:bg-[#e8e8e8]  hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        <p>Wishist</p>
      </Link>

      <div className=' border-b border-black/40 dark:border-white/40' />

      <button
        onClick={handleLogout}
        className='flex items-center space-x-2 rounded-md px-4 py-2  hover:bg-[#e8e8e8] hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p>Log out</p>
      </button>
    </div>
  )
}
