import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { NavLink, useNavigate } from 'react-router-dom'
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

type FormData = OrderSchema

export default function OrderLayout() {
  const { orderList, addressCountry, addressCity, addressState, setOrderList } = useContext(OrderContext)
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
  const { getValues } = methods

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  //? HANDLE PLACE ORDER
  const queryClient = useQueryClient()
  const createOrderMutation = useMutation(orderApi.createOrder)
  const onPlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = {
      name: getValues('name'),
      phone: getValues('phone'),
      email: getValues('email'),
      address: `${getValues('address')}, ${addressCity?.name}, ${addressState?.name}, ${addressCountry.name}`,
      id: idList
    }
    createOrderMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchases'] })
        setSuccesDialog(true)
      }
    })
  }

  //? HANDLE CONFIRM
  const navigate = useNavigate()
  const handleConfirm = () => {
    setSuccesDialog(false)
    navigate(path.cart)
    setOrderList([])
    setOrderListToLS([])
  }

  return (
    <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg border border-black/20 bg-[#f8f8f8] px-2 py-1 text-xs font-medium uppercase text-textDark duration-500 dark:border-white/20 dark:bg-[#000] dark:text-textLight lg:mb-3 lg:space-x-2 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
          <NavLink
            to={path.home}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            home
          </NavLink>

          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.cart}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            cart
          </NavLink>

          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.order}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            order
          </NavLink>
        </div>
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
