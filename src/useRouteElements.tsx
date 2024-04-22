import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import mainPath, { adminPath } from './constants/path'

import NotFound from './pages/NotFound'

//! IMPORT LAYOUTS
import MainLayout from './layouts/MainLayout'

//! IMPORT PAGES
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetailPage'
import LoadingWithEmptyContent from './components/LoadingWithEmptyContent'
import AdminRoute from './routes/adminRoute'
import UserRoute from './routes/userRoute'
import StorePage from './pages/StorePage'
import AuthenticationRoute from './routes/authenticationRoute'
import OrderRoute from './routes/orderRoute'

const CartPage = lazy(() => import('./pages/CartPage'))
const PrivacyAndTermsPage = lazy(() => import('./pages/PrivacyAndTermsPage'))
const OrderTrackingItemInformation = lazy(
  () => import('./pages/OrderTrackingPage/children/OrderTrackingItemInformation')
)
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage'))

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: mainPath.home,
      index: true,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: '',
      children: [AuthenticationRoute]
    },
    {
      path: mainPath.user,
      children: [UserRoute]
    },

    {
      path: adminPath.mainPage,
      children: [AdminRoute]
    },
    {
      path: '',
      children: [OrderRoute]
    },

    {
      path: mainPath.store,
      element: (
        <MainLayout>
          <StorePage />
        </MainLayout>
      )
    },
    {
      path: mainPath.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: mainPath.cart,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <CartPage />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: mainPath.privacyAndTerms,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <PrivacyAndTermsPage />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: mainPath.orderTracking,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <OrderTrackingPage />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: mainPath.orderInformation,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <OrderTrackingItemInformation />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
