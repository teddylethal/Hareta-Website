import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useContext } from 'react'
import { CartContext } from 'src/contexts/cart.context'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import path from 'src/constants/path'

export default function MobileCartWithoutLogin() {
  const { theme } = useContext(ThemeContext)
  const { purchasesInLS, setPurchasesInLS } = useContext(CartContext)

  const { visible, setVisible, ref } = useClickOutside(false)
  const openCart = () => {
    setVisible(true)
  }
  const closeCart = () => {
    setVisible(false)
  }

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = purchasesInLS[purchaseIndex].id
    const newPurchaseList = purchasesInLS.filter((purchase) => purchase.id !== purchaseId)
    setPurchasesInLS(newPurchaseList)
  }
  return (
    <div>
      <button onClick={openCart} className='relative flex items-end text-textDark dark:text-textLight'>
        <FontAwesomeIcon icon={faCartShopping} className='h-6 w-6 text-textDark dark:text-textLight' />
        {purchasesInLS.length > 0 && (
          <span className='absolute -top-1 left-4 flex h-4 w-4 items-center justify-center rounded-full bg-brownColor text-xs text-textDark dark:bg-haretaColor sm:left-6  sm:h-5 sm:w-5 sm:text-sm'>
            {purchasesInLS.length}
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
              className='absolute left-0 top-0 z-10 w-full self-center rounded-b-lg py-2 shadow-sm sm:left-[calc(50%-200px)] sm:w-[400px]'
              initial={{ opacity: 0, y: '-20%' }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
                color: theme === 'dark' ? '#eeeeee' : '#222222'
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
                  className='h-6 w-6 sm:h-8 sm:w-8'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>

              <div className='mx-3 my-2 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

              <div className=''>
                <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 lg:text-lg'>
                  {purchasesInLS.length} items in cart
                </div>
                <div className='mx-3 h-[220px] overflow-y-auto rounded-md border border-black/20 bg-[#f8f8f8] dark:border-white/20 dark:bg-[#202020]'>
                  {purchasesInLS.length > 0 ? (
                    purchasesInLS.map((purchase, index) => (
                      <div className=' flex space-x-3 p-3 hover:bg-[#e8e8e8] dark:hover:bg-[#272727]' key={purchase.id}>
                        <div className='h-12 w-12'>
                          <div className='relative w-full bg-[#dfdfdf] pt-[100%] dark:bg-[#101010]'>
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
                            >
                              <p className='truncate px-2 py-1 hover:text-vintageColor dark:hover:text-haretaColor'>
                                {purchase.item.name}
                              </p>
                            </Link>
                            <span className='flex-shrink-0 text-orange-600'>
                              ${formatCurrency(purchase.item.price)}
                            </span>
                          </div>
                          <div className='ml-2 flex justify-between'>
                            <span className='text-gray-500 dark:text-gray-400'>x{purchase.quantity}</span>

                            <div className='flex space-x-3'>
                              <button
                                className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                                onClick={handleRemove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='p-2'>
                      <img src='/images/empty_cart.png' alt='Empty cart' />{' '}
                    </div>
                  )}
                </div>
              </div>

              <div className='mx-3 mt-2 flex items-center justify-between text-xs sm:text-sm'>
                <div className='flex space-x-2'>
                  <Link
                    to={path.store}
                    className='flex items-center justify-center rounded-md bg-brownColor/80 px-4 py-1 hover:bg-brownColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60'
                    onClick={closeCart}
                  >
                    Store
                  </Link>
                </div>
                <div>
                  <Link
                    to={path.temporaryCart}
                    className='flex items-center justify-center rounded-md bg-brownColor/80 px-4 py-1 hover:bg-brownColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60'
                  >
                    Cart
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
