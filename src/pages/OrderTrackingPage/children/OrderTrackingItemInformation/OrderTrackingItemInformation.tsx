import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import path from 'src/constants/path'
import { formatDate, getIdFromNameId } from 'src/utils/utils'
import { ItemOrderConfig } from 'src/types/order.type'
import { orderApi } from 'src/apis/order.api'
import { useQuery } from '@tanstack/react-query'
import OrderTrackingDekstopPurchase from '../../components/OrderTrackingDekstopPurchase'
import { useViewport } from 'src/hooks/useViewport'
import OrderTrackingMobilePurchase from '../../components/OrderTrackingMobilePurchase'
import { ColorRing } from 'react-loader-spinner'

export default function OrderTrackingItemInformation() {
  //? responsive
  const isMobile = useViewport().width < 768

  //? get order id
  const { orderId } = useParams()
  const id = getIdFromNameId(orderId as string)

  //? get order informtaion
  const { data: orderData, isLoading: loadingOrderData } = useQuery({
    queryKey: ['order_information', id],
    queryFn: () => {
      return orderApi.getOrderById(id)
    },

    staleTime: 3 * 60 * 1000
  })
  const orderInformation = orderData?.data.data

  //? get item list
  const itemOrderConfig: ItemOrderConfig = {
    order_id: id,
    page: 1,
    limit: 20
  }
  const { data: purchasesData, isLoading: loadingPurchasesData } = useQuery({
    queryKey: ['items_of_order', itemOrderConfig],
    queryFn: () => {
      return orderApi.getItemListOfOrder(itemOrderConfig)
    },

    staleTime: 3 * 60 * 1000
  })
  const purchaseList = purchasesData?.data.data || []

  //! Multi languages
  const { t } = useTranslation('support')
  return (
    <div className='bg-lightBg py-2 text-darkText duration-200 dark:bg-darkBg dark:text-lightText tablet:py-3 desktopLarge:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg border border-black/20 bg-[#f8f8f8] px-2 py-1 text-xs font-medium text-darkText duration-200 dark:border-white/20 dark:bg-[#000] dark:text-lightText tabletSmall:space-x-2 tabletSmall:px-3 desktop:mb-3  desktop:px-4 desktop:py-2 desktop:text-sm desktopLarge:mb-4 desktopLarge:px-6 desktopLarge:py-3'>
          <NavLink
            to={path.home}
            className={({ isActive }) =>
              classNames('uppercase', {
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            {t('path.home')}
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.orderTracking}
            end
            className={({ isActive }) =>
              classNames('uppercase', {
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            {isMobile ? t('path.order tracking--mobile') : t('path.order tracking')}
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <div className={'text-brownColor dark:text-haretaColor'}>{id}</div>
        </div>
        <div className='py-2 tabletSmall:py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
          <p className='w-full text-center text-lg font-bold uppercase text-haretaColor tablet:text-2xl desktopLarge:text-4xl'>
            {t('order information.order information')}
          </p>
          {(!orderData || loadingOrderData) && (
            <div className='flex h-96 w-full items-center justify-center py-1 tablet:py-2 desktopLarge:py-4'>
              <ColorRing
                visible={true}
                height='80'
                width='80'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={['#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00']}
              />
            </div>
          )}
          {orderData && (
            <Fragment>
              <div className='mt-2 grid grid-cols-1 gap-2 tablet:mt-4 tablet:grid-cols-2 tablet:gap-4 desktopLarge:mt-6 desktopLarge:gap-6'>
                <div className='col-span-1 flex flex-col space-y-2 tablet:space-y-4 desktopLarge:space-y-6'>
                  <p className='w-full text-center text-sm font-semibold tablet:text-lg desktopLarge:text-xl'>
                    {t('order information.customer information')}
                  </p>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.name')}
                    </p>
                    <p className='col-span-1 text-xs font-medium tablet:text-base desktopLarge:text-lg'>
                      {orderInformation?.name}
                    </p>
                  </div>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.email')}
                    </p>
                    <p className='col-span-1 text-xs font-medium tablet:text-base desktopLarge:text-lg'>
                      {orderInformation?.email}
                    </p>
                  </div>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.phone')}
                    </p>
                    <p className='col-span-1 text-xs font-medium tablet:text-base desktopLarge:text-lg'>
                      {orderInformation?.phone}
                    </p>
                  </div>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.address')}
                    </p>
                    <p className='col-span-1 text-xs font-medium tablet:text-base desktopLarge:text-lg'>
                      {orderInformation?.address}
                    </p>
                  </div>
                </div>
                <div
                  className={classNames('col-span-1 flex flex-col space-y-2 tablet:space-y-4 desktopLarge:space-y-6', {
                    'mt-4 border-t border-dashed border-black/60 pt-2 dark:border-white/60': isMobile
                  })}
                >
                  <p className='w-full text-center text-sm font-semibold tablet:text-lg desktopLarge:text-xl'>
                    {t('order information.order state')}
                  </p>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.total')}
                    </p>
                    <p className='col-span-1 text-xs font-medium capitalize tablet:text-base desktopLarge:text-lg'>
                      ${orderInformation?.total}
                    </p>
                  </div>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.created at')}
                    </p>
                    <p className='col-span-1 text-xs font-medium capitalize tablet:text-base desktopLarge:text-lg'>
                      {formatDate(orderInformation?.created_at as string)}
                    </p>
                  </div>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.status')}
                    </p>
                    <p className='col-span-1 text-xs font-medium capitalize text-haretaColor tablet:text-base desktopLarge:text-lg'>
                      {orderInformation?.status}
                    </p>
                  </div>
                  <div className='grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'>
                    <p className='col-span-1 text-xs text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'>
                      {t('order information.updated at')}
                    </p>
                    <p className='col-span-1 text-xs font-medium capitalize text-haretaColor tablet:text-base desktopLarge:text-lg'>
                      {formatDate(orderInformation?.updated_at as string)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-6 rounded-lg border border-black/60 px-1 py-2 dark:border-white/60 tablet:mt-6 tablet:px-2 tablet:py-4 desktopLarge:mt-8 desktopLarge:px-4'>
                <p className='w-full text-center text-base font-semibold uppercase tablet:text-lg desktopLarge:text-xl'>
                  {t('order information.Product list')}
                </p>
                {!isMobile && (
                  <Fragment>
                    {(loadingPurchasesData || !purchasesData) && (
                      <div className='flex h-96 w-full items-center justify-center py-1 tablet:py-2 desktopLarge:py-4'>
                        <ColorRing
                          visible={true}
                          height='80'
                          width='80'
                          ariaLabel='blocks-loading'
                          wrapperStyle={{}}
                          wrapperClass='blocks-wrapper'
                          colors={['#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00']}
                        />
                      </div>
                    )}
                    {purchasesData && (
                      <Fragment>
                        <div className='mt-2 grid grid-cols-3 px-1 py-4 text-sm font-semibold uppercase text-darkText dark:text-lightText tablet:px-4 tablet:text-base desktop:text-lg desktopLarge:px-8 desktopLarge:text-lg'>
                          <div className='col-span-1'>
                            <p className='flex-grow items-center justify-center text-center text-darkText dark:text-lightText'>
                              {t('order information.Product')}
                            </p>
                          </div>
                          <div className='col-span-2'>
                            <div className='grid grid-cols-3 gap-2 text-center desktopLarge:gap-4'>
                              <div className='col-span-1'>{t('order information.Unit price')}</div>
                              <div className='col-span-1'>{t('order information.Quantity')}</div>
                              <div className='col-span-1'>{t('order information.Subtotal')}</div>
                            </div>
                          </div>
                        </div>

                        <div className='mt-2 tablet:mt-4 desktopLarge:mt-6'>
                          {purchasesData &&
                            purchaseList.map((purchase) => (
                              <OrderTrackingDekstopPurchase key={purchase.id} purchase={purchase} />
                            ))}
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
                {isMobile && (
                  <Fragment>
                    {(loadingPurchasesData || !purchasesData) && (
                      <div className='flex h-40 w-full items-center justify-center py-1 tablet:py-2 desktopLarge:py-4'>
                        <ColorRing
                          visible={true}
                          height='40'
                          width='40'
                          ariaLabel='blocks-loading'
                          wrapperStyle={{}}
                          wrapperClass='blocks-wrapper'
                          colors={['#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00']}
                        />
                      </div>
                    )}
                    {purchasesData &&
                      purchaseList.map((purchase) => (
                        <OrderTrackingMobilePurchase key={purchase.id} purchase={purchase} />
                      ))}
                  </Fragment>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
