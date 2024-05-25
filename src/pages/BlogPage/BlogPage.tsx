import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PathBar from 'src/components/PathBar'
import SearchBar from 'src/components/SearchBar'
import mainPath from 'src/constants/path'
import BlogSorter from './components/BlogSorter'
import { useQuery } from '@tanstack/react-query'
import blogApi from 'src/apis/blog.api'
import useBlogListQueryConfig, { BLOG_LIMIT } from 'src/hooks/useBlogListQueryConfig'
import LoadingSection from 'src/components/LoadingSection'
import BlogCard from './components/BlogCard'
import UsePagination from 'src/components/UsePagination'
import { ceil } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function BlogPage() {
  //! Multi languages
  const { t } = useTranslation('blog')

  //! Change title
  useEffect(() => {
    document.title = `${t('title')} | Hareta Workshop`
  })

  //! Get blog list
  const blogListQueryConfig = useBlogListQueryConfig()
  const { data: blogsData } = useQuery({
    queryKey: ['blogs', blogListQueryConfig],
    queryFn: () => blogApi.getBlogList(blogListQueryConfig)
  })

  //! Handle search
  const navigate = useNavigate()
  const handleSearch = (keyWord: string) => {
    if (keyWord == '') {
      navigate({
        pathname: mainPath.blogs
      })
    } else {
      navigate({
        pathname: mainPath.blogs,
        search: createSearchParams({
          title: keyWord
        }).toString()
      })
    }
  }

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg desktop:py-3 desktopLarge:py-4'>
      <div className='container space-y-4'>
        <PathBar pathList={[{ pathName: t('path.blog'), url: mainPath.blogs }]} />

        <p className='text-center text-lg font-bold uppercase leading-10 tracking-wide tablet:text-2xl desktop:text-4xl'>
          {t('title')}
        </p>

        <div className='flex w-full justify-center'>
          <div className='w-full tablet:w-1/2'>
            <SearchBar handleSearch={handleSearch} />
          </div>
        </div>

        <div className='flex w-full justify-center'>
          <div className='w-full desktop:w-1/2'>
            <BlogSorter />
          </div>
        </div>

        <div className='py-4'>
          {!blogsData && <LoadingSection />}
          {blogsData && (
            <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktop:grid-cols-3 desktop:gap-6'>
              {blogsData.data.data.map((blog) => (
                <div key={blog.id} className='col-span-1'>
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          )}
        </div>

        {blogsData && (
          <UsePagination queryConfig={blogListQueryConfig} totalPage={ceil(blogsData.data.paging.total / BLOG_LIMIT)} />
        )}
      </div>
    </div>
  )
}
