import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminMainLayout from 'src/pages/Admin/layouts/AdminMainLayout'
import AdminProductLayout from 'src/pages/Admin/layouts/AdminProductLayout'
import AdminAddProductImage from 'src/pages/Admin/pages/AdminAddProductImage'
import AdminCreatingProductPage from 'src/pages/Admin/pages/AdminCreatingProductPage'
import AdminCreatesProduct from 'src/pages/Admin/pages/AdminCreatingProductPage/AdminCreatesProduct'
import AdminCreatesProductGroup from 'src/pages/Admin/pages/AdminCreatingProductPage/AdminCreatesProductGroup'
import AdminDeleteProduct from 'src/pages/Admin/pages/AdminDeleteProduct'
import AdminDeleteProductImage from 'src/pages/Admin/pages/AdminDeleteProductImage'
import AdminProductImagePage from 'src/pages/Admin/pages/AdminProductImagePage'

import AdminSetDefaultProduct from 'src/pages/Admin/pages/AdminSetDefaultItem/AdminSetDefaultItem'

//? IMPORT ADMIN LAYOUTS

//? IMPORT ADMIN COMPONENTS
const AdminDefaultProductList = lazy(() => import('src/pages/Admin/pages/AdminDefaultProductList'))
const AdminProductPage = lazy(() => import('src/pages/Admin/pages/AdminProductPage'))
const AdminAddItemColor = lazy(() => import('src/pages/Admin/pages/AdminAddItemColor'))
const AdminMainPage = lazy(() => import('src/pages/Admin/pages/AdminMainPage'))
const AdminDeleteGroup = lazy(() => import('src/pages/Admin/pages/AdminDeleteGroup'))
const AdminOrder = lazy(() => import('src/pages/Admin/pages/AdminOrder'))
const AdminUploadProductAvatar = lazy(
  () => import('src/pages/Admin/pages/AdminProductImagePage/AdminUploadProductAvatar')
)

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
    <AdminProductLayout>
      <Outlet />
    </AdminProductLayout>
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
          path: adminPath.productList,
          element: <AdminDefaultProductList />
        },
        {
          path: adminPath.productDetail,
          element: <AdminProductPage />
        },
        {
          path: adminPath.createProductGroup,
          element: <AdminCreatesProductGroup />
        },
        {
          path: adminPath.createProduct,
          element: <AdminCreatesProduct />
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
          path: adminPath.productImage,
          element: <AdminProductImagePage />
        },

        {
          path: adminPath.addProductImage,
          element: <AdminAddProductImage />
        },
        {
          path: adminPath.deleteProductImage,
          element: <AdminDeleteProductImage />
        },
        {
          path: adminPath.deleteProduct,
          element: <AdminDeleteProduct />
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
    //     <AdminProductLayout>
    //       <AdminCreatingProductPage />
    //     </AdminProductLayout>
    //   )
    // },
    {
      path: adminPath.orderManagemnet,
      element: <AdminOrder />
    }
  ]
}

export default AdminRoute
