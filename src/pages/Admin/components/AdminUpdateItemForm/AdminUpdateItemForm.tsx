import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { UpdateItemSchema } from '../../utils/rules'
import InputNumber from 'src/components/InputNumber'
import Input from 'src/components/Input'
import classNames from 'classnames'
import { AdminContext } from '../../layouts/AdminLayout/AdminLayout'
import QuillEditor from 'src/components/QuillEditor'

type FormData = UpdateItemSchema

export default function AdminUpdateItemForm() {
  const { itemGroup } = useContext(AdminContext)
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<FormData>()

  //? EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('description', editorState)
  }

  const editorContent = watch('description')

  return (
    <div className='space-y-4'>
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>ID</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            classNameInput={classNames(
              'text-haretaColor cursor-not-allowed bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.id)
              }
            )}
            classNameError='hidden'
            register={register}
            name='id'
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
            classNameInput={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
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
                    'outline-red-600': Boolean(errors.price)
                  }
                )}
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>discount</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='discount'
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.discount)
                  }
                )}
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>tag</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='tag'
            defaultValue={0}
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.tag)
                  }
                )}
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>like count</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='like_count'
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.like_count)
                  }
                )}
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>sold</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='sold'
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.sold)
                  }
                )}
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
          <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>cron status</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='cron_status'
            render={({ field }) => (
              <InputNumber
                classNameInput={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.cron_status)
                  }
                )}
                classNameError='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className='items-center space-y-2 pt-4'>
        <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>description</p>
        {/* <textarea
          className='h-96 w-full rounded-lg bg-slate-900 px-2 py-1 text-base font-medium text-haretaColor outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg '
          {...register('description')}
          autoComplete='false'
        /> */}
        <QuillEditor value={editorContent} setValue={onEditorStateChange} />
      </div>
    </div>
  )
}
