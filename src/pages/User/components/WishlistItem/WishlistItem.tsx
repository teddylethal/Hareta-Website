import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import ProductTag from 'src/components/ProductTag'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import { Attribute } from '../../pages/UserWishList/UserWishList'

interface Props {
  product: Product
  handleClickItem: (product: Product) => () => void
  handleChooseFilter: (field: string, value: string) => () => void
  addToCart: (id: string) => () => void
  openUnlikeItemDialog: (id: string) => () => void
}

export default function WishlistItem({
  product,
  handleClickItem,
  handleChooseFilter,
  addToCart,
  openUnlikeItemDialog
}: Props) {
  //! translation
  const { t } = useTranslation(['user'])
  const tag = product.tag

  //! Attribute list
  const attributes: Attribute[] = [
    {
      name: product.category,
      onClick: handleChooseFilter('category', product.category)
    },
    {
      name: product.collection,
      onClick: handleChooseFilter('collection', product.collection)
    },
    {
      name: product.type,
      onClick: handleChooseFilter('type', product.type)
    }
  ]

  return (
    <div className='grid grid-cols-12 items-center py-6 text-center text-darkText dark:text-lightText '>
      <div className='col-span-4'>
        <button className='relative w-full pt-[75%]' onClick={handleClickItem(product)}>
          <img
            alt={product.name}
            src={
              product.avatar
                ? product.avatar.url
                : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
            }
            className='absolute left-0 top-0 h-full w-full object-scale-down'
          />
        </button>
      </div>
      <div className='col-span-5 flex h-[80%] flex-col justify-between'>
        <div className='ml-8'>
          <button
            className=' flex items-center justify-start truncate py-1.5 text-lg font-medium desktop:py-2 desktop:text-xl desktopLarge:text-2xl'
            onClick={handleClickItem(product)}
          >
            {product.name}
          </button>
          {tag !== 0 && <ProductTag tag={product.tag} />}
        </div>
        <div className='ml-8 flex items-center space-x-2 desktop:space-x-4'>
          {attributes.map((attribute, index) => (
            <button
              key={index}
              className='flex items-center justify-start truncate rounded-lg border border-black/40 px-1 py-1 text-xs capitalize hover:bg-lightColor500 dark:border-white/40 dark:hover:bg-black desktop:px-4 desktop:text-base'
              onClick={attribute.onClick}
            >
              {attribute.name}
            </button>
          ))}
        </div>
      </div>
      <div className='relative col-span-3  h-[75%] '>
        <div className='relative grid w-full grid-cols-2 items-center rounded-md border border-black/30 py-1 dark:border-white/30 desktop:py-2 '>
          <span className='col-span-1 flex items-center justify-center text-xs font-medium text-darkText dark:text-lightText desktop:text-base'>
            ${formatCurrency(product.price)}
          </span>
          <div className='absolute left-1/2 h-full border-l border-black/30 dark:border-white/30'></div>
          <button
            className='col-span-1 flex items-center justify-center bg-none text-haretaColor hover:text-primaryColor'
            onClick={addToCart(product.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} className='h-auto w-4 desktop:w-6' onClick={addToCart(product.id)} />
          </button>
        </div>
        <button
          className='absolute bottom-0 right-0 bg-none hover:text-darkText dark:hover:text-lightText'
          onClick={openUnlikeItemDialog(product.group.id)}
        >
          <p className='text-xs text-darkText/80 hover:text-darkText hover:underline dark:text-lightText/80 dark:hover:text-lightText desktop:text-sm'>
            {t('wishlist.remove')}
          </p>
        </button>
      </div>
    </div>
  )
}
