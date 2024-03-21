import classNames from 'classnames'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AddProductSchema } from '../../utils/rules'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import QuillEditor from 'src/components/QuillEditor'

type FormData = AddProductSchema

export default function AdminAddItemColorForm() {
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
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>New Color</p>
        </div>
        <div className='col-span-2'>
          <Input
            inputClassName={classNames(
              'text-lightText bg-slate-900 py-1 px-2 text-base desktop:text-lg rounded-lg outline-none focus:outline-haretaColor',
              {
                'outline-red-600': Boolean(errors.color)
              }
            )}
            errorClassName='hidden'
            register={register}
            name='color'
            errorMessage={errors?.name?.message}
            autoComplete='false'
          />
        </div>
      </div>
      <div className='relative grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>quantity</p>
        </div>
        <div className='col-span-1'>
          <Controller
            control={control}
            name='quantity'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(
                  'text-lightText bg-slate-900 py-1 px-2 text-base desktop:text-lg rounded-lg outline-none focus:outline-haretaColor',
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
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>name</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='name'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>group id</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='group_id'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>Category</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='category'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>collection</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='collection'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>type</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='type'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>product line</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='product_line'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>price</p>
        </div>
        <div className='col-span-2'>
          <Input
            readOnly
            inputClassName='text-haretaColor bg-[#101010] capitalize cursor-not-allowed py-1 px-2 text-base desktop:text-lg rounded-lg outline-none'
            errorClassName='hidden'
            register={register}
            name='price'
            autoComplete='false'
          />
        </div>
      </div>
      <div className='space-y-4'>
        <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>description</p>
        {/* <textarea
          className='h-60 w-full rounded-lg bg-slate-900 px-2 py-1 text-base font-medium capitalize text-lightText outline-none desktop:text-lg'
          {...register('description')}
          autoComplete='false'
        /> */}
        <QuillEditor value={editorContent} setValue={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
