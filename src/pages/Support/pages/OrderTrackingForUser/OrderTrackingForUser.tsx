import { Fragment, useContext } from 'react'
import EmptyProductList from 'src/components/EmptyProductList'
import OrderTrackingLoading from 'src/components/OrderTrackingLoading'
import { AppContext } from 'src/contexts/app.context'
import { OrderConfig } from '../OrderTracking/OrderTracking'
import { useQuery } from '@tanstack/react-query'
import { orderApi } from 'src/apis/order.api'
import { useTranslation } from 'react-i18next'
import OrderItem from '../../components/OrderItem'
import OrderPagination from 'src/components/OrderPagination'
import { ceil } from 'lodash'

const LIMIT = 5 as const

export default function OrderTrackingForUser() {
  const { isAuthenticated } = useContext(AppContext)

  //? get order list
  const orderConfig: OrderConfig = {
    page: '1',
    limit: String(LIMIT)
  }
  const { data: orderData, isFetching } = useQuery({
    queryKey: ['order_list', orderConfig],
    queryFn: () => {
      return orderApi.getOrderList()
    },

    enabled: isAuthenticated,
    staleTime: 3 * 60 * 1000
  })
  const orderList = orderData?.data.data || []

  //? Translation
  const { t } = useTranslation(['support'])

  return (
    <Fragment>
      <div className='tablet:px-12 desktopLarge:px-24'>
        <div className='rounded-lg border border-black/40 px-2 py-4 dark:border-white/40 tablet:px-4 tablet:py-8 desktopLarge:px-6 desktopLarge:py-12 '>
          <p className='text-center text-lg font-bold uppercase tablet:text-xl desktopLarge:text-2xl'>
            {t('orderDetail.title')}
          </p>

          {(isFetching || !orderData) && <OrderTrackingLoading />}
          {orderData && orderData.data.paging.total == 0 && <EmptyProductList currentPage='order' />}
          {orderData && (
            <Fragment>
              <div className='mt-4 grid grid-cols-4 gap-2 px-2 font-semibold uppercase tablet:mt-6 tablet:grid-cols-6 tablet:gap-4 tablet:px-3 desktop:px-4 desktopLarge:mt-8'>
                <div className='col-span-2 tablet:col-span-4'>
                  <p className='text-center text-xs tabletSmall:text-sm tablet:text-lg desktopLarge:text-xl'>
                    {t('orderDetail.order')}
                  </p>
                </div>
                <div className='cols-span-1'>
                  <p className='text-center text-xs tabletSmall:text-sm tablet:text-lg desktopLarge:text-xl'>
                    {t('orderDetail.day created')}
                  </p>
                </div>
                <div className='col-span-1'>
                  <p className='text-center text-xs tabletSmall:text-sm tablet:text-lg desktopLarge:text-xl'>
                    {t('orderDetail.state')}
                  </p>
                </div>
              </div>
              <div className='mt-2 tablet:mt-3 desktopLarge:mt-4'>
                {orderList?.map((order) => (
                  <div
                    key={order.id}
                    className='mt-4 rounded-lg border border-black/20 bg-[#efefef] px-2 first:mt-0 hover:bg-[#e8e8e8] dark:border-white/20 dark:bg-[#202020] dark:hover:bg-[#171717] tablet:px-3 desktop:px-4 '
                  >
                    <OrderItem order={order} />
                  </div>
                ))}
              </div>
              <div className=''>
                <OrderPagination orderConfig={orderConfig} totalPage={ceil(orderData.data.paging.total / LIMIT)} />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}
