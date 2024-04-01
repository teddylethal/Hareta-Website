import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminProvider } from 'src/contexts/admin.context'
import { NavigateItem } from 'src/types/utils.type'

interface Props {
  children?: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  const menus: NavigateItem[] = [
    { name: 'Sản phẩm', url: adminPath.products },
    { name: 'Hình ảnh', url: adminPath.images },
    { name: 'Đơn hàng', url: adminPath.orders },
    { name: 'Bài viết', url: adminPath.blogs }
  ]

  return (
    <AdminProvider>
      <div className='bg-darkBg'>
        <div className='container'>
          <div className='py-8'>
            <div className='relative flex items-center justify-around rounded-xl border border-haretaColor py-2 text-base font-semibold text-lightText/80 desktop:text-xl'>
              {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
              {menus.map((menu, index) => (
                <NavLink
                  key={index}
                  to={menu.url}
                  className={({ isActive }) =>
                    classNames('px-4 py-1 uppercase ', {
                      'text-haretaColor': isActive,
                      'hover:text-lightText': !isActive
                    })
                  }
                >
                  {menu.name}
                </NavLink>
              ))}
            </div>
            <div className='py-4 text-lightText'>{children}</div>
          </div>
        </div>
      </div>
    </AdminProvider>
  )
}
