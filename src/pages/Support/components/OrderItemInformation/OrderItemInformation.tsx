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
import OrderPurchaseDekstop from '../OrderPurchaseDekstop'
import { useViewport } from 'src/hooks/useViewport'
import OrderPurchaseMobile from '../OrderPurchaseMobile'
import { ColorRing } from 'react-loader-spinner'

export default function OrderItemInformation() {
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

  //? translation
  const { t } = useTranslation('support')
  return (
    <div className='md:py-3 xl:py-4 text-darkText dark:text-lightText bg-lightBg py-2 duration-200 dark:bg-darkBg'>
      <div className='container'>
        <div className='sm:space-x-2 sm:px-3 lg:mb-3 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3 text-darkText dark:text-lightText relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg border border-black/20 bg-[#f8f8f8] px-2  py-1 text-xs font-medium duration-200 dark:border-white/20 dark:bg-[#000]'>
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
        <div className='sm:py-4 md:py-6 lg:py-8 xl:py-10 py-2'>
          <p className='md:text-2xl xl:text-4xl w-full text-center text-lg font-bold uppercase text-haretaColor'>
            {t('order information.order information')}
          </p>
          {(!orderData || loadingOrderData) && (
            <div className='md:py-2 xl:py-4 flex h-96 w-full items-center justify-center py-1'>
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
              <div className='md:mt-4 md:grid-cols-2 md:gap-4 xl:mt-6 xl:gap-6 mt-2 grid grid-cols-1 gap-2'>
                <div className='md:space-y-4 xl:space-y-6 col-span-1 flex flex-col space-y-2'>
                  <p className='md:text-lg xl:text-xl w-full text-center text-sm font-semibold'>
                    {t('order information.customer information')}
                  </p>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.name')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium'>{orderInformation?.name}</p>
                  </div>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.email')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium'>{orderInformation?.email}</p>
                  </div>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.phone')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium'>{orderInformation?.phone}</p>
                  </div>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.address')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium'>
                      {orderInformation?.address}
                    </p>
                  </div>
                </div>
                <div
                  className={classNames('md:space-y-4 xl:space-y-6 col-span-1 flex flex-col space-y-2', {
                    'mt-4 border-t border-dashed border-black/60 pt-2 dark:border-white/60': isMobile
                  })}
                >
                  <p className='md:text-lg xl:text-xl w-full text-center text-sm font-semibold'>
                    {t('order information.order state')}
                  </p>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.total')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium capitalize'>
                      ${orderInformation?.total}
                    </p>
                  </div>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.created at')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium capitalize'>
                      {formatDate(orderInformation?.created_at as string)}
                    </p>
                  </div>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.status')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium capitalize text-haretaColor'>
                      {orderInformation?.status}
                    </p>
                  </div>
                  <div className='md:grid-cols-2 md:gap-4 xl:gap-6 grid w-full grid-cols-1 gap-2'>
                    <p className='md:text-base xl:text-lg text-darkText/80 dark:text-lightText/80 col-span-1 text-xs'>
                      {t('order information.updated at')}
                    </p>
                    <p className='md:text-base xl:text-lg col-span-1 text-xs font-medium capitalize text-haretaColor'>
                      {formatDate(orderInformation?.updated_at as string)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='md:mt-6 md:px-2 md:py-4 xl:mt-8 xl:px-4 mt-6 rounded-lg border border-black/60 px-1 py-2 dark:border-white/60'>
                <p className='md:text-lg xl:text-xl w-full text-center text-base font-semibold uppercase'>
                  {t('order information.Product list')}
                </p>
                {!isMobile && (
                  <Fragment>
                    {(loadingPurchasesData || !purchasesData) && (
                      <div className='md:py-2 xl:py-4 flex h-96 w-full items-center justify-center py-1'>
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
                        <div className='md:px-4 md:text-base lg:text-lg xl:px-8 xl:text-lg text-darkText dark:text-lightText mt-2 grid grid-cols-3 px-1 py-4 text-sm font-semibold uppercase'>
                          <div className='col-span-1'>
                            <p className='text-darkText dark:text-lightText flex-grow items-center justify-center text-center'>
                              {t('order information.Product')}
                            </p>
                          </div>
                          <div className='col-span-2'>
                            <div className='xl:gap-4 grid grid-cols-3 gap-2 text-center'>
                              <div className='col-span-1'>{t('order information.Unit price')}</div>
                              <div className='col-span-1'>{t('order information.Quantity')}</div>
                              <div className='col-span-1'>{t('order information.Subtotal')}</div>
                            </div>
                          </div>
                        </div>

                        <div className='md:mt-4 xl:mt-6 mt-2'>
                          {purchasesData &&
                            purchaseList.map((purchase) => (
                              <OrderPurchaseDekstop key={purchase.id} purchase={purchase} />
                            ))}
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
                {isMobile && (
                  <Fragment>
                    {(loadingPurchasesData || !purchasesData) && (
                      <div className='md:py-2 xl:py-4 flex h-40 w-full items-center justify-center py-1'>
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
                      purchaseList.map((purchase) => <OrderPurchaseMobile key={purchase.id} purchase={purchase} />)}
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
