import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminProvider } from 'src/contexts/admin.context'

interface Props {
  children?: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <AdminProvider>
      <div className='bg-darkBg'>
        <div className='container'>
          <div className='py-8'>
            <div className='lg:text-xl relative flex items-center justify-around rounded-xl border border-haretaColor py-2 text-base font-semibold text-lightText/80'>
              {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
              <NavLink
                to={adminPath.productList}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-lightText': !isActive
                  })
                }
              >
                Sản phẩm
              </NavLink>

              <NavLink
                to={adminPath.images}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-lightText': !isActive
                  })
                }
              >
                Hình ảnh
              </NavLink>

              <NavLink
                to={adminPath.orderManagemnet}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-lightText': !isActive
                  })
                }
              >
                Đơn hàng
              </NavLink>
            </div>
            <div className='py-4 text-lightText'>{children}</div>
          </div>
        </div>
      </div>
    </AdminProvider>
  )
}
