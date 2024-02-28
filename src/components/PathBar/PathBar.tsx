import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

interface PathElement {
  pathName: string
  url: string
}

interface Props {
  pathList: PathElement[]
}

export default function PathBar({ pathList }: Props) {
  return (
    <div className='text-darkText lg:mb-3 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3 dark:text-lightText relative mb-2 flex shrink items-center justify-start space-x-2 rounded-lg border border-black/20 bg-barLightBg px-3 py-1  text-xs font-medium uppercase duration-200 dark:border-white/20 dark:bg-barDarkBg'>
      {pathList.map((pathElemnt, index) => (
        <Fragment key={index}>
          {index !== 0 && <FontAwesomeIcon icon={faAngleRight} />}
          <NavLink
            to={`${pathElemnt.url}`}
            className={({ isActive }) =>
              classNames({
                'text-haretaColor': isActive,
                'hover:text-primaryColor': !isActive
              })
            }
          >
            {pathElemnt.pathName}
          </NavLink>
        </Fragment>
      ))}
    </div>
  )
}
