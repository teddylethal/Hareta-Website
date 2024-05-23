import classNames from 'classnames'
import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import CustomJoditEditor from 'src/components/CustomJoditEditor'
import { CreateBlogSchema } from 'src/rules/adminblog.rule'
import AdminInput from '../AdminInput'

type FormData = CreateBlogSchema

function ErrorSection({ errorMessage }: { errorMessage?: string }) {
  return (
    <div className='col-span-4 grid grid-cols-4 gap-1'>
      <div className='col-start-2 col-end-5 mt-0.5 min-h-[1.25rem] text-sm text-alertRed'>{errorMessage}</div>
    </div>
  )
}

export default function AdminBlogCreateForm() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<FormData>()

  //! EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('content', editorState)
  }
  const editorContent = watch('content')

  //! Styles
  const inputFieldStyle = 'grid grid-cols-4 items-center gap-2 py-1 px-2'
  const titleStyle = 'text-xs col-span-1 text-primaryBlue tablet:text-sm font-bold space-x-0.5 uppercase lg:text-base '
  const inputStyle =
    'text-darkText py-1 px-2 outline col-span-3 text-base lg:text-lg rounded-lg outline-1 outline-primaryBlue/80 focus:outline-primaryBlue'

  return (
    <Fragment>
      <AdminInput
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.title)
        })}
        register={register}
        name='title'
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.title?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Tiêu đề</span>
          <span className='text-alertRed'>*</span>
        </div>
      </AdminInput>

      <div className='space-y-4 px-2 text-black'>
        <div className='flex space-x-2'>
          <div className={titleStyle}>
            <span className=''>Nội dung</span>
            <span className='text-alertRed'>*</span>
          </div>
          <span className='text-sm text-alertRed'>{errors.content?.message}</span>
        </div>
        {/* <QuillEditor value={editorContent} setValue={onEditorStateChange} /> */}
        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
