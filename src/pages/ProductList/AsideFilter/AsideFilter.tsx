import CollectionFilter from './CollectionFilter'
import CategoryFilter from './CategoryFilter'
import TypeFilter from './TypeFilter'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

import classNames from 'classnames'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function AsideFilter({ queryConfig }: Props) {
  const navigate = useNavigate()
  const { category, collection, type } = queryConfig

  const isFiltering = category || collection || type

  const handleClear = () => {
    navigate({
      pathname: path.store
    })
  }

  return (
    <div className='ml-4 flex flex-col space-y-2 rounded-md bg-[#ddd] px-3 py-2 duration-500 dark:bg-[#303030]'>
      <p className='text-base font-medium uppercase text-textDark dark:text-textLight lg:text-lg'>Filtering</p>
      <CategoryFilter queryConfig={queryConfig} />
      <CollectionFilter queryConfig={queryConfig} />
      <TypeFilter queryConfig={queryConfig} />
      <button
        onClick={handleClear}
        disabled={isFiltering ? false : true}
        className={classNames(
          'my-2 flex w-full shrink-0 items-center justify-start rounded-md bg-[#fff] px-4 py-2 font-medium text-red-500/80 outline outline-1 outline-transparent duration-500 disabled:cursor-not-allowed dark:bg-[#202020]',
          { 'text-red-500/40': !isFiltering },
          {
            ' hover:text-red-500 hover:outline-red-500 ': isFiltering
          }
        )}
      >
        Clear filtering
      </button>
    </div>
  )
}
