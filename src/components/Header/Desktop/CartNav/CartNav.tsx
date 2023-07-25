import Popover from 'src/components/Popover'
import CartPopover from './CartPopover'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function CartNav() {
  return (
    <Popover
      className='flex border border-none px-1.5 py-1 lg:px-2'
      renderPopover={<CartPopover />}
      placement='bottom-end'
    >
      <Link to='/' className='flex items-center space-x-1'>
        <FontAwesomeIcon icon={faCartShopping} />
        <div>Cart</div>
      </Link>
    </Popover>
  )
}
