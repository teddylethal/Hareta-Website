import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import path from 'src/constants/path'
import { getIdFromNameId } from 'src/utils/utils'
import { ItemOrderConfig } from 'src/types/order.type'
import { orderApi } from 'src/apis/order.api'
import { useQuery } from '@tanstack/react-query'
import OrderPurchaseDekstop from '../OrderPurchaseDekstop'
import { useViewport } from 'src/hooks/useViewport'
import OrderPurchaseMobile from '../OrderPurchaseMobile'

export default function OrderItemInformation() {
  //? responsive
  const isMobile = useViewport().width < 768

  //? get order id
  const { orderId } = useParams()
  const id = getIdFromNameId(orderId as string)

  //? get order informtaion

  //? get item list
  const itemOrderConfig: ItemOrderConfig = {
    order_id: id,
    page: 1,
    limit: 20
  }
  const { data: purchasesData, isFetching } = useQuery({
    queryKey: ['items_of_order', itemOrderConfig],
    queryFn: () => {
      return orderApi.getItemListOfOrder(itemOrderConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const purchaseList = purchasesData?.data.data || []

  //? translation
  const { t } = useTranslation('support')
  return (
    <div className='bg-lightBg py-2 text-textDark duration-300 dark:bg-darkBg dark:text-textLight md:py-3 xl:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg border border-black/20 bg-[#f8f8f8] px-2 py-1 text-xs font-medium text-textDark duration-500 dark:border-white/20 dark:bg-[#000] dark:text-textLight sm:space-x-2 sm:px-3 lg:mb-3  lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
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
            {t('path.order tracking')}
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <div className={'text-brownColor dark:text-haretaColor'}>{id}</div>
        </div>
        <div className=''>
          <p className='w-full text-center text-base font-bold uppercase text-haretaColor sm:text-lg md:text-xl xl:text-2xl'>
            {t('order information.order information')}
          </p>
          <div className='mt-2 grid grid-cols-1 gap-2 md:mt-4 md:grid-cols-2 md:gap-4 xl:mt-6 xl:gap-6'>
            <div className='col-span-1 flex flex-col space-y-2 md:space-y-4 xl:space-y-6'>
              <p className='w-full text-center text-sm font-semibold md:text-lg xl:text-xl'>
                {t('order information.customer information')}
              </p>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.name')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize md:text-base xl:text-lg'>le tien thanh</p>
              </div>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.email')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize md:text-base xl:text-lg'>le tien thanh</p>
              </div>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.phone')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize md:text-base xl:text-lg'>le tien thanh</p>
              </div>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.address')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize md:text-base xl:text-lg'>le tien thanh</p>
              </div>
            </div>
            <div className='col-span-1 flex flex-col space-y-2 md:space-y-4 xl:space-y-6'>
              <p className='w-full text-center text-sm font-semibold md:text-lg xl:text-xl'>
                {t('order information.order state')}
              </p>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.total')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize md:text-base xl:text-lg'>le tien thanh</p>
              </div>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.created at')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize md:text-base xl:text-lg'>le tien thanh</p>
              </div>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.status')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize text-haretaColor md:text-base xl:text-lg'>
                  le tien thanh
                </p>
              </div>
              <div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:gap-6'>
                <p className='col-span-1 text-xs text-textDark/80 dark:text-textLight/80 md:text-base xl:text-lg'>
                  {t('order information.updated at')}
                </p>
                <p className='col-span-1 text-xs font-medium capitalize text-haretaColor md:text-base xl:text-lg'>
                  le tien thanh
                </p>
              </div>
            </div>
          </div>

          <div className='mt-4 rounded-lg border border-black/60 px-1 py-2 dark:border-white/60 md:mt-6 md:px-2 md:py-4 xl:mt-8 xl:px-4'>
            <p className='w-full text-center text-base font-semibold uppercase md:text-lg xl:text-xl'>
              {t('order information.Product list')}
            </p>
            {!isMobile && (
              <Fragment>
                <div className='mt-2 grid grid-cols-3 px-1 py-4 text-sm font-semibold uppercase text-textDark dark:text-textLight md:px-4 md:text-base lg:text-lg xl:px-8 xl:text-lg'>
                  <div className='col-span-1'>
                    <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>
                      {t('order information.Product')}
                    </p>
                  </div>
                  <div className='col-span-2'>
                    <div className='grid grid-cols-3 gap-2 text-center xl:gap-4'>
                      <div className='col-span-1'>{t('order information.Unit price')}</div>
                      <div className='col-span-1'>{t('order information.Quantity')}</div>
                      <div className='col-span-1'>{t('order information.Subtotal')}</div>
                    </div>
                  </div>
                </div>

                <div className='mt-2 md:mt-4 xl:mt-6'>
                  {purchasesData &&
                    purchaseList.map((purchase) => <OrderPurchaseDekstop key={purchase.id} purchase={purchase} />)}
                </div>
              </Fragment>
            )}
            {isMobile && (
              <Fragment>
                {purchasesData &&
                  purchaseList.map((purchase) => <OrderPurchaseMobile key={purchase.id} purchase={purchase} />)}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
