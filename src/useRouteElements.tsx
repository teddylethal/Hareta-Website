import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import { AppContext } from './contexts/app.context'
import path from './constants/path'

import Profile from './pages/User/pages/Profile'
import Order from './pages/User/pages/Order'
import ChangePassword from './pages/User/pages/ChangePassword'
import UserLayout from './pages/User/layout/UserLayout'
import ProfileEdit from './pages/User/pages/ProfileEdit'
import History from './pages/User/pages/History'
import Favorite from './pages/User/pages/Favorite'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  return <Outlet />
  // return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
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
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.profileEdit,
              element: <ProfileEdit />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.history,
              element: <History />
            },
            {
              path: path.favorite,
              element: <Favorite />
            },
            {
              path: path.order,
              element: <Order />
            }
          ]
        }
      ]
    },

    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
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
    }
  ])
  return routeElements
}
