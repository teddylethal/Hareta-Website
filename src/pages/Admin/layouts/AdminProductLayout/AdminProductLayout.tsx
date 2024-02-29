import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

export default function AdminProductLayout({ children }: Props) {
  //? STYLES

  const itemStyle = (isActive: boolean) =>
    classNames('w-full flex items-center justify-start py-2 rounded-md px-4', {
      'bg-haretaColor text-darkText': isActive,
      'hover:text-darkText hover:bg-haretaColor': !isActive
    })
  return (
    <div className='relative grid grid-cols-12 gap-2'>
      <div className='col-span-2'>
        <div className='sticky top-2 flex flex-col items-center justify-around space-y-2 overflow-hidden rounded-md border border-white/40 px-4 py-2 text-base font-semibold text-lightText/80'>
          <NavLink to={adminPath.productList} className={({ isActive }) => itemStyle(isActive)}>
            Sản phẩm
          </NavLink>

          <NavLink to={adminPath.createProduct} className={({ isActive }) => itemStyle(isActive)}>
            Tạo
          </NavLink>

          <NavLink to={adminPath.uploadProductAvatar} className={({ isActive }) => itemStyle(isActive)}>
            Chỉnh sửa
          </NavLink>

          <NavLink to={adminPath.addItemImage} className={({ isActive }) => itemStyle(isActive)}>
            Hình ảnh
          </NavLink>

          <NavLink to={adminPath.deleteItem} className={({ isActive }) => itemStyle(isActive)}>
            Xóa
          </NavLink>
        </div>
      </div>
      <div className='col-span-10'>
        <div className='min-h-[600px] text-lightText'>{children}</div>
      </div>
    </div>
  )
}
