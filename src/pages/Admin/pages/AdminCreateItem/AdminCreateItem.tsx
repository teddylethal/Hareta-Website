import AdminCreateNewGroup from '../../components/AdminCreateNewGroup'
import { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreatingItemSchema, creatingItemSchema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import AdminCreateItemForm from '../../components/AdminCreateItemForm'
import { useMutation } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import AdminGroupNameList from '../../components/AdminGroupNameList'
import AdminSetDefaultItem from '../../components/AdminSetDefaultItem'
import { Product } from 'src/types/product.type'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import AdminCreatingPage from '../AdminCreatingPage'

type FormData = CreatingItemSchema

export default function AdminCreateItem() {
  const { itemGroup, setCurrentItem } = useContext(CreatingItemContext)
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
    resolver: yupResolver(creatingItemSchema)
  })
  const { handleSubmit, setValue } = methods

  useEffect(() => {
    setValue('name', itemGroup?.name || '')
    setValue('group_id', itemGroup?.id || '')
  }, [itemGroup, setValue])

  const createNewItem = useMutation(adminItemApi.createNewItem)
  const setDefaultItemMutation = useMutation(adminItemApi.setDefaultItem)
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    try {
      const newItemRespone = await createNewItem.mutateAsync({ ...data })
      const newItem: Product = newItemRespone.data.data
      setCurrentItem(newItem)
      await setDefaultItemMutation.mutateAsync({ id: newItem.id })
      navigate({ pathname: adminPath.uploadItemAvatar })
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
      <div className='mt-12 space-y-8'>
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
            className='relative space-y-4 rounded-lg border border-white/40 p-4'
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            {!itemGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}

            <AdminCreateItemForm />
            <div className='col-span-1 mt-2 flex items-center justify-end'>
              <button
                className='rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60 lg:text-lg'
                type='submit'
              >
                Create
              </button>
            </div>
          </form>
        </FormProvider>
        <AdminSetDefaultItem />
      </div>
    </div>
  )
}
