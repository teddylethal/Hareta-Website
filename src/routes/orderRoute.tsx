import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath, { orderPath } from 'src/constants/path'
import { OrderContext, OrderProvider } from 'src/contexts/order.context'
import MainLayout from 'src/layouts/MainLayout'
import OrderPage from 'src/pages/OrderPage'
import OrderCheckout from 'src/pages/OrderPage/children/OrderCheckout'

const OrderPayment = lazy(() => import('src/pages/OrderPage/children/OrderPayment'))
const OrderShippingInfor = lazy(() => import('src/pages/OrderPage/children/OrderShippingInfor'))

function OrderRouteWrapper() {
  // const { orderList, tempOrderList } = useContext(OrderContext)
  // const accpeted = orderList.length > 0 || tempOrderList.length > 0

  return true ? (
    <MainLayout>
      <Suspense fallback={<LoadingWithEmptyContent />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  ) : (
    <Navigate to={mainPath.home} />
  )
}

const OrderRoute: RouteObject = {
  path: '',
  element: <OrderRouteWrapper />,
  children: [
    {
      path: '',
      element: <OrderPage />
    },
    {
      path: orderPath.checkout,
      element: <OrderCheckout />
    }
  ]
}

export default OrderRoute
