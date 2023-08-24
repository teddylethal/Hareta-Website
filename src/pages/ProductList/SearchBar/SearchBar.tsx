import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { ProductSchema, productSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

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
    console.log(data.name)
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

  return (
    <div className='w-full px-4'>
      <form
        className='relative flex w-full items-center rounded-lg bg-[#f8f8f8] shadow-sm duration-500 dark:bg-[#303030]'
        onSubmit={handleSearch}
      >
        <input
          id='search_bar_input'
          className='peer w-full rounded-md  bg-transparent px-4 py-1 text-base text-textDark outline-none ring-1 ring-vintageColor/60 duration-500 autofill:text-textDark focus:ring-2 focus:ring-vintageColor dark:text-textLight dark:caret-white dark:ring-haretaColor/60 dark:autofill:text-textLight dark:focus:ring-haretaColor lg:py-2 lg:text-lg'
          placeholder='Search'
          {...register('name')}
        />
        <label
          htmlFor='search_bar_input'
          className='absolute right-2 flex items-center justify-center rounded-lg bg-vintageColor/60 px-3 py-1.5 duration-500 peer-focus:bg-vintageColor dark:bg-haretaColor/60 dark:peer-focus:bg-haretaColor lg:right-4 lg:px-4 '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-4 w-4 lg:h-6 lg:w-6'
          >
            <path
              fillRule='evenodd'
              d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </form>
    </div>
  )
}
