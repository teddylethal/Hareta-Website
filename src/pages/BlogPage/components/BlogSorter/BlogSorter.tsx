import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import blogApi from 'src/apis/blog.api'
import mainPath from 'src/constants/path'
import useBlogListQueryConfig from 'src/hooks/useBlogListQueryConfig'

export default function BlogSorter() {
  //! Get tag list
  const { data: tagsData } = useQuery({
    queryKey: ['blogs', 'tags'],
    queryFn: () => blogApi.getBlogTagList()
  })
  const tags = tagsData?.data.data || []

  //! Handle sorting
  const blogListQueryConfig = useBlogListQueryConfig()
  const navigate = useNavigate()
  const { tag: activeTag } = blogListQueryConfig

  const handleChooseTag = (tag: string) => () => {
    if (tag == activeTag) {
      navigate({
        pathname: mainPath.blogs,
        search: createSearchParams(
          omit(
            {
              ...blogListQueryConfig
            },
            ['tag', 'title', 'page', 'limit']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: mainPath.blogs,
        search: createSearchParams(
          omit(
            {
              ...blogListQueryConfig,
              tag: tag
            },
            ['title', 'page', 'limit']
          )
        ).toString()
      })
    }
  }

  return (
    <div className='flex space-x-2 text-xs tablet:text-sm desktop:space-x-4 desktop:text-base'>
      {tags.map((tag) => {
        const isActive = tag == activeTag
        return (
          <button
            key={tag}
            onClick={handleChooseTag(tag)}
            className={classNames('rounded-xl bg-darkColor700 px-4 py-1 ', {
              'bg-primaryColor': isActive,
              'hover:bg-darkColor500': !isActive
            })}
          >
            #{tag}
          </button>
        )
      })}
    </div>
  )
}
