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
import AdminCreatingPage from '../AdminCreatingPage'
import AdminCreateProductForm from '../../components/AdminCreateProductForm/AdminCreateProductForm'
import AdminCreateProductGroup from '../../components/AdminCreateProductGroup'
import AdminProductGroupList from '../../components/AdminProductGroupList'

type FormData = CreateProductSchema

export default function AdminCreateProduct() {
  const { productGroup, setCurrentProduct } = useContext(AdminContext)
  //? CREATE NEW ITEM
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      group_id: '',
      category: '',
      price: 10,
      description: '',
      collection: '',
      type: '',
      quantity: 1,
      product_line: '',
      color: ''
    },
    resolver: yupResolver(createProductSchema)
  })
  const { handleSubmit, setValue } = methods

  useEffect(() => {
    if (productGroup) {
      setValue('name', productGroup.name)
      setValue('group_id', productGroup.id)
    }
  }, [productGroup, setValue])

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
    <div>
      <AdminCreatingPage />
      <div className='mt-4 space-y-8'>
        <div className='grid grid-cols-2 items-center gap-12'>
          <div className='col-span-1 space-y-4'>
            <AdminCreateProductGroup />
          </div>
          <div className='col-span-1'>
            <AdminProductGroupList />
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            className='relative space-y-4 overflow-hidden rounded-lg border border-white/40 p-4'
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            {!productGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}

            <AdminCreateProductForm />
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
    </div>
  )
}
