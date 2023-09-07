import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { OrderSchema } from 'src/utils/rules'
import { useContext, useEffect, useRef, useState } from 'react'
import SelectCountry from '../../components/SelectCountry'
import SelectState from '../../components/SelectState'
import SelectCity from '../../components/SelectCity'
import { OrderContext } from 'src/contexts/order.context'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import DialogPopup from 'src/components/DialogPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from 'src/contexts/app.context'

type FormData = OrderSchema

export default function ShippingInfor() {
  const { addressState, addressCity } = useContext(OrderContext)
  const { theme } = useContext(AppContext)
  const [warningDialog, setWarningDialog] = useState(false)
  const [noneState, setNoneState] = useState(false)
  const [noneCity, setNoneCity] = useState(false)
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext<FormData>()

  //? CONTINUE TO PAYMENT
  const name = watch('name')
  const phone = watch('phone')
  const email = watch('email')
  const address = watch('address')
  const checkValidate = () => {
    if (
      name === '' ||
      phone === '' ||
      email === '' ||
      address === '' ||
      addressState === null ||
      addressCity === null
    ) {
      return false
    }
    return true
  }

  const navigate = useNavigate()
  const validButton = () => {
    navigate({
      pathname: path.payment
    })
  }

  //? HANDLE INVALID FORM
  const shippingInfoRef = useRef<HTMLDivElement>(null)
  const invalidButton = () => {
    setWarningDialog(true)
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
    if (shippingInfoRef.current) {
      shippingInfoRef.current.scrollIntoView({ behavior: 'smooth' })
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
  }, [addressState])

  useEffect(() => {
    if (addressCity) {
      setNoneCity(false)
    }
  }, [addressCity])

  return (
    <div className='w-full p-3 text-textDark dark:text-textLight xl:p-4 ' ref={shippingInfoRef}>
      <div className='space-y-4'>
        <div className=''>
          <p className=' uppercase text-textDark/60 dark:text-textLight/60'>Name</p>
          <div className='relative'>
            <Input
              classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage text-brownColor dark:text-haretaColor'
              classNameError='mt-1 min-h-[1.25rem] lg:min-h-[1.5rem] text-sm lg:text-base text-red-600'
              register={register}
              name='name'
              errorMessage={errors?.name?.message}
              autoComplete='false'
            />
            <div
              className={classNames('absolute bottom-6 w-full border-b-2 border-black/60 dark:border-white/60', {
                'border-red-700 dark:border-red-700': errors?.name
              })}
            ></div>
          </div>
        </div>
        <div className=''>
          <p className=' uppercase text-textDark/60 dark:text-textLight/60'>Phone</p>
          <div className='relative'>
            <Input
              classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage text-brownColor dark:text-haretaColor'
              register={register}
              name='phone'
              errorMessage={errors?.phone?.message}
              autoComplete='false'
            />
            <div
              className={classNames('absolute bottom-6 w-full border-b-2 border-black/60 dark:border-white/60', {
                'border-red-700 dark:border-red-700': errors?.phone
              })}
            ></div>
          </div>
        </div>
        <div className=''>
          <p className=' uppercase text-textDark/60 dark:text-textLight/60'>email</p>
          <div className='relative'>
            <Input
              classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage text-brownColor dark:text-haretaColor'
              register={register}
              name='email'
              errorMessage={errors?.email?.message}
              autoComplete='false'
            />
            <div
              className={classNames('absolute bottom-6 w-full border-b-2 border-black/60 dark:border-white/60', {
                'border-red-700 dark:border-red-700': errors?.email
              })}
            ></div>
          </div>
        </div>
        <div className='py-8'>
          <div className=''>
            <p className=' uppercase text-textDark/60 dark:text-textLight/60'>address</p>
            <div className='relative'>
              <Input
                classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
                register={register}
                name='address'
                errorMessage={errors?.address?.message}
                autoComplete='false'
              />
              <div
                className={classNames('absolute bottom-6 w-full border-b-2 border-black/60 dark:border-white/60', {
                  'border-red-700 dark:border-red-700': errors?.address
                })}
              ></div>
            </div>
          </div>
          <div className='mt-2'>
            <SelectCountry />
            <div className='mt-4 grid grid-cols-2 gap-3 lg:gap-4 xl:gap-6'>
              <div className='col-span-1'>
                <SelectState isError={noneState} />
              </div>
              <div className='col-span-1'>
                <SelectCity isError={noneCity} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full justify-end py-4'>
          <button
            type='button'
            className='flex items-center justify-center rounded-lg bg-vintageColor/80 px-4 py-2 text-base capitalize text-textLight hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 xl:text-lg'
            onClick={checkValidate() ? validButton : invalidButton}
          >
            continue to payment
          </button>
        </div>
      </div>
      <DialogPopup
        isOpen={warningDialog}
        handleClose={() => setWarningDialog(false)}
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
            You must full fill <p className='text-brownColor dark:text-haretaColor'>shipping information</p> first
          </p>
        </div>
      </DialogPopup>
    </div>
  )
}
