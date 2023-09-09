import OrderDetail from '../../components/OrderDetail'
import Payment from '../../pages/Payment'
import ShippingInfor from '../../pages/ShippingInfor'

export default function OrderMobileLayout() {
  return (
    <div>
      <ShippingInfor />
      <Payment />
      <div className='rounded-lg bg-white p-1 text-textDark dark:bg-black dark:text-textLight sm:p-2'>
        <OrderDetail />
      </div>
    </div>
  )
}
