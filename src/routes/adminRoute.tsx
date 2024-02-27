import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminMainLayout from 'src/pages/Admin/layouts/AdminMainLayout'

//? IMPORT ADMIN LAYOUTS
const AdminItemLayout = lazy(() => import('src/pages/Admin/layouts/AdminItemLayout'))

//? IMPORT ADMIN COMPONENTS
const AdminCreateItem = lazy(() => import('src/pages/Admin/pages/AdminCreateItem'))
const AdminAddItemColor = lazy(() => import('src/pages/Admin/pages/AdminAddItemColor'))
const AdminMainPage = lazy(() => import('src/pages/Admin/pages/AdminMainPage'))
const AdminUploadItemAvatar = lazy(() => import('src/pages/Admin/pages/AdminUploadItemAvatar'))
const AdminSetDefaultItem = lazy(() => import('src/pages/Admin/pages/AdminSetDefaultItem'))
const AdminAddItemImage = lazy(() => import('src/pages/Admin/pages/AdminAddItemImage'))
const AdminUpdateItem = lazy(() => import('src/pages/Admin/pages/AdminUpdateItem'))
const AdminDeleteItemImage = lazy(() => import('src/pages/Admin/pages/AdminDeleteItemImage'))
const AdminDeleteItem = lazy(() => import('src/pages/Admin/pages/AdminDeleteItem'))
const AdminDeleteGroup = lazy(() => import('src/pages/Admin/pages/AdminDeleteGroup'))
const AdminItem = lazy(() => import('src/pages/Admin/pages/AdminItem'))
const AdminOrder = lazy(() => import('src/pages/Admin/pages/AdminOrder'))

function AdminMainRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const isAdmin = profile?.role === 'admin'
  return isAuthenticated && isAdmin ? (
    <AdminMainLayout>
      <Suspense fallback={<LoadingWithEmptyContent />}>
        <Outlet />
      </Suspense>
    </AdminMainLayout>
  ) : (
    <Navigate to={path.home} />
  )
}

function AdminItemRoute() {
  return (
    <AdminItemLayout>
      <Outlet />
    </AdminItemLayout>
  )
}

const AdminRoute = {
  path: '',
  element: <AdminMainRoute />,
  children: [
    {
      path: '',
      element: <AdminMainPage />
    },
    {
      path: adminPath.items,
      element: <AdminItemRoute />,
      children: [
        {
          path: adminPath.createItem,
          element: <AdminCreateItem />
        },
        {
          path: adminPath.addItemColor,
          element: <AdminAddItemColor />
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
    // {
    //   path: adminPath.createItem,
    //   element: (
    //     <AdminItemLayout>
    //       <AdminCreateItem />
    //     </AdminItemLayout>
    //   )
    // },
    {
      path: adminPath.orderManagemnet,
      element: <AdminOrder />
    }
  ]
}

export default AdminRoute
