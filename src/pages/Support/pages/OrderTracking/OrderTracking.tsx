import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { orderApi } from 'src/apis/order.api'
import OrderItem from '../../components/OrderItem'
import PathBar from 'src/components/PathBar'

export default function OrderTracking() {
  //? get order list
  const { data: orderData, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: () => {
      return orderApi.getOrderList()
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const orderList = orderData?.data.data || []

  //? Translation
  const { t } = useTranslation(['support'])

  return (
    <div className='bg-lightBg py-2 text-textDark duration-300 dark:bg-darkBg dark:text-textLight md:py-3 xl:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: t('path.home'), url: '/' },
            { pathName: t('path.order tracking'), url: '/orderTracking' }
          ]}
        />
        <div className='flex flex-col space-y-6 py-2 md:space-y-10 md:py-4 xl:space-y-10 xl:py-6'>
          <p className='upperacse w-full text-center font-medium uppercase text-haretaColor md:text-xl xl:text-2xl'>
            {t('order.content')}
          </p>

          <div className='md:px-20 xl:px-40'>
            <form className='relative flex w-full items-center rounded-lg bg-[#f8f8f8] shadow-sm duration-300 dark:bg-[#101010]'>
              <input
                autoComplete='off'
                className='w-full rounded-md bg-transparent px-4 py-1 text-base outline-none ring-1 ring-vintageColor/80 duration-300 autofill:text-textDark focus:ring-2 focus:ring-vintageColor dark:caret-white dark:ring-haretaColor/80 dark:autofill:text-textLight dark:focus:ring-haretaColor lg:py-2 lg:text-lg'
                placeholder={t('order.placeholder')}
              />
              <button className='absolute right-1 flex items-center justify-center rounded-lg bg-vintageColor/90 px-3 py-1 hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor lg:right-4 lg:px-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-4 w-4 lg:h-5 lg:w-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className='md:px-12 xl:px-24'>
            <div className='rounded-lg border border-black/40 p-2 dark:border-white/40 md:p-4 xl:p-6 '>
              <p className='text-center font-bold uppercase sm:text-lg md:text-xl xl:text-2xl'>
                {t('orderDetail.title')}
              </p>

              <div className='mt-4 grid grid-cols-4 gap-2 px-2 font-semibold uppercase md:mt-6 md:grid-cols-6 md:gap-4 md:px-3 lg:px-4 xl:mt-8'>
                <div className='col-span-2 md:col-span-4'>
                  <p className='text-center text-xs sm:text-sm md:text-lg xl:text-xl'>{t('orderDetail.order')}</p>
                </div>
                <div className='cols-span-1'>
                  <p className='text-center text-xs sm:text-sm md:text-lg xl:text-xl'>{t('orderDetail.day created')}</p>
                </div>
                <div className='col-span-1'>
                  <p className='text-center text-xs sm:text-sm md:text-lg xl:text-xl'>{t('orderDetail.state')}</p>
                </div>
              </div>

              <div className='mt-2 md:mt-3 xl:mt-4'>
                {orderList?.map((order) => (
                  <div
                    key={order.id}
                    className='mt-4 rounded-lg border border-black/20 bg-[#efefef] px-2 first:mt-0 hover:bg-[#e8e8e8] dark:border-white/20 dark:bg-[#202020] dark:hover:bg-[#171717] md:px-3 lg:px-4 '
                  >
                    <OrderItem order={order} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
