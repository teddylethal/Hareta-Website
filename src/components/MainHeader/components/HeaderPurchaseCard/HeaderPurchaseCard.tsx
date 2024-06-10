import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { Purchase } from 'src/types/cart.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface Props {
  purchase: Purchase
  isTemporary?: boolean
  handleRemove: () => void
  isDisabled?: boolean
}

export default function HeaderPurchaseCard({ purchase, handleRemove, isDisabled = false }: Props) {
  //! Multi languages
  const { t } = useTranslation('header')

  return (
    <div
      className='flex items-center border-t border-black/40 p-3 first:border-none hover:bg-lightColor700/60 dark:border-white/40 dark:hover:bg-darkColor700/60'
      key={purchase.id}
    >
      <div className='h-14 w-14'>
        <div className='relative w-full pt-[100%]'>
          {purchase.item.avatar ? (
            <img
              src={purchase.item.avatar.url}
              alt={purchase.item.name}
              className='pointer-events-none absolute left-0 top-0 h-full w-full object-cover'
            />
          ) : (
            <div className='pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center object-cover text-lg'>
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>
          )}
        </div>
      </div>

      <div className='flex grow flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <NavLink
            to={`${mainPath.store}/${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
            className='flex'
          >
            <p className='truncate px-2 font-semibold capitalize hover:text-primaryColor dark:hover:text-primaryColor desktop:text-base'>
              {purchase.item.name}
            </p>
          </NavLink>
          <span className='flex-shrink-0 font-medium text-haretaColor'>${formatCurrency(purchase.item.price)}</span>
        </div>
        <div className='ml-2 flex justify-between'>
          <span className='text-xs capitalize text-darkText/60 dark:text-lightText/60 desktop:text-sm'>{`(${purchase.item.color})`}</span>

          <div className='flex space-x-3'>
            <button
              disabled={isDisabled}
              className={classNames('text-sm capitalize text-darkText/60 dark:text-lightText/60 ', {
                'hover:text-alertRed dark:hover:text-alertRed': !isDisabled,
                'cursor-not-allowed': isDisabled
              })}
              onClick={handleRemove}
            >
              {t('cart button.remove')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
