import AdminCreateNewGroup from '../../components/AdminCreateNewGroup'
import { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AddProductSchema, AddProductSchema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import AdminCreateItemForm from '../../components/AdminCreateItemForm'
import { useMutation } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { AdminContext } from 'src/contexts/admin.context'
import AdminGroupNameList from '../../components/AdminGroupNameList'
import { Product } from 'src/types/product.type'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import AdminCreatingPage from '../AdminCreatingPage'

type FormData = AddProductSchema

export default function AdminCreateItem() {
  const { ProductGroup, setCurrentProduct } = useContext(AdminContext)
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
    resolver: yupResolver(AddProductSchema)
  })
  const { handleSubmit, setValue } = methods

  useEffect(() => {
    setValue('name', ProductGroup?.name || '')
    setValue('group_id', ProductGroup?.id || '')
  }, [ProductGroup, setValue])

  const createNewProduct = useMutation(adminProductApi.createNewProduct)
  const setDefaultProductMutation = useMutation(adminProductApi.setDefaultProduct)
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
            <AdminCreateNewGroup />
          </div>
          <div className='col-span-1'>
            <AdminGroupNameList />
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            className='relative space-y-4 overflow-hidden rounded-lg border border-white/40 p-4'
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            {!ProductGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}

            <AdminCreateItemForm />
            <div className='col-span-1 mt-2 flex items-center justify-end'>
              <button
                className='lg:text-lg rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60'
                type='submit'
              >
                Create
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
