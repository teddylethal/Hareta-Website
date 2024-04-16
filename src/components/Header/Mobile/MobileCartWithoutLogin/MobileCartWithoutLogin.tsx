import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useContext } from 'react'
import { CartContext } from 'src/contexts/cart.context'
import useClickOutside from 'src/hooks/useClickOutside'
import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

export default function MobileCartWithoutLogin() {
  const { theme } = useContext(AppContext)
  const { tempExtendedPurchase, setTempExtendedPurchase } = useContext(CartContext)

  const { visible, setVisible, ref } = useClickOutside(false)
  const openCart = () => {
    setVisible(true)
  }
  const closeCart = () => {
    setVisible(false)
  }

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = tempExtendedPurchase[purchaseIndex].id
    const newPurchaseList = tempExtendedPurchase.filter((purchase) => purchase.id !== purchaseId)
    setTempExtendedPurchase(newPurchaseList)
  }

  //! Multi languages
  const { t } = useTranslation('header')

  return (
    <div>
      <button onClick={openCart} className='relative flex items-end text-darkText dark:text-lightText'>
        <FontAwesomeIcon icon={faCartShopping} className='h-6 w-6 text-darkText dark:text-lightText' />
        {tempExtendedPurchase.length > 0 && (
          <span className='absolute -top-1 left-4 flex h-4 w-4 items-center justify-center rounded-full bg-haretaColor text-xs text-darkText'>
            {tempExtendedPurchase.length}
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
              className='absolute left-0 top-0 z-10 w-full self-center rounded-b-lg py-2 shadow-sm tabletSmall:left-[calc(50%-200px)] tabletSmall:w-[400px]'
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
              <button className='flex w-full cursor-pointer items-center justify-center' onClick={closeCart}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6 tabletSmall:h-8 tabletSmall:w-8'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>

              <div className='mx-3 my-2 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

              <Fragment>
                <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 desktop:text-lg'>
                  {tempExtendedPurchase.length} {t('cart button.items in cart')}
                </div>
                <div className='mx-3 h-[220px] overflow-y-auto rounded-md border border-black/20 bg-lightColor700 dark:border-white/20 dark:bg-darkColor700'>
                  {tempExtendedPurchase.length > 0 ? (
                    tempExtendedPurchase.map((purchase, index) => (
                      <div
                        className=' flex space-x-3 border-b border-black/20 p-3 last:border-none hover:bg-lightColor900/60 dark:border-white/20 dark:hover:bg-darkColor900/60'
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
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                              className='flex'
                              onClick={closeCart}
                            >
                              <p className='truncate px-2 py-1 font-semibold hover:text-primaryColor'>
                                {purchase.item.name}
                              </p>
                            </Link>
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
                        className='absolute left-0 top-0 h-full w-full object-scale-down'
                      />
                    </div>
                  )}
                </div>
              </Fragment>

              <div className='mx-3 mt-2 flex items-center justify-between text-xs tabletSmall:text-sm'>
                <div className='flex space-x-2'>
                  <Link
                    to={path.store}
                    className='flex items-center justify-center rounded-md bg-haretaColor px-4 py-1 capitalize text-darkText hover:bg-primaryColor'
                    onClick={closeCart}
                  >
                    {t('cart button.store')}
                  </Link>
                </div>
                <div>
                  <Link
                    to={path.cart}
                    className='flex items-center justify-center rounded-md bg-haretaColor px-4 py-1 capitalize text-darkText hover:bg-primaryColor'
                    onClick={closeCart}
                  >
                    {t('cart button.enter cart')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </div>
  )
}
