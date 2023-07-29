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
    <div className='m-4 rounded-sm bg-[#f0f0f0] px-2 py-2 duration-500 dark:bg-[#303030]'>
      <CategoryFilter queryConfig={queryConfig} />
      <CollectionFilter queryConfig={queryConfig} />
      <TypeFilter queryConfig={queryConfig} />
      <PriceRange queryConfig={queryConfig} />
      <button
        onClick={handleClear}
        className='my-2 flex w-full shrink-0 items-center justify-start rounded-md bg-[#ddd] px-4 py-2 text-textDark outline outline-1 outline-transparent duration-500 hover:text-vintageColor hover:outline-vintageColor dark:bg-[#202020] dark:text-textLight dark:hover:text-haretaColor'
      >
        Clear filtering
      </button>
    </div>
  )
}
