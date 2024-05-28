import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingWithEmptyContent from 'src/components/LoadingWithEmptyContent'
import path, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { AdminBlogProvider } from 'src/contexts/adminblog.context'

import AdminOrderLayout from 'src/pages/AdminPages/layouts/AdminOrderLayout'
import AdminProductLayout from 'src/pages/AdminPages/layouts/AdminProductLayout'
import AdminMainLayout from 'src/pages/AdminPages/layouts/AdminMainLayout'
import AdminImageLayout from 'src/pages/AdminPages/layouts/AdminImageLayout'
import AdminBlogLayout from 'src/pages/AdminPages/layouts/AdminBlogLayout'
import AdminBlogManagement from 'src/pages/AdminPages/children/AdminBlogManagement'
import AdminBlogDetail from 'src/pages/AdminPages/children/AdminBlogDetail'
import AdminBlogCreate from 'src/pages/AdminPages/children/AdminBlogCreate'

//! LAZY IMPORT ADMIN PAGES
const AdminMainPage = lazy(() => import('src/pages/AdminPages/children/AdminMainPage'))
const AdminImageManagement = lazy(() => import('src/pages/AdminPages/children/AdminImageManagement'))
const AdminUploadImages = lazy(() => import('src/pages/AdminPages/children/AdminUploadImages'))
const AdminDeleteImages = lazy(() => import('src/pages/AdminPages/children/AdminDeleteImages'))
const AdminOrderMangement = lazy(() => import('src/pages/AdminPages/children/AdminOrderMangement'))

//! Lazy loading product pages
const AdminProductManagement = lazy(() => import('src/pages/AdminPages/children/AdminProductManagement'))
const AdminProductDetail = lazy(() => import('src/pages/AdminPages/children/AdminProductDetail'))

const AdminProductCreate = lazy(() => import('src/pages/AdminPages/children/AdminProductCreate'))
const AdminProductCreateGroup = lazy(() => import('src/pages/AdminPages/children/AdminProductCreateGroup'))

const AdminProductUpdateAvatar = lazy(() => import('src/pages/AdminPages/children/AdminProductUpdateAvatar'))
const AdminProductImagePage = lazy(() => import('src/pages/AdminPages/children/AdminProductImagePage'))

const AdminProductDeleteProduct = lazy(() => import('src/pages/AdminPages/children/AdminProductDeleteProduct'))
const AdminProductDeleteGroup = lazy(() => import('src/pages/AdminPages/children/AdminProductDeleteGroup'))

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

function AdminBlogRoute() {
  return (
    <AdminBlogLayout>
      <AdminBlogProvider>
        <Outlet />
      </AdminBlogProvider>
    </AdminBlogLayout>
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
          path: '',
          element: <AdminProductManagement />
        },
        {
          path: adminPath.createProductGroup,
          element: <AdminProductCreateGroup />
        },
        {
          path: adminPath.createProduct,
          element: <AdminProductCreate />
        },
        {
          path: adminPath.uploadProductAvatar,
          element: <AdminProductUpdateAvatar />
        },
        {
          path: adminPath.productImage,
          element: <AdminProductImagePage />
        },

        {
          path: adminPath.deleteProduct,
          element: <AdminProductDeleteProduct />
        },
        {
          path: adminPath.deleteGroup,
          element: <AdminProductDeleteGroup />
        },
        {
          path: adminPath.productDetail,
          element: <AdminProductDetail />
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
    },
    {
      path: adminPath.blogs,
      element: <AdminBlogRoute />,
      children: [
        {
          path: '',
          element: <AdminBlogManagement />
        },
        {
          path: adminPath.blogCreate,
          element: <AdminBlogCreate />
        },
        {
          path: adminPath.blogDetail,
          element: <AdminBlogDetail />
        }
      ]
    }
  ]
}

export default AdminRoute
