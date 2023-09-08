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
    <div className='relative mb-2 flex shrink items-center justify-start space-x-2 rounded-lg border border-black/20 bg-[#f8f8f8] px-3 py-1 text-xs font-medium uppercase text-textDark duration-500 dark:border-white/20 dark:bg-[#000] dark:text-textLight lg:mb-3  lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
      {pathList.map((pathElemnt, index) => (
        <Fragment key={index}>
          {index !== 0 && <FontAwesomeIcon icon={faAngleRight} />}
          <NavLink
            to={`${pathElemnt.url}`}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
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
