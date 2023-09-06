import { useContext } from 'react'
import { CartContext } from 'src/contexts/cart.context'
import { formatCurrency } from 'src/utils/utils'

export default function OrderDetail() {
  const { extendedPurchases } = useContext(CartContext)

  const totalPurchasesPrice = extendedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  const totalDiscount = extendedPurchases.reduce((result, current) => {
    return result + current.item.discount * current.quantity
  }, 0)

  //? GET CART LIST

  return (
    <div className='sticky rounded-xl p-3 lg:p-4'>
      <p className='text-2xl font-semibold uppercase xl:text-3xl'>order</p>
      <div className='my-4 w-full border border-black/80 dark:border-white/80'></div>
      <div className='max-h-60 overflow-auto'>
        {extendedPurchases.map((purchase, index) => (
          <div className='relative grid grid-cols-3 items-center gap-2 py-3 xl:py-4' key={purchase.id}>
            <div className='col-span-2'>
              <p className='text-lg font-bold capitalize xl:text-xl'>{purchase.item.name}</p>
              <p className='text-sm capitalize xl:text-base'>{purchase.item.color}</p>
            </div>
            <div className='col-span-1 text-right'>
              <p className='text-base xl:text-lg'>${purchase.item.price}</p>
              <p className='text-sm xl:text-base'>x {purchase.quantity}</p>
            </div>
            {index !== 0 && (
              <div className='absolute left-1/2 top-0 w-1/6 -translate-x-1/2 border-t border-dashed border-black/60 dark:border-white/60'></div>
            )}
          </div>
        ))}
      </div>
      <div className='my-4 w-full border border-dashed border-black/80 dark:border-white/80'></div>
      <div className=' space-y-2 text-lg font-semibold xl:text-xl'>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>Bill</div>
          <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
            ${formatCurrency(totalPurchasesPrice)}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>Discount</div>
          <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
            ${formatCurrency(totalDiscount)}
          </div>
        </div>
      </div>
      <div className='my-4 w-full border border-dashed border-black/80 dark:border-white/80'></div>
      <div className='grid grid-cols-3 gap-2 text-xl font-bold uppercase xl:text-2xl'>
        <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>Total</div>
        <div className='col-span-1 text-right text-brownColor dark:text-haretaColor'>
          ${formatCurrency(totalPurchasesPrice - totalDiscount)}
        </div>
      </div>

      <button className='mt-4 flex w-full items-center justify-center rounded-xl bg-vintageColor/80 py-3 text-xl font-bold uppercase hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 xl:py-4 xl:text-2xl'>
        Confirm order
      </button>
    </div>
  )
}
