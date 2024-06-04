import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CustomPopover from 'src/components/CustomPopover'
import mainPath from 'src/constants/path'
import { CartContext } from 'src/contexts/cart.context'
import HeaderPurchaseCard from '../HeaderPurchaseCard'
import { Purchase } from 'src/types/cart.type'

const currentDate = new Date()

function PopoverSection() {
  const { tempExtendedPurchases, setTempExtendedPurchases } = useContext(CartContext)

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = tempExtendedPurchases[purchaseIndex].id
    const newPurchaseList = tempExtendedPurchases.filter((purchase) => purchase.id !== purchaseId)
    setTempExtendedPurchases(newPurchaseList)
  }

  //! Multi languages
  const { t } = useTranslation('header')

  return (
    <div className='relative -top-1 w-[360px] rounded-md bg-lightColor700 py-2 text-sm text-darkText shadow-md dark:bg-darkColor700 dark:text-lightText desktop:top-0'>
      <Fragment>
        <div className='flex space-x-1.5 px-3 py-1 text-base desktop:text-lg'>
          <span className='text-haretaColor'>{tempExtendedPurchases.length}</span>
          <span className='text-gray-500 dark:text-gray-300'>{t('cart button.items in cart')}</span>
        </div>

        <div className='m-2 overflow-auto rounded-md bg-lightColor900 outline outline-1 outline-black/20 dark:bg-darkColor900 dark:outline-white/20'>
          {tempExtendedPurchases.length > 0 ? (
            <div className='max-h-[360px] min-h-[240px] overflow-y-auto '>
              {tempExtendedPurchases.map((tempPurchase, index) => {
                const purchase: Purchase = {
                  id: tempPurchase.id,
                  item: tempPurchase.item,
                  quantity: tempPurchase.quantity,
                  status: 0,
                  created_at: currentDate.toDateString(),
                  updated_at: currentDate.toDateString()
                }
                return <HeaderPurchaseCard key={purchase.id} purchase={purchase} handleRemove={handleRemove(index)} />
              })}
            </div>
          ) : (
            <div className=''>
              <img src='/images/empty_cart.png' alt='Empty cart' className='m-2' />
            </div>
          )}
        </div>
      </Fragment>

      <div className='mx-3 mb-2 mt-4 flex items-center justify-between font-medium text-black'>
        <NavLink to={mainPath.store}>
          <button className='justify-self-start rounded-md bg-haretaColor px-4 py-1 text-sm hover:bg-primaryColor '>
            {t('cart button.store')}
          </button>
        </NavLink>
        <NavLink to={mainPath.cart}>
          <button className='justify-self-start rounded-md bg-haretaColor px-4 py-1 text-sm hover:bg-primaryColor'>
            {t('cart button.enter cart')}
          </button>
        </NavLink>
      </div>
      <div className='absolute -top-4 right-0 h-4 w-1/4 bg-none'></div>
    </div>
  )
}

export default function HeaderDesktopCartUnlogged() {
  const { tempExtendedPurchases } = useContext(CartContext)

  return (
    <div className='rounded-lg bg-unhoveringBg hover:bg-hoveringBg'>
      <CustomPopover
        className='flex border border-none px-1.5 py-1 desktop:px-2'
        renderPopover={<PopoverSection />}
        placement='bottom-end'
      >
        <div className='flex items-center space-x-2 px-2 py-0.5 text-black'>
          <FontAwesomeIcon icon={faCartShopping} className='' />
          {tempExtendedPurchases.length > 0 && (
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-medium text-darkText desktop:text-sm desktopLarge:text-base'>
              {tempExtendedPurchases.length}
            </div>
          )}
        </div>
      </CustomPopover>
    </div>
  )
}
