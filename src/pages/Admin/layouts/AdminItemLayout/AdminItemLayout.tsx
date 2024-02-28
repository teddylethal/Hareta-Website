import classNames from 'classnames'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

export default function AdminItemLayout({ children }: Props) {
  //? STYLES

  const itemStyle = (isActive: boolean) =>
    classNames('col-span-1 flex items-center justify-center border-r py-2 border-haretaColor', {
      'bg-haretaColor text-darkText': isActive,
      'hover:text-darkText hover:bg-haretaColor/80': !isActive
    })
  return (
    <Fragment>
      <div className='lg:text-xl text-lightText/80 relative grid grid-cols-4 items-center justify-around overflow-hidden rounded-xl border border-haretaColor text-base font-semibold'>
        <NavLink to={adminPath.createItem} className={({ isActive }) => itemStyle(isActive)}>
          Create
        </NavLink>

        <NavLink to={adminPath.uploadProductAvatar} className={({ isActive }) => itemStyle(isActive)}>
          Update
        </NavLink>

        <NavLink to={adminPath.addItemImage} className={({ isActive }) => itemStyle(isActive)}>
          Item Images
        </NavLink>

        <NavLink
          to={adminPath.deleteItem}
          className={({ isActive }) =>
            classNames('col-span-1 flex items-center justify-center py-2', {
              'text-darkText bg-haretaColor': isActive,
              'hover:text-darkText hover:bg-haretaColor/80': !isActive
            })
          }
        >
          Delete
        </NavLink>
      </div>
      <div className='text-lightText min-h-[600px] py-4'>{children}</div>
    </Fragment>
  )
}
