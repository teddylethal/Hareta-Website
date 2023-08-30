import Popover from 'src/components/Popover'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import path from 'src/constants/path'
import purchaseApi from 'src/apis/cart.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { Fragment, useContext, useEffect } from 'react'
import { CartContext } from 'src/contexts/cart.context'
import { keyBy } from 'lodash'
import { AppContext } from 'src/contexts/app.context'
import classNames from 'classnames'

export default function CartPopoverWithLogin() {
  const { extendedPurchases, setExtendedPurchases } = useContext(CartContext)
  const { isAuthenticated } = useContext(AppContext)
  const { data: cartData, refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchaseApi.getPurchases(),
    enabled: isAuthenticated
  })

  const navigate = useNavigate()
  const purchasesInCart = cartData?.data.data

  const removePurchasesMutation = useMutation({
    mutationFn: purchaseApi.removePurchases,
    onSuccess: () => {
      refetch()
    }
  })

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

  const handleBuyItem = () => {
    navigate('profile')
  }

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex].id

    removePurchasesMutation.mutate({ id: purchaseId })
  }

  return (
    <div className='rounded-lg bg-vintageColor/90 hover:bg-vintageColor dark:bg-haretaColor dark:hover:bg-haretaColor/80'>
      <Popover
        className='flex border border-none px-1.5 py-1 lg:px-2'
        renderPopover={
          <div className='relative -top-1 w-[360px] rounded-md bg-[#efefef] py-2 text-sm text-textDark shadow-md dark:bg-[#202020] dark:text-textLight lg:top-0'>
            <Fragment>
              <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 lg:text-lg'>
                {cartData ? cartData?.data.paging.total : 0} items in cart
              </div>
              <div className='m-2 overflow-auto rounded-md bg-[#f8f8f8] outline outline-1 outline-black/10 dark:bg-[#101010] dark:outline-white/10'>
                {extendedPurchases.length > 0 ? (
                  <div className='max-h-[360px] min-h-[240px] overflow-y-auto '>
                    {extendedPurchases.map((purchase, index) => (
                      <div className='flex items-center p-3 hover:bg-[#e8e8e8] dark:hover:bg-black' key={purchase.id}>
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
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                              className='flex'
                            >
                              <p className='text-md truncate px-2 capitalize hover:text-[#E76161] dark:hover:text-haretaColor lg:text-base'>
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
                                className='text-sm text-textDark/60  hover:text-[#E76161] dark:text-textLight/60 dark:hover:text-haretaColor'
                                onClick={handleBuyItem}
                              >
                                Buy
                              </button>
                              <button
                                disabled={removePurchasesMutation.isLoading}
                                className={classNames('text-sm text-textDark/60  dark:text-textLight/60 ', {
                                  'hover:text-red-600 dark:hover:text-red-600': !removePurchasesMutation.isLoading,
                                  'cursor-not-allowed': removePurchasesMutation.isLoading
                                })}
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
                ) : (
                  <div className=''>
                    <img src='/images/empty_cart.png' alt='Empty cart' className='m-2' />
                  </div>
                )}
              </div>
            </Fragment>

            <div className='mx-3 mb-2 mt-4 flex items-center justify-between text-textDark dark:text-textLight'>
              <Link to={path.store}>
                <button className='justify-self-start rounded-md bg-vintageColor/90 px-4 py-1 text-sm hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/70'>
                  Store
                </button>
              </Link>
              <Link to={path.cart}>
                <button className='justify-self-start rounded-md bg-vintageColor/90 px-4 py-1 text-sm hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/70'>
                  Enter Cart
                </button>
              </Link>
            </div>
            <div className='absolute -top-4 right-0 h-4 w-1/4 bg-none'></div>
          </div>
        }
        placement='bottom-end'
      >
        <div className='flex items-center space-x-2 px-2 py-0.5  text-textDark dark:text-textLight'>
          <FontAwesomeIcon icon={faCartShopping} className='' />
          {extendedPurchases.length > 0 && (
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-vintageColor/90 text-xs text-textLight dark:bg-haretaColor/80 dark:text-textDark lg:text-sm xl:text-base'>
              {extendedPurchases.length}
            </div>
          )}
        </div>
      </Popover>
    </div>
  )
}
