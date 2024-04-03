import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductTag from 'src/components/ProductTag'
import { useViewport } from 'src/hooks/useViewport'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import { Attribute } from '../../pages/UserWishList/UserWishList'

interface Props {
  product: Product
  handleClickItem: (item: Product) => () => void
  handleChooseFilter: (field: string, value: string) => () => void
  addToCart: (id: string) => () => void
  openUnlikeItemDialog: (id: string) => () => void
}

export default function WishlistItemMobile({
  product,
  handleClickItem,
  handleChooseFilter,
  addToCart,
  openUnlikeItemDialog
}: Props) {
  const viewPort = useViewport()
  const isWide = viewPort.width >= 640

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
    <div className='py-2 tabletSmall:px-4 tabletSmall:py-4'>
      <div className='grid grid-cols-12 text-center text-darkText dark:text-lightText '>
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
        <div className='col-span-8 '>
          <div className='ml-2 flex min-h-full flex-col justify-start tabletSmall:ml-6'>
            <button
              className='flex items-center justify-start truncate px-2 py-1 text-base font-medium tabletSmall:text-lg'
              onClick={handleClickItem(product)}
            >
              {product.name}
            </button>
            <div>{product.tag !== 0 && <ProductTag tag={product.tag} />}</div>
            {isWide && (
              <div className='mt-4 flex items-center justify-between space-x-2'>
                {attributes.map((attribute, index) => (
                  <button
                    key={index}
                    className='flex w-full items-center  justify-center truncate rounded-lg border border-black/40 px-2 py-1 text-xs capitalize hover:bg-lightColor500 dark:border-white/40 dark:hover:bg-black'
                    onClick={attribute.onClick}
                  >
                    {attribute.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isWide && (
        <div className='mt-2 flex items-center justify-between space-x-2'>
          {attributes.map((attribute, index) => (
            <button
              key={index}
              className='flex w-full items-center  justify-center truncate rounded-lg border border-black/40 px-2 py-1 text-xs capitalize hover:bg-lightColor500 dark:border-white/40 dark:hover:bg-black'
              onClick={attribute.onClick}
            >
              {attribute.name}
            </button>
          ))}
        </div>
      )}

      <div className='relative mt-3 flex items-center space-x-8 tabletSmall:space-x-12 '>
        <div className='relative grid w-full grid-cols-2 items-center rounded-md border border-black/30 py-1.5 dark:border-white/30  tabletSmall:py-2'>
          <span className='col-span-1 flex items-center justify-center text-xs font-medium text-darkText dark:text-lightText tabletSmall:text-sm'>
            ${formatCurrency(product.price)}
          </span>
          <div className='absolute left-1/2 h-full border-l border-black/30 dark:border-white/30' />
          <button
            className='col-span-1 flex items-center justify-center bg-none text-haretaColor hover:text-primaryColor'
            onClick={addToCart(product.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} className='h-4 w-auto tabletSmall:h-5' onClick={addToCart(product.id)} />
          </button>
        </div>
        <button
          className='bg-none hover:text-darkText dark:hover:text-lightText'
          onClick={openUnlikeItemDialog(product.group.id)}
        >
          <p className='text-xs text-darkText/80 hover:text-darkText hover:underline dark:text-lightText/80 dark:hover:text-lightText tabletSmall:text-sm desktop:text-sm'>
            Remove
          </p>
        </button>
      </div>
    </div>
  )
}
