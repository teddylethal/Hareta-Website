import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { OrderSchema } from 'src/utils/rules'
import { Country, ICountry, IState, ICity } from 'country-state-city'
import { useState } from 'react'
import SelectCountry from '../../components/SelectCountry'
import SelectState from '../../components/SelectState'
import SelectCity from '../../components/SelectCity'

type FormData = OrderSchema

export default function ShippingInfor() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  const [selectedCountry, setSelectedCountry] = useState<ICountry>(Country.getCountryByCode('VN') as ICountry)
  const [selectedState, setSelectedState] = useState<IState | null>(null)
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null)

  return (
    <div className='w-full p-3 text-textDark dark:text-textLight xl:p-4 '>
      <div className='space-y-4'>
        <div className=''>
          <p className=' uppercase text-textDark/60 dark:text-textLight/60'>Name</p>
          <div className='relative'>
            <Input
              classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='name'
              errorMessage={errors?.name?.message}
              autoComplete='false'
            />
            <div
              className={classNames('absolute bottom-5 w-full border-b-2 border-black/60 dark:border-white/60', {
                'border-red-700': errors?.name
              })}
            ></div>
          </div>
        </div>
        <div className=''>
          <p className=' uppercase text-textDark/60 dark:text-textLight/60'>Phone</p>
          <div className='relative'>
            <Input
              classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='phone'
              errorMessage={errors?.phone?.message}
              autoComplete='false'
            />
            <div
              className={classNames('absolute bottom-5 w-full border-b-2 border-black/60 dark:border-white/60', {
                'border-red-700': errors?.phone
              })}
            ></div>
          </div>
        </div>
        <div className=''>
          <p className=' uppercase text-textDark/60 dark:text-textLight/60'>email</p>
          <div className='relative'>
            <Input
              classNameInput='text-lg w-full py-2 bg-transparent xl:text-xl outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='email'
              errorMessage={errors?.email?.message}
              autoComplete='false'
            />
            <div
              className={classNames('absolute bottom-5 w-full border-b-2 border-black/60 dark:border-white/60', {
                'border-red-700': errors?.email
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
                className={classNames('absolute bottom-5 w-full border-b-2 border-black/60 dark:border-white/60', {
                  'border-red-700': errors?.address
                })}
              ></div>
            </div>
          </div>
          <SelectCountry selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
          <div className='mt-4 grid grid-cols-2 gap-3 lg:gap-4 xl:gap-6'>
            <div className='col-span-1'>
              <SelectState
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
            </div>
            <div className='col-span-1'>
              <SelectCity
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
