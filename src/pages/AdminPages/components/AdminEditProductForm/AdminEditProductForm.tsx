import { Controller, useFormContext } from 'react-hook-form'
import { EditProductSchema } from '../../../../rules/adminproduct.rule'
import InputNumber from 'src/components/InputNumber'
import classNames from 'classnames'
import { Product } from 'src/types/product.type'
import { formatDate } from 'src/utils/utils'
import CustomJoditEditor from 'src/components/CustomJoditEditor'
import AdminProductInput from '../AdminProductInput'
import AdminInputErrorSection from 'src/components/AdminInputErrorSection'

type FormData = EditProductSchema

interface Props {
  productDetail: Product
}

export default function AdminEditProductForm({ productDetail }: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<FormData>()

  //! EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('description', editorState)
  }

  const editorContent = watch('description')

  //! STYLES
  const noSelectedInputStyle = 'text-lightText py-1 px-2 text-base font-medium desktop:text-lg'
  const inputFieldStyle = 'grid grid-cols-4 items-center gap-2 py-1 px-2'
  const titleStyle = 'text-xs tablet:text-sm uppercase col-span-1 desktop:text-base'
  const inputStyle =
    'bg-darkColor700 py-1 px-2 text-base desktop:text-lg col-span-3 desktop:col-span-2 rounded-lg outline-1 outline outline-haretaColor/60 focus:outline-haretaColor text-haretaColor'

  return (
    <div className='space-y-4'>
      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Nhóm sản phẩm</p>
        </div>
        <div className='col-span-3'>
          <p className={noSelectedInputStyle}>{productDetail.group.name}</p>
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>ID</p>
        </div>
        <div className='col-span-3'>
          <p className={noSelectedInputStyle}>{productDetail.id}</p>
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ngày tạo</p>
        </div>
        <div className='col-span-3'>
          <p className={noSelectedInputStyle}>{formatDate(productDetail.created_at)}</p>
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ngày chỉnh sửa</p>
        </div>
        <div className='col-span-3'>
          <p className={noSelectedInputStyle}>{formatDate(productDetail.updated_at)}</p>
        </div>
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
          <span className='text-alertRed'>*</span>
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
          <span className='text-alertRed'>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-alertRed': Boolean(errors.category)
        })}
        register={register}
        name='category'
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.category?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Hạng mục</span>
          <span className='text-alertRed'>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-alertRed': Boolean(errors.collection)
        })}
        register={register}
        name='collection'
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.collection?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Bộ sưu tập</span>
          <span className='text-alertRed'>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-alertRed': Boolean(errors.type)
        })}
        register={register}
        name='type'
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.type?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Loại</span>
          <span className='text-alertRed'>*</span>
        </div>
      </AdminProductInput>

      <AdminProductInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-alertRed': Boolean(errors.product_line)
        })}
        register={register}
        name='product_line'
        autoComplete='false'
        errorSection={<AdminInputErrorSection errorMessage={errors.product_line?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Dòng sản phẩm</span>
          <span className='text-alertRed'>*</span>
        </div>
      </AdminProductInput>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Số lượng</span>
          <span className='text-alertRed'>*</span>
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
          <span className='text-alertRed'>*</span>
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

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Giảm giá</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='discount'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.discount)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.discount?.message} />
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Tag</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='tag'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.tag)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.tag?.message} />
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Lượt thích</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='like_count'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.like_count)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.like_count?.message} />
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Đã bán</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='sold'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.sold)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.sold?.message} />
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Cron status</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={'col-span-3'}>
          <Controller
            control={control}
            name='cron_status'
            render={({ field }) => (
              <InputNumber
                inputClassName={classNames(inputStyle, {
                  'outline-alertRed': Boolean(errors.cron_status)
                })}
                errorClassName='hidden'
                autoComplete='false'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <AdminInputErrorSection errorMessage={errors.cron_status?.message} />
      </div>

      <div className='space-y-2 px-2 py-1 '>
        <div className={titleStyle}>
          <span className='text-lg'>Mô tả</span>
          <span className='text-alertRed'>*</span>
        </div>

        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </div>
  )
}
