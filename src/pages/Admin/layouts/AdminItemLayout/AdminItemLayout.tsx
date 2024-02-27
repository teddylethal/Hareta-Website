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
      'bg-haretaColor text-textDark': isActive,
      'hover:text-textDark hover:bg-haretaColor/80': !isActive
    })
  return (
    <Fragment>
      <div className='lg:text-xl relative grid grid-cols-4 items-center justify-around overflow-hidden rounded-xl border border-haretaColor text-base font-semibold text-textLight/80'>
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
              'bg-haretaColor text-textDark': isActive,
              'hover:bg-haretaColor/80 hover:text-textDark': !isActive
            })
          }
        >
          Delete
        </NavLink>
      </div>
      <div className='min-h-[600px] py-4 text-textLight'>{children}</div>
    </Fragment>
  )
}
