import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import { AppContext } from './contexts/app.context'
import path, { adminPath } from './constants/path'
import Profile from './pages/User/pages/Profile'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import WishList from './pages/User/pages/WishList'
import UserLayout from './pages/User/layouts/UserLayout'
import Inventory from './pages/User/pages/Inventory'
import ChangePassword from './pages/User/pages/ChangePassword'
import VerifyEmail from './pages/VerifyEmail'
import RequestVerifyEmail from './pages/RequestVerifyEmail'
import RequestPasswordRecovery from './pages/PasswordRecovery/RequestPasswordRecovery'
import ChangePasswordRecovery from './pages/PasswordRecovery/ChangePasswordRecovery'
import AdminLayout from './pages/Admin/layouts/AdminLayout'
import AdminCreateItem from './pages/Admin/pages/AdminCreateItem'
import AdminAddItemColor from './pages/Admin/pages/AdminAddItemColor'
import AdminMainPage from './pages/Admin/pages/AdminMainPage'
import AdminCreatingPage from './pages/Admin/pages/AdminCreatingPage'
import AdminUploadItemAvatar from './pages/Admin/pages/AdminUploadItemAvatar'
import AdminUpdatingPage from './pages/Admin/pages/AdminUpdatingPage'
import AdminSetDefaultItem from './pages/Admin/pages/AdminSetDefaultItem'
import AdminImagesPage from './pages/Admin/pages/AdminImagesPage'
import AdminAddItemImage from './pages/Admin/pages/AdminAddItemImage'
import AdminUpdateItem from './pages/Admin/pages/AdminUpdateItem'
import AdminDeleteItemImage from './pages/Admin/pages/AdminDeleteItemImage'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const isAdmin = profile?.role === 'admin'
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to={path.home} />
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
      element: <ProtectedRoute />,
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
      path: path.verifyEmail,
      element: (
        // <MainLayout>
        <VerifyEmail />
        // </MainLayout>
      )
    },
    {
      path: path.cart,
      element: (
        <MainLayout>
          <Cart />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
