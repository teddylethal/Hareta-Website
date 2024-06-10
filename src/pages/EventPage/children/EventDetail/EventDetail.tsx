import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import LoadingSection from 'src/components/LoadingSection'
import PathBar from 'src/components/PathBar'
import mainPath from 'src/constants/path'
import { ProductListQueryConfig } from 'src/hooks/useProductListQueryConfig'
import EventProductCard from '../../components/EventProductCard'
import DOMPurify from 'dompurify'
import { getIdFromNameId } from 'src/utils/utils'
import eventApi from 'src/apis/event.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function EventDetail() {
  const [gettingCoupon, setGettingCoupon] = useState(false)

  const currentUrl = useLocation().pathname
  const { eventId: nameId } = useParams()
  const eventId = getIdFromNameId(nameId as string)

  //! Multi languages
  const { t } = useTranslation('event')

  //! Get event detail
  const { data: eventDetailData } = useQuery({
    queryKey: ['events', 'detail', eventId],
    queryFn: () => eventApi.getEventDetail(eventId)
  })
  const eventDetail = eventDetailData?.data.data
  const productsInEvent = eventDetail?.items || []

  //! Get product list
  const itemsConfig: ProductListQueryConfig = { limit: String(10) }
  const { data: itemsData } = useQuery({
    queryKey: ['products', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const displayedItems = itemsData?.data.data || []

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg tablet:py-3 desktop:py-4 '>
      {!eventDetail && <LoadingSection />}
      {eventDetail && (
        <div className='container space-y-6'>
          <PathBar
            pathList={[
              { pathName: t('path.event'), url: mainPath.events },
              { pathName: eventDetail.overall_content, url: currentUrl }
            ]}
          />

          <div className='space-y-6'>
            <p className='text-center text-xl font-bold uppercase text-haretaColor  tablet:text-2xl desktop:text-3xl desktop:leading-10 desktop:tracking-wide'>
              {eventDetail.overall_content}
            </p>

            <div className='flex w-full items-center justify-center'>
              {eventDetail.avatar ? (
                <img
                  src={eventDetail.avatar}
                  alt={'Event'}
                  className='h-full w-full object-scale-down tablet:w-10/12 desktop:w-8/12'
                />
              ) : (
                <div className='h-full w-full object-scale-down tablet:w-10/12 desktop:w-8/12'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
                </div>
              )}
            </div>
            <div className='gird-cols-1 grid gap-4 tablet:grid-cols-12'>
              <div className='col-span-1 space-y-6 tablet:col-span-8 tablet:border-r tablet:px-4'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(eventDetail.detail_content)
                  }}
                  className='overflow-visible'
                />

                <div className='flex flex-col items-center justify-center space-y-4'>
                  <p className='text-lg font-semibold uppercase tracking-wide tablet:text-xl desktop:text-2xl'>
                    {t('detail.Claim your coupon')}
                  </p>
                  <button
                    onClick={() => setGettingCoupon(true)}
                    className='rounded-2xl bg-unhoveringBg px-4 py-2 font-medium text-darkText hover:bg-hoveringBg desktop:px-6'
                  >
                    {t('detail.Get the coupon')}
                  </button>
                  {gettingCoupon && (
                    <div className='space-y-2 desktop:text-lg'>
                      <p className='w-full space-x-2 text-center font-medium text-haretaColor'>SUMMERSALEHARETA</p>
                      <p className=''>
                        {t('detail.Use this coupon code when shopping to receive discounts from Hareta Workshop.')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className='col-span-1 space-y-4 tablet:col-span-4'>
                <p className='text-center text-xl font-semibold uppercase text-haretaColor desktop:text-2xl'>
                  {t('detail.Products in event')}
                </p>

                <div className='grid w-full grid-cols-2 flex-col gap-6 tablet:grid-cols-1 tablet:px-4 desktop:gap-8'>
                  {productsInEvent.map((product) => (
                    <div key={product.item.id} className='col-span-1'>
                      <EventProductCard discount={50} product={product.item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
