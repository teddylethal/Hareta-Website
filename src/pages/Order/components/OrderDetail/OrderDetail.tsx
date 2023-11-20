import { FloatingPortal } from '@floating-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import DialogPopup from 'src/components/DialogPopup'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { OrderContext } from 'src/contexts/order.context'
import { OrderSchema } from 'src/utils/rules'
import { formatCurrency } from 'src/utils/utils'

export default function OrderDetail() {
  const { addressState, orderList, setNoneState, confirmPayment, setConfirmPayment } = useContext(OrderContext)
  const { theme } = useContext(AppContext)

  const [invalidForm, setInvalidForm] = useState<boolean>(false)
  const [confirmError, setConfirmError] = useState<boolean>(false)

  const totalPrice = orderList.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  const totalDiscount = orderList.reduce((result, current) => {
    return result + current.item.discount * current.quantity
  }, 0)

  const { watch } = useFormContext<OrderSchema>()

  // //? CHECK VALID
  const name = watch('name')
  const phone = watch('phone')
  const email = watch('email')
  const address = watch('address')
  const validForm = () => {
    if (name === '' || phone === '' || email === '' || address === '' || addressState === null || !confirmPayment) {
      return false
    }
    return true
  }
  const lackingInformation = name === '' || phone === '' || email === '' || address === '' || addressState === null

  //? HANDLE INVALID FORM
  const navigate = useNavigate()
  const invalidButton = () => {
    if (lackingInformation) {
      navigate(path.shippingInfor)
      if (!addressState) {
        setNoneState(true)
      }
    }
    if (!confirmPayment) {
      setConfirmError(true)
    }
    setInvalidForm(true)
  }
  useEffect(() => {
    if (confirmPayment) setConfirmError(false)
  }, [confirmPayment])

  //? HANDLE CLEAR ERRORS
  useEffect(() => {
    if (addressState) {
      setNoneState(false)
    }
  }, [addressState, setNoneState])

  //? translation
  const { t } = useTranslation('order')

  return (
    <div className='rounded-xl p-3 lg:p-4'>
      <p className='text-2xl font-semibold uppercase xl:text-3xl'>{t('layout.Order')}</p>
      <div className='my-4 w-full border border-black/80 dark:border-white/80'></div>
      <div className='max-h-60 overflow-auto'>
        {orderList.map((orderItem, index) => (
          <div className='relative grid grid-cols-3 items-center gap-2 py-3 xl:py-4' key={orderItem.id}>
            <div className='col-span-2'>
              <p className='text-lg font-bold capitalize xl:text-xl'>{orderItem.item.name}</p>
              <p className='text-sm capitalize xl:text-base'>{orderItem.item.color}</p>
            </div>
            <div className='col-span-1 text-right'>
              <p className='text-base xl:text-lg'>${orderItem.item.price}</p>
              <p className='text-sm xl:text-base'>x {orderItem.quantity}</p>
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
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>{t('layout.Bill')}</div>
          <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
            ${formatCurrency(totalPrice)}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>{t('layout.Discount')}</div>
          <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
            ${formatCurrency(totalDiscount)}
          </div>
        </div>
      </div>
      <div className='my-4 w-full border border-dashed border-black/80 dark:border-white/80'></div>
      <div className='grid grid-cols-3 gap-2 text-xl font-bold uppercase xl:text-2xl'>
        <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>{t('layout.Total')}</div>
        <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
          ${formatCurrency(totalPrice - totalDiscount)}
        </div>
      </div>

      <div className='mt-4 flex items-center space-x-2 font-medium'>
        <input
          name='confirm'
          type='checkbox'
          className={classNames('h-5 w-5 rounded-md accent-vintageColor dark:accent-haretaColor', {
            ' outline outline-red-600': confirmError
          })}
          checked={confirmPayment}
          onChange={() => setConfirmPayment(!confirmPayment)}
        />
        <p
          className={classNames('', {
            'text-textDark dark:text-textLight': !confirmError,
            'text-red-600': confirmError
          })}
        >
          {t('layout.By clicking, you accept our')}{' '}
          <Link
            to={path.home}
            className='font-medium text-brownColor hover:text-brownColor/90 dark:text-haretaColor dark:hover:text-haretaColor/90'
          >
            {t('layout.payment policy')}
          </Link>{' '}
        </p>
      </div>

      {!validForm() && (
        <button
          type={confirmPayment ? 'submit' : 'button'}
          className='mt-4 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-vintageColor/80 py-3 text-xl font-bold  uppercase text-black opacity-20 dark:bg-haretaColor/80 dark:text-white xl:py-4 xl:text-2xl'
          onClick={invalidButton}
        >
          {t('layout.Confirm order')}
        </button>
      )}
      {validForm() && (
        <button
          disabled={!confirmPayment}
          className={classNames({
            // 'mt-4 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-vintageColor/80 py-3 text-xl font-bold  uppercase text-black opacity-20 dark:bg-haretaColor/80 dark:text-white xl:py-4 xl:text-2xl':
            //   lackingInformation,
            'mt-4 flex w-full items-center justify-center rounded-xl bg-vintageColor py-3 text-xl font-bold uppercase hover:bg-vintageColor/90 dark:bg-haretaColor dark:hover:bg-haretaColor/90 xl:py-4 xl:text-2xl':
              !lackingInformation
          })}
          type='submit'
        >
          {t('layout.Confirm order')}
        </button>
      )}
      <FloatingPortal>
        <DialogPopup
          isOpen={invalidForm}
          handleClose={() => setInvalidForm(false)}
          classNameWrapper='relative w-md max-w-lg transform overflow-hidden rounded-2xl py-6 px-4 align-middle shadow-xl transition-all'
        >
          <div className='text-center'>
            <FontAwesomeIcon
              icon={faXmark}
              className={classNames('h-10 w-10 rounded-full p-4 text-center text-red-600 md:h-16 md:w-16', {
                'bg-black/20': theme == 'light',
                'bg-white/20': theme == 'dark'
              })}
            />
          </div>
          <p className='my-6 text-lg font-bold uppercase leading-6 md:text-xl xl:text-2xl'>
            {t('layout.YOUR ORDER WAS DENIDED')}
          </p>
          {lackingInformation && (
            <p className='mt-2 text-center text-sm font-semibold leading-6 md:text-base xl:text-lg'>
              - {t('layout.You must fullfilled your')}
              <span className='text-haretaColor'> {t('layout.order information')}</span>
            </p>
          )}
          {!confirmPayment && (
            <p className='mt-2 text-center text-sm font-semibold leading-6 md:text-base xl:text-lg'>
              - {t('layout.You must accept with the')}
              <span className='text-haretaColor'> {t('layout.payment policy')}</span>
            </p>
          )}
        </DialogPopup>
      </FloatingPortal>
    </div>
  )
}
