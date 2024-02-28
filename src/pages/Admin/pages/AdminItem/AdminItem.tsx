import classNames from 'classnames'
import { Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

export default function AdminItem() {
  return (
    <Fragment>
      <div className='lg:text-xl text-lightText/80 relative flex items-center  justify-around rounded-xl border border-haretaColor py-2 text-base font-semibold'>
        {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
        <NavLink
          to={adminPath.createItem}
          className={({ isActive }) =>
            classNames('px-4 py-1 uppercase ', {
              'text-haretaColor': isActive,
              'hover:text-lightText': !isActive
            })
          }
        >
          Create
        </NavLink>
        <NavLink
          to={adminPath.uploadProductAvatar}
          className={({ isActive }) =>
            classNames('px-4 py-1 uppercase ', {
              'text-haretaColor': isActive,
              'hover:text-lightText': !isActive
            })
          }
        >
          Update
        </NavLink>
        <NavLink
          to={adminPath.addItemImage}
          className={({ isActive }) =>
            classNames('px-4 py-1 uppercase ', {
              'text-haretaColor': isActive,
              'hover:text-lightText': !isActive
            })
          }
        >
          Item Images
        </NavLink>
        <NavLink
          to={adminPath.deleteItem}
          className={({ isActive }) =>
            classNames('px-4 py-1 uppercase ', {
              'text-haretaColor': isActive,
              'hover:text-lightText': !isActive
            })
          }
        >
          Delete
        </NavLink>
      </div>
      <div className='text-lightText min-h-[600px] py-4'>
        <Outlet />
      </div>
    </Fragment>
  )
}
