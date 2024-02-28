import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'

interface Props {
  item: Product
  handleClickItem: (item: Product) => () => void
  handleChooseFilter: (field: string, value: string) => () => void
  addToCart: (id: string) => () => void
  openUnlikeItemDialog: (id: string) => () => void
}

export default function WishlistItem({
  item,
  handleClickItem,
  handleChooseFilter,
  addToCart,
  openUnlikeItemDialog
}: Props) {
  //? translation
  const { t } = useTranslation(['user'])
  const tag = item.tag

  return (
    <div className='text-darkText dark:text-lightText grid grid-cols-12 items-center py-6 text-center '>
      <div className='col-span-4'>
        <button className='relative w-full pt-[75%]' onClick={handleClickItem(item)}>
          <img
            alt={item.name}
            src={
              item.avatar
                ? item.avatar.url
                : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
            }
            className='absolute left-0 top-0 h-full w-full object-scale-down'
          />
        </button>
      </div>
      <div className='col-span-5 flex h-[80%] flex-col justify-between'>
        <div className='ml-8'>
          <button
            className=' lg:py-2 lg:text-xl xl:text-2xl flex items-center justify-start truncate py-1.5 text-lg font-medium'
            onClick={handleClickItem(item)}
          >
            {item.name}
          </button>
          {tag !== 0 && (
            <div className='relative '>
              <span className=' text-darkText lg:h-6 lg:w-20 lg:text-sm flex h-4 w-16 items-center justify-center bg-red-600 text-center  text-xs'>
                {tag == 1 && t('wishlist.top seller')}
                {tag == 2 && t('wishlist.signature')}
                {tag == 3 && t('wishlist.favourite')}
              </span>
              <div className='lg:left-20 lg:border-[12px] absolute left-16 top-0 h-0 w-0 border-[8px] border-y-red-600 border-l-red-600 border-r-transparent' />
            </div>
          )}
        </div>
        <div className='lg:space-x-4 ml-8 flex items-center space-x-2'>
          <button
            className='lg:px-4 lg:text-base flex items-center justify-start truncate rounded-lg border border-black/40 px-1 py-1 text-xs capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
            onClick={handleChooseFilter('category', item.category)}
          >
            {item.category}
          </button>

          <button
            className='lg:px-4 lg:text-base flex items-center justify-start truncate rounded-lg border border-black/40 px-1 py-1 text-xs capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
            onClick={handleChooseFilter('collection', item.collection)}
          >
            {item.collection}
          </button>

          <button
            className='lg:px-4 lg:text-base flex items-center justify-start truncate rounded-lg border border-black/40 px-1 py-1 text-xs capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
            onClick={handleChooseFilter('type', item.type)}
          >
            {item.type}
          </button>
        </div>
      </div>
      <div className='relative col-span-3  h-[75%] '>
        <div className='lg:py-2 relative grid w-full grid-cols-2 items-center rounded-md bg-white py-1 dark:bg-black '>
          <span className='text-darkText lg:text-base dark:text-lightText col-span-1 flex items-center justify-center text-xs font-medium'>
            ${formatCurrency(item.price)}
          </span>
          <div className='absolute left-1/2 h-full border-l border-black/30 dark:border-white/30'></div>
          <button
            className='col-span-1 flex items-center justify-center bg-none text-brownColor/80 hover:text-brownColor dark:text-haretaColor dark:hover:text-haretaColor/80'
            onClick={addToCart(item.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} className='lg:w-6 h-auto w-4' onClick={addToCart(item.id)} />
          </button>
        </div>
        <button
          className='hover:text-darkText dark:hover:text-lightText absolute bottom-0 right-0 bg-none'
          onClick={openUnlikeItemDialog(item.group.id)}
        >
          <p className='text-darkText/80 hover:text-darkText lg:text-sm dark:text-lightText/80 dark:hover:text-lightText text-xs hover:underline'>
            {t('wishlist.remove')}
          </p>
        </button>
      </div>
    </div>
  )
}
