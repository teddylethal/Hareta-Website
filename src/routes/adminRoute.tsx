import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminImageManagement from 'src/pages/Admin/children/AdminImageManagement'
import AdminMainLayout from 'src/pages/Admin/layouts/AdminMainLayout'
import AdminProductLayout from 'src/pages/Admin/layouts/AdminProductLayout'
import AdminAddProductImage from 'src/pages/Admin/children/AdminAddProductImage'
import AdminCreateProductGroup from 'src/pages/Admin/children/AdminCreateProductGroup'
import AdminDeleteProduct from 'src/pages/Admin/children/AdminDeleteProduct'
import AdminDeleteProductImage from 'src/pages/Admin/children/AdminDeleteProductImage'
import AdminProductImagePage from 'src/pages/Admin/children/AdminProductImagePage'
import AdminCreateProduct from 'src/pages/Admin/children/AdminCreatesProduct'
import AdminImageLayout from 'src/pages/Admin/layouts/AdminImageLayout'
import AdminUploadImages from 'src/pages/Admin/children/AdminUploadImages'
import AdminDeleteImages from 'src/pages/Admin/children/AdminDeleteImages'

//? IMPORT ADMIN LAYOUTS

//? IMPORT ADMIN COMPONENTS
const AdminDefaultProductList = lazy(() => import('src/pages/Admin/children/AdminDefaultProductList'))
const AdminProductPage = lazy(() => import('src/pages/Admin/children/AdminProductPage'))
const AdminMainPage = lazy(() => import('src/pages/Admin/children/AdminMainPage'))
const AdminDeleteGroup = lazy(() => import('src/pages/Admin/children/AdminDeleteGroup'))
const AdminOrder = lazy(() => import('src/pages/Admin/children/AdminOrder'))
const AdminUploadProductAvatar = lazy(() => import('src/pages/Admin/children/AdminUploadProductAvatar'))

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

function AdminImageRoute() {
  return (
    <AdminImageLayout>
      <Outlet />
    </AdminImageLayout>
  )
}

const AdminRoute: RouteObject = {
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
          element: <AdminCreateProductGroup />
        },
        {
          path: adminPath.createProduct,
          element: <AdminCreateProduct />
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
    {
      path: adminPath.images,
      element: <AdminImageRoute />,
      children: [
        {
          path: '',
          element: <AdminImageManagement />
        },
        {
          path: adminPath.uploadImages,
          element: <AdminUploadImages />
        },
        {
          path: adminPath.deleteImages,
          element: <AdminDeleteImages />
        }
      ]
    },
    {
      path: adminPath.orders,
      element: <AdminOrder />
    }
  ]
}

export default AdminRoute
