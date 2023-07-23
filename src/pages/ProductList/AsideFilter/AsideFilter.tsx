import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import CollectionFilter from './CollectionFilter'
import CategoryFilter from './CategoryFilter'
import TypeFilter from './TypeFilter'

export default function AsideFilter() {
  return (
    <div className='m-4 rounded-sm bg-[#f9f9f9] py-2 duration-500 dark:bg-[#444444] '>
      <CategoryFilter />
      <CollectionFilter />
      <TypeFilter />
    </div>
  )
}
