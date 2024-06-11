import { Suspense, lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import { orderTrackingPath } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout'

const OrderTrackingPage = lazy(() => import('src/pages/OrderTrackingPage'))
const OrderTrackingOrderDetail = lazy(() => import('src/pages/OrderTrackingPage/children/OrderTrackingOrderDetail'))

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
