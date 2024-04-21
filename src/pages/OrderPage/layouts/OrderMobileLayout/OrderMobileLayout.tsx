import OrderPayment from '../../children/OrderPayment'
import OrderShippingInfor from '../../children/OrderShippingInfor'
import OrderDetail from '../../components/OrderDetail'

export default function OrderMobileLayout() {
  return (
    <div>
      <OrderShippingInfor />
      <OrderPayment />
      <div className='rounded-lg bg-white p-1 text-darkText dark:bg-black dark:text-lightText tabletSmall:p-2'>
        <OrderDetail />
      </div>
    </div>
  )
}
