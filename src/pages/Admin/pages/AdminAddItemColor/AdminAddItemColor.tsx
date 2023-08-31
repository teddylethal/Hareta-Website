import AdminItemGroup from '../../components/AdminItemGroup'
import { useContext, useEffect } from 'react'
import { CreatingItemSchema, creatingItemSchema } from '../../utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ItemInGroupConfig } from 'src/types/product.type'
import { adminItemApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import AdminAddItemColorForm from './AdminAddItemColorForm'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'

type FormData = CreatingItemSchema

export default function AdminAddItemColor() {
  const { itemGroup, setNewAddedItem } = useContext(CreatingItemContext)

  //? GET DEFAULT ITEM
  const itemInGroupQuery: ItemInGroupConfig = {
    id: itemGroup?.id as string,
    page: '1',
    limit: '50'
  }
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['items_in_group_for_admin', itemInGroupQuery],
    queryFn: () => productApi.getItemsInGroup(itemInGroupQuery),
    keepPreviousData: true,
    enabled: Boolean(itemGroup)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []
  const defaultItem = itemsInGroup.find((item) => item.default === true)

  const defaultItemID = defaultItem?.id
  const { data: itemDetailData } = useQuery({
    queryKey: ['item', defaultItemID],
    queryFn: () => productApi.getProductDetail(defaultItemID as string),
    keepPreviousData: true,
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
      quantity: 0,
      product_line: '',
      color: ''
    },
    resolver: yupResolver(creatingItemSchema)
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
  const addColorMutation = useMutation(adminItemApi.createNewItem)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    try {
      const newItem = await addColorMutation.mutateAsync({ ...data })
      if (newItem) {
        setNewAddedItem(newItem.data)
      }
      navigate({ pathname: path.adminUploadItemAvatar })
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
      <div className='flex items-center justify-center rounded-xl border border-white/40 py-4'>
        <p className='text-lg font-medium uppercase text-textLight lg:text-3xl'>Add new color</p>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8'>
          <div className='relative mt-4 w-full space-y-4 rounded-xl border border-white/40 bg-black p-4'>
            {!itemGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}
            <div className='grid grid-cols-4 items-center gap-2'>
              <div className='col-span-2'>
                <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>Avatar</p>
              </div>
              <div className='col-span-2 '>
                <div className='relative w-full pt-[75%]'>
                  {!itemGroup && (
                    <div className='absolute left-0 top-0 h-full w-full bg-white/20 object-scale-down'></div>
                  )}
                  {itemGroup && (
                    <img
                      src={defaultItem?.avatar.url || ''}
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
                    className='rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60 lg:text-lg'
                    type='submit'
                  >
                    Create
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className='col-span-4'>
          <div className='py-4'>
            <AdminItemGroup />
          </div>
        </div>
      </div>
    </div>
  )
}
