import { Suspense, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath from 'src/constants/path'
import { OrderContext } from 'src/contexts/order.context'
import MainLayout from 'src/layouts/MainLayout'
import OrderPayment from 'src/pages/OrderPage/children/OrderPayment'
import OrderShippingInfor from 'src/pages/OrderPage/children/OrderShippingInfor'
import OrderLayout from 'src/pages/OrderPage/layouts/OrderLayout'

function OrderRouteWrapper() {
  const { orderList, tempOrderList } = useContext(OrderContext)
  const accpeted = orderList.length > 0 || tempOrderList.length > 0
  return accpeted ? (
    <Suspense fallback={<LoadingWithEmptyContent />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={mainPath.home} />
  )
}

const OrderRoute: RouteObject = {
  path: '',
  element: <OrderRouteWrapper />,
  children: [
    {
      path: mainPath.order,
      element: (
        <MainLayout>
          <OrderLayout />
        </MainLayout>
      ),
      children: [
        {
          path: mainPath.shippingInfor,
          element: <OrderShippingInfor />
        },
        {
          path: mainPath.payment,
          element: <OrderPayment />
        }
      ]
    }
  ]
}

export default OrderRoute