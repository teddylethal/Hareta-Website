import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QueryConfig } from '../../ProductList'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import Input from 'src/components/Input'

interface Props {
  queryConfig: QueryConfig
}

export default function PriceRange({ queryConfig }: Props) {
  return (
    <div className='my-2 overflow-hidden bg-[#E8E8E8] p-2 duration-500 dark:bg-[#363636]'>
      <p className='text-textDark dark:text-textLight'>Price range</p>
      <form className='mx-2 my-1'>
        <div className='flex items-center justify-center'>
          <Input
            type='text'
            className='flex items-center'
            name='from'
            placeholder='$ From'
            classNameInput='p-1 text-xs lg:text-sm outline-none rounded-sm focus:shadow-sm w-12 xl:w-20 lg:w-14'
          />
          <div className='m-2 text-textDark dark:text-textLight'>-</div>
          <Input
            type='text'
            className='flex items-center'
            name='to'
            placeholder='$ To'
            classNameInput='p-1 text-xs lg:text-sm outline-none rounded-sm focus:shadow-sm w-12 xl:w-20 lg:w-14'
          />
        </div>
        <button className='mt-2 w-full rounded-md bg-[#aaa] px-2 py-1 text-xs text-textDark hover:text-haretaColor dark:bg-[#444] dark:text-textLight dark:hover:text-haretaColor lg:text-sm xl:text-base'>
          Apply Price range
        </button>
      </form>
    </div>
  )
}
