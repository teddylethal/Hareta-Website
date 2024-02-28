import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

export default function AdminUpdatingPage() {
  return (
    <div className='lg:text-base relative flex items-center justify-around  rounded-xl border  border-white/40 py-2 text-sm font-semibold text-lightText/80'>
      {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
      <NavLink
        to={adminPath.setDefaultProduct}
        end
        className={({ isActive }) =>
          classNames('px-8 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-lightText': !isActive
          })
        }
      >
        Set default item
      </NavLink>
      <NavLink
        to={adminPath.uploadProductAvatar}
        end
        className={({ isActive }) =>
          classNames('px-8 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-lightText': !isActive
          })
        }
      >
        Upload item avatar
      </NavLink>
      <NavLink
        to={adminPath.updateProduct}
        end
        className={({ isActive }) =>
          classNames('px-4 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-lightText': !isActive
          })
        }
      >
        Update item
      </NavLink>
    </div>
  )
}
