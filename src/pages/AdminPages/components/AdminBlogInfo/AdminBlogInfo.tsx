import DOMPurify from 'dompurify'
import { BlogDetail } from 'src/types/blog.type'
import { InformationField } from 'src/types/utils.type'

interface Props {
  blogDetail: BlogDetail
}

export default function AdminBlogInfo({ blogDetail }: Props) {
  //! Styles
  const wrapperStyle = 'grid grid-cols-4 items-center gap-2 border border-black/20 py-1 px-2 rounded-md'
  const inforStyle = 'py-1 px-2 text-sm tablet:text-base desktop:text-lg'
  const titleStyle = 'text-xs tablet:text-sm font-semibold uppercase text-primaryBlue lg:text-base'

  //! Infos
  const infos: InformationField[] = [
    {
      title: 'Tiêu đề',
      info: blogDetail.title
    },
    {
      title: 'Ngày tạo',
      info: blogDetail.created_at
    },
    {
      title: 'Ngày chỉnh sửa',
      info: blogDetail.updated_at
    }
  ]

  return (
    <div className='flex flex-col space-y-2'>
      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ảnh</p>
        </div>
        <div className='col-span-3'>
          <div className='flex w-full flex-col items-center space-y-4 py-4 tabletSmall:w-8/12 tablet:w-6/12 desktop:w-4/12'>
            <div className='relative w-full overflow-hidden rounded-md border-2 border-white pt-[100%]'>
              <img
                src={blogDetail.avatar}
                alt={blogDetail.title}
                className='absolute left-0 top-0 h-full w-full object-cover '
              />
            </div>
          </div>
        </div>
      </div>

      {infos.map((info, index) => (
        <div key={index} className={wrapperStyle}>
          <div className='col-span-1'>
            <p className={titleStyle}>{info.title}</p>
          </div>
          <div className='col-span-3'>
            <p className={inforStyle}>{info.info}</p>
          </div>
        </div>
      ))}

      {/* <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tags</p>
        </div>
        <div className='col-span-3'>
          <div className={inforStyle}>
            {blogDetail.tags.map((tag, index) => (
              <span key={index} className='pr-1'>
                {tag.tag},
              </span>
            ))}
          </div>
        </div>
      </div> */}

      <div className=''>
        <p className='w-full text-center text-base font-semibold uppercase text-primaryBlue tablet:text-lg desktop:text-xl'>
          Nội dung
        </p>
        <div className={inforStyle}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogDetail.content)
            }}
            className='overflow-visible'
          />
        </div>
      </div>
    </div>
  )
}
