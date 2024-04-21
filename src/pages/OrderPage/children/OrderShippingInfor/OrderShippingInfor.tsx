import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { OrderSchema } from 'src/utils/rules'
import { lazy, useContext } from 'react'
import { OrderContext } from 'src/contexts/order.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import { useTranslation } from 'react-i18next'

const SelectCountry = lazy(() => import('../../components/SelectCountry'))
const SelectState = lazy(() => import('../../components/SelectState'))
// import SelectCountry from '../../components/SelectCountry'
// import SelectState from '../../components/SelectState'

type FormData = OrderSchema

export default function OrderShippingInfor() {
  const { noneState } = useContext(OrderContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const {
    register,
    formState: { errors }
  } = useFormContext<FormData>()

  //! Multi languages
  const { t } = useTranslation('order')

  return (
    <div className='w-full p-3 text-darkText dark:text-lightText desktopLarge:p-4 '>
      <div className='space-y-4'>
        <p className='w-full text-center text-xl font-bold uppercase desktop:text-2xl desktopLarge:text-4xl'>
          {t('layout.Shipping information')}
        </p>

        <div className=''>
          <p className='uppercase text-darkText/60 dark:text-lightText/60'>{t('shipping information.Name')}</p>
          <div className='relative'>
            <Input
              inputClassName='text-lg w-full py-2 bg-transparent desktopLarge:text-xl outline-none duration-200 caret-haretaColor text-haretaColor font-medium'
              errorClassName='mt-1 min-h-[1.25rem] desktop:min-h-[1.5rem] text-sm desktop:text-base text-red-600'
              register={register}
              name='name'
              errorMessage={errors?.name?.message}
              autoComplete='off'
            />
            <div
              className={classNames('absolute bottom-6 w-full border-b-2 ', {
                'border-black/60 dark:border-white/60': !errors?.name,
                'border-red-600 dark:border-red-600': errors?.name
              })}
            ></div>
          </div>
        </div>
        <div className=''>
          <p className=' uppercase text-darkText/60 dark:text-lightText/60'>{t('shipping information.Phone')}</p>
          <div className='relative'>
            <Input
              inputClassName='text-lg w-full py-2 bg-transparent desktopLarge:text-xl outline-none duration-200 caret-haretaColor text-haretaColor font-medium'
              register={register}
              name='phone'
              errorMessage={errors?.phone?.message}
              autoComplete='off'
            />
            <div
              className={classNames('absolute bottom-6 w-full border-b-2 ', {
                'border-black/60 dark:border-white/60': !errors?.phone,
                'border-red-600 dark:border-red-600': errors?.phone
              })}
            ></div>
          </div>
        </div>
        <div>
          <p className='uppercase text-darkText/60 dark:text-lightText/60'>{t('shipping information.Email address')}</p>
          <div className='relative'>
            <Input
              inputClassName='text-lg w-full py-2 bg-transparent desktopLarge:text-xl outline-none duration-200 caret-haretaColor text-haretaColor font-medium'
              register={register}
              name='email'
              errorMessage={errors?.email?.message}
              autoComplete='off'
            />
            <div
              className={classNames('absolute bottom-6 w-full border-b-2 ', {
                'border-black/60 dark:border-white/60': !errors?.email,
                'border-red-600 dark:border-red-600': errors?.email
              })}
            ></div>
          </div>
        </div>
        <div className='py-8'>
          <div className=''>
            <p className='uppercase text-darkText/60 dark:text-lightText/60'>
              {t('shipping information.Delivery address')}
            </p>
            <div className='relative'>
              <Input
                inputClassName='text-lg w-full py-2 bg-transparent desktopLarge:text-xl outline-none duration-200 caret-haretaColor text-haretaColor font-medium'
                register={register}
                name='address'
                errorMessage={errors?.address?.message}
                autoComplete='off'
              />
              <div
                className={classNames('absolute bottom-6 w-full border-b-2 ', {
                  'border-black/60 dark:border-white/60': !errors?.address,
                  'border-red-600 dark:border-red-600': errors?.address
                })}
              ></div>
            </div>
          </div>
          <div className='mt-2'>
            <div className='mt-4 grid grid-cols-2 gap-3 desktop:gap-4 desktopLarge:gap-6'>
              <div className='col-span-1'>
                <SelectCountry />
              </div>
              <div className='col-span-1'>
                <SelectState isError={noneState} />
              </div>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className='flex w-full justify-end py-4'>
            <Link
              to={path.payment}
              type='button'
              className='flex items-center justify-center rounded-lg bg-haretaColor px-4 py-2 text-base font-medium capitalize text-black hover:bg-primaryColor desktopLarge:text-lg'
            >
              {t('layout.Continue to payment')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
