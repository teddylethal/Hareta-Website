import { Suspense, lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath from 'src/constants/path'
import { OrderProvider } from 'src/contexts/order.context'
import MainLayout from 'src/layouts/MainLayout'
import OrderTrackingItemInformation from 'src/pages/OrderTrackingPage/children/OrderTrackingItemInformation/OrderTrackingItemInformation'

const CartPage = lazy(() => import('src/pages/CartPage'))
const OrderTrackingPage = lazy(() => import('src/pages/OrderTrackingPage'))
const PrivacyAndTermsPage = lazy(() => import('src/pages/PrivacyAndTermsPage'))
const ProductDetailPage = lazy(() => import('src/pages/ProductDetailPage'))
const StorePage = lazy(() => import('src/pages/StorePage'))
const OrderPage = lazy(() => import('src/pages/OrderPage'))

function MainRouteWrapper() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingWithEmptyContent />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

const MainRoute: RouteObject = {
  path: '',
  element: <MainRouteWrapper />,
  children: [
    {
      path: mainPath.store,
      element: <StorePage />
    },
    {
      path: mainPath.cart,
      element: <CartPage />
    },
    {
      path: mainPath.events,
      element: <CartPage />
    },
    {
      path: mainPath.privacyAndTerms,
      element: <PrivacyAndTermsPage />
    },
    {
      path: mainPath.order,
      element: (
        <OrderProvider>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <OrderPage />
          </Suspense>
        </OrderProvider>
      )
    },
    {
      path: mainPath.orderTracking,
      element: <OrderTrackingPage />
    },
    {
      path: mainPath.orderInformation,
      element: <OrderTrackingItemInformation />
    },
    {
      path: mainPath.productDetail,
      element: <ProductDetailPage />
    }
  ]
}

export default MainRoute
