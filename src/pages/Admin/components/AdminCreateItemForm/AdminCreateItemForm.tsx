import { Fragment, useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AddProductSchema } from '../../utils/rules'
import InputNumber from 'src/components/InputNumber'
import Input from 'src/components/Input'
import classNames from 'classnames'
import { AdminContext } from 'src/contexts/admin.context'
import 'react-quill/dist/quill.snow.css'
import QuillEditor from 'src/components/QuillEditor'

type FormData = AddProductSchema

export default function AdminCreateItemForm() {
  const { ProductGroup } = useContext(AdminContext)
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<FormData>()

  //? EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('description', editorState)
  }

  const editorContent = watch('description')

  return (
    <Fragment>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>group name</p>
        </div>
        <div className='col-span-2'>
          <div className='lg:text-lg cursor-not-allowed rounded-lg bg-[#101010] px-2 py-1 text-base capitalize text-haretaColor outline-none'>
            {ProductGroup?.name}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>group id</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base lg:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='group_id'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>name</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName={classNames(
              'text-haretaColor cursor-not-allowed bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.name)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='name'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>Color</p>
        </div>
        <div className='col-span-2'>
          <Input
            inputClassName={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.color)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='color'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>price</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='price'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.quantity)
                  }
                )}
                errorMessage={errors?.name?.message}
                errorClassName='hidden'
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
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>quantity</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='quantity'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(
                  'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
                  {
                    'outline-red-600': Boolean(errors.quantity)
                  }
                )}
                errorMessage={errors?.name?.message}
                errorClassName='hidden'
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
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>Category</p>
        </div>
        <div className='col-span-2'>
          <Input
            inputClassName={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.category)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='category'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>collection</p>
        </div>
        <div className='col-span-2'>
          <Input
            inputClassName={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.collection)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='collection'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>type</p>
        </div>
        <div className='col-span-2'>
          <Input
            inputClassName={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.type)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='type'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>product line</p>
        </div>
        <div className='col-span-2'>
          <Input
            inputClassName={classNames(
              'text-haretaColor bg-slate-900 py-1 px-2 text-base lg:text-lg rounded-lg outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg',
              {
                'outline-red-600': Boolean(errors.product_line)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='product_line'
            autoComplete='false'
          />
        </div>
      </div>

      <div className=' items-center space-y-2 bg-slate-900'>
        <p className='lg:text-lg text-base font-medium uppercase text-white/60'>description</p>
        {/* <textarea
          className='h-96 w-full rounded-lg bg-slate-900 px-2 py-1 text-base font-medium text-haretaColor outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg '
          {...register('description')}
          autoComplete='false'
        /> */}
        {/* <div className='h-96 w-full rounded-lg bg-slate-900 px-2 py-1 text-base font-medium text-haretaColor outline outline-1 outline-haretaColor/40 focus:outline-haretaColor lg:text-lg ' /> */}
        <QuillEditor value={editorContent} setValue={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
