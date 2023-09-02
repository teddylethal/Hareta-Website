import { useContext, useEffect, useState } from 'react'
import AdminUpdatingPage from '../AdminUpdatingPage'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import { UpdateItemSchema, updateItemSchema } from '../../utils/rules'
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import productApi from 'src/apis/product.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import AdminUpdateItemForm from '../../components/AdminUpdateItemForm'
import AdminItemGroup from '../../components/AdminItemGroup'
import AdminItemsInGroup from '../../components/AdminItemsInGroup'
import { AppContext } from 'src/contexts/app.context'
import DialogPopup from 'src/components/DialogPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'

type FormData = UpdateItemSchema

export default function AdminUpdateItem() {
  const { currentItem, itemGroup, setCurrentItem } = useContext(CreatingItemContext)
  const { setPageIsLoading } = useContext(AppContext)
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  //? GET ITEM DETAIL
  const defaultItemID = currentItem?.id
  const { data: itemDetailData } = useQuery({
    queryKey: ['item', defaultItemID],
    queryFn: () => productApi.getProductDetail(defaultItemID as string),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(currentItem)
  })
  const itemDetail = itemDetailData?.data.data

  //? CREATE NEW ITEM
  const methods = useForm<FormData>({
    defaultValues: {
      id: '',
      name: '',
      category: '',
      collection: '',
      type: '',
      color: '',
      product_line: '',
      description: '',
      price: 0,
      quantity: 0,
      discount: 0,
      tag: 0,
      like_count: 0,
      sold: 0,
      cron_status: 0
    },
    resolver: yupResolver(updateItemSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    if (itemDetail) {
      setValue('id', itemDetail.id)
      setValue('name', itemDetail.name)
      setValue('category', itemDetail.category)
      setValue('collection', itemDetail.collection)
      setValue('type', itemDetail.type)
      setValue('color', itemDetail.color)
      setValue('product_line', itemDetail.product_line)
      setValue('description', itemDetail.description)
      setValue('price', itemDetail.price)
      setValue('quantity', itemDetail.quantity)
      setValue('discount', itemDetail.discount)
      setValue('tag', itemDetail.tag)
      setValue('like_count', itemDetail.like_count)
      setValue('cron_status', itemDetail.cron_status)
    }
  }, [itemDetail, setValue])

  const updateItemMutation = useMutation(adminItemApi.updateItem)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    try {
      setPageIsLoading(true)
      await updateItemMutation.mutateAsync({ ...data })
      showSuccessDialog(setSuccessDialogOpen)
      setPageIsLoading(false)
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

  //? HANDLE CHOOSE GROUP
  useEffect(() => {
    setCurrentItem(null)
    reset()
  }, [itemGroup, setCurrentItem, reset])

  return (
    <div>
      <AdminUpdatingPage />
      <div className='mt-12 space-y-8'>
        <div className='grid grid-cols-2 gap-12'>
          <div className='col-span-1'>
            <div className='sticky top-6 space-y-4'>
              <AdminItemGroup />
              <AdminItemsInGroup />
            </div>
          </div>
          <div className='col-span-1'>
            <FormProvider {...methods}>
              <form
                className='relative space-y-4 overflow-hidden rounded-lg border border-white/40 p-4'
                onSubmit={handleSubmit(onSubmit, onInvalid)}
              >
                {(!itemDetail || !currentItem) && <div className='absolute inset-0 z-10 bg-black/50'></div>}

                <AdminUpdateItemForm />
                <div className='col-span-1 mt-2 flex items-center justify-end'>
                  <button
                    className='rounded-lg bg-haretaColor/80 px-4 py-1 text-sm hover:bg-haretaColor/60 lg:text-base'
                    type='submit'
                  >
                    Update
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      <DialogPopup
        isOpen={successDialogOpen}
        handleClose={() => {
          setSuccessDialogOpen(false)
        }}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={'text- rounded-full  bg-white/20 p-4 text-center text-success'}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Upload avatar successfully</p>
      </DialogPopup>
    </div>
  )
}
