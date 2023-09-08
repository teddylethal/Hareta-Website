import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import OrderDesktopLayout from '../OrderDesktopLayout'
import OrderMobileLayout from '../OrderMobileLayout'
import { OrderSchema, orderSchema } from 'src/utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { OrderContext } from 'src/contexts/order.context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from 'src/apis/order.api'
import DialogPopup from 'src/components/DialogPopup'
import { AppContext } from 'src/contexts/app.context'
import { setOrderListToLS } from 'src/utils/order'
import PathBar from 'src/components/PathBar'

type FormData = OrderSchema

export default function OrderLayout() {
  const { orderList, addressCountry, addressCity, addressState, setOrderList, setConfirmPayment } =
    useContext(OrderContext)
  const { theme } = useContext(AppContext)

  const [successDialog, setSuccesDialog] = useState(false)

  const idList = orderList.map((orderItem) => orderItem.id)
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      id: idList
    },
    resolver: yupResolver(orderSchema)
  })
  const { getValues, handleSubmit } = methods

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  //? HANDLE PLACE ORDER
  const queryClient = useQueryClient()
  const createOrderMutation = useMutation(orderApi.createOrder)

  const onPlaceOrder = handleSubmit(async (data) => {
    try {
      const fullAddress = `${getValues('address')}, ${addressCity?.name}, ${addressState?.name}, ${addressCountry.name}`
      await createOrderMutation.mutateAsync({ ...data, address: fullAddress })
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      setSuccesDialog(true)
    } catch (error) {
      console.log(error)
    }
  })

  //? HANDLE CONFIRM
  const navigate = useNavigate()
  const handleConfirm = () => {
    setSuccesDialog(false)
    setOrderList([])
    setOrderListToLS([])
    navigate(path.cart)
    setConfirmPayment(false)
  }

  return (
    <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: 'home', url: '/' },
            { pathName: 'cart', url: '/cart' },
            { pathName: 'order', url: '/order/shipping-information' }
          ]}
        />
        <FormProvider {...methods}>
          <form onSubmit={onPlaceOrder}>
            {!isMobile && <OrderDesktopLayout />}

            {isMobile && <OrderMobileLayout />}
          </form>
        </FormProvider>
      </div>
      <DialogPopup
        isOpen={successDialog}
        handleClose={() => setSuccesDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
        closeButton={false}
      >
        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <div className='mb-4 text-center'>
            <FontAwesomeIcon
              icon={faCheck}
              className='text- h-auto w-8 rounded-full text-center text-success md:w-10 lg:w-12 xl:w-16'
            />
          </div>
          <p className='mt-6 text-center text-xl font-medium uppercase leading-6'>
            Your order was created successfully
          </p>
          <div className='mt-4 flex w-full items-center justify-center'>
            <button
              className='rounded-lg bg-brownColor/80 px-4 py-1 hover:bg-haretaColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60'
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </DialogPopup>
    </div>
  )
}
