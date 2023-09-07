import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { produce } from 'immer'
import React, { Fragment, useContext } from 'react'

import { CartContext } from 'src/contexts/cart.context'
import { useViewport } from 'src/hooks/useViewport'
import { formatCurrency } from 'src/utils/utils'
import AuthenticatedCartMobile from '../AuthenticatedCartMobile'
import ItemInCart from 'src/components/ItemInCart'
import purchaseApi from 'src/apis/cart.api'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { OrderContext } from 'src/contexts/order.context'

export default function AuthenitcatedCart() {
  const viewport = useViewport()
  const isMobile = viewport.width <= 768
  const { extendedPurchases, setExtendedPurchases } = useContext(CartContext)
  const { setPurchaseList } = useContext(OrderContext)

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
    setPurchaseList(checkedPurchases)
  }

  return (
    <Fragment>
      {!isMobile && (
        <Fragment>
          <div className='mt-2 rounded-md border border-black/20 bg-white dark:border-white/20 dark:bg-black'>
            <div className=''>
              <div className='grid grid-cols-12 rounded-sm px-8  py-4 text-base uppercase text-textDark  dark:text-textLight lg:text-lg'>
                <div className='col-span-6'>
                  <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>
                    Product
                  </p>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-4 text-center'>
                    <div className='col-span-1'>Unit Price</div>
                    <div className='col-span-1'>Quantity</div>
                    <div className='col-span-1'>Subtotal</div>
                    <div className='col-span-1'>Action</div>
                  </div>
                </div>
              </div>
              <div className='mx-4 my-2 h-[440px] overflow-y-auto rounded-md bg-[#f8f8f8] shadow outline outline-1 outline-black/20 dark:bg-[#202020] dark:outline-white/20 '>
                {extendedPurchases.length > 0 ? (
                  extendedPurchases?.map((purchase, index) => (
                    <div
                      key={purchase.id}
                      className='border-b last:border-none hover:bg-[#efefef]  dark:hover:bg-[#101010]'
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
                        className='h-5 w-5 accent-haretaColor'
                        checked={isAllChecked}
                        onChange={handleSelectAll}
                      />

                      <button
                        className='ml-2 appearance-none text-textDark ring-0 dark:text-textLight'
                        onClick={handleSelectAll}
                      >
                        Select all
                      </button>
                    </Fragment>
                  )}
                </div>
                <div className='col-span-1 flex items-center text-center text-textDark dark:text-textLight'>
                  {checkedPurchasesCount < 2
                    ? `${checkedPurchasesCount} item was selected`
                    : `${checkedPurchasesCount} items were selected`}
                </div>
              </div>
              <div className='col-span-6 grid grid-cols-4 items-center'>
                <div className='col-span-1'></div>

                <div className='col-span-1 items-center text-right font-medium uppercase text-textDark dark:text-textLight'>
                  Total:
                </div>
                <span className='col-span-1 text-center text-base font-medium text-brownColor dark:text-haretaColor lg:text-lg'>
                  ${formatCurrency(totalCheckedPurchasesPrice)}
                </span>
                {checkedPurchasesCount === 0 && (
                  <div
                    className={classNames(
                      'col-span-1 flex h-10 cursor-not-allowed items-center justify-center rounded-md border-none bg-vintageColor/90 bg-opacity-50 text-textDark text-opacity-60 dark:bg-haretaColor  dark:bg-opacity-50 dark:text-textDark  dark:text-opacity-60'
                    )}
                  >
                    Check out
                  </div>
                )}
                {checkedPurchasesCount > 0 && (
                  <Link
                    onClick={handleCheckout}
                    to={path.shippingInfor}
                    className={classNames(
                      'col-span-1 flex h-10 items-center justify-center rounded-md border-none bg-vintageColor/90  text-textDark hover:bg-vintageColor  dark:bg-haretaColor dark:text-textDark dark:hover:bg-haretaColor/80'
                    )}
                  >
                    Check out
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
