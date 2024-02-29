import { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreateProductSchema, createProductSchema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { AdminContext } from 'src/contexts/admin.context'
import { Product } from 'src/types/product.type'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminCreatingProductHeader from '../../components/AdminCreatingProductHeader'
import AdminCreatesProductGroup from './AdminCreatesProductGroup'
import AdminCreatesProductForm from '../../components/AdminCreatesProductForm'
import AdminCreatesProduct from './AdminCreatesProduct'

type FormData = CreateProductSchema

export default function AdminCreatingProductPage() {
  return (
    <div>
      <AdminCreatingProductHeader />
      <div className='mt-4 space-y-8'>
        <AdminCreatesProductGroup />

        <AdminCreatesProduct />
        <div className=''>
          <div className='col-span-1 space-y-4'>
            <AdminCreatesProductGroup />
          </div>

          <div className='col-span-1'>
            <AdminProductGroupList />
          </div>
        </div>
      </div>
    </div>
  )
}
