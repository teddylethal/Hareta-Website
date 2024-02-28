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
    <header className='text-darkText md:h-12 lg:h-16 dark:text-lightText top-0 z-10 flex h-10 w-full items-center bg-lightHeader duration-200 dark:bg-darkHeader'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <nav className='sm:space-x-3 md:space-x-4 md:text-base md:font-semibold lg:text-lg flex items-center space-x-2 text-sm font-medium uppercase'>
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
          <div className='md:space-x-4 flex items-center space-x-2'>
            <RegisterLanguage />
            <ToggleTheme className='md:h-8 md:w-8 xl:h-10 xl:w-10 h-6 w-6' />
          </div>
        </div>
      </div>
    </header>
  )
}
