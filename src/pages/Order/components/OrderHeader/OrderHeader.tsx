import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function OrderHeader() {
  //? translation
  const { t } = useTranslation('order')

  return (
    <div className='rounded-lg border border-black/40 bg-white text-textDark dark:border-white/40 dark:bg-black dark:text-textLight'>
      <div className='relative grid grid-cols-2'>
        <div className='absolute left-1/2 h-full border-l border-black/40 duration-300 dark:border-white/40'></div>
        <div className='col-span-1 '>
          <NavLink
            to={path.shippingInfor}
            className={({ isActive }) =>
              classNames('flex items-center justify-center py-2 font-medium uppercase', {
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
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
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
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
