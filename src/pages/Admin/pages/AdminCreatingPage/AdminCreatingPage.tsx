import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

export default function AdminCreatingPage() {
  return (
    <div className='lg:text-base relative flex items-center justify-around  rounded-xl border  border-white/40 py-2 text-sm font-semibold text-lightText/80'>
      <NavLink
        to={adminPath.createProductGroup}
        end
        className={({ isActive }) =>
          classNames('px-8 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-lightText': !isActive
          })
        }
      >
        Tạo nhóm sản phẩm
      </NavLink>
      <NavLink
        to={adminPath.addProduct}
        end
        className={({ isActive }) =>
          classNames('px-4 py-1 uppercase ', {
            'text-haretaColor': isActive,
            'hover:text-lightText': !isActive
          })
        }
      >
        Thêm sản phẩm
      </NavLink>
    </div>
  )
}
