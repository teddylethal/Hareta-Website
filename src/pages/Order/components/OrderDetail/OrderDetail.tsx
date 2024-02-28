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
import PurchaseListForUser from '../PurchaseListForUser'
import PurchaseListForGuest from '../PurchaseListForGuest'

export default function OrderDetail() {
  const { addressState, setNoneState, confirmPayment, setConfirmPayment } = useContext(OrderContext)
  const { theme, isAuthenticated } = useContext(AppContext)

  const [invalidForm, setInvalidForm] = useState<boolean>(false)
  const [confirmError, setConfirmError] = useState<boolean>(false)

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
    <div className='lg:p-4 rounded-xl p-3'>
      <p className='xl:text-3xl text-2xl font-semibold uppercase'>{t('layout.Order')}</p>
      <div className='my-4 w-full border border-black/80 dark:border-white/80'></div>
      {isAuthenticated && <PurchaseListForUser />}
      {!isAuthenticated && <PurchaseListForGuest />}
      <div className='mt-4 flex items-center space-x-2 font-medium'>
        <input
          name='confirm'
          type='checkbox'
          className={classNames('h-5 w-5 rounded-md accent-primaryColor dark:accent-primaryColor', {
            ' outline outline-red-600': confirmError
          })}
          checked={confirmPayment}
          onChange={() => setConfirmPayment(!confirmPayment)}
        />
        <p
          className={classNames('', {
            'text-darkText dark:text-lightText': !confirmError,
            'text-red-600': confirmError
          })}
        >
          {t('layout.By clicking, you accept our')}{' '}
          <Link
            state={{ from: 'order' }}
            to={path.privacyAndTerms}
            className='font-medium text-haretaColor hover:text-primaryColor'
          >
            {t('layout.payment policy')}
          </Link>{' '}
        </p>
      </div>

      {!validForm() && (
        <button
          type={confirmPayment ? 'submit' : 'button'}
          className='xl:py-4 xl:text-2xl mt-4 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-haretaColor py-3  text-xl font-bold uppercase text-black opacity-20'
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
            'text-darkText xl:py-4 xl:text-2xl mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl bg-haretaColor py-3 text-xl font-bold uppercase hover:bg-primaryColor':
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
              className={classNames('md:h-16 md:w-16 h-10 w-10 rounded-full p-4 text-center text-red-600', {
                'bg-black/20': theme == 'light',
                'bg-white/20': theme == 'dark'
              })}
            />
          </div>
          <p className='md:text-xl xl:text-2xl my-6 text-lg font-bold uppercase leading-6'>
            {t('layout.YOUR ORDER WAS DENIDED')}
          </p>
          {lackingInformation && (
            <p className='md:text-base xl:text-lg mt-2 text-center text-sm font-semibold leading-6'>
              - {t('layout.You must fullfilled your')}
              <span className='text-haretaColor'> {t('layout.order information')}</span>
            </p>
          )}
          {!confirmPayment && (
            <p className='md:text-base xl:text-lg mt-2 text-center text-sm font-semibold leading-6'>
              - {t('layout.You must accept with the')}
              <span className='text-haretaColor'> {t('layout.payment policy')}</span>
            </p>
          )}
        </DialogPopup>
      </FloatingPortal>
    </div>
  )
}
