import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Purchase } from 'src/types/cart.type'

interface Props {
  purchase: Purchase
}

export default function OrderPurchaseMobile({ purchase }: Props) {
  const avatarURL = purchase.item.avatar ? purchase.item.avatar.url : null

  return (
    <div className='grid grid-cols-4 px-1 py-2 text-sm font-medium text-darkText dark:text-lightText tabletSmall:py-3'>
      <div className='col-span-1'>
        <div className='relative w-full overflow-hidden bg-white pt-[100%] dark:bg-black'>
          {avatarURL ? (
            <img
              src={avatarURL}
              alt={purchase.item.name}
              className='absolute left-0 top-0 h-full w-full object-cover'
            />
          ) : (
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className='absolute left-0 top-0 h-full w-full object-cover'
            />
          )}
        </div>
      </div>
      <div className='col-span-3 flex w-full flex-col justify-between pl-3'>
        <div className='flex items-center justify-between'>
          <p className='w-full text-sm font-medium tabletSmall:text-base'>{purchase.item.name}</p>
          <span className='text-xs font-medium tabletSmall:text-sm'>${purchase.item.price}</span>
        </div>
        <div className='flex w-full items-center justify-between text-xs tabletSmall:text-sm'>
          <span className='capitalize text-darkText/60 dark:text-lightText/60'>{purchase.item.color}</span>
          <span className='lowercase'>x{purchase.quantity}</span>
        </div>
        <div className='w-full text-right text-sm font-medium text-haretaColor tabletSmall:text-base'>
          ${purchase.item.price * purchase.quantity}
        </div>
      </div>
    </div>
  )
}
