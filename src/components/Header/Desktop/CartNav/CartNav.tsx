import Popover from 'src/components/Popover'
import CartPopover from './CartPopover'
import { Link } from 'react-router-dom'

export default function CartNav() {
  return (
    <Popover
      className='flex border border-none px-1.5 py-1 lg:px-2'
      renderPopover={<CartPopover />}
      placement='bottom-end'
    >
      <Link to='/' className='flex items-center space-x-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
          />
        </svg>
        <div>Cart</div>
      </Link>
    </Popover>
  )
}
