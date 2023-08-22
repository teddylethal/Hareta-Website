import { Link } from 'react-router-dom'

export default function SupportPopover() {
  return (
    <div className='relative flex w-52 select-none flex-col  rounded-sm bg-[#efefef] p-2 text-sm font-medium text-textDark/70 shadow-md dark:bg-[#303030] dark:text-textLight/70 md:text-base lg:w-60 lg:text-lg'>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#e8e8e8] hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        About us
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#e8e8e8] hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        Privacy & Terms
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#e8e8e8] hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        FAQ
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#e8e8e8] hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        Contact us
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#e8e8e8] hover:text-textDark dark:hover:bg-[#181818] dark:hover:text-textLight'
      >
        Order tracking
      </Link>
    </div>
  )
}
