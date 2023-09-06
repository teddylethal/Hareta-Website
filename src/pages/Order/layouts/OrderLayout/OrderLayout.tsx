import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import OrderDesktopLayout from '../OrderDesktopLayout'
import OrderMobileLayout from '../OrderMobileLayout'

export default function OrderLayout() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  return (
    <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg border border-black/20 bg-[#f8f8f8] px-2 py-1 text-xs font-medium uppercase text-textDark duration-500 dark:border-white/20 dark:bg-[#000] dark:text-textLight lg:mb-3 lg:space-x-2 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
          <NavLink
            to={path.home}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            home
          </NavLink>

          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.cart}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            cart
          </NavLink>

          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.order}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            order
          </NavLink>
        </div>
        {!isMobile && <OrderDesktopLayout />}
        {isMobile && <OrderMobileLayout />}
      </div>
    </div>
  )
}
