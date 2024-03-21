import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import mainPath, { adminPath } from './constants/path'
import { OrderContext } from './contexts/order.context'

import NotFound from './pages/NotFound'

//? IMPORT LAYOUTS
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'

//? IMPORT PAGES
import ProductList from './pages/ProductList'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import LoadingWithEmptyContent from './components/LoadingWithEmptyContent'
import UserLayout from './pages/User/layouts/UserLayout'
import AdminRoute from './routes/adminRoute'
import LoadingPage from './components/LoadingPage'

const Cart = lazy(() => import('./pages/Cart'))
const PrivacyAndTerms = lazy(() => import('./pages/Support/pages/PrivacyAndTerms'))
const OrderItemInformation = lazy(() => import('./pages/Support/components/OrderItemInformation'))

//? IMPORT USER COMPONENTS
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const WishList = lazy(() => import('./pages/User/pages/WishList'))
const Inventory = lazy(() => import('./pages/User/pages/Inventory'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const OrderTracking = lazy(() => import('./pages/Support/pages/OrderTracking'))

//? IMPORT LOGIN/REGISTER COMPONENTS
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const RequestVerifyEmail = lazy(() => import('./pages/RequestVerifyEmail'))
const RequestPasswordRecovery = lazy(() => import('./pages/PasswordRecovery/RequestPasswordRecovery'))
const ChangePasswordRecovery = lazy(() => import('./pages/PasswordRecovery/ChangePasswordRecovery'))

//? IMPORT ORDER COMPONENTS
const OrderLayout = lazy(() => import('./pages/Order/layouts/OrderLayout'))
const ShippingInfor = lazy(() => import('./pages/Order/pages/ShippingInfor'))
const Payment = lazy(() => import('./pages/Order/pages/Payment'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ context: 'AccessProtectedRouteDenied', from: 'user' }} />
  )
}

function OrderRoute() {
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

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? (
    <RegisterLayout>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </RegisterLayout>
  ) : (
    <Navigate to='/' />
  )
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: mainPath.login,
          element: <Login />
        },
        {
          path: mainPath.register,
          element: <Register />
        },
        {
          path: mainPath.requestVerify,
          element: <RequestVerifyEmail />
        },
        {
          path: mainPath.requestPasswordRecovery,
          element: <RequestPasswordRecovery />
        },
        {
          path: mainPath.changePasswordRecovery,
          element: <ChangePasswordRecovery />
        },
        {
          path: mainPath.verifyEmail,
          element: <VerifyEmail />
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: mainPath.profile,
              element: (
                <Suspense fallback={<LoadingWithEmptyContent />}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: mainPath.password,
              element: (
                <Suspense fallback={<LoadingWithEmptyContent />}>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: mainPath.inventory,
              element: (
                <Suspense fallback={<LoadingWithEmptyContent />}>
                  <Inventory />
                </Suspense>
              )
            },
            {
              path: mainPath.wishList,
              element: (
                <Suspense fallback={<LoadingWithEmptyContent />}>
                  <WishList />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: adminPath.mainPage,
      children: [AdminRoute]
    },
    {
      path: '',
      element: <OrderRoute />,
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
              element: <ShippingInfor />
            },
            {
              path: mainPath.payment,
              element: <Payment />
            }
          ]
        }
      ]
    },

    {
      path: mainPath.home,
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: mainPath.store,
      element: (
        <MainLayout>
          <ProductList />
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
            <Cart />
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
