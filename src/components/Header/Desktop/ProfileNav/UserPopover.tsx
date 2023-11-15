import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
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

  //? TRANSLATION
  const { t } = useTranslation('header')

  return (
    <div className='relative -top-1 flex w-40 flex-col rounded-lg bg-[#efefef] px-2 py-3 text-base font-medium capitalize text-textDark/90 shadow-lg dark:bg-[#202020] dark:text-textLight/90 md:w-56 lg:top-0 lg:w-72 lg:text-xl'>
      <Link
        to={path.profile}
        className='flex items-center rounded-md px-4 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        <p>{t('user.profile')}</p>
      </Link>

      <Link
        to={path.inventory}
        className='flex items-center rounded-md px-4 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        <p>{t('user.inventory')}</p>
      </Link>
      <Link
        to={path.wishList}
        className='flex items-center rounded-md px-4 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        <p>{t('user.wishlist')}</p>
      </Link>

      <div className=' border-b border-black/40 dark:border-white/40' />

      <button
        onClick={handleLogout}
        className='flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p>{t('user.log out')}</p>
      </button>
    </div>
  )
}
