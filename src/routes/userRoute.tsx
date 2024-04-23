import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import MainLayout from 'src/layouts/MainLayout'
import UserLayout from 'src/pages/UserPages/layouts/UserLayout'

const UserChangePassword = lazy(() => import('src/pages/UserPages/children/UserChangePassword'))
const UserInventory = lazy(() => import('src/pages/UserPages/children/UserInventory'))
const UserProfile = lazy(() => import('src/pages/UserPages/children/UserProfile'))
const UserWishList = lazy(() => import('src/pages/UserPages/children/UserWishList'))

function UserRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <MainLayout>
      <UserLayout>
        <Suspense fallback={<LoadingWithEmptyContent />}>
          <Outlet />
        </Suspense>
      </UserLayout>
    </MainLayout>
  ) : (
    <Navigate to='/login' state={{ context: 'AccessProtectedRouteDenied', from: 'user' }} />
  )
}

const UserRoute: RouteObject = {
  path: '',
  element: <UserRouteWrapper />,
  children: [
    {
      path: mainPath.profile,
      element: <UserProfile />
    },
    {
      path: mainPath.password,
      element: <UserChangePassword />
    },
    {
      path: mainPath.inventory,
      element: <UserInventory />
    },
    {
      path: mainPath.wishList,
      element: <UserWishList />
    }
  ]
}

export default UserRoute
