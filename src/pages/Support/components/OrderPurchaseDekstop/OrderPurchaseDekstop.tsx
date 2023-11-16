import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Purchase } from 'src/types/cart.type'

interface Props {
  purchase: Purchase
}

export default function OrderPurchaseDekstop({ purchase }: Props) {
  const avatarURL = purchase.item.avatar ? purchase.item.avatar.url : null

  return (
    <div className='grid grid-cols-3 px-1 py-4 text-sm font-medium uppercase text-textDark dark:text-textLight md:px-4 md:text-base lg:text-lg xl:px-8 xl:text-lg'>
      <div className='col-span-1'>
        <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4'>
          <div className='col-span-1 lg:col-span-2'>
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
          <div className='col-span-1 flex min-h-full items-center'>
            <div className=' space-y-3 truncate text-left'>
              <div className='truncate text-sm lg:text-base xl:text-lg'>{purchase.item.name}</div>
              <div className='truncate text-xs text-textDark/80 dark:text-textLight/80 lg:text-sm xl:text-base'>
                {purchase.item.color}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-2 min-h-full'>
        <div className='grid h-full grid-cols-3 gap-2 text-center xl:gap-4'>
          <div className='col-span-1 flex min-h-full w-full items-center justify-center text-center text-sm lg:text-base xl:text-lg '>
            ${purchase.item.price}
          </div>
          <div className='col-span-1 flex min-h-full w-full items-center justify-center text-center text-sm lg:text-base xl:text-lg '>
            {purchase.quantity}
          </div>
          <div className='col-span-1 flex min-h-full w-full items-center justify-center text-center text-base font-medium lg:text-lg xl:text-xl '>
            ${purchase.item.price * purchase.quantity}
          </div>
        </div>
      </div>
    </div>
  )
}
