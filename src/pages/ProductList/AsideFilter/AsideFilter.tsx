import CollectionFilter from './CollectionFilter'
import CategoryFilter from './CategoryFilter'
import TypeFilter from './TypeFilter'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { setCategoryFilteringToLS, setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import PriceRange from './PriceRange'
import classNames from 'classnames'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function AsideFilter({ queryConfig }: Props) {
  const { setCategory, setCollection, setType, category, collection, type } = useContext(StoreContext)
  const navigate = useNavigate()

  const isFiltering = category !== 'All' || collection !== 'All' || type !== 'All'

  const handleClear = () => {
    setCategory('All')
    setCollection('All')
    setType('All')
    setCategoryFilteringToLS('All')
    setCollectionFilteringToLS('All')
    setTypeFilteringToLS('All')

    navigate({
      pathname: path.store
    })
  }

  return (
    <div className='m-4 rounded-sm bg-[#f0f0f0] px-2 py-2 duration-500 dark:bg-[#303030]'>
      <CategoryFilter queryConfig={queryConfig} />
      <CollectionFilter queryConfig={queryConfig} />
      <TypeFilter queryConfig={queryConfig} />
      <PriceRange />
      <button
        onClick={handleClear}
        disabled={isFiltering ? false : true}
        className={classNames(
          'my-2 flex w-full shrink-0 items-center justify-start rounded-md bg-[#ddd] px-4 py-2 text-textDark outline outline-1 outline-transparent duration-500 disabled:cursor-not-allowed dark:bg-[#202020] dark:text-textLight ',
          { 'text-opacity-40 dark:text-opacity-40': !isFiltering },
          {
            'hover:text-vintageColor hover:outline-vintageColor dark:hover:text-haretaColor': isFiltering
          }
        )}
      >
        Clear filtering
      </button>
    </div>
  )
}
