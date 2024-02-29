import { Outlet } from 'react-router-dom'
import OrderHeader from '../../components/OrderHeader'
import OrderDetail from '../../components/OrderDetail'

export default function OrderDesktopLayout() {
  return (
    <div className='lg:gap-6 grid grid-cols-12 gap-4'>
      <div className='col-span-7'>
        <OrderHeader />
        <div className='mt-4'>
          <Outlet />
        </div>
      </div>

      <div className='col-span-5'>
        <div className='lg:top-20 lg:p-4 bg-lightColor700 sticky top-14 rounded-xl p-3 text-darkText duration-200 dark:bg-darkColor700 dark:text-lightText'>
          <OrderDetail />
        </div>
      </div>
    </div>
  )
}
