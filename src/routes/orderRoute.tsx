import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath, { orderPath } from 'src/constants/path'
import { OrderContext } from 'src/contexts/order.context'
import MainLayout from 'src/layouts/MainLayout'

const OrderPage = lazy(() => import('src/pages/OrderPage'))
const OrderCheckout = lazy(() => import('src/pages/OrderPage/children/OrderCheckout'))

function OrderRouteWrapper() {
  const { orderList, tempOrderList } = useContext(OrderContext)
  const accpeted = orderList.length > 0 || tempOrderList.length > 0

  return accpeted ? (
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
