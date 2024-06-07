import { NavLink, useNavigate } from 'react-router-dom'
import mainPath, { orderPath } from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import { OrderSchema, OrderSchemaForGuest, orderSchema } from 'src/utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { OrderContext } from 'src/contexts/order.context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderApi } from 'src/apis/order.api'
import { AppContext } from 'src/contexts/app.context'
import { setOrderListToLS, setTempOrderListToLS } from 'src/utils/order'
import PathBar from 'src/components/PathBar'
import userApi from 'src/apis/user.api'
import { CartContext } from 'src/contexts/cart.context'
import { useTranslation } from 'react-i18next'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/cart.api'
import OrderSuccessDialog from './components/OrderSuccessDialog'
import OrderProcessingDialog from './components/OrderProcessingDialog'
import OrderUnavailableDialog from './components/OrderUnavailableDialog'
import OrderCheckoutDesktop from './children/OrderCheckoutDesktop'
import OrderCheckoutMobile from './children/OrderCheckoutMobile'
import classNames from 'classnames'

export default function OrderPage() {
  const { orderList, setOrderList, tempOrderList, setTempOrderList } = useContext(OrderContext)
  const { isAuthenticated } = useContext(AppContext)
  const { tempExtendedPurchases, setTempExtendedPurchases, setUnavailablePurchaseIds } = useContext(CartContext)

  const discount = 0.2

  //! Handle bill
  const totalPrice = orderList.reduce((sum, purchase) => {
    return sum + purchase.quantity * purchase.item.price
  }, 0)
  const totalDiscount = orderList.reduce((val, purchase) => {
    return val + purchase.quantity * purchase.item.price * (purchase.discount / 100)
  }, 0)
  const totalDiscountedPrice = orderList.reduce((val, purchase) => {
    return val + purchase.quantity * purchase.item.price * ((100 - purchase.discount) / 100)
  }, 0)

  //! Multi languages
  const { t } = useTranslation('order')

  //! Styles
  const titleStyle = 'text-center text-sm tablet:text-base font-bold uppercase desktop:text-lg'
  const infoStyle = 'text-center text-sm tablet:text-base desktop:text-lg'

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg desktop:py-3 desktopLarge:py-4'>
      <div className='container space-y-6'>
        <PathBar
          pathList={[
            { pathName: t('path.Cart'), url: mainPath.cart },
            { pathName: t('path.Order'), url: mainPath.order }
          ]}
        />

        <div className='space-y-6'>
          <p className='text-center text-xl font-semibold uppercase tracking-wider text-haretaColor tablet:text-2xl desktop:text-4xl'>
            {t('layout.Order')}
          </p>

          <div className='py-4'>
            <div className='grid grid-cols-8 gap-2 desktop:gap-4'>
              <div className={classNames('col-span-3', titleStyle)}>{t('bill.Product')}</div>
              <div className={classNames('col-span-1', titleStyle)}>{t('bill.Unit price')}</div>
              <div className={classNames('col-span-1', titleStyle)}>{t('bill.Quantity')}</div>
              <div className={classNames('col-span-1', titleStyle)}>{t('bill.Subtotal')}</div>
              <div className={classNames('col-span-1', titleStyle)}>{t('bill.Discount')}</div>
              <div className={classNames('col-span-1', titleStyle)}>{t('bill.Discounted price')}</div>
            </div>
            {orderList.map((purchase, index) => (
              <div key={purchase.id} className='grid grid-cols-8 gap-2 py-2 desktop:gap-4 desktop:py-4'>
                <div className={classNames('col-span-3', infoStyle)}>{purchase.item.name}</div>
                <div className={classNames('col-span-1', infoStyle)}>${purchase.item.price}</div>
                <div className={classNames('col-span-1', infoStyle)}>{purchase.quantity}</div>
                <div className={classNames('col-span-1', infoStyle)}>${purchase.quantity * purchase.item.price}</div>
                <div className={classNames('col-span-1', infoStyle)}>{purchase.discount}%</div>
                <div className={classNames('col-span-1 text-haretaColor', infoStyle)}>
                  ${purchase.quantity * purchase.item.price * ((100 - purchase.discount) / 100)}
                </div>

                {index != orderList.length - 1 && (
                  <div className='col-span-8 flex items-center justify-center py-2'>
                    <div className='w-8/12 border-t border-dashed border-white/60 tablet:w-6/12 desktop:w-4/12' />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-8 gap-2 tablet:text-lg desktop:gap-4 desktop:text-2xl'>
            <div className={classNames('col-span-5 text-center')}>{t('bill.Total')}</div>

            <div className={classNames('col-span-1 text-center')}>${totalPrice}</div>
            <div className={classNames('col-span-1 text-center')}>${totalDiscount}</div>
            <div className={classNames('col-span-1 text-center text-haretaColor')}>${totalDiscountedPrice}</div>
          </div>

          <div className='col-span-8 flex items-center justify-center py-2'>
            <div className='w-10/12 border-t border-white/80 tablet:w-8/12 desktop:w-6/12'></div>
          </div>

          <div className='flex w-full justify-center'>
            <div className='flex w-full justify-between tablet:w-8/12 desktop:w-1/2'>
              <NavLink
                to={mainPath.cart}
                className='rounded-xl bg-unhoveringBg px-4 py-2 text-xs font-medium uppercase text-darkText hover:bg-hoveringBg tablet:text-sm desktop:text-base'
              >
                {t('bill.Back to cart')}
              </NavLink>
              <NavLink
                to={orderPath.checkout}
                className='rounded-xl bg-unhoveringBg px-4 py-2 text-xs font-medium uppercase text-darkText hover:bg-hoveringBg tablet:text-sm desktop:text-base'
              >
                {t('bill.Checkout')}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
