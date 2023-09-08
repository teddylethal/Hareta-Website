import { faCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { orderApi } from 'src/apis/order.api'
import DialogPopup from 'src/components/DialogPopup'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { OrderContext } from 'src/contexts/order.context'
import { OrderSchema } from 'src/utils/rules'
import { formatCurrency } from 'src/utils/utils'

type FormData = OrderSchema

export default function OrderDetail() {
  const { addressCountry, addressState, addressCity, purchaseList, setNoneCity, setNoneState, confirmPayment } =
    useContext(OrderContext)
  const { theme } = useContext(AppContext)

  const [shippingInfoWarnDialog, setShippingInfoWarnDialog] = useState(false)
  const [confirmPaymentWarnDialog, setConfirmPaymentWarnDialog] = useState(false)
  const [successDialog, setSuccesDialog] = useState(false)

  const totalPurchasesPrice = purchaseList.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  const totalDiscount = purchaseList.reduce((result, current) => {
    return result + current.item.discount * current.quantity
  }, 0)

  const {
    watch,
    setError,
    clearErrors,

    formState: { errors }
  } = useFormContext<FormData>()

  // //? CHECK VALID
  const name = watch('name')
  const phone = watch('phone')
  const email = watch('email')
  const address = watch('address')
  const validForm = () => {
    if (
      name === '' ||
      phone === '' ||
      email === '' ||
      address === '' ||
      addressState === null ||
      addressCity === null ||
      !confirmPayment
    ) {
      return false
    }
    return true
  }

  //? HANDLE INVALID FORM
  const navigate = useNavigate()
  const invalidButton = () => {
    if (
      name === '' ||
      phone === '' ||
      email === '' ||
      address === '' ||
      addressState === null ||
      addressCity === null
    ) {
      navigate(path.shippingInfor)
      setShippingInfoWarnDialog(true)
      if (name === '') {
        setError('name', { message: 'Name is required' })
      }
      if (phone === '') {
        setError('phone', { message: 'Phone number is required' })
      }
      if (email === '') {
        setError('email', { message: 'Email is required' })
      }
      if (address === '') {
        setError('address', { message: 'Address is required' })
      }
      if (!addressState) {
        setNoneState(true)
      }
      if (!addressCity) {
        setNoneCity(true)
      }
    } else if (!confirmPayment) {
      setConfirmPaymentWarnDialog(true)
      navigate(path.payment)
    }
  }

  //? HANDLE CLEAR ERRORS
  useEffect(() => {
    if (name !== '' && errors.name) {
      clearErrors('name')
    }
  }, [clearErrors, errors.name, name])

  useEffect(() => {
    if (phone !== '' && errors.phone) {
      clearErrors('phone')
    }
  }, [clearErrors, errors.phone, phone])

  useEffect(() => {
    if (email !== '' && errors.email) {
      clearErrors('email')
    }
  }, [clearErrors, errors.email, email])

  useEffect(() => {
    if (address !== '' && errors.address) {
      clearErrors('address')
    }
  }, [clearErrors, errors.address, address])

  useEffect(() => {
    if (addressState) {
      setNoneState(false)
    }
  }, [addressState, setNoneState])

  useEffect(() => {
    if (addressCity) {
      setNoneCity(false)
    }
  }, [addressCity, setNoneCity])

  return (
    <div className=' rounded-xl p-3 lg:p-4'>
      <p className='text-2xl font-semibold uppercase xl:text-3xl'>order</p>
      <div className='my-4 w-full border border-black/80 dark:border-white/80'></div>
      <div className='max-h-60 overflow-auto'>
        {purchaseList.map((purchase, index) => (
          <div className='relative grid grid-cols-3 items-center gap-2 py-3 xl:py-4' key={purchase.id}>
            <div className='col-span-2'>
              <p className='text-lg font-bold capitalize xl:text-xl'>{purchase.item.name}</p>
              <p className='text-sm capitalize xl:text-base'>{purchase.item.color}</p>
            </div>
            <div className='col-span-1 text-right'>
              <p className='text-base xl:text-lg'>${purchase.item.price}</p>
              <p className='text-sm xl:text-base'>x {purchase.quantity}</p>
            </div>
            {index !== 0 && (
              <div className='absolute left-1/2 top-0 w-1/6 -translate-x-1/2 border-t border-dashed border-black/60 dark:border-white/60'></div>
            )}
          </div>
        ))}
      </div>
      <div className='my-4 w-full border border-dashed border-black/80 dark:border-white/80'></div>
      <div className=' space-y-2 text-lg font-semibold xl:text-xl'>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>Bill</div>
          <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
            ${formatCurrency(totalPurchasesPrice)}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>Discount</div>
          <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
            ${formatCurrency(totalDiscount)}
          </div>
        </div>
      </div>
      <div className='my-4 w-full border border-dashed border-black/80 dark:border-white/80'></div>
      <div className='grid grid-cols-3 gap-2 text-xl font-bold uppercase xl:text-2xl'>
        <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>Total</div>
        <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
          ${formatCurrency(totalPurchasesPrice - totalDiscount)}
        </div>
      </div>

      {!validForm() && (
        <button
          type='button'
          className='mt-4 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-vintageColor/80 py-3 text-xl font-bold  uppercase opacity-20 dark:bg-haretaColor/80 xl:py-4 xl:text-2xl'
          onClick={invalidButton}
        >
          Confirm order
        </button>
      )}
      {validForm() && (
        <button
          className='mt-4 flex w-full items-center justify-center rounded-xl bg-vintageColor/80 py-3 text-xl font-bold uppercase hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 xl:py-4 xl:text-2xl'
          type='submit'
        >
          Confirm order
        </button>
      )}
      <DialogPopup
        isOpen={shippingInfoWarnDialog}
        handleClose={() => setShippingInfoWarnDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <div className='mb-4 text-center'>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className='text- h-auto w-8 rounded-full text-center text-red-700 md:w-10 lg:w-12 xl:w-16'
            />
          </div>
          <p className='inline text-center text-xl font-medium uppercase leading-6'>
            You must full fill <span className='text-brownColor dark:text-haretaColor'>shipping information</span> first
          </p>
        </div>
      </DialogPopup>

      <DialogPopup
        isOpen={confirmPaymentWarnDialog}
        handleClose={() => setConfirmPaymentWarnDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <div className='mb-4 text-center'>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className='text- h-auto w-8 rounded-full text-center text-red-700 md:w-10 lg:w-12 xl:w-16'
            />
          </div>
          <p className='inline text-center text-xl font-medium uppercase leading-6'>
            You must accept our{' '}
            <span className='font-medium text-brownColor/80 hover:text-brownColor dark:text-haretaColor/80 dark:hover:text-haretaColor/60'>
              payment policy
            </span>
          </p>
        </div>
      </DialogPopup>
    </div>
  )
}
