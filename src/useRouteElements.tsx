import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MyProfile from './pages/MyProfile'
// import MainLayout from './layouts/MainLayout'
// import Landing from './pages/Landing'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
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
    },
    {
      path: '/myprofile',
      element: <MyProfile />
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
