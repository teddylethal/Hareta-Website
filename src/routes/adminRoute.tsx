import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

import AdminOrderLayout from 'src/pages/Admin/layouts/AdminOrderLayout'
import AdminProductLayout from 'src/pages/Admin/layouts/AdminProductLayout'
import AdminMainLayout from 'src/pages/Admin/layouts/AdminMainLayout'
import AdminImageLayout from 'src/pages/Admin/layouts/AdminImageLayout'

//! LAZY IMPORT ADMIN PAGES
const AdminDefaultProductList = lazy(() => import('src/pages/Admin/children/AdminDefaultProductList'))
const AdminProductPage = lazy(() => import('src/pages/Admin/children/AdminProductPage'))
const AdminMainPage = lazy(() => import('src/pages/Admin/children/AdminMainPage'))
const AdminDeleteGroup = lazy(() => import('src/pages/Admin/children/AdminDeleteGroup'))
const AdminUploadProductAvatar = lazy(() => import('src/pages/Admin/children/AdminUploadProductAvatar'))
const AdminImageManagement = lazy(() => import('src/pages/Admin/children/AdminImageManagement'))
const AdminAddProductImage = lazy(() => import('src/pages/Admin/children/AdminAddProductImage'))
const AdminCreateProductGroup = lazy(() => import('src/pages/Admin/children/AdminCreateProductGroup'))
const AdminDeleteProduct = lazy(() => import('src/pages/Admin/children/AdminDeleteProduct'))
const AdminDeleteProductImage = lazy(() => import('src/pages/Admin/children/AdminDeleteProductImage'))
const AdminProductImagePage = lazy(() => import('src/pages/Admin/children/AdminProductImagePage'))
const AdminCreateProduct = lazy(() => import('src/pages/Admin/children/AdminCreateProduct'))
const AdminUploadImages = lazy(() => import('src/pages/Admin/children/AdminUploadImages'))
const AdminDeleteImages = lazy(() => import('src/pages/Admin/children/AdminDeleteImages'))
const AdminOrderMangement = lazy(() => import('src/pages/Admin/children/AdminOrderMangement'))

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

function AdminOrderRoute() {
  return (
    <AdminOrderLayout>
      <Outlet />
    </AdminOrderLayout>
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
      element: <AdminOrderRoute />,
      children: [
        {
          path: '',
          element: <AdminOrderMangement />
        }
      ]
    }
  ]
}

export default AdminRoute