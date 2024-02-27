import { useContext, useEffect, useState } from 'react'
import AdminUpdatingPage from '../AdminUpdatingPage'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { AdminContext } from '../../layouts/AdminMainLayout/AdminMainLayout'
import { UpdateItemSchema, updateItemSchema } from '../../utils/rules'
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import productApi from 'src/apis/product.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone, NoUndefinedField } from 'src/types/utils.type'
import AdminUpdateItemForm from '../../components/AdminUpdateItemForm'
import AdminProductGroup from '../../components/AdminProductGroup'
import AdminProductsInGroup from '../../components/AdminProductsInGroup'
import { AppContext } from 'src/contexts/app.context'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import AdminDialog from '../../components/AdminDialog'

type FormData = NoUndefinedField<UpdateItemSchema>

export default function AdminUpdateItem() {
  const { currentItem, ProductGroup, setCurrentItem } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  //? GET ITEM DETAIL
  const defaultItemID = currentItem?.id
  const { data: itemDetailData } = useQuery({
    queryKey: ['item_detail_for_admin', defaultItemID],
    queryFn: () => productApi.getProductDetail(defaultItemID as string),
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
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitSuccessful }
  } = methods

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
      setLoadingPage(true)
      await updateItemMutation.mutateAsync({ ...data })
      setLoadingPage(false)
      setCurrentItem(null)
      showSuccessDialog(setSuccessDialogOpen, 2000)
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  //? HANDLE CHOOSE GROUP
  useEffect(() => {
    setCurrentItem(null)
    reset()
  }, [ProductGroup, setCurrentItem, reset, setValue])

  return (
    <div>
      <AdminUpdatingPage />
      <div className='mt-12 space-y-8'>
        <div className='grid grid-cols-2 gap-12'>
          <div className='col-span-1'>
            <div className='sticky top-6 space-y-4'>
              <AdminProductGroup />
              <AdminProductsInGroup />
            </div>
          </div>
          <div className='col-span-1'>
            <FormProvider {...methods}>
              <form
                className='relative overflow-hidden rounded-lg border border-white/40 p-4'
                onSubmit={handleSubmit(onSubmit, onInvalid)}
              >
                {(!itemDetail || !currentItem) && <div className='absolute inset-0 z-10 bg-black/50'></div>}

                <AdminUpdateItemForm />
                <div className='col-span-1 mt-8 flex items-center justify-end'>
                  <button
                    className='lg:text-base rounded-lg bg-haretaColor/80 px-4 py-1 text-sm hover:bg-haretaColor/60'
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
      <AdminDialog isOpen={successDialogOpen} setIsOpen={setSuccessDialogOpen} />
    </div>
  )
}
