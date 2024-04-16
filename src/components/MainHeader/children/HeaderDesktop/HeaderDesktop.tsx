import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import HeaderSupportMenu from '../../components/HeaderSupportMenu'
import HeaderUserMenu from '../../components/HeaderUserMenu'
import HeaderCartUnlogged from '../../components/HeaderCartUnlogged'
import HeaderCartLogged from '../../components/HeaderCartLogged'

export default function HeaderDesktop() {
  //! Multi languages
  const { t } = useTranslation('header')
  const { isAuthenticated } = useContext(AppContext)

  return (
    <div className='container grid w-full grid-cols-3 items-center text-black duration-200  dark:text-white'>
      <nav className='col-span-2 flex items-center justify-start space-x-2 text-base font-medium uppercase tablet:font-semibold desktop:space-x-4 desktop:text-lg'>
        <NavLink
          to={mainPath.home}
          className={({ isActive }) =>
            classNames('rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor', {
              'text-primaryColor dark:text-primaryColor': isActive
            })
          }
        >
          <p>{t('navbar.home')}</p>
        </NavLink>

        <NavLink
          to={mainPath.store}
          className={({ isActive }) =>
            classNames('rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor', {
              'text-primaryColor dark:text-primaryColor': isActive
            })
          }
        >
          <p>{t('navbar.store')}</p>
        </NavLink>

        <NavLink
          to='/'
          className='rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor'
        >
          <div>{t('navbar.event')}</div>
        </NavLink>

        <HeaderSupportMenu />
      </nav>

      {/* <div className='col-span-1 flex grow select-none justify-center text-xs text-primaryColor tablet:text-sm tablet:font-semibold desktop:text-base'>
    <h2>Decor your life with us</h2>
  </div> */}

      <nav className='col-span-1 flex items-center justify-end space-x-1 uppercase desktop:space-x-4  desktop:text-lg '>
        {!isAuthenticated && (
          <NavLink
            to={mainPath.login}
            className='flex items-center space-x-1 rounded-lg px-3 py-1 hover:text-primaryColor dark:hover:text-primaryColor tablet:font-semibold desktop:space-x-2'
          >
            <FontAwesomeIcon icon={faUser} />

            <p>{t('navbar.login')}</p>
          </NavLink>
        )}

        {isAuthenticated && (
          <div className='flex px-3'>
            <HeaderUserMenu />
          </div>
        )}

        {isAuthenticated ? <HeaderCartLogged /> : <HeaderCartUnlogged />}
      </nav>
    </div>
  )
}
