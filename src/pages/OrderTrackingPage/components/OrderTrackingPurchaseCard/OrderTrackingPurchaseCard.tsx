import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Purchase } from 'src/types/cart.type'

interface Props {
  purchase: Purchase
}

export default function OrderTrackingPurchaseCard({ purchase }: Props) {
  const avatarURL = purchase.item.avatar ? purchase.item.avatar.url : null

  return (
    <div className='col-span-1 grid grid-cols-4 rounded-xl border border-black/60 p-2 text-sm font-medium text-darkText dark:border-white/60 dark:text-lightText'>
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
      <div className='col-span-3 flex h-full flex-col justify-between pl-3'>
        <div className=' flex w-full items-center justify-between'>
          <div className='space-y-3'>
            <p className='w-full text-sm font-medium mobileLarge:text-base desktop:text-lg'>{purchase.item.name}</p>
            <p className='capitalize opacity-60'>{purchase.item.color}</p>
          </div>
          <div className='space-y-3'>
            <p className='text-xs font-medium mobileLarge:text-sm desktop:text-base'>${purchase.item.price}</p>
            <p className='text-right lowercase'>x{purchase.quantity}</p>
          </div>
        </div>
        <div className='w-full text-right text-sm font-medium text-haretaColor mobileLarge:text-base desktop:text-lg'>
          ${purchase.item.price * purchase.quantity}
        </div>
      </div>
      {/* <div className='col-span-3 flex w-full flex-col justify-between pl-3'>
        <div className='flex items-center justify-between'>
          <span className='w-full text-sm font-medium mobileLarge:text-base desktop:text-lg'>{purchase.item.name}</span>
          <span className='text-xs font-medium mobileLarge:text-sm desktop:text-base'>${purchase.item.price}</span>
        </div>
        <div className='flex w-full items-center justify-between text-xs mobileLarge:text-sm desktop:text-base'>
          <span className='capitalize opacity-60'>{purchase.item.color}</span>
          <span className='lowercase'>x{purchase.quantity}</span>
        </div>
        <div className='w-full text-right text-sm font-medium text-haretaColor mobileLarge:text-base desktop:text-lg'>
          ${purchase.item.price * purchase.quantity}
        </div>
      </div> */}
    </div>
  )
}
