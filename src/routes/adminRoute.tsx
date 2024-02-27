import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminMainLayout from 'src/pages/Admin/layouts/AdminMainLayout'

//? IMPORT ADMIN LAYOUTS
const AdminItemLayout = lazy(() => import('src/pages/Admin/layouts/AdminItemLayout'))

//? IMPORT ADMIN COMPONENTS
const AdminDefaultProductList = lazy(() => import('src/pages/Admin/pages/AdminDefaultProductList'))
const AdminProductDetail = lazy(() => import('src/pages/Admin/pages/AdminProductDetail'))
const AdminCreateItem = lazy(() => import('src/pages/Admin/pages/AdminCreateItem'))
const AdminAddItemColor = lazy(() => import('src/pages/Admin/pages/AdminAddItemColor'))
const AdminMainPage = lazy(() => import('src/pages/Admin/pages/AdminMainPage'))
const AdminSetDefaultItem = lazy(() => import('src/pages/Admin/pages/AdminSetDefaultItem'))
const AdminAddItemImage = lazy(() => import('src/pages/Admin/pages/AdminAddItemImage'))
const AdminUpdateItem = lazy(() => import('src/pages/Admin/pages/AdminUpdateItem'))
const AdminDeleteItemImage = lazy(() => import('src/pages/Admin/pages/AdminDeleteItemImage'))
const AdminDeleteItem = lazy(() => import('src/pages/Admin/pages/AdminDeleteItem'))
const AdminDeleteGroup = lazy(() => import('src/pages/Admin/pages/AdminDeleteGroup'))
const AdminOrder = lazy(() => import('src/pages/Admin/pages/AdminOrder'))
const AdminUploadProductAvatar = lazy(() => import('src/pages/Admin/pages/AdminUploadProductAvatar'))

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

function AdminProductRoute() {
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
      path: adminPath.products,
      element: <AdminProductRoute />,
      children: [
        {
          path: '',
          element: <AdminDefaultProductList />
        },
        {
          path: adminPath.productDetail,
          element: <AdminProductDetail />
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
          path: adminPath.setDefaultItem,
          element: <AdminSetDefaultItem />
        },
        {
          path: adminPath.uploadProductAvatar,
          element: <AdminUploadProductAvatar />
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
