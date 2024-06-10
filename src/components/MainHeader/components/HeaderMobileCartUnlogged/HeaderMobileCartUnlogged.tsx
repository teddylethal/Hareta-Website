import { faCartShopping, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useContext } from 'react'
import { CartContext } from 'src/contexts/cart.context'
import useClickOutside from 'src/hooks/useClickOutside'
import { NavLink } from 'react-router-dom'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'
import { setTemporaryPurchasesToLS } from 'src/utils/cartInLS'

interface Props {
  wrapperStyle: string
  navigatorBtnStyle: string
}

export default function HeaderMobileCartUnlogged({ navigatorBtnStyle, wrapperStyle }: Props) {
  const { theme } = useContext(AppContext)
  const { temporaryPurchases, setTemporaryPurchases } = useContext(CartContext)

  const { visible, setVisible, ref } = useClickOutside(false)
  const openCart = () => {
    setVisible(true)
  }
  const closeCart = () => {
    setVisible(false)
  }

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = temporaryPurchases[purchaseIndex].id
    const newPurchaseList = temporaryPurchases.filter((purchase) => purchase.id !== purchaseId)
    setTemporaryPurchases(newPurchaseList)
    setTemporaryPurchasesToLS(newPurchaseList)
  }

  //! Multi languages
  const { t } = useTranslation('header')

  return (
    <div>
      <button onClick={openCart} className='relative flex items-end text-darkText dark:text-lightText'>
        <FontAwesomeIcon icon={faCartShopping} className='h-6 w-6 text-darkText dark:text-lightText' />
        {temporaryPurchases.length > 0 && (
          <span className='absolute -top-1 left-4 flex h-4 w-4 items-center justify-center rounded-full bg-haretaColor text-xs text-darkText'>
            {temporaryPurchases.length}
          </span>
        )}
      </button>
      <AnimatePresence>
        {visible && (
          <Fragment>
            <motion.div
              className='fixed inset-0'
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.4
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='absolute left-0 top-0 z-10 w-full self-center rounded-b-lg  shadow-sm tabletSmall:left-[calc(50%-200px)] tabletSmall:w-[400px]'
              initial={{ opacity: 0, y: '-20%' }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: theme === 'dark' ? '#1d1d22' : '#fbfbff',
                color: theme === 'dark' ? '#eeeeee' : '#111111'
              }}
              exit={{ opacity: 0, y: '-20%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <button className='flex w-full cursor-pointer items-center justify-center py-2' onClick={closeCart}>
                <FontAwesomeIcon icon={faChevronUp} />
              </button>

              <div className='mx-3 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

              <Fragment>
                <div className='px-3 py-2 text-base normal-case text-gray-500 dark:text-gray-300 desktop:text-lg'>
                  {temporaryPurchases.length} {t('cart button.items in cart')}
                </div>
                <div className={wrapperStyle}>
                  {temporaryPurchases.length > 0 ? (
                    temporaryPurchases.map((purchase, index) => (
                      <div
                        className='flex space-x-3 border-b border-black/20 p-3 last:border-none hover:bg-lightColor900/60 dark:border-white/20 dark:hover:bg-darkColor900/60'
                        key={purchase.id}
                      >
                        <div className='h-12 w-12'>
                          <div className='relative w-full pt-[100%]'>
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
                              to={`${mainPath.store}/${generateNameId({
                                name: purchase.item.name,
                                id: purchase.item.id
                              })}`}
                              className='flex'
                              onClick={closeCart}
                            >
                              <p className='truncate px-2 py-1 font-semibold hover:text-primaryColor'>
                                {purchase.item.name}
                              </p>
                            </NavLink>
                            <span className='flex-shrink-0 font-medium text-haretaColor'>
                              ${formatCurrency(purchase.item.price)}
                            </span>
                          </div>
                          <div className='ml-2 flex justify-between'>
                            <span className='text-gray-500 dark:text-gray-400'>x{purchase.quantity}</span>

                            <div className='flex space-x-3'>
                              <button
                                className='text-sm capitalize text-alertRed hover:underline'
                                onClick={handleRemove(index)}
                              >
                                {t('cart button.remove')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='relative h-full w-full'>
                      <img
                        src='/images/emptyCart.png'
                        alt='Empty cart'
                        className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/3 object-scale-down'
                      />
                    </div>
                  )}
                </div>
              </Fragment>

              <div className='mx-3 flex items-center justify-between py-2 text-xs tabletSmall:text-sm'>
                <div className='flex space-x-2'>
                  <NavLink to={mainPath.store} className={navigatorBtnStyle} onClick={closeCart}>
                    {t('cart button.store')}
                  </NavLink>
                </div>
                <div>
                  <NavLink to={mainPath.cart} className={navigatorBtnStyle} onClick={closeCart}>
                    {t('cart button.enter cart')}
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </div>
  )
}
