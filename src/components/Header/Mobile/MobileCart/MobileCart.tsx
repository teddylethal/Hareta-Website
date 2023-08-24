import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Button from 'src/components/Button'
import { ThemeContext } from 'src/App'
import useClickOutside from 'src/hooks/useClickOutside'
import { CartContext } from 'src/contexts/cart.context'
import purchaseApi from 'src/apis/cart.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { keyBy } from 'lodash'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import path from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

interface Props {
  className?: string
}

export default function MobileCart({ className }: Props) {
  const { theme } = useContext(ThemeContext)
  const { extendedPurchases, setExtendedPurchases } = useContext(CartContext)

  const { data: cartData, refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchaseApi.getPurchases()
  })

  const purchasesInCart = cartData?.data.data

  const removePurchasesMutation = useMutation({
    mutationFn: purchaseApi.removePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex].id
    removePurchasesMutation.mutate({ id: purchaseId })
  }

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, 'id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[purchase.id]?.checked),
          previousQuantity: purchase.quantity
        })) || []
      )
    })
  }, [purchasesInCart, setExtendedPurchases])

  const { visible, setVisible, ref } = useClickOutside(false)
  const openCart = () => {
    setVisible(true)
  }
  const closeCart = () => {
    setVisible(false)
  }

  return (
    <div className={className}>
      <button onClick={openCart} className='relative flex items-end text-textDark dark:text-textLight'>
        <FontAwesomeIcon icon={faCartShopping} className='h-6 w-6' />
        {extendedPurchases.length > 0 && (
          <span className='absolute left-4 flex h-4 w-4 items-center justify-center rounded-full bg-brownColor/80 text-xs text-textDark dark:bg-haretaColor/80 sm:left-6  sm:h-5 sm:w-5 sm:text-sm'>
            {cartData?.data.paging.total}
          </span>
        )}
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute left-0 top-0 z-10 w-full self-center rounded-b-sm py-2 shadow-sm sm:left-[calc(50%-200px)] sm:w-[400px]'
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
              {extendedPurchases.length > 0 ? (
                <div>
                  <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 lg:text-lg'>
                    {cartData?.data.paging.total} items in cart
                  </div>
                  <div className='m-2 h-[220px] overflow-y-auto bg-[#f8f8f8] dark:bg-[#202020]'>
                    {extendedPurchases.map((purchase, index) => (
                      <div className='flex space-x-3 p-3 hover:bg-[#e8e8e8] dark:hover:bg-[#272727]' key={purchase.id}>
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
                    ))}
                  </div>
                </div>
              ) : (
                <div className='p-2'>
                  <img src='/images/empty_cart.png' alt='Empty cart' />{' '}
                </div>
              )}
            </div>

            <div className='mx-3 my-3 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

            <div className='mx-3 flex items-center justify-between text-xs sm:text-sm'>
              <div className='flex space-x-2'>
                <Link to={path.store}>
                  <Button className='w-14 py-1'>Store</Button>
                </Link>
              </div>
              <div>
                <Link to={path.cart}>
                  <Button className='w-14 py-1'>Cart</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
