import { Link } from 'react-router-dom'

export default function SupportPopover() {
  return (
    <div className='relative flex w-40 flex-col space-y-2 rounded-sm bg-[#eee] p-3 text-sm text-textDark shadow-md dark:bg-[#333] dark:text-textLight md:text-base lg:w-52 lg:px-6 lg:text-lg'>
      <Link to='/' className='hover:text-haretaColor dark:hover:text-haretaColor'>
        About us
      </Link>
      <Link to='/' className='hover:text-haretaColor dark:hover:text-haretaColor'>
        Privacy & Terms
      </Link>
      <Link to='/' className='hover:text-haretaColor dark:hover:text-haretaColor'>
        FAQ
      </Link>
      <Link to='/' className='hover:text-haretaColor dark:hover:text-haretaColor'>
        Contact us
      </Link>
      <Link to='/' className='hover:text-haretaColor dark:hover:text-haretaColor'>
        Order tracking
      </Link>
    </div>
  )
}
