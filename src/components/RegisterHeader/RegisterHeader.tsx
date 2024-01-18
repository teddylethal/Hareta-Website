import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import ToggleTheme from '../ToggleTheme'
import RegisterLanguage from '../RegisterLanguage'
import { useViewport } from 'src/hooks/useViewport'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function RegisterHeader() {
  const viewport = useViewport()
  const smallDevice = viewport.width < 420

  //?translation
  const { t } = useTranslation('login')

  return (
    <header className='top-0 z-10 flex h-10 w-full items-center bg-lightHeader text-textDark duration-300 dark:bg-darkHeader dark:text-textLight md:h-12 lg:h-16'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <nav className='flex items-center space-x-2 text-sm font-medium uppercase sm:space-x-3 md:space-x-4 md:text-base md:font-semibold lg:text-lg'>
            <Fragment>
              {smallDevice && (
                <NavLink
                  to={path.home}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor',
                      {
                        'text-haretaColor dark:text-haretaColor ': isActive
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faHouse} className='h-5 w-auto' />
                </NavLink>
              )}
              {!smallDevice && (
                <NavLink
                  to={path.home}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor',
                      {
                        'text-haretaColor dark:text-haretaColor ': isActive
                      }
                    )
                  }
                >
                  <p>{t('login.home')}</p>
                </NavLink>
              )}
            </Fragment>

            <Fragment>
              {smallDevice && (
                <NavLink
                  to={path.login}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor',
                      {
                        'text-haretaColor dark:text-haretaColor ': isActive
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faUser} className='h-5 w-auto' />
                </NavLink>
              )}
              {!smallDevice && (
                <NavLink
                  to={path.login}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor',
                      {
                        'text-haretaColor dark:text-haretaColor ': isActive
                      }
                    )
                  }
                >
                  <p>{t('login.login')}</p>
                </NavLink>
              )}
            </Fragment>

            <Fragment>
              {smallDevice && (
                <NavLink
                  to={path.register}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor',
                      {
                        'text-haretaColor dark:text-haretaColor ': isActive
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faUserPlus} className='h-5 w-auto' />
                </NavLink>
              )}
              {!smallDevice && (
                <NavLink
                  to={path.register}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-md border border-none p-1 hover:text-primaryColor dark:hover:text-primaryColor',
                      {
                        'text-haretaColor dark:text-haretaColor ': isActive
                      }
                    )
                  }
                >
                  <p>{t('login.sign up')}</p>
                </NavLink>
              )}
            </Fragment>
          </nav>
          <div className='flex items-center space-x-2 md:space-x-4'>
            <RegisterLanguage />
            <ToggleTheme className='h-6 w-6 md:h-8 md:w-8 xl:h-10 xl:w-10' />
          </div>
        </div>
      </div>
    </header>
  )
}
