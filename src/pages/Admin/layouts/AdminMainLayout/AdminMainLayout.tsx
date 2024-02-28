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
            <div className='lg:text-xl text-lightText/80 relative flex items-center  justify-around rounded-xl border border-haretaColor py-2 text-base font-semibold'>
              {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
              <NavLink
                to={adminPath.products}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-lightText': !isActive
                  })
                }
              >
                Item
              </NavLink>

              <NavLink
                to={adminPath.image}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-lightText': !isActive
                  })
                }
              >
                Image
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
                Order
              </NavLink>
            </div>
            <div className='text-lightText py-4'>{children}</div>
          </div>
        </div>
      </div>
    </AdminProvider>
  )
}
