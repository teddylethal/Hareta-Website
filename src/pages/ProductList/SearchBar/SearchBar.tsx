import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { ProductSchema, productSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

type FormData = ProductSchema

export default function SearchBar() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(productSchema)
  })
  const handleSearch = handleSubmit((data) => {
    // console.log(data.name)
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
      pathname: path.store,
      search: createSearchParams(config).toString()
    })
  })

  //? TRANSLATION
  const { t } = useTranslation('store')

  return (
    <div className='w-full'>
      <form
        className='relative flex w-full items-center rounded-lg bg-sidebarItemLight shadow-sm duration-200 dark:bg-sidebarItemDark'
        onSubmit={handleSearch}
      >
        <input
          className='focus:ring-primaryColordark:text-lightText text-darkText autofill:text-darkText lg:py-2 lg:text-lg dark:text-lightText dark:autofill:text-lightText w-full rounded-md bg-transparent px-4 py-1 text-base caret-black outline-none ring-1 ring-haretaColor duration-200 focus:ring-2 dark:caret-white dark:ring-haretaColor dark:focus:ring-primaryColor'
          placeholder={t('aside filter.search')}
          {...register('name')}
        />
        <button className='lg:right-4 lg:px-3 absolute right-1 flex items-center justify-center rounded-lg bg-haretaColor px-3 py-1 duration-200 hover:bg-primaryColor dark:bg-haretaColor dark:hover:bg-primaryColor'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='lg:h-5 lg:w-5 h-4 w-4'
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
