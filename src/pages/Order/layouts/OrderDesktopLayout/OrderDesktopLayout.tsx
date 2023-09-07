import { Outlet } from 'react-router-dom'
import OrderHeader from '../../components/OrderHeader'
import OrderDetail from '../../components/OrderDetail'

export default function OrderDesktopLayout() {
  return (
    <div className='grid grid-cols-12 gap-4 lg:gap-6'>
      <div className='col-span-7'>
        <OrderHeader />
        <div className='mt-4'>
          <Outlet />
        </div>
      </div>

      <div className='col-span-5'>
        <div className='sticky top-14 rounded-xl bg-white p-3 text-textDark duration-500 dark:bg-black dark:text-textLight lg:top-20 lg:p-4'>
          <OrderDetail />
        </div>
      </div>
    </div>
  )
}
