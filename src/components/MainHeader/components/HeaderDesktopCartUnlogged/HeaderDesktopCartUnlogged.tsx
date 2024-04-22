import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CustomPopover from 'src/components/CustomPopover'
import mainPath from 'src/constants/path'
import { CartContext } from 'src/contexts/cart.context'
import { formatCurrency, generateNameId } from 'src/utils/utils'

function PopoverSection() {
  const { tempExtendedPurchase, setTempExtendedPurchase } = useContext(CartContext)

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = tempExtendedPurchase[purchaseIndex].id
    const newPurchaseList = tempExtendedPurchase.filter((purchase) => purchase.id !== purchaseId)
    setTempExtendedPurchase(newPurchaseList)
  }

  //! Multi languages
  const { t } = useTranslation('header')

  return (
    <div className='relative -top-1 w-[360px] rounded-md bg-lightColor700 py-2 text-sm text-darkText shadow-md dark:bg-darkColor700 dark:text-lightText desktop:top-0'>
      <Fragment>
        <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 desktop:text-lg'>
          {tempExtendedPurchase.length} {t('cart button.items in cart')}
        </div>
        <div className='m-2 overflow-auto rounded-md bg-lightColor900 outline outline-1 outline-black/10 dark:bg-darkColor900 dark:outline-white/10'>
          {tempExtendedPurchase.length > 0 ? (
            <div className='max-h-[360px] min-h-[240px] overflow-y-auto '>
              {tempExtendedPurchase.map((purchase, index) => (
                <div
                  className='flex items-center p-3 hover:bg-lightColor700/60 dark:hover:bg-darkColor700/60'
                  key={purchase.id}
                >
                  <div className='h-14 w-14'>
                    <div className='relative w-full  pt-[100%]'>
                      <img
                        src={
                          purchase?.item.avatar
                            ? purchase?.item.avatar.url
                            : 'https://cdn-icons-png.flaticon.com/128/5058/5058055.png'
                        }
                        alt={purchase.item.name}
                        className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                      />
                    </div>
                  </div>

                  <div className='flex grow flex-col justify-between'>
                    <div className='flex items-center justify-between'>
                      <NavLink
                        to={`${mainPath.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                        className='flex'
                      >
                        <p className='truncate px-2 font-semibold capitalize hover:text-primaryColor dark:hover:text-primaryColor desktop:text-base'>
                          {purchase.item.name}
                        </p>
                      </NavLink>
                      <span className='flex-shrink-0 font-medium text-haretaColor'>
                        ${formatCurrency(purchase.item.price)}
                      </span>
                    </div>
                    <div className='ml-2 flex justify-between'>
                      <span className='text-xs capitalize text-darkText/60 dark:text-lightText/60 desktop:text-sm'>{`(${purchase.item.color})`}</span>

                      <div className='flex space-x-3'>
                        <button
                          className='text-sm text-darkText/60  hover:text-alertRed dark:text-lightText/60 dark:hover:text-alertRed'
                          onClick={handleRemove(index)}
                        >
                          {t('cart button.remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
  const { tempExtendedPurchase } = useContext(CartContext)

  return (
    <div className='rounded-lg bg-unhoveringBg hover:bg-hoveringBg'>
      <CustomPopover
        className='flex border border-none px-1.5 py-1 desktop:px-2'
        renderPopover={<PopoverSection />}
        placement='bottom-end'
      >
        <div className='flex items-center space-x-2 px-2 py-0.5 text-black'>
          <FontAwesomeIcon icon={faCartShopping} className='' />
          {tempExtendedPurchase.length > 0 && (
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-medium text-darkText desktop:text-sm desktopLarge:text-base'>
              {tempExtendedPurchase.length}
            </div>
          )}
        </div>
      </CustomPopover>
    </div>
  )
}
