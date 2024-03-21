import OrderDetail from '../../components/OrderDetail'
import Payment from '../../pages/Payment'
import ShippingInfor from '../../pages/ShippingInfor'

export default function OrderMobileLayout() {
  return (
    <div>
      <ShippingInfor />
      <Payment />
      <div className='rounded-lg bg-white p-1 text-darkText dark:bg-black dark:text-lightText tabletSmall:p-2'>
        <OrderDetail />
      </div>
    </div>
  )
}
