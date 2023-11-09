import { Link } from 'react-router-dom'
import ChangeLanguage from 'src/components/ChangeLanguage'

export default function SupportPopover() {
  return (
    <div className='relative flex w-52 select-none flex-col rounded-lg bg-[#efefef] p-2 text-base font-medium text-textDark/90 shadow-lg dark:bg-[#202020] dark:text-textLight/90 md:font-medium lg:w-60 lg:text-lg'>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        About us
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        Privacy & Terms
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        FAQ
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        Contact us
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        Order tracking
      </Link>
      <div className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'>
        <ChangeLanguage />
      </div>
    </div>
  )
}
