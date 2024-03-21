import MobileSorter from '../MobileSorter'
import MobileFilter from '../MobileFilter'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function MobileBottomBar({ queryConfig }: Props) {
  return (
    <div className='fixed bottom-0 z-10 grid h-10 w-full grid-cols-2 items-center justify-between border-t border-black/20 bg-lightHeader px-2 duration-200 dark:border-white/20 dark:bg-darkHeader tabletSmall:h-12'>
      <div className='col-span-1 flex items-center justify-start'>
        <MobileSorter />
      </div>
      <div className='col-span-1 flex items-center justify-end'>
        <MobileFilter queryConfig={queryConfig} />
      </div>
    </div>
  )
}
