import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Purchase } from 'src/types/cart.type'

interface Props {
  purchase: Purchase
}

export default function OrderPurchaseDekstop({ purchase }: Props) {
  const avatarURL = purchase.item.avatar ? purchase.item.avatar.url : null

  return (
    <div className='text-darkText md:px-4 md:text-base lg:text-lg xl:px-8 xl:text-lg dark:text-lightText grid grid-cols-3 px-1 py-4 text-sm font-medium uppercase'>
      <div className='col-span-1'>
        <div className='lg:grid-cols-3 lg:gap-4 grid grid-cols-2 gap-2'>
          <div className='lg:col-span-2 col-span-1'>
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
              <div className='lg:text-base xl:text-lg truncate text-sm'>{purchase.item.name}</div>
              <div className='text-darkText/80 lg:text-sm xl:text-base dark:text-lightText/80 truncate text-xs'>
                {purchase.item.color}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-2 min-h-full'>
        <div className='xl:gap-4 grid h-full grid-cols-3 gap-2 text-center'>
          <div className='lg:text-base xl:text-lg col-span-1 flex min-h-full w-full items-center justify-center text-center text-sm '>
            ${purchase.item.price}
          </div>
          <div className='lg:text-base xl:text-lg col-span-1 flex min-h-full w-full items-center justify-center text-center text-sm '>
            {purchase.quantity}
          </div>
          <div className='lg:text-lg xl:text-xl col-span-1 flex min-h-full w-full items-center justify-center text-center text-base font-medium '>
            ${purchase.item.price * purchase.quantity}
          </div>
        </div>
      </div>
    </div>
  )
}
