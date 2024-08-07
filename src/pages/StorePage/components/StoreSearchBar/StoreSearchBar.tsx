import useProductListQueryConfig from 'src/hooks/useProductListQueryConfig'
import { useForm } from 'react-hook-form'
import { ProductSchema, productSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

type FormData = ProductSchema

export default function StoreSearchBar() {
  const queryConfig = useProductListQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(productSchema)
  })
  const handleSearch = handleSubmit((data) => {
    const config =
      data.name === ''
        ? omit(
            {
              ...queryConfig
            },
            ['category', 'collection', 'type', 'page', 'limit', 'name']
          )
        : omit(
            {
              ...queryConfig,
              name: data.name
            },
            ['category', 'collection', 'type', 'page', 'limit']
          )
    navigate({
      pathname: mainPath.store,
      search: createSearchParams(config).toString()
    })
  })

  //! Multi languages
  const { t } = useTranslation('store')

  return (
    <div className='w-full'>
      <form
        className='relative flex w-full items-center rounded-xl bg-sidebarItemLight shadow-sm duration-200 dark:bg-sidebarItemDark'
        onSubmit={handleSearch}
      >
        <input
          className='focus:ring-primaryColordark:text-lightText w-full rounded-xl bg-transparent px-4 py-1 text-base text-darkText caret-black outline-none ring-1 ring-haretaColor duration-200 autofill:text-darkText focus:ring-2 dark:text-lightText dark:caret-white dark:ring-haretaColor dark:autofill:text-lightText dark:focus:ring-primaryColor desktop:py-2 desktop:text-lg'
          placeholder={t('aside filter.search')}
          {...register('name')}
          autoComplete='true'
        />
        <button className='absolute right-1 flex items-center justify-center rounded-xl  bg-haretaColor px-3 py-1 duration-200 hover:bg-primaryColor dark:bg-haretaColor dark:hover:bg-primaryColor desktop:right-4 desktop:px-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-4 w-4 desktop:h-5 desktop:w-5'
          >
            <path
              fillRule='evenodd'
              d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
