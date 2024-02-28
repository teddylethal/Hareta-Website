import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminMainLayout from 'src/pages/Admin/layouts/AdminMainLayout'

import AdminSetDefaultProduct from 'src/pages/Admin/pages/AdminSetDefaultItem/AdminSetDefaultItem'

//? IMPORT ADMIN LAYOUTS
const AdminItemLayout = lazy(() => import('src/pages/Admin/layouts/AdminItemLayout'))

//? IMPORT ADMIN COMPONENTS
const AdminDefaultProductList = lazy(() => import('src/pages/Admin/pages/AdminDefaultProductList'))
const AdminProductPage = lazy(() => import('src/pages/Admin/pages/AdminProductPage'))
const AdminCreateItem = lazy(() => import('src/pages/Admin/pages/AdminCreateItem'))
const AdminAddItemColor = lazy(() => import('src/pages/Admin/pages/AdminAddItemColor'))
const AdminMainPage = lazy(() => import('src/pages/Admin/pages/AdminMainPage'))
const AdminAddItemImage = lazy(() => import('src/pages/Admin/pages/AdminAddItemImage'))
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
          element: <AdminProductPage />
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
          path: adminPath.setDefaultProduct,
          element: <AdminSetDefaultProduct />
        },
        {
          path: adminPath.uploadProductAvatar,
          element: <AdminUploadProductAvatar />
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
