import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function OrderHeader() {
  //? translation
  const { t } = useTranslation('order')

  return (
    <div className='text-darkText dark:text-lightText rounded-lg border border-black/40 bg-white dark:border-white/40 dark:bg-black'>
      <div className='relative grid grid-cols-2'>
        <div className='absolute left-1/2 h-full border-l border-black/40 duration-200 dark:border-white/40'></div>
        <div className='col-span-1 '>
          <NavLink
            to={path.shippingInfor}
            className={({ isActive }) =>
              classNames('flex items-center justify-center py-2 font-medium uppercase', {
                'text-haretaColor dark:text-haretaColor': isActive,
                'hover:text-primaryColor dark:hover:text-primaryColor': !isActive
              })
            }
          >
            {t('layout.Shipping information')}
          </NavLink>
        </div>
        <div className='col-span-1 '>
          <NavLink
            to={path.payment}
            className={({ isActive }) =>
              classNames('flex items-center justify-center py-2 font-medium uppercase', {
                'text-haretaColor dark:text-haretaColor': isActive,
                'hover:text-primaryColor dark:hover:text-primaryColor': !isActive
              })
            }
          >
            {t('layout.Payment')}
          </NavLink>
        </div>
      </div>
    </div>
  )
}
