import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath, { orderPath, orderTrackingPath } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout'
import OrderTrackingPage from 'src/pages/OrderTrackingPage'
import OrderTrackingOrderDetail from 'src/pages/OrderTrackingPage/children/OrderTrackingOrderDetail'

const OrderPage = lazy(() => import('src/pages/OrderPage'))
const OrderCheckout = lazy(() => import('src/pages/OrderPage/children/OrderCheckout'))

function OrderTrackingRouteWrapper() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingWithEmptyContent />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

const OrderTrackingRoute: RouteObject = {
  path: '',
  element: <OrderTrackingRouteWrapper />,
  children: [
    {
      path: '',
      element: <OrderTrackingPage />
    },
    {
      path: orderTrackingPath.orderDetail,
      element: <OrderTrackingOrderDetail />
    }
  ]
}

export default OrderTrackingRoute
