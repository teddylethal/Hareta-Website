import { useContext, useEffect, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderApi } from 'src/apis/order.api'
import { formatDate, isAxiosBadRequestError } from 'src/utils/utils'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import classNames from 'classnames'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { adminOrderApi } from 'src/apis/admin.api'
import Input from 'src/components/Input'
import AdminDialog from '../AdminDialog'

const updateOrderSchema = yup.object({
  id: yup.string().required('Order ID is required'),
  status: yup
    .number()
    .typeError('Status must be a number')
    .required('Status is required')
    .min(-1, 'Status is limited from -1 to 4')
    .max(4, 'Status is limited from -1 to 4')
})
type UpdateOrderSchema = yup.InferType<typeof updateOrderSchema>

export default function AdminOrderDetail() {
  const { orderID } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)

  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  const choosingOrder = orderID != ''
  //? get order informtaion
  const { data: orderData, isLoading: loadingOrderData } = useQuery({
    queryKey: ['order_information_for_admin', orderID],
    queryFn: () => {
      return orderApi.getOrderById(orderID)
    },

    staleTime: 3 * 60 * 1000,
    enabled: choosingOrder
  })
  const orderInformation = orderData?.data.data

  //? UPDATE ORDER FORM
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
    control
  } = useForm<UpdateOrderSchema>({
    defaultValues: {
      id: orderID,
      status: 0
    },
    resolver: yupResolver(updateOrderSchema)
  })
  useEffect(() => {
    if (orderInformation) {
      setValue('id', orderInformation.id)
      setValue('status', orderInformation.status)
      clearErrors()
    }
  }, [clearErrors, orderInformation, setValue])

  //? HANDLE SUBMIT FORM
  const queryClient = useQueryClient()
  const updateOrderMutation = useMutation(adminOrderApi.updateOrder)
  const onSubmit = handleSubmit(async (data) => {
    setLoadingPage(true)
    try {
      await updateOrderMutation.mutateAsync({ id: orderID, status: data.status })
      setLoadingPage(false)
      setSuccessDialogOpen(true)
      queryClient.invalidateQueries({ queryKey: ['order_list_for_admin'] })
    } catch (error) {
      setLoadingPage(false)
      console.log(error)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          console.error(formError)
        }
      }
    }
  })

  return (
    <div className='min-h-40'>
      {!choosingOrder && (
        <div className='flex h-40 w-full items-center justify-center text-center font-semibold uppercase tablet:text-lg desktopLarge:text-xl'>
          Choose an order
        </div>
      )}
      {orderInformation && (
        <div className=''>
          <form className='relative rounded-md border border-white/40 px-3 py-2' onSubmit={onSubmit}>
            <div className='grid grid-cols-3 items-center gap-2'>
              <p className='col-span-1 uppercase'>Order ID:</p>
              <div className='col-span-2 text-haretaColor'>
                <Input
                  readOnly
                  className=''
                  inputClassName={classNames(
                    'text-haretaColor focus:outline-none bg-transparent cursor-not-allowed bg-slate-900 py-1 px-2 text-base desktop:text-lg rounded-lg desktop:text-lg',
                    {
                      'outline-red-600': Boolean(errors.id)
                    }
                  )}
                  errorClassName='hidden'
                  register={register}
                  name='id'
                  autoComplete='false'
                />
              </div>
            </div>
            <div className='mt-2 grid grid-cols-3 items-center gap-2'>
              <div className='col-span-1 items-center uppercase'>state:</div>
              <div className='col-span-2 items-center font-semibold'>
                <Controller
                  control={control}
                  name='status'
                  render={({ field }) => (
                    <InputNumber
                      inputClassName={classNames(
                        'text-haretaColor bg-slate-900 py-1 px-2 text-base desktop:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor desktop:text-lg',
                        {
                          'outline-red-600': Boolean(errors.status)
                        }
                      )}
                      errorClassName='hidden'
                      autoComplete='false'
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='mt-1 grid grid-cols-3 items-center gap-2'>
              <div className='col-span-1 items-center uppercase'></div>
              <div className='col-span-2 items-center font-semibold'>
                <div className='min-h-[1.25rem] text-sm text-red-600'>{errors.status?.message}</div>
              </div>
            </div>
            <div className='flex w-full items-center justify-end'>
              <button className='rounded-lg bg-haretaColor px-2 py-1 text-sm font-medium uppercase hover:bg-haretaColor/90'>
                Update
              </button>
            </div>
          </form>
          <div className='mt-6 flex w-full flex-col space-y-2'>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>Total:</div>
              <div className='col-span-2 font-semibold'>${orderInformation.total}</div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>Customer name:</div>
              <div className='col-span-2 font-semibold'>{orderInformation.name}</div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>email:</div>
              <div className='col-span-2 font-semibold text-haretaColor'>{orderInformation.email}</div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>phone:</div>
              <div className='col-span-2 font-semibold text-haretaColor'>{orderInformation.phone}</div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>address:</div>
              <div className='col-span-2 font-semibold'>{orderInformation.address}</div>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>created at:</div>
              <div className='col-span-2 font-semibold'>{formatDate(orderInformation.created_at)}</div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 uppercase'>updated at:</div>
              <div className='col-span-2 font-semibold'>{formatDate(orderInformation.updated_at)}</div>
            </div>
          </div>
        </div>
      )}
      <AdminDialog isOpen={successDialogOpen} setIsOpen={setSuccessDialogOpen} />
    </div>
  )
}
