import OrderDetail from '../../components/OrderDetail'
import Payment from '../../pages/Payment'
import ShippingInfor from '../../pages/ShippingInfor'

export default function OrderMobileLayout() {
  return (
    <div>
      <ShippingInfor />
      <Payment />
      <div className='text-darkText sm:p-2 dark:text-lightText rounded-lg bg-white p-1 dark:bg-black'>
        <OrderDetail />
      </div>
    </div>
  )
}
