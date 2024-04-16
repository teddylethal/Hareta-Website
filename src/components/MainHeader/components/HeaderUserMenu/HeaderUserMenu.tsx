import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CustomPopover from 'src/components/CustomPopover'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

function PopoverSection() {
  const { handleLogout } = useContext(AppContext)

  //! Multi languages
  const { t } = useTranslation('header')

  const className =
    'flex items-center rounded-md px-4 py-2 hover:bg-lightColor900 hover:font-semibold hover:text-darkText dark:hover:bg-darkColor900 dark:hover:text-lightText font-medium'

  return (
    <div className='relative -top-1 flex w-40 flex-col rounded-lg bg-lightColor700 px-2 py-3 text-base font-medium capitalize text-darkText/90 shadow-lg dark:bg-darkColor700 dark:text-lightText/90 tablet:w-56 desktop:top-0 desktop:w-72 desktop:text-xl'>
      <NavLink to={mainPath.profile} className={className}>
        <p>{t('user.profile')}</p>
      </NavLink>

      <NavLink to={mainPath.inventory} className={className}>
        <p>{t('user.inventory')}</p>
      </NavLink>
      <NavLink to={mainPath.wishList} className={className}>
        <p>{t('user.wishlist')}</p>
      </NavLink>

      <div className='border-b border-black/40 dark:border-white/40' />

      <button
        onClick={handleLogout}
        className='flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-lightColor900 hover:font-semibold hover:text-darkText dark:hover:bg-darkColor900 dark:hover:text-lightText'
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p>{t('user.log out')}</p>
      </button>
    </div>
  )
}

export default function HeaderUserMenu() {
  const { profile } = useContext(AppContext)

  return (
    <div className='group'>
      <CustomPopover renderPopover={<PopoverSection />} className='py-0.5 desktop:py-1.5' offsetValue={12}>
        <div className='flex cursor-default items-center space-x-2'>
          <img
            src={
              profile?.avatar
                ? profile.avatar.url
                : 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'
            }
            alt='avatar'
            className='h-6 w-6 rounded-full object-cover'
          />

          <div className='text-sm font-medium normal-case duration-200 group-hover:text-brownColor  dark:group-hover:text-haretaColor tablet:text-base desktop:text-lg'>
            {profile ? profile.name : ''}
          </div>
        </div>
      </CustomPopover>
    </div>
  )
}
