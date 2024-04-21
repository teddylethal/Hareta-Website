import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import mainPath, { adminPath } from './constants/path'

import NotFound from './pages/NotFound'

//! IMPORT LAYOUTS
import MainLayout from './layouts/MainLayout'

//! IMPORT PAGES
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import LoadingWithEmptyContent from './components/LoadingWithEmptyContent'
import AdminRoute from './routes/adminRoute'
import UserRoute from './routes/userRoute'
import StorePage from './pages/StorePage'
import AuthenticationRoute from './routes/authenticationRoute'
import OrderRoute from './routes/orderRoute'

const CartPage = lazy(() => import('./pages/CartPage'))
const PrivacyAndTerms = lazy(() => import('./pages/Support/pages/PrivacyAndTerms'))
const OrderItemInformation = lazy(() => import('./pages/Support/components/OrderItemInformation'))

//! IMPORT USER COMPONENTS
const OrderTracking = lazy(() => import('./pages/Support/pages/OrderTracking'))

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
            <PrivacyAndTerms />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: mainPath.orderTracking,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <OrderTracking />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: mainPath.orderInformation,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingWithEmptyContent />}>
            <OrderItemInformation />
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
