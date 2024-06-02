import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ProductType } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'

interface Props {
  product: ProductType
  handleRemove: (productId: string) => () => void
  isAddingProduct: boolean
}

export default function AdminEventProductCard({ product, handleRemove, isAddingProduct }: Props) {
  return (
    <div className='relative w-full overflow-hidden rounded-xl bg-productLightBg pb-4 duration-200 dark:bg-productDarkBg'>
      <div className='relative w-full pt-[75%]'>
        <div className='absolute left-0 top-0 h-full w-full'>
          {product.avatar.url ? (
            <img
              src={product.avatar.url}
              alt={product.name}
              className='absolute left-0 top-0 h-full w-full object-cover'
            />
          ) : (
            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
              <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center justify-between space-x-1 space-y-1 overflow-hidden px-2 pt-2 tabletSmall:px-3 desktop:px-4 desktop:pt-4'>
        <p className='h-full justify-center overflow-hidden truncate text-center text-sm font-semibold uppercase text-darkText duration-200 dark:text-lightText tabletSmall:text-base desktop:text-lg'>
          {product.name}
        </p>

        <div className='flex space-x-2'>
          <span className='text-xs font-semibold line-through opacity-60 tabletSmall:text-sm desktop:text-base desktopLarge:text-lg'>
            ${formatCurrency(product.price)}
          </span>
          <span className='text-xs font-semibold text-haretaColor tabletSmall:text-sm desktop:text-base desktopLarge:text-lg'>
            ${formatCurrency(product.price - (product.price * product.discount) / 100)}
          </span>
        </div>
      </div>

      {isAddingProduct && (
        <button
          onClick={handleRemove(product.id)}
          className='absolute right-1 top-1 rounded-xl bg-alertRed/80 px-3 py-1 text-sm hover:bg-alertRed'
        >
          Xóa
        </button>
      )}
    </div>
  )
}
