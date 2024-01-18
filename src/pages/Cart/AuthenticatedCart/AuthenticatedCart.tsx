import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { produce } from 'immer'
import React, { Fragment, useContext } from 'react'

import { CartContext } from 'src/contexts/cart.context'
import { useViewport } from 'src/hooks/useViewport'
import { formatCurrency } from 'src/utils/utils'
import purchaseApi from 'src/apis/cart.api'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { OrderContext } from 'src/contexts/order.context'
import { setOrderListToLS } from 'src/utils/order'

import AuthenticatedCartMobile from '../AuthenticatedCartMobile'
import ItemInCart from 'src/components/ItemInCart'
import { useTranslation } from 'react-i18next'

export default function AuthenticatedCart() {
  const viewport = useViewport()
  const isMobile = viewport.width <= 768
  const { extendedPurchases, setExtendedPurchases } = useContext(CartContext)
  const { setOrderList } = useContext(OrderContext)

  // const purchasesInCart = cartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  const handleChecking = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleSelectAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  //? HANDLE REMOVE
  const queryClient = useQueryClient()
  const removePurchasesMutation = useMutation({
    mutationFn: purchaseApi.removePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
    }
  })

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex].id
    removePurchasesMutation.mutate({ id: purchaseId })
  }

  //? HANDLE CHECKOUT
  const handleCheckout = () => {
    setOrderList(checkedPurchases)
    setOrderListToLS(checkedPurchases)
  }

  //? transaltion
  const { t } = useTranslation('cart')

  return (
    <Fragment>
      {!isMobile && (
        <Fragment>
          <div className='mt-2 rounded-md border border-black/20 bg-white dark:border-white/20 dark:bg-black'>
            <div className=''>
              <div className='grid grid-cols-12 rounded-sm px-8  py-4 text-base uppercase text-textDark  dark:text-textLight lg:text-lg'>
                <div className='col-span-6'>
                  <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>
                    {t('content.product')}
                  </p>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-4 text-center'>
                    <div className='col-span-1'>{t('content.unit price')}</div>
                    <div className='col-span-1'>{t('content.quantity')}</div>
                    <div className='col-span-1'>{t('content.subtotal')}</div>
                    <div className='col-span-1'>{t('content.action')}</div>
                  </div>
                </div>
              </div>
              <div className='mx-4 my-2 h-[440px] overflow-y-auto rounded-md bg-lightWhite700 shadow outline outline-1 outline-black/20 dark:bg-darkGray700 dark:outline-white/20'>
                {extendedPurchases.length > 0 ? (
                  extendedPurchases?.map((purchase, index) => (
                    <div
                      key={purchase.id}
                      className='border-b last:border-none hover:bg-lightWhite900 dark:hover:bg-darkGray900'
                    >
                      <ItemInCart
                        handleChecking={handleChecking}
                        index={index}
                        purchase={purchase}
                        handleRemove={handleRemove}
                      />
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
            </div>
            <div className='grid grid-cols-12 items-center justify-between rounded-sm px-8 py-4'>
              <div className='col-span-6 grid grid-cols-3'>
                <div className=' col-span-1 flex flex-shrink-0 items-center'>
                  {extendedPurchases.length > 0 && (
                    <Fragment>
                      <input
                        name='all_are_selected'
                        type='checkbox'
                        className='h-5 w-5 accent-primaryColor'
                        checked={isAllChecked}
                        onChange={handleSelectAll}
                      />

                      <button
                        className='ml-2 appearance-none text-textDark ring-0 dark:text-textLight'
                        onClick={handleSelectAll}
                      >
                        {t('content.select all')}
                      </button>
                    </Fragment>
                  )}
                </div>
                <div className='col-span-1 flex items-center text-center text-textDark dark:text-textLight'>
                  {checkedPurchasesCount < 2
                    ? `${checkedPurchasesCount} ${t('content.item is selected')}`
                    : `${checkedPurchasesCount} ${t('content.items are selected')}`}
                </div>
              </div>
              <div className='col-span-6 grid grid-cols-4 items-center'>
                <div className='col-span-1'></div>

                <div className='col-span-1 items-center text-right font-medium uppercase text-textDark dark:text-textLight'>
                  {t('content.total')}:
                </div>
                <span className='col-span-1 text-center text-base font-medium text-haretaColor dark:text-haretaColor lg:text-lg'>
                  ${formatCurrency(totalCheckedPurchasesPrice)}
                </span>
                {checkedPurchasesCount === 0 && (
                  <div
                    className={classNames(
                      'col-span-1 flex h-10 cursor-not-allowed items-center justify-center rounded-md border-none bg-haretaColor/60 font-medium text-black text-opacity-60'
                    )}
                  >
                    {t('content.check out')}
                  </div>
                )}
                {checkedPurchasesCount > 0 && (
                  <Link
                    onClick={handleCheckout}
                    to={path.shippingInfor}
                    className={classNames(
                      'col-span-1 flex h-10 items-center justify-center rounded-md border-none bg-haretaColor font-medium text-black  hover:bg-primaryColor'
                    )}
                  >
                    {t('content.check out')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}

      {isMobile && (
        <AuthenticatedCartMobile
          handleCheckout={handleCheckout}
          handleChecking={handleChecking}
          handleRemove={handleRemove}
          handleSelectAll={handleSelectAll}
        />
      )}
    </Fragment>
  )
}
