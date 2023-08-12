import { Link } from 'react-router-dom'

export default function SupportPopover() {
  return (
    <div className='relative flex w-52 select-none flex-col space-y-2 rounded-sm bg-[#efefef] p-3 text-sm text-textDark shadow-md dark:bg-[#303030] dark:text-textLight md:text-base lg:w-60 lg:px-6 lg:text-lg'>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        About us
      </Link>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        Privacy & Terms
      </Link>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        FAQ
      </Link>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        Contact us
      </Link>
      <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
        Order tracking
      </Link>
    </div>
  )
}
