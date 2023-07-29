import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import CollectionFilter from './CollectionFilter'
import CategoryFilter from './CategoryFilter'
import TypeFilter from './TypeFilter'
import { QueryConfig } from '../ProductList'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'

interface Props {
  queryConfig: QueryConfig
}

export default function AsideFilter({ queryConfig }: Props) {
  return (
    <div className='m-4 rounded-sm bg-[#f9f9f9] py-2 duration-500 dark:bg-[#444444] '>
      <CategoryFilter queryConfig={queryConfig} />
      <CollectionFilter queryConfig={queryConfig} />
      <TypeFilter queryConfig={queryConfig} />
    </div>
  )
}
