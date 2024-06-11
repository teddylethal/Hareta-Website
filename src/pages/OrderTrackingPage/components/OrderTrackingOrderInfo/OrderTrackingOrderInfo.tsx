import classNames from 'classnames'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import OrderState from 'src/constants/orderState'
import { useViewport } from 'src/hooks/useViewport'
import { Order } from 'src/types/order.type'
import { formatDateEn, formatDateVi } from 'src/utils/utils'

interface Props {
  orderDetail: Order
}

//! Styles
const wrapperClassname = 'grid w-full grid-cols-1 gap-1 tablet:grid-cols-3 tablet:gap-4'
const titleClassname =
  'col-span-1 text-sm text-darkText/80 dark:text-lightText/80 tabletSmall:text-base desktop:text-lg'
const infoClassname = 'col-span-1 tablet:col-span-2 text-sm font-medium tabletSmall:text-base desktop:text-lg truncate'

export default function OrderTrackingOrderInfo({ orderDetail }: Props) {
  const isMobile = useViewport().width < 768

  //! Multi languages
  const { t } = useTranslation('support')
  const currentLan = i18next.language

  return (
    <div className='mt-2 grid grid-cols-1 gap-2 tablet:mt-4 tablet:grid-cols-2 tablet:gap-4 desktopLarge:mt-6 desktopLarge:gap-6'>
      <div className='col-span-1 flex flex-col space-y-3 tablet:space-y-4 desktopLarge:space-y-6'>
        <p className='w-full text-center text-lg font-semibold tablet:text-xl desktopLarge:text-2xl'>
          {t('order information.customer information')}
        </p>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.name')}</p>
          <p className={infoClassname}>{orderDetail?.name}</p>
        </div>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.email')}</p>
          <p className={infoClassname}>{orderDetail?.email}</p>
        </div>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.phone')}</p>
          <p className={infoClassname}>{orderDetail?.phone}</p>
        </div>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.address')}</p>
          <p className={infoClassname}>{orderDetail?.address}</p>
        </div>
      </div>
      <div
        className={classNames('col-span-1 flex flex-col space-y-3 tablet:space-y-4 desktopLarge:space-y-6', {
          'mt-4 border-t border-dashed border-black/60 pt-2 dark:border-white/60': isMobile
        })}
      >
        <p className='w-full text-center text-lg font-semibold tablet:text-xl desktopLarge:text-2xl'>
          {t('order information.order state')}
        </p>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.total')}</p>
          <p className={classNames(infoClassname, 'font-semibold text-haretaColor')}>${orderDetail?.total}</p>
        </div>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.created at')}</p>
          <p className={infoClassname}>
            {currentLan == 'en'
              ? formatDateEn(orderDetail?.created_at as string)
              : formatDateVi(orderDetail?.created_at as string)}
          </p>
        </div>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.status')}</p>
          <p className={classNames(infoClassname, 'text-haretaColor')}>{OrderState[orderDetail?.status ?? 0]}</p>
        </div>
        <div className={wrapperClassname}>
          <p className={titleClassname}>{t('order information.updated at')}</p>
          <p className={classNames(infoClassname, 'text-haretaColor')}>
            {currentLan == 'en'
              ? formatDateEn(orderDetail?.updated_at as string)
              : formatDateVi(orderDetail?.updated_at as string)}
          </p>
        </div>
      </div>
    </div>
  )
}
