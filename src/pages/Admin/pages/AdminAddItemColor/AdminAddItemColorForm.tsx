import classNames from 'classnames'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreatingItemSchema } from '../../utils/rules'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'

type FormData = CreatingItemSchema

export default function AdminAddItemColorForm() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  return (
    <Fragment>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>New Color</p>
        </div>
        <div className='col-span-2'>
          <Input
            classNameInput={classNames(
              'text-textDark bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-haretaColor',
              {
                'outline-red-600': Boolean(errors.color)
              }
            )}
            classNameError='hidden'
            register={register}
            name='color'
            errorMessage={errors?.name?.message}
            autoComplete='false'
          />
        </div>
      </div>
      <div className='relative grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>quantity</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='quantity'
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-textDark bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-haretaColor',
                  {
                    'outline-red-600': Boolean(errors.quantity)
                  }
                )}
                errorMessage={errors?.name?.message}
                classNameError='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>name</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='name'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>group id</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='group_id'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>Category</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='category'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>collection</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='collection'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>type</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='type'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>product line</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='product_line'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>price</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            classNameError='hidden'
            register={register}
            name='price'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>description</p>
        </div>
        <div className='col-span-2'>
          <textarea
            className='h-60 w-full rounded-lg bg-white px-2 py-1 text-base font-medium capitalize text-textDark outline-none lg:text-lg'
            {...register('description')}
            autoComplete='false'
          />
        </div>
      </div>
    </Fragment>
  )
}
