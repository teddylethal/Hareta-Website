import Popover from 'src/components/Popover'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import path from 'src/constants/path'
import purchaseApi from 'src/apis/cart.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { Fragment, useContext, useEffect } from 'react'
import { CartContext } from 'src/contexts/cart.context'
import keyBy from 'lodash/keyBy'
import { AppContext } from 'src/contexts/app.context'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export default function CartPopoverWithLogin() {
  const { extendedPurchases, setExtendedPurchases } = useContext(CartContext)
  const { isAuthenticated } = useContext(AppContext)
  const { data: cartData, refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchaseApi.getPurchases(),

    staleTime: 1000 * 60 * 3,
    enabled: isAuthenticated
  })

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

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex].id

    removePurchasesMutation.mutate({ id: purchaseId })
  }

  //? Use translation
  const { t } = useTranslation('header')

  return (
    <div className='rounded-lg bg-haretaColor duration-200 dark:bg-haretaColor'>
      <Popover
        className='lg:px-2 flex border border-none px-1.5 py-1'
        renderPopover={
          <div className='lg:top-0 relative -top-1 w-[360px] rounded-md bg-lightWhite700 py-2 text-sm text-textDark shadow-md dark:bg-darkGray700 dark:text-textLight'>
            <Fragment>
              <div className='lg:text-lg px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300'>
                {cartData ? cartData?.data.paging.total : 0} {t('cart button.items in cart')}
              </div>
              <div className='m-2 overflow-auto rounded-md bg-lightWhite900 outline outline-1 outline-black/10 dark:bg-darkGray900 dark:outline-white/10'>
                {extendedPurchases.length > 0 ? (
                  <div className='max-h-[360px] min-h-[240px] overflow-y-auto '>
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        className='flex items-center p-3 hover:bg-lightWhite700/60 dark:hover:bg-darkGray700/60'
                        key={purchase.id}
                      >
                        <div className='h-14 w-14'>
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
                            >
                              <p className='lg:text-base truncate px-2 font-semibold capitalize hover:text-primaryColor dark:hover:text-primaryColor'>
                                {purchase.item.name}
                              </p>
                            </Link>
                            <span className='flex-shrink-0 font-medium text-haretaColor'>
                              ${formatCurrency(purchase.item.price)}
                            </span>
                          </div>
                          <div className='ml-2 flex justify-between'>
                            <span className='lg:text-sm text-xs capitalize text-textDark/60 dark:text-textLight/60'>{`(${purchase.item.color})`}</span>

                            <div className='flex space-x-3'>
                              {/* <button
                                className='text-sm capitalize text-textDark/60 hover:text-brownColor dark:text-textLight/60 dark:hover:text-haretaColor'
                                onClick={handleBuyItem}
                              >
                                {t('cart button.buy')}
                              </button> */}
                              <button
                                disabled={removePurchasesMutation.isLoading}
                                className={classNames('text-sm capitalize text-textDark/60 dark:text-textLight/60 ', {
                                  'hover:text-alertRed dark:hover:text-alertRed': !removePurchasesMutation.isLoading,
                                  'cursor-not-allowed': removePurchasesMutation.isLoading
                                })}
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
              <Link to={path.store}>
                <button className='justify-self-start rounded-md bg-haretaColor px-4 py-1 text-sm hover:bg-primaryColor '>
                  {t('cart button.store')}
                </button>
              </Link>
              <Link to={path.cart}>
                <button className='justify-self-start rounded-md bg-haretaColor px-4 py-1 text-sm hover:bg-primaryColor'>
                  {t('cart button.enter cart')}
                </button>
              </Link>
            </div>
            <div className='absolute -top-4 right-0 h-4 w-1/4 bg-none'></div>
          </div>
        }
        placement='bottom-end'
      >
        <div className='flex items-center space-x-2 px-2 py-0.5  text-black'>
          <FontAwesomeIcon icon={faCartShopping} className='' />
          {extendedPurchases.length > 0 && (
            <div className='lg:text-sm xl:text-base flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-medium text-textDark'>
              {extendedPurchases.length}
            </div>
          )}
        </div>
      </Popover>
    </div>
  )
}
