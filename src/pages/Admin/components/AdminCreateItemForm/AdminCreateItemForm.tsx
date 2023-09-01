import { Fragment, useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreatingItemSchema } from '../../utils/rules'
import InputNumber from 'src/components/InputNumber'
import Input from 'src/components/Input'
import classNames from 'classnames'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'

type FormData = CreatingItemSchema

export default function AdminCreateItemForm() {
  const { itemGroup } = useContext(CreatingItemContext)
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  return (
    <Fragment>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>group name</p>
        </div>
        <div className='col-span-2'>
          <div className='cursor-not-allowed rounded-lg bg-[#101010] px-2 py-1 text-base capitalize text-haretaColor outline-none lg:text-lg'>
            {itemGroup?.name}
          </div>
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>name</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput={classNames(
              'text-haretaColor cursor-not-allowed bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.name)
              }
            )}
            classNameError='hidden'
            register={register}
            name='name'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>Color</p>
        </div>
        <div className='col-span-2'>
          <Input
            classNameInput={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.color)
              }
            )}
            classNameError='hidden'
            register={register}
            name='color'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>price</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='price'
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
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
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>Category</p>
        </div>
        <div className='col-span-2'>
          <Input
            classNameInput={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.category)
              }
            )}
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
            classNameInput={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.collection)
              }
            )}
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
            classNameInput={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.type)
              }
            )}
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
            classNameInput={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.product_line)
              }
            )}
            classNameError='hidden'
            register={register}
            name='product_line'
            autoComplete='false'
          />
        </div>
      </div>

      <div className=' items-center space-y-2'>
        <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>description</p>
        <textarea
          className='h-96 w-full rounded-lg bg-slate-900 px-2 py-1 text-base font-medium text-haretaColor outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg '
          {...register('description')}
          autoComplete='false'
        />
      </div>
    </Fragment>
  )
}
