import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

export default function AdminProductLayout({ children }: Props) {
  //! STYLES
  const itemStyle = (isActive: boolean) =>
    classNames('w-full flex items-center justify-start py-2 rounded-md px-4', {
      'bg-haretaColor text-darkText': isActive,
      'hover:text-darkText hover:bg-haretaColor': !isActive
    })

  return (
    <div className='relative grid min-h-screen grid-cols-12 gap-2'>
      <div className='col-span-2 p-2'>
        <div className='sticky top-4 flex flex-col items-center justify-around space-y-2 overflow-hidden rounded-md border border-white/40 p-3 text-base font-semibold text-lightText/80'>
          <NavLink to={adminPath.productList} className={({ isActive }) => itemStyle(isActive)}>
            Sản phẩm
          </NavLink>

          <NavLink to={adminPath.createProduct} className={({ isActive }) => itemStyle(isActive)}>
            Tạo
          </NavLink>

          <NavLink to={adminPath.addProductImage} className={({ isActive }) => itemStyle(isActive)}>
            Hình ảnh
          </NavLink>

          <NavLink to={adminPath.deleteProduct} className={({ isActive }) => itemStyle(isActive)}>
            Xóa
          </NavLink>
        </div>
      </div>
      <div className='col-span-10 p-2'>
        <div className='border border-white/20'>{children}</div>
      </div>
    </div>
  )
}
