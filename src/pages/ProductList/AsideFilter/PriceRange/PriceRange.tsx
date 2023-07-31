import Input from 'src/components/Input'

// interface Props {
//   queryConfig: QueryConfig
//   isMobile?: boolean
//   setMobileFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
// }

export default function PriceRange() {
  return (
    <div className='my-2 overflow-hidden bg-[#ddd] p-2 duration-500 dark:bg-[#202020]'>
      <p className='text-textDark duration-500 dark:text-textLight'>Price range</p>
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
        <button className='mt-2 w-full rounded-md bg-[#eee] px-2 py-0.5 text-xs text-textDark duration-500 hover:text-vintageColor dark:bg-[#444] dark:text-textLight dark:hover:text-haretaColor lg:text-sm xl:text-base'>
          Apply Price range
        </button>
      </form>
    </div>
  )
}
