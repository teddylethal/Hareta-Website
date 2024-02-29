import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { AdminContext } from 'src/contexts/admin.context'
import { Product } from 'src/types/product.type'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import AdminCreatesProductForm from 'src/pages/Admin/components/AdminCreatesProductForm'
import { CreateProductSchema, createProductSchema } from 'src/pages/Admin/utils/rules'
import AdminCreatingProductHeader from 'src/pages/Admin/components/AdminCreatingProductHeader'
import AdminProductGroupList from 'src/pages/Admin/components/AdminProductGroupList'

type FormData = CreateProductSchema

export default function AdminCreatesProduct() {
  const { productGroup, setCurrentProduct } = useContext(AdminContext)

  //! CREATE NEW ITEM
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      group_id: '',
      category: '',
      price: 0,
      description: '',
      collection: '',
      type: '',
      quantity: 0,
      product_line: '',
      color: ''
    },
    resolver: yupResolver(createProductSchema)
  })
  const { handleSubmit, setValue } = methods

  const createNewProduct = useMutation({ mutationFn: adminProductApi.createNewProduct })
  const setDefaultProductMutation = useMutation({ mutationFn: adminProductApi.setDefaultProduct })
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    try {
      const newItemRespone = await createNewProduct.mutateAsync({ ...data })
      const newItem: Product = newItemRespone.data.data
      setCurrentProduct(newItem)
      await setDefaultProductMutation.mutateAsync({ id: newItem.id })
      navigate({ pathname: adminPath.uploadProductAvatar })
    } catch (error) {
      console.log(error)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          console.error(formError)
        }
      }
    }
  }

  return (
    <div className='space-y-4'>
      <AdminCreatingProductHeader />

      <AdminProductGroupList />

      <FormProvider {...methods}>
        <form
          className='relative space-y-4 overflow-hidden rounded-lg border border-white/40 p-4'
          onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
          {!productGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}

          <AdminCreatesProductForm />
          <div className='col-span-1 mt-2 flex items-center justify-end'>
            <button
              className='lg:text-lg rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor'
              type='submit'
            >
              Tạo sản phẩm
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
