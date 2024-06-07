import OrderPayment from '../OrderPayment'
import OrderShippingInfor from '../OrderShippingInfor'
import OrderDetail from '../../components/OrderDetail'

export default function OrderCheckoutMobile() {
  return (
    <div className='space-y-4'>
      <OrderShippingInfor />
      <OrderPayment />
      <div className='rounded-lg bg-white p-1 text-darkText dark:bg-black dark:text-lightText tabletSmall:p-2'>
        <OrderDetail />
      </div>
    </div>
  )
}
