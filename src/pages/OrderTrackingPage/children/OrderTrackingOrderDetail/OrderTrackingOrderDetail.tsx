import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { formatDate, formatDateEn, formatDateVi, getIdFromNameId } from 'src/utils/utils'
import { orderApi } from 'src/apis/order.api'
import { useQuery } from '@tanstack/react-query'
import OrderTrackingDekstopPurchase from '../../components/OrderTrackingDekstopPurchase'
import { useViewport } from 'src/hooks/useViewport'
import OrderTrackingMobilePurchase from '../../components/OrderTrackingMobilePurchase'
import { OrderPurchaseListConfig } from 'src/types/order.type'
import LoadingRing from 'src/components/LoadingRing'
import { AppContext } from 'src/contexts/app.context'
import i18next from 'i18next'
import OrderState from 'src/constants/orderState'

export default function OrderTrackingOrderDetail() {
  const { isAuthenticated } = useContext(AppContext)

  const isMobile = useViewport().width < 768

  //! Get order id
  const { orderId: paramOrderId } = useParams()
  const orderId = getIdFromNameId(paramOrderId as string)

  //! Get order information
  const { data: orderData, isLoading: loadingOrderData } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => {
      return isAuthenticated ? orderApi.findOrderForUser(orderId) : orderApi.findOrderForGuest(orderId)
    },

    staleTime: 3 * 60 * 1000
  })
  const orderInformation = orderData?.data.data

  // //! Get purchase list
  // const itemOrderConfig: OrderPurchaseListConfig = {
  //   order_id: orderId,
  //   page: 1,
  //   limit: 20
  // }
  // const { data: purchasesData, isLoading: loadingPurchasesData } = useQuery({
  //   queryKey: ['orders', orderId, 'purchases'],
  //   queryFn: () => {
  //     return orderApi.getPurchaseListOfOrder(itemOrderConfig)
  //   },

  //   staleTime: 3 * 60 * 1000
  // })
  // const purchaseList = purchasesData?.data.data || []

  //! Multi languages
  const { t } = useTranslation('support')
  const currentLan = i18next.language

  //! Styles
  const wrapperClassname = 'grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktopLarge:gap-6'
  const titleClasname =
    'col-span-1 text-sm text-darkText/80 dark:text-lightText/80 tablet:text-base desktopLarge:text-lg'
  const infoClassname = 'col-span-1 text-xs font-medium tablet:text-base desktopLarge:text-lg'

  return (
    <div className='bg-lightBg py-2 text-darkText duration-200 dark:bg-darkBg dark:text-lightText tablet:py-3 desktopLarge:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg border border-black/20 bg-[#f8f8f8] px-2 py-1 text-xs font-medium text-darkText duration-200 dark:border-white/20 dark:bg-[#000] dark:text-lightText tabletSmall:space-x-2 tabletSmall:px-3 desktop:mb-3  desktop:px-4 desktop:py-2 desktop:text-sm desktopLarge:mb-4 desktopLarge:px-6 desktopLarge:py-3'>
          <NavLink
            to={mainPath.home}
            className={({ isActive }) =>
              classNames('uppercase', {
                'text-haretaColor dark:text-haretaColor': isActive,
                'hover:text-haretaColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            {t('path.home')}
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={mainPath.orderTracking}
            end
            className={({ isActive }) =>
              classNames('uppercase', {
                'text-haretaColor dark:text-haretaColor': isActive,
                'hover:text-haretaColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            {isMobile ? t('path.order tracking--mobile') : t('path.order tracking')}
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <div className={'text-haretaColor dark:text-haretaColor'}>{orderId}</div>
        </div>
        <div className='py-2 tabletSmall:py-4 tablet:py-6 desktop:py-8 desktopLarge:py-10'>
          <p className='w-full text-center text-lg font-bold uppercase text-haretaColor tablet:text-2xl desktopLarge:text-4xl'>
            {t('order information.order information')}
          </p>
          {(!orderData || loadingOrderData) && (
            <div className='flex h-96 w-full items-center justify-center py-1 tablet:py-2 desktopLarge:py-4'>
              <LoadingRing />
            </div>
          )}
          {orderData && (
            <Fragment>
              <div className='mt-2 grid grid-cols-1 gap-2 tablet:mt-4 tablet:grid-cols-2 tablet:gap-4 desktopLarge:mt-6 desktopLarge:gap-6'>
                <div className='col-span-1 flex flex-col space-y-2 tablet:space-y-4 desktopLarge:space-y-6'>
                  <p className='w-full text-center text-sm font-semibold tablet:text-lg desktopLarge:text-xl'>
                    {t('order information.customer information')}
                  </p>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.name')}</p>
                    <p className={infoClassname}>{orderInformation?.name}</p>
                  </div>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.email')}</p>
                    <p className={infoClassname}>{orderInformation?.email}</p>
                  </div>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.phone')}</p>
                    <p className={infoClassname}>{orderInformation?.phone}</p>
                  </div>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.address')}</p>
                    <p className={infoClassname}>{orderInformation?.address}</p>
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
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.total')}</p>
                    <p className={infoClassname}>${orderInformation?.total}</p>
                  </div>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.created at')}</p>
                    <p className={infoClassname}>
                      {currentLan == 'en'
                        ? formatDateEn(orderInformation?.created_at as string)
                        : formatDateVi(orderInformation?.created_at as string)}
                    </p>
                  </div>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.status')}</p>
                    <p className='col-span-1 text-xs font-medium capitalize text-haretaColor tablet:text-base desktopLarge:text-lg'>
                      {OrderState[orderInformation?.status ?? 0]}
                    </p>
                  </div>
                  <div className={wrapperClassname}>
                    <p className={titleClasname}>{t('order information.updated at')}</p>
                    <p className='col-span-1 text-xs font-medium capitalize text-haretaColor tablet:text-base desktopLarge:text-lg'>
                      {currentLan == 'en'
                        ? formatDateEn(orderInformation?.updated_at as string)
                        : formatDateVi(orderInformation?.updated_at as string)}
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className='mt-6 rounded-lg border border-black/60 px-1 py-2 dark:border-white/60 tablet:mt-6 tablet:px-2 tablet:py-4 desktopLarge:mt-8 desktopLarge:px-4'>
                <p className='w-full text-center text-base font-semibold uppercase tablet:text-lg desktopLarge:text-xl'>
                  {t('order information.Product list')}
                </p>
                {!isMobile && (
                  <Fragment>
                    {(loadingPurchasesData || !purchasesData) && (
                      <div className='flex h-96 w-full items-center justify-center py-1 tablet:py-2 desktopLarge:py-4'>
                        <LoadingRing />
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
                        <LoadingRing />
                      </div>
                    )}
                    {purchasesData &&
                      purchaseList.map((purchase) => (
                        <OrderTrackingMobilePurchase key={purchase.id} purchase={purchase} />
                      ))}
                  </Fragment>
                )}
              </div> */}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
