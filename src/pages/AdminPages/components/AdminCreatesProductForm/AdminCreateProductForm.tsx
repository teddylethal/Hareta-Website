import { useContext, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateProductSchema } from '../../utils/rules'
import InputNumber from 'src/components/InputNumber'
import classNames from 'classnames'
import { AdminContext } from 'src/contexts/admin.context'
import 'react-quill/dist/quill.snow.css'
import AdminProductInput from '../AdminProductInput'
import AdminInputErrorSection from 'src/components/AdminInputErrorSection'
import CustomJoditEditor from 'src/components/CustomJoditEditor'

type FormData = CreateProductSchema

export default function AdminCreateProductForm() {
  const { productGroup, currentProduct } = useContext(AdminContext)
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

  //! GET PRODUCT GROUP DATA
  useEffect(() => {
    setValue('name', currentProduct?.name || '')
    setValue('group_id', currentProduct?.group.id || '')
    setValue('category', currentProduct?.category || '')
    setValue('collection', currentProduct?.collection || '')
    setValue('product_line', currentProduct?.product_line || '')
    setValue('type', currentProduct?.type || '')
  }, [currentProduct, setValue])

  //! STYLES
  const inputFieldStyle = 'grid grid-cols-4 items-center gap-2 py-1 px-2 bg-transparent'
  const titleStyle = 'text-xs tablet:text-sm space-x-2 uppercase col-span-1 desktop:text-base'
  const inputStyle =
    'bg-darkColor700 py-1 px-2 text-base desktop:text-lg col-span-2 desktop:col-span-2 rounded-lg outline-1 outline outline-haretaColor/40 focus:outline-primaryColor text-haretaColor'
  const noSelectedInputStyle =
    'text-lightText py-1 px-2 col-span-2 text-base font-medium desktop:text-lg bg-transparent rounded-lg'
  const starStyle = 'text-lg text-alertRed tablet:text-xl desktop:text-2xl'

  return (
    <div className='w-full space-y-2 px-10'>
      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Nhóm sản phẩm</p>
        </div>
        <p className={noSelectedInputStyle}>{productGroup?.name}</p>
      </div>

      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>ID nhóm</p>
        </div>
        <p className={noSelectedInputStyle}>{productGroup?.id}</p>
      </div>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-alertRed': Boolean(errors.name)
        })}
        register={register}
        name='name'
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.name?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Tên sản phẩm</span>
          <span className={starStyle}>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-alertRed': Boolean(errors.color)
        })}
        register={register}
        name='color'
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.color?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Màu</span>
          <span className={starStyle}>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(noSelectedInputStyle, {
          'outline-alertRed': Boolean(errors.category)
        })}
        register={register}
        name='category'
        disabled
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.category?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Hạng mục</span>
          <span className={starStyle}>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(noSelectedInputStyle, {
          'outline-alertRed': Boolean(errors.collection)
        })}
        register={register}
        name='collection'
        disabled
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.collection?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Bộ sưu tập</span>
          <span className={starStyle}>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(noSelectedInputStyle, {
          'outline-alertRed': Boolean(errors.type)
        })}
        register={register}
        name='type'
        disabled
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.type?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Loại</span>
          <span className={starStyle}>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(noSelectedInputStyle, {
          'outline-alertRed': Boolean(errors.product_line)
        })}
        register={register}
        name='product_line'
        disabled
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.product_line?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Dòng sản phẩm</span>
          <span className={starStyle}>*</span>
        </div>
      </AdminProductInput>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Số lượng</span>
          <span className={starStyle}>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='quantity'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.quantity)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.quantity?.message} />
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Giá</span>
          <span className={starStyle}>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='price'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.price)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.price?.message} />
      </div>

      <div className='space-y-2 px-2 py-1 '>
        <div className={titleStyle}>
          <span className='text-lg'>Mô tả</span>
          <span className={starStyle}>*</span>
        </div>

        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </div>
  )
}
