import { Dispatch, SetStateAction, useContext } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { orderApi } from 'src/apis/order.api'
import { AppContext } from 'src/contexts/app.context'
import * as yup from 'yup'
import { formatDate, generateNameId, isAxiosBadRequestError } from 'src/utils/utils'
import path from 'src/constants/path'
import { ErrorRespone } from 'src/types/utils.type'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import OrderSearchInput from '../OrderSearchInput/OrderSearchInput'

const orderSchema = yup.object({
  orderId: yup.string().trim().required('ID is required')
})

type OrderSchema = yup.InferType<typeof orderSchema>

interface Props {
  setFinding: Dispatch<SetStateAction<boolean>>
  setCantFind: Dispatch<SetStateAction<boolean>>
}

export default function SearchOrder({ setFinding, setCantFind }: Props) {
  const { isAuthenticated } = useContext(AppContext)

  //? Find order
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<OrderSchema>({
    defaultValues: {
      orderId: ''
    },
    resolver: yupResolver(orderSchema)
  })
  const findOrderMutation = useMutation(isAuthenticated ? orderApi.getOrderById : orderApi.getOrderOfGuestById)
  const navigate = useNavigate()
  const handleSearch = handleSubmit((data) => {
    setFinding(true)
    findOrderMutation.mutate(data.orderId, {
      onSuccess: (respone) => {
        setFinding(false)
        const order = respone.data.data
        navigate({
          pathname: `${path.orderTracking}/${generateNameId({ name: formatDate(order.created_at), id: order.id })}`
        })
      },
      onError: (error) => {
        setFinding(false)
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          if (formError) {
            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
            if (errorRespone?.error_key == 'ErrInvalidRequest') {
              setError('orderId', {
                message: errorRespone.error_message,
                type: 'Server'
              })
            }
            if (errorRespone?.error_key == 'ErrCannotGetOrder') {
              setCantFind(true)
            }
          }
        }
      }
    })
  })

  return (
    <form className='tablet:px-20 desktopLarge:px-40' onSubmit={handleSearch} noValidate>
      <OrderSearchInput
        name='orderId'
        register={register}
        type='text'
        required
        errorMessage={errors.orderId?.message}
      />
    </form>
  )
}
