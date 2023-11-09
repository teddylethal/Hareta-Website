import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import path, { adminPath } from './constants/path'
import { OrderContext } from './contexts/order.context'

import NotFound from './pages/NotFound'
import PageIsLoading from './components/PageIsLoading'

//? IMPORT LAYOUTS
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './pages/Admin/layouts/AdminLayout'

//? IMPORT MAIN PAGES
import ProductList from './pages/ProductList'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import LoadingWithEmptyContent from './components/LoadingWithEmptyContent'
const Cart = lazy(() => import('./pages/Cart'))

//? IMPORT USER COMPONENTS
const UserLayout = lazy(() => import('./pages/User/layouts/UserLayout'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const WishList = lazy(() => import('./pages/User/pages/WishList'))
const Inventory = lazy(() => import('./pages/User/pages/Inventory'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))

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

//? IMPORT ADMIN COMPONENTS
const AdminCreateItem = lazy(() => import('./pages/Admin/pages/AdminCreateItem'))
const AdminAddItemColor = lazy(() => import('./pages/Admin/pages/AdminAddItemColor'))
const AdminMainPage = lazy(() => import('./pages/Admin/pages/AdminMainPage'))
const AdminCreatingPage = lazy(() => import('./pages/Admin/pages/AdminCreatingPage'))
const AdminUploadItemAvatar = lazy(() => import('./pages/Admin/pages/AdminUploadItemAvatar'))
const AdminUpdatingPage = lazy(() => import('./pages/Admin/pages/AdminUpdatingPage'))
const AdminSetDefaultItem = lazy(() => import('./pages/Admin/pages/AdminSetDefaultItem'))
const AdminAddItemImage = lazy(() => import('./pages/Admin/pages/AdminAddItemImage'))
const AdminUpdateItem = lazy(() => import('./pages/Admin/pages/AdminUpdateItem'))
const AdminImagesPage = lazy(() => import('./pages/Admin/pages/AdminImagesPage'))
const AdminDeleteItemImage = lazy(() => import('./pages/Admin/pages/AdminDeleteItemImage'))
const AdminDeleteItem = lazy(() => import('./pages/Admin/pages/AdminDeleteItem'))
const AdminDeleteGroup = lazy(() => import('./pages/Admin/pages/AdminDeleteGroup'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const isAdmin = profile?.role === 'admin'
  return isAuthenticated && isAdmin ? (
    <AdminLayout>
      <Suspense fallback={<PageIsLoading />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  ) : (
    <Navigate to={path.home} />
  )
}

function OrderRoute() {
  const { orderList, tempOrderList } = useContext(OrderContext)
  const accpeted = orderList.length > 0 || tempOrderList.length > 0
  return accpeted ? (
    <Suspense fallback={<PageIsLoading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={path.home} />
  )
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? (
    <RegisterLayout>
      <Suspense fallback={<PageIsLoading />}>
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
          path: path.login,
          element: <Login />
        },
        {
          path: path.register,
          element: <Register />
        },
        {
          path: path.requestVerify,
          element: <RequestVerifyEmail />
        },
        {
          path: path.requestPasswordRecovery,
          element: <RequestPasswordRecovery />
        },
        {
          path: path.changePasswordRecovery,
          element: <ChangePasswordRecovery />
        },
        {
          path: path.verifyEmail,
          element: <VerifyEmail />
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense fallback={<LoadingWithEmptyContent />}>
                <UserLayout />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: path.account,
              element: <Profile />
            },
            {
              path: path.password,
              element: <ChangePassword />
            },
            {
              path: path.inventory,
              element: <Inventory />
            },
            {
              path: path.wishList,
              element: <WishList />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: adminPath.mainPage,
          element: <AdminMainPage />
        },
        {
          path: adminPath.creatingPage,
          element: <AdminCreatingPage />
        },
        {
          path: adminPath.createItem,
          element: <AdminCreateItem />
        },
        {
          path: adminPath.addItemColor,
          element: <AdminAddItemColor />
        },
        {
          path: adminPath.updatingPage,
          element: <AdminUpdatingPage />
        },
        {
          path: adminPath.setDefaultItem,
          element: <AdminSetDefaultItem />
        },
        {
          path: adminPath.uploadItemAvatar,
          element: <AdminUploadItemAvatar />
        },
        {
          path: adminPath.updateItem,
          element: <AdminUpdateItem />
        },
        {
          path: adminPath.images,
          element: <AdminImagesPage />
        },
        {
          path: adminPath.addItemImage,
          element: <AdminAddItemImage />
        },
        {
          path: adminPath.deleteItemImage,
          element: <AdminDeleteItemImage />
        },
        {
          path: adminPath.deleteItem,
          element: <AdminDeleteItem />
        },
        {
          path: adminPath.deleteGroup,
          element: <AdminDeleteGroup />
        }
      ]
    },
    {
      path: '',
      element: <OrderRoute />,
      children: [
        {
          path: path.order,
          element: (
            <MainLayout>
              <OrderLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.shippingInfor,
              element: <ShippingInfor />
            },
            {
              path: path.payment,
              element: <Payment />
            }
          ]
        }
      ]
    },

    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: path.store,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.cart,
      element: (
        <MainLayout>
          <Suspense fallback={<PageIsLoading />}>
            <Cart />
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
