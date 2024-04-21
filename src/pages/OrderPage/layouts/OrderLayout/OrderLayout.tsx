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
import { AppContext } from 'src/contexts/app.context'
import { setOrderListToLS, setTempOrderListToLS } from 'src/utils/order'
import PathBar from 'src/components/PathBar'
import userApi from 'src/apis/user.api'
import { CartContext } from 'src/contexts/cart.context'
import { useTranslation } from 'react-i18next'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/cart.api'
import OrderSuccessDialog from '../../components/OrderSuccessDialog'
import OrderUnavailableDialog from '../../components/OrderUnavailableDialog'
import OrderProcessingDialog from '../../components/OrderProcessingDialog'

export default function OrderLayout() {
  const { orderList, addressCountry, addressState, setOrderList, setConfirmPayment, tempOrderList, setTempOrderList } =
    useContext(OrderContext)
  const { isAuthenticated } = useContext(AppContext)
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
    }
  }, [profile, setValue, clearErrors])

  //? GET CART DATA AND HANDLE CONFILCT QUANTITY
  const { data: cartData, refetch: refetchCartData } = useQuery({
    queryKey: ['purchases_for_checking'],
    queryFn: () => purchaseApi.getPurchases(),

    enabled: isAuthenticated
  })
  const cartItemList = cartData?.data.data || []
  const purchaseList = cartItemList.filter((cartItem) => {
    return idList.includes(cartItem.id)
  })
  const unavailablepurchases = purchaseList.filter((purchase) => {
    return purchase.quantity > purchase.item.quantity
  })

  //! Placing order for user
  const queryClient = useQueryClient()
  const createOrderMutation = useMutation({ mutationFn: orderApi.createOrder })
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

  //! Placing order for guest
  const getProductDataMutation = useMutation({ mutationFn: productApi.getProductDetail })
  const createOrderForGuestMutation = useMutation({ mutationFn: orderApi.createOrderWithouLogin })
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

  //! Handle confirm
  const navigate = useNavigate()

  const userConfirm = () => {
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

  const handleConfirm = isAuthenticated ? userConfirm : guestConfirm

  //! Multi languages
  const { t } = useTranslation('order')

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg desktop:py-3 desktopLarge:py-4'>
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

      {/*  success dialog */}
      <OrderSuccessDialog
        handleConfirm={handleConfirm}
        isOpen={successDialog}
        handleClose={() => setSuccesDialog(false)}
      />

      {/*  Processing dialog */}
      {processingDialog && <OrderProcessingDialog />}

      {/*  Unavailable dialog */}
      <OrderUnavailableDialog
        handleConfirm={handleConfirm}
        isOpen={unavailableOrder}
        handleClose={() => setUnavailableOrder(false)}
      />
    </div>
  )
}
