import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { OrderSchema } from 'src/utils/rules'
import { useContext } from 'react'
import SelectCountry from '../../components/SelectCountry'
import SelectState from '../../components/SelectState'
import SelectCity from '../../components/SelectCity'
import { OrderContext } from 'src/contexts/order.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

type FormData = OrderSchema

export default function ShippingInfor() {
  const { noneCity, noneState } = useContext(OrderContext)

  const {
    register,
    formState: { errors }
  } = useFormContext<FormData>()

  return (
    <div className='w-full p-3 text-textDark dark:text-textLight xl:p-4 '>
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
          <Link
            to={path.payment}
            type='button'
            className='flex items-center justify-center rounded-lg bg-vintageColor/80 px-4 py-2 text-base capitalize text-textLight hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 xl:text-lg'
          >
            continue to payment
          </Link>
        </div>
      </div>
    </div>
  )
}
