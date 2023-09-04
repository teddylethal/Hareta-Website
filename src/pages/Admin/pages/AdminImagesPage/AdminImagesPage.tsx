import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

export default function AdminImagesPage() {
  return (
    <div className='relative flex items-center justify-around rounded-xl  border border-white/40  py-2 text-sm font-semibold text-textLight/80 lg:text-base'>
      {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
      <NavLink
        to={adminPath.addItemImage}
        end
        className={({ isActive }) =>
          classNames('px-8 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-textLight': !isActive
          })
        }
      >
        Add image for item
      </NavLink>
      <NavLink
        to={adminPath.deleteItemImage}
        end
        className={({ isActive }) =>
          classNames('px-4 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-textLight': !isActive
          })
        }
      >
        Delete image of item
      </NavLink>
    </div>
  )
}