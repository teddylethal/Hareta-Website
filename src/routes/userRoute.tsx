import { Suspense, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import MainLayout from 'src/layouts/MainLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import UserChangePassword from 'src/pages/User/pages/UserChangePassword'
import UserInventory from 'src/pages/User/pages/UserInventory'
import UserProfile from 'src/pages/User/pages/UserProfile'
import UserWishList from 'src/pages/User/pages/UserWishList'

function ProtectedUserRoute() {
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
  element: <ProtectedUserRoute />,
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
