import CollectionFilter from './CollectionFilter'
import CategoryFilter from './CategoryFilter'
import TypeFilter from './TypeFilter'
import { QueryConfig } from '../ProductList'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { setCategoryFilteringToLS, setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import Button from 'src/components/Button'
import PriceRange from './PriceRange'

interface Props {
  queryConfig: QueryConfig
}

export default function AsideFilter({ queryConfig }: Props) {
  const { setCategory, setCollection, setType } = useContext(StoreContext)

  const navigate = useNavigate()

  const handleClear = () => {
    setCategory('All')
    setCollection('All')
    setType('All')
    setCategoryFilteringToLS('All')
    setCollectionFilteringToLS('All')
    setTypeFilteringToLS('All')
    navigate({
      pathname: path.home
    })
  }
  return (
    <div className='m-4 rounded-sm bg-[#f9f9f9] px-2 py-2 duration-500 dark:bg-[#444444]'>
      <CategoryFilter queryConfig={queryConfig} />
      <CollectionFilter queryConfig={queryConfig} />
      <TypeFilter queryConfig={queryConfig} />
      <PriceRange queryConfig={queryConfig} />
      <button
        onClick={handleClear}
        className='my-2 flex w-full shrink-0 items-center justify-start rounded-sm bg-[#E8E8E8] px-4 py-2 text-textDark hover:text-haretaColor dark:bg-[#363636] dark:text-textLight dark:hover:text-haretaColor'
      >
        Clear filtering
      </button>
    </div>
  )
}
