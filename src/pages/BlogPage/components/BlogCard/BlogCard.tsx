import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DOMPurify from 'dompurify'
import React from 'react'
import { BlogType } from 'src/types/blog.type'
import { formatDate } from 'src/utils/utils'

interface Props {
  blog: BlogType
}

export default function BlogCard({ blog }: Props) {
  //! Blog info
  const avatarUrl = blog.avatar

  //! Handle click
  const handleClick = () => {
    return
  }

  return (
    <button className='group w-full rounded-xl bg-darkColor900 hover:bg-darkColor700'>
      <div className='relative w-full pt-[75%]'>
        <div className='absolute left-0 top-0 h-full w-full'>
          {avatarUrl != '' ? (
            <img src={avatarUrl} alt={blog.title} className='absolute left-0 top-0 h-full w-full object-cover' />
          ) : (
            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
              <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col justify-between space-x-1 space-y-2 overflow-hidden px-2 py-4 tabletSmall:px-3 desktop:px-4'>
        <p className='justify-center overflow-hidden truncate py-1 text-center text-sm font-bold uppercase duration-200 group-hover:text-primaryColor dark:text-lightText desktop:text-2xl'>
          {blog.title}
        </p>

        <p className=''>{formatDate(blog.created_at)}</p>

        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content, {
              FORCE_BODY: true,
              ALLOWED_ATTR: ['style', 'classs']
            })
          }}
          className='line-clamp-2 overflow-visible text-left'
        />
      </div>
    </button>
  )
}
