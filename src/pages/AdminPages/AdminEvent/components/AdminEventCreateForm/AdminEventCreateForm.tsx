import classNames from 'classnames'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import AdminInputErrorSection from 'src/components/AdminInputErrorSection'
import CustomJoditEditor from 'src/components/CustomJoditEditor'
import DateSelect from 'src/components/DateSelect'
import InputNumber from 'src/components/InputNumber'
import NoToolbarJoditEditor from 'src/components/NoToolbarJoditEditor'
import { CreateEventSchema } from 'src/rules/adminevent.rule'

type FormData = CreateEventSchema

export default function AdminEventCreateForm() {
  //! Use form context
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<FormData>()

  //! STYLES
  const inputFieldStyle = 'grid grid-cols-4 items-center gap-2 py-1 px-2 bg-transparent'
  const titleStyle = 'text-xs tablet:text-sm space-x-2 uppercase col-span-1 desktop:text-base text-primaryBlue'
  const inputStyle =
    'bg-darkColor700 py-1 px-2 text-base desktop:text-lg col-span-2 desktop:col-span-2 rounded-lg outline-1 outline outline-haretaColor/40 focus:outline-primaryColor text-haretaColor'
  const noSelectedInputStyle =
    'text-lightText py-1 px-2 col-span-2 text-base font-medium desktop:text-lg bg-transparent rounded-lg'
  const starStyle = 'text-lg text-alertRed tablet:text-xl desktop:text-2xl'

  //! Text editor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setOverallEditorContent = (editorState: any) => {
    setValue('overall_content', editorState)
  }
  const overallEditorContent = watch('overall_content')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setDetailEditorContent = (editorState: any) => {
    setValue('detail_content', editorState)
  }
  const detailEditorContent = watch('detail_content')

  return (
    <Fragment>
      <div className={'grid grid-cols-4 items-start gap-2 bg-transparent px-2 py-1'}>
        <div className={titleStyle}>
          <span className=''>Giới thiệu chung</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={noSelectedInputStyle}>
          <div
            className={classNames('h-20 overflow-hidden rounded-md text-black', {
              'outline outline-2 outline-offset-4 outline-alertRed': errors.overall_content
            })}
          >
            <NoToolbarJoditEditor content={overallEditorContent} setContent={setOverallEditorContent} />
          </div>
        </div>
        <AdminInputErrorSection errorMessage={errors.overall_content?.message} />
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Khuyến mãi (%)</span>
          <span className={starStyle}>*</span>
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
          <span className=''>Ngày mở đăng kí</span>
          <span className='text-lg text-alertRed'>*</span>
        </div>
        <div className={noSelectedInputStyle}>
          <Controller
            control={control}
            name='date_start'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_start?.message} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className=''>Ngày kết thúc đăng kí</span>
          <span className='text-lg text-alertRed'>*</span>
        </div>
        <div className={noSelectedInputStyle}>
          <Controller
            control={control}
            name='date_end'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_end?.message} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className='space-y-4 px-2 text-black'>
        <div className='flex space-x-2'>
          <div className={titleStyle}>
            <span className=''>Nội dung</span>
            <span className='text-alertRed'>*</span>
          </div>
          <span className='text-sm text-alertRed'>{errors.detail_content?.message}</span>
        </div>
        <CustomJoditEditor content={detailEditorContent} setContent={setDetailEditorContent} />
      </div>
    </Fragment>
  )
}
