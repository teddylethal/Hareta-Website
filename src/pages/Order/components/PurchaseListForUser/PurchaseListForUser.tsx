import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { OrderContext } from 'src/contexts/order.context'
import { formatCurrency } from 'src/utils/utils'

export default function PurchaseListForUser() {
  const { orderList } = useContext(OrderContext)
  const totalPrice = orderList.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  const totalDiscount = orderList.reduce((result, current) => {
    return result + current.item.discount * current.quantity
  }, 0)

  //? translation
  const { t } = useTranslation('order')

  return (
    <Fragment>
      <div className='max-h-60 overflow-auto'>
        {orderList.map((orderItem, index) => (
          <div className='relative grid grid-cols-3 items-center gap-2 py-3 xl:py-4' key={orderItem.id}>
            <div className='col-span-2'>
              <p className='text-lg font-bold capitalize xl:text-xl'>{orderItem.item.name}</p>
              <p className='text-sm capitalize xl:text-base'>{orderItem.item.color}</p>
            </div>
            <div className='col-span-1 text-right'>
              <p className='text-base xl:text-lg'>${orderItem.item.price}</p>
              <p className='text-sm xl:text-base'>x {orderItem.quantity}</p>
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
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>{t('layout.Bill')}</div>
          <div className='col-span-1 text-right text-haretaColor dark:text-haretaColor'>
            ${formatCurrency(totalPrice)}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>{t('layout.Discount')}</div>
          <div className='col-span-1 text-right text-haretaColor dark:text-haretaColor'>
            ${formatCurrency(totalDiscount)}
          </div>
        </div>
      </div>
      <div className='my-4 w-full border border-dashed border-black/80 dark:border-white/80'></div>
      <div className='grid grid-cols-3 gap-2 text-xl font-bold uppercase xl:text-2xl'>
        <div className='col-span-2 text-textDark/80 dark:text-textLight/80'>{t('layout.Total')}</div>
        <div className='col-span-1 text-right text-haretaColor dark:text-haretaColor'>
          ${formatCurrency(totalPrice - totalDiscount)}
        </div>
      </div>
    </Fragment>
  )
}
