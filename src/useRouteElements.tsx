import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
// import MainLayout from './layouts/MainLayout'
// import Landing from './pages/Landing'
import Profile from './pages/Profile'

const isAuthenticated = false
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        // <MainLayout>
        <ProductList />
        // </MainLayout>
      )
    },
    {
      path: '/profile',
      element: (
        // <MainLayout>
        <Profile />
        // </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            // <MainLayout>
            <Profile />
            // </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }

    // {
    //   path: '/landing',
    //   element: (
    //     <MainLayout>
    //       <Landing />
    //     </MainLayout>
    //   )
    // }
  ])
  return routeElements
}
