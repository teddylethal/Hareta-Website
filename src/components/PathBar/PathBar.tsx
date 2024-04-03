import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'

export interface PathElement {
  pathName: string
  url: string
  isNotALink?: boolean
}

interface Props {
  pathList: PathElement[]
}

export default function PathBar({ pathList }: Props) {
  //! TRANSLATION
  const { t } = useTranslation('store')

  return (
    <div className='relative mb-2 flex shrink items-center justify-start space-x-2 rounded-lg border border-black/20 bg-barLightBg px-3 py-1 text-xs font-semibold uppercase text-darkText duration-200 dark:border-white/20 dark:bg-barDarkBg dark:text-lightText desktop:mb-3  desktop:px-4 desktop:py-2 desktop:text-sm desktopLarge:mb-4 desktopLarge:px-6 desktopLarge:py-3'>
      <Fragment>
        <NavLink
          to={mainPath.home}
          className={({ isActive }) =>
            classNames({
              'text-primaryColor': isActive,
              'hover:text-primaryColor': !isActive
            })
          }
        >
          {t('path bar.home')}
        </NavLink>
      </Fragment>
      {pathList.map((pathElement, index) => {
        if (pathElement.isNotALink) {
          return (
            <Fragment key={index}>
              <FontAwesomeIcon icon={faAngleRight} />
              <div className={'text-primaryColor'}>{pathElement.pathName}</div>
            </Fragment>
          )
        } else
          return (
            <Fragment key={index}>
              <FontAwesomeIcon icon={faAngleRight} />
              <NavLink
                to={pathElement.url}
                className={({ isActive }) =>
                  classNames({
                    'text-primaryColor': isActive,
                    'hover:text-primaryColor': !isActive
                  })
                }
              >
                {pathElement.pathName}
              </NavLink>
            </Fragment>
          )
      })}
    </div>
  )
}
