import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import OrderDesktopLayout from '../OrderDesktopLayout'
import OrderMobileLayout from '../OrderMobileLayout'
import { OrderSchema, OrderSchemaForGuest, orderSchema } from 'src/utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { OrderContext } from 'src/contexts/order.context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderApi } from 'src/apis/order.api'
import DialogPopup from 'src/components/DialogPopup'
import { AppContext } from 'src/contexts/app.context'
import { setOrderListToLS, setTempOrderListToLS } from 'src/utils/order'
import PathBar from 'src/components/PathBar'
import userApi from 'src/apis/user.api'
import { CartContext } from 'src/contexts/cart.context'
import { useTranslation } from 'react-i18next'

export default function OrderLayout() {
  const { orderList, addressCountry, addressState, setOrderList, setConfirmPayment, tempOrderList, setTempOrderList } =
    useContext(OrderContext)
  const { theme, isAuthenticated } = useContext(AppContext)
  const { tempExtendedPurchase, setTempExtendedPurchase } = useContext(CartContext)

  const [successDialog, setSuccesDialog] = useState(false)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  //? ORDER FORM
  const idList = orderList.map((orderItem) => orderItem.id)
  const methods = useForm<OrderSchema>({
    defaultValues: {
      // name: '',
      // phone: '',
      // email: '',
      // address: '',
      id: idList
    },
    resolver: yupResolver(orderSchema)
  })
  const { getValues, handleSubmit, setValue, clearErrors } = methods

  //? ORDER FORM FOR GUEST
  const itemList = tempOrderList.map((purchase) => ({ id: purchase.item.id, quantity: purchase.quantity }))

  //? GET USER INFO
  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile,
    staleTime: 1000 * 60 * 3,
    enabled: isAuthenticated
  })
  const profile = userData?.data.data

  //? HANDLE FILL USER INFO
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('phone', profile.phone || '')
      setValue('email', profile.email || '')
      // clearErrors('name')
      // clearErrors('phone')
      // clearErrors('email')
    }
  }, [profile, setValue, clearErrors])

  //? HANDLE PLACE ORDER
  const queryClient = useQueryClient()
  const createOrderMutation = useMutation(orderApi.createOrder)

  const onPlaceOrder = handleSubmit(async (data) => {
    try {
      const fullAddress = `${getValues('address')}, ${addressState?.name}, ${addressCountry.name}`
      await createOrderMutation.mutateAsync({ ...data, address: fullAddress })
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      setSuccesDialog(true)
    } catch (error) {
      console.log(error)
    }
  })

  //? PLACE ORDER WITHOUT LOGIN
  const createOrderForGuestMutation = useMutation(orderApi.createOrderWithouLogin)
  const placeOrderWithoutLogin = handleSubmit(async (data) => {
    const fullAddress = `${getValues('address')}, ${addressState?.name}, ${addressCountry.name}`
    const formData: OrderSchemaForGuest = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: fullAddress,
      item: itemList
    }
    try {
      await createOrderForGuestMutation.mutateAsync(formData)

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

  const guestConfirm = () => {
    const orderIdList = tempOrderList.map((tempOrderItem) => tempOrderItem.id)
    setSuccesDialog(false)
    setTempExtendedPurchase(tempExtendedPurchase.filter((tempPurchase) => !orderIdList.includes(tempPurchase.id)))
    setTempOrderList([])
    setTempOrderListToLS([])
    navigate(path.cart)
    setConfirmPayment(false)
  }

  //? translation
  const { t } = useTranslation('order')

  return (
    <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: t('path.Home'), url: '/' },
            { pathName: t('path.Cart'), url: '/cart' },
            { pathName: t('path.Order'), url: '/order' }
          ]}
        />
        <FormProvider {...methods}>
          <form onSubmit={isAuthenticated ? onPlaceOrder : placeOrderWithoutLogin}>
            {!isMobile && <OrderDesktopLayout />}

            {isMobile && <OrderMobileLayout />}
          </form>
        </FormProvider>
      </div>
      <DialogPopup
        isOpen={true}
        handleClose={() => setSuccesDialog(false)}
        classNameWrapper='relative w-10/12 md:w-8/12 max-w:lg transform overflow-hidden rounded-2xl py-6 px-4 align-middle shadow-xl transition-all'
        closeButton={false}
      >
        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <div className='mb-4 text-center'>
            <FontAwesomeIcon
              icon={faCheck}
              className='text- h-auto w-8 rounded-full text-center text-success md:w-10 lg:w-12 xl:w-16'
            />
          </div>
          <p className='mt-6 text-center text-base font-bold uppercase leading-6 md:text-lg xl:text-xl'>
            {t('layout.Your order was created successfully')}
          </p>
          <div className='mt-4 flex flex-col items-center justify-center space-y-2 text-sm font-medium md:text-base xl:text-lg'>
            <p className='text-center'>{t('layout.A payment instruction email was sent to your email address')}</p>
            <p className='text-center'>{t('layout.Please complete transaction in 48 hours to complete your order')}</p>
            <p className='text-center text-base font-semibold md:text-lg xl:text-xl'>{t('layout.Sincerely thanks!')}</p>
          </div>
          <div className='mt-4 flex w-full items-center justify-center'>
            <button
              className='rounded-lg bg-vintageColor px-4 py-1 hover:bg-vintageColor/90 dark:bg-haretaColor dark:hover:bg-haretaColor/90'
              onClick={isAuthenticated ? handleConfirm : guestConfirm}
            >
              {t('layout.Confirm')}
            </button>
          </div>
        </div>
      </DialogPopup>
    </div>
  )
}
