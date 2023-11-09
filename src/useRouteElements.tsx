import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import path, { adminPath } from './constants/path'
import { OrderContext } from './contexts/order.context'
import Landing from './pages/Landing'

//? IMPORT LAYOUTS
// const RegisterLayout = lazy(() => import('./layouts/RegisterLayout'))
// const MainLayout = lazy(() => import('./layouts/MainLayout'))
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'

//? IMPORT MAIN PAGES
// const Login = lazy(() => import('./pages/Login'))
// const Register = lazy(() => import('./pages/Register'))
// const ProductList = lazy(() => import('./pages/ProductList'))
// const Cart = lazy(() => import('./pages/Cart'))
// const Home = lazy(() => import('./pages/Home'))
// const ProductDetail = lazy(() => import('./pages/ProductDetail'))
// const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
// const RequestVerifyEmail = lazy(() => import('./pages/RequestVerifyEmail'))
import Login from './pages/Login'
import Register from './pages/Register'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import VerifyEmail from './pages/VerifyEmail'
import RequestVerifyEmail from './pages/RequestVerifyEmail'

//? IMPORT USER COMPONENTS
// const UserLayout = lazy(() => import('./pages/User/layouts/UserLayout'))
// const Profile = lazy(() => import('./pages/User/pages/Profile'))
// const WishList = lazy(() => import('./pages/User/pages/WishList'))
// const Inventory = lazy(() => import('./pages/User/pages/Inventory'))
// const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
import UserLayout from './pages/User/layouts/UserLayout'
import Profile from './pages/User/pages/Profile'
import WishList from './pages/User/pages/WishList'
import Inventory from './pages/User/pages/Inventory'
import ChangePassword from './pages/User/pages/ChangePassword'

//? IMPORT PASSWORD RECOVERY
// const RequestPasswordRecovery = lazy(() => import('./pages/PasswordRecovery/RequestPasswordRecovery'))
// const ChangePasswordRecovery = lazy(() => import('./pages/PasswordRecovery/ChangePasswordRecovery'))
import RequestPasswordRecovery from './pages/PasswordRecovery/RequestPasswordRecovery'
import ChangePasswordRecovery from './pages/PasswordRecovery/ChangePasswordRecovery'

//? IMPORT ORDER COMPONENTS
// const OrderLayout = lazy(() => import('./pages/Order/layouts/OrderLayout'))
// const ShippingInfor = lazy(() => import('./pages/Order/pages/ShippingInfor'))
// const Payment = lazy(() => import('./pages/Order/pages/Payment'))
import OrderLayout from './pages/Order/layouts/OrderLayout'
import ShippingInfor from './pages/Order/pages/ShippingInfor'
import Payment from './pages/Order/pages/Payment'

//? IMPORT ADMIN COMPONENTS
import AdminLayout from './pages/Admin/layouts/AdminLayout'
import AdminCreateItem from './pages/Admin/pages/AdminCreateItem'
import AdminAddItemColor from './pages/Admin/pages/AdminAddItemColor'
import AdminMainPage from './pages/Admin/pages/AdminMainPage'
import AdminCreatingPage from './pages/Admin/pages/AdminCreatingPage'
import AdminUploadItemAvatar from './pages/Admin/pages/AdminUploadItemAvatar'
import AdminUpdatingPage from './pages/Admin/pages/AdminUpdatingPage'
import AdminSetDefaultItem from './pages/Admin/pages/AdminSetDefaultItem'
import AdminAddItemImage from './pages/Admin/pages/AdminAddItemImage'
import AdminImagesPage from './pages/Admin/pages/AdminImagesPage'
import AdminUpdateItem from './pages/Admin/pages/AdminUpdateItem'
import AdminDeleteItemImage from './pages/Admin/pages/AdminDeleteItemImage'
import AdminDeleteItem from './pages/Admin/pages/AdminDeleteItem'
import AdminDeleteGroup from './pages/Admin/pages/AdminDeleteGroup'
import NotFound from './pages/NotFound'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const isAdmin = profile?.role === 'admin'
  return <Outlet />
  // return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to={path.home} />
}

function OrderRoute() {
  const { orderList, tempOrderList } = useContext(OrderContext)
  const accpeted = orderList.length > 0 || tempOrderList.length > 0
  return accpeted ? <Outlet /> : <Navigate to={path.home} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? (
    <RegisterLayout>
      <Outlet />
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
              <UserLayout />
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
          element: (
            <AdminLayout>
              <AdminMainPage />
            </AdminLayout>
          )
        },
        {
          path: adminPath.creatingPage,
          element: (
            <AdminLayout>
              <AdminCreatingPage />
            </AdminLayout>
          )
        },
        {
          path: adminPath.createItem,
          element: (
            <AdminLayout>
              <AdminCreateItem />
            </AdminLayout>
          )
        },
        {
          path: adminPath.addItemColor,
          element: (
            <AdminLayout>
              <AdminAddItemColor />
            </AdminLayout>
          )
        },
        {
          path: adminPath.updatingPage,
          element: (
            <AdminLayout>
              <AdminUpdatingPage />
            </AdminLayout>
          )
        },
        {
          path: adminPath.setDefaultItem,
          element: (
            <AdminLayout>
              <AdminSetDefaultItem />
            </AdminLayout>
          )
        },
        {
          path: adminPath.uploadItemAvatar,
          element: (
            <AdminLayout>
              <AdminUploadItemAvatar />
            </AdminLayout>
          )
        },
        {
          path: adminPath.updateItem,
          element: (
            <AdminLayout>
              <AdminUpdateItem />
            </AdminLayout>
          )
        },
        {
          path: adminPath.images,
          element: (
            <AdminLayout>
              <AdminImagesPage />
            </AdminLayout>
          )
        },
        {
          path: adminPath.addItemImage,
          element: (
            <AdminLayout>
              <AdminAddItemImage />
            </AdminLayout>
          )
        },
        {
          path: adminPath.deleteItemImage,
          element: (
            <AdminLayout>
              <AdminDeleteItemImage />
            </AdminLayout>
          )
        },
        {
          path: adminPath.deleteItem,
          element: (
            <AdminLayout>
              <AdminDeleteItem />
            </AdminLayout>
          )
        },
        {
          path: adminPath.deleteGroup,
          element: (
            <AdminLayout>
              <AdminDeleteGroup />
            </AdminLayout>
          )
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
      path: '/landing',
      element: (
        <MainLayout>
          <Landing />
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
          <Cart />
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
