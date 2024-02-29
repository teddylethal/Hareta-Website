import AdminProductGroup from '../../components/AdminProductGroup'
import { useContext, useEffect } from 'react'
import { AddProductSchema, AddProductSchema } from '../../utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ProductsInGroupConfig } from 'src/types/product.type'
import { adminProductApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import AdminAddItemColorForm from './AdminAddItemColorForm'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import AdminCreatingProductHeader from '../../components/AdminCreatingProductHeader'

type FormData = AddProductSchema

export default function AdminAddItemColor() {
  const { ProductGroup, setCurrentProduct } = useContext(AdminContext)

  //? GET DEFAULT ITEM
  const itemInGroupQuery: ProductsInGroupConfig = {
    id: ProductGroup?.id as string,
    page: '1',
    limit: '50'
  }
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['items_in_group_for_detail', itemInGroupQuery],
    queryFn: () => productApi.getItemsInGroup(itemInGroupQuery),

    enabled: Boolean(ProductGroup)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []
  const defaultItem = itemsInGroup.find((item) => item.default === true)

  const defaultItemID = defaultItem?.id
  const { data: itemDetailData } = useQuery({
    queryKey: ['item', defaultItemID],
    queryFn: () => productApi.getProductDetail(defaultItemID as string),

    staleTime: 3 * 60 * 1000,
    enabled: Boolean(defaultItem)
  })
  const description = itemDetailData?.data.data.description

  //? CREATE NEW ITEM
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      group_id: '',
      category: '',
      price: 0,
      description: '',
      collection: '',
      type: '',
      quantity: 1,
      product_line: '',
      color: ''
    },
    resolver: yupResolver(AddProductSchema)
  })

  const { handleSubmit, setValue, setError } = methods

  useEffect(() => {
    setValue('name', defaultItem?.name || '')
    setValue('group_id', defaultItem?.group.id || '')
    setValue('category', defaultItem?.category || '')
    setValue('collection', defaultItem?.collection || '')
    setValue('type', defaultItem?.type || '')
    setValue('product_line', defaultItem?.product_line || '')
    setValue('description', description || '')
    setValue('price', defaultItem?.price || 0)
  }, [defaultItem, description, setValue])

  const navigate = useNavigate()
  const addColorMutation = useMutation(adminProductApi.createNewProduct)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    try {
      const newItemRespone = await addColorMutation.mutateAsync({ ...data })
      const newItem = newItemRespone.data.data
      setCurrentProduct(newItem)
      navigate({ pathname: adminPath.uploadProductAvatar })
    } catch (error) {
      console.log(error)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          if (responeLog.search(`'color'`) !== -1) {
            setError('color', {
              message: 'Color',
              type: 'Server'
            })
          }
          if (responeLog.search(`'quantity'`) !== -1) {
            setError('quantity', {
              message: 'quantity',
              type: 'Server'
            })
          }
          if (responeLog.search(`'description'`) !== -1) {
            setError('description', {
              message: 'description',
              type: 'Server'
            })
          }
        }
      }
    }
  }

  return (
    <div className='relative'>
      <AdminCreatingProductHeader />

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <div className='relative mt-4 w-full space-y-4 overflow-hidden rounded-xl border border-white/40 bg-black p-4'>
            {!ProductGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}
            <div className='grid grid-cols-4 items-center gap-2'>
              <div className='col-span-2'>
                <p className='lg:text-lg text-base font-medium uppercase text-white/60'>Avatar</p>
              </div>
              <div className='col-span-2 '>
                <div className='relative w-full pt-[75%]'>
                  {!ProductGroup && (
                    <div className='absolute left-0 top-0 h-full w-full bg-white/20 object-scale-down'></div>
                  )}
                  {ProductGroup && (
                    <img
                      src={defaultItem?.avatar?.url || ''}
                      alt={defaultItem?.name}
                      className='absolute left-0 top-0 h-full w-full object-scale-down'
                    />
                  )}
                </div>
              </div>
            </div>
            <FormProvider {...methods}>
              <form className='space-y-4' onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <AdminAddItemColorForm />
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

        <div className='col-span-6'>
          <div className='sticky top-6 mt-4'>
            <AdminProductGroup />
          </div>
        </div>
      </div>
    </div>
  )
}
