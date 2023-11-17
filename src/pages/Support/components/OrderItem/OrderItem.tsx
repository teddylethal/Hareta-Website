import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { orderApi } from 'src/apis/order.api'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useViewport } from 'src/hooks/useViewport'
import { ItemOrderConfig, Order } from 'src/types/order.type'
import { formatDate, generateNameId } from 'src/utils/utils'

interface Props {
  order: Order
}

export default function OrderItem({ order }: Props) {
  const { isAuthenticated } = useContext(AppContext)

  //? viewport
  const viewport = useViewport()
  const isMobile = viewport.width <= 640

  //? translation
  const { t } = useTranslation('support')

  //? get items of order
  const itemOrderConfig: ItemOrderConfig = {
    order_id: order.id,
    page: 1,
    limit: 4
  }
  const { data: purchasesData, isFetching } = useQuery({
    queryKey: ['items_of_order', itemOrderConfig],
    queryFn: () => {
      return orderApi.getItemListOfOrder(itemOrderConfig)
    },
    keepPreviousData: true,
    enabled: isAuthenticated,
    staleTime: 3 * 60 * 1000
  })
  const purchaseList = purchasesData?.data.data || []
  const totalPurchases = purchasesData?.data.paging.total as number
  const itemList = purchaseList.map((purchase) => purchase.item)
  const remain = isMobile ? (totalPurchases > 1 ? totalPurchases - 1 : 0) : totalPurchases > 3 ? totalPurchases - 3 : 0

  //? HANDLE ENTER ITEM
  const navigate = useNavigate()
  const handleClickItem = () => {
    navigate({
      pathname: `${path.orderTracking}/${generateNameId({ name: formatDate(order.created_at), id: order.id })}`
    })
  }

  return (
    <Fragment>
      {(!purchasesData || isFetching) && (
        <div className='flex w-full items-center justify-center py-1 md:py-2 xl:py-4'>
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
        <button
          className='grid w-full grid-cols-4 gap-2 py-1 md:grid-cols-6 md:gap-4 md:px-3 md:py-2 lg:px-4 xl:py-4'
          onClick={handleClickItem}
        >
          <div className='col-span-2 md:col-span-4'>
            <div className='flex flex-col items-start space-y-2 py-1 md:py-2'>
              <div className='flex w-full items-center justify-center space-x-6 md:space-x-8 xl:space-x-10'>
                {!isMobile && (
                  <p className='text-sm font-semibold md:text-base xl:text-lg'>{t('orderDetail.order id')}</p>
                )}
                <p className='text-sm font-medium md:text-base xl:text-lg'>{order.id}</p>
              </div>
              <div className='mt-2 grid w-full grid-cols-2 gap-1 md:grid-cols-4 md:gap-3'>
                <div className='cols-span-1 md:col-span-3'>
                  <div className='grid w-full grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 xl:gap-4'>
                    {itemList.map((item) => {
                      const avatarURL = item.avatar ? item.avatar.url : null
                      return (
                        <div className='col-span-1' key={item.id}>
                          <div className='relative w-full overflow-hidden rounded-md pt-[100%] md:rounded-lg'>
                            {avatarURL ? (
                              <img
                                src={avatarURL}
                                alt={item.name}
                                className='absolute left-0 top-0 h-full w-full object-cover'
                              />
                            ) : (
                              <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
                            )}
                          </div>
                          <p className='mt-2 w-full text-center text-xs font-medium md:text-sm xl:text-base'>
                            {item.name}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {remain > 0 && (
                  <div className='col-span-1'>
                    <div className='relative w-full rounded-md border border-black/60 pt-[100%] dark:border-white/60 md:rounded-lg'>
                      <div className='absolute left-0 top-0 flex h-full w-full items-center text-center'>
                        + {remain}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col-span-1 flex min-h-full items-center justify-center'>
            <p className='flex h-full flex-col items-center justify-center text-center text-xs font-medium sm:text-sm md:text-base xl:text-lg'>
              {formatDate(order.created_at)}
            </p>
          </div>
          <div className='col-span-1 flex min-h-full items-center justify-center'>{order.status}</div>
        </button>
      )}
    </Fragment>
  )
}
