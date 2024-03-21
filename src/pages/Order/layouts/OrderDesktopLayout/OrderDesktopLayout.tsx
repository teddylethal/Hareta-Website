import { Outlet } from 'react-router-dom'
import OrderHeader from '../../components/OrderHeader'
import OrderDetail from '../../components/OrderDetail'

export default function OrderDesktopLayout() {
  return (
    <div className='grid grid-cols-12 gap-4 desktop:gap-6'>
      <div className='col-span-7'>
        <OrderHeader />
        <div className='mt-4'>
          <Outlet />
        </div>
      </div>

      <div className='col-span-5'>
        <div className='sticky top-14 rounded-xl bg-lightColor700 p-3 text-darkText duration-200 dark:bg-darkColor700 dark:text-lightText desktop:top-20 desktop:p-4'>
          <OrderDetail />
        </div>
      </div>
    </div>
  )
}
