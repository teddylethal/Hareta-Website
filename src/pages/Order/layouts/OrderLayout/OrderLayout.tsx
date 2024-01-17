import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import OrderDesktopLayout from '../OrderDesktopLayout'
import OrderMobileLayout from '../OrderMobileLayout'
import { OrderSchema, OrderSchemaForGuest, orderSchema } from 'src/utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { Fragment, useContext, useEffect, useState } from 'react'
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
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/cart.api'
import { ColorRing } from 'react-loader-spinner'
import { FloatingOverlay } from '@floating-ui/react'
import { motion } from 'framer-motion'

export default function OrderLayout() {
  const { orderList, addressCountry, addressState, setOrderList, setConfirmPayment, tempOrderList, setTempOrderList } =
    useContext(OrderContext)
  const { theme, isAuthenticated } = useContext(AppContext)
  const { tempExtendedPurchase, setTempExtendedPurchase, setUnavailablePurchaseIds } = useContext(CartContext)

  const [successDialog, setSuccesDialog] = useState(false)
  const [processingDialog, setProcessingDialog] = useState<boolean>(false)
  const [unavailableOrder, setUnavailableOrder] = useState<boolean>(false)

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

  //? GET CART DATA AND HANDLE CONFILCT QUANTITY
  const { data: cartData, refetch: refetchCartData } = useQuery({
    queryKey: ['purchases_for_checking'],
    queryFn: () => purchaseApi.getPurchases(),
    keepPreviousData: true,
    enabled: isAuthenticated
  })
  const cartItemList = cartData?.data.data || []
  const purchaseList = cartItemList.filter((cartItem) => {
    return idList.includes(cartItem.id)
  })
  const unavailablepurchases = purchaseList.filter((purchase) => {
    return purchase.quantity > purchase.item.quantity
  })

  //? PLACE ORDER
  const queryClient = useQueryClient()
  const createOrderMutation = useMutation(orderApi.createOrder)
  const onPlaceOrder = handleSubmit(async (data) => {
    setProcessingDialog(true)
    //? fetch data from store to check if available quantity
    refetchCartData()
    if (unavailablepurchases.length > 0) {
      setProcessingDialog(false)
      setUnavailableOrder(true)
      const unavailablePurchaseIds = unavailablepurchases.map((purchase) => purchase.id)
      setUnavailablePurchaseIds(unavailablePurchaseIds)
      return
    }
    try {
      const fullAddress = `${getValues('address')}, ${addressState?.name}, ${addressCountry.name}`
      await createOrderMutation.mutateAsync({ ...data, address: fullAddress })
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      setProcessingDialog(false)
      setSuccesDialog(true)
    } catch (error) {
      console.log(error)
    }
  })

  //? PLACE ORDER WITHOUT LOGIN
  const getProductDataMutation = useMutation(productApi.getProductDetail)
  const createOrderForGuestMutation = useMutation(orderApi.createOrderWithouLogin)
  const placeOrderWithoutLogin = handleSubmit(async (data) => {
    //? fetch data to check quantity
    const unavailableTempPurchases = itemList.filter((item) => {
      getProductDataMutation.mutateAsync(item.id).then((productData) => {
        return productData.data.data.quantity < item.quantity
      })
      return false
    })
    if (unavailableTempPurchases.length > 0) {
      setProcessingDialog(false)
      setUnavailableOrder(true)
      const unavailableTempPurchaseIds = unavailableTempPurchases.map((purchase) => purchase.id)
      setUnavailablePurchaseIds(unavailableTempPurchaseIds)
      return
    }

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
      setProcessingDialog(false)
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
    <div className='bg-lightBg py-2 duration-300 dark:bg-darkBg lg:py-3 xl:py-4'>
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
      {/* //! success dialog */}
      <DialogPopup
        isOpen={successDialog}
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

      {/* //! Processing dialog */}
      {processingDialog && (
        <FloatingOverlay lockScroll>
          <Fragment>
            <motion.div
              className='fixed inset-0 z-10 bg-black dark:bg-black'
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.5
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='fixed left-1/2 top-1/2 z-10 flex w-60 max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-white px-4 py-6 shadow-sm dark:bg-black'
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ColorRing
                visible={true}
                height='80'
                width='80'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={['#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00']}
              />
              <div className='mt-2 text-lg font-semibold uppercase text-textDark dark:text-textLight md:text-xl xl:text-2xl'>
                Processing...
              </div>
            </motion.div>
          </Fragment>
        </FloatingOverlay>
      )}

      {/* //! Unavailable dialog */}
      <DialogPopup
        isOpen={unavailableOrder}
        handleClose={() => setUnavailableOrder(false)}
        classNameWrapper='relative w-11/12 sm:w-9/12 md:w-8/12 max-w:lg transform overflow-hidden rounded-2xl py-6 px-4 align-middle shadow-xl transition-all'
        closeButton={false}
      >
        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <div className='mb-4 text-center'>
            <FontAwesomeIcon
              icon={faXmark}
              className='text- h-auto w-8 rounded-full text-center text-red-600 md:w-10 lg:w-12 xl:w-16'
            />
          </div>
          <p className='mt-6 text-center text-base font-bold uppercase leading-6 sm:text-lg md:text-xl xl:text-2xl'>
            {t('layout.YOUR ORDER WAS DENIDED')}
          </p>
          <div className='mt-4 flex flex-col items-center justify-center space-y-2 text-sm font-medium md:text-base xl:text-lg'>
            <p className='w-full text-left'>
              {t('denided order.Your order was denied due to ')}
              <span className='text-haretaColor'>{t('denided order.unavailable quantity')}</span>
              {t('denided order. of some items.')}
              {t('denided order.some items ')}
              <span className='text-haretaColor'>{t('denided order.have unavailable quantity.')}</span>
            </p>
            <p className='text-left'>
              {t(
                'denided order.This accident sometimes occurs when someone else had place an order including your desired items before you did. Therefore the quantity of those items in our storage could not meet your need.'
              )}
            </p>
            <p className='w-full text-left'>
              {t('denided order.Please ')}
              <span className='text-haretaColor'>{t('denided order.recheck')}</span>
              {t('denided order. the unavailable items and ')}
              <span className='text-haretaColor'>{t('denided order.adjust the quantity.')}</span>
            </p>
            <p className='text-center text-base font-semibold md:text-lg xl:text-xl'>
              {t('denided order.Sincerely apologies for this accident!')}
            </p>
          </div>
          <div className='mt-4 flex w-full items-center justify-center'>
            <Link
              to={path.cart}
              className='rounded-lg bg-vintageColor px-4 py-1 hover:bg-vintageColor/90 dark:bg-haretaColor dark:hover:bg-haretaColor/90'
              onClick={isAuthenticated ? handleConfirm : guestConfirm}
            >
              {t('denided order.Return to cart')}
            </Link>
          </div>
        </div>
      </DialogPopup>
    </div>
  )
}
