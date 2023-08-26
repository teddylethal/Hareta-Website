import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import itemTag from 'src/constants/itemTag'
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
  return (
    <div className='grid grid-cols-12 items-center py-6 text-center text-textDark dark:text-textLight '>
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
      <div className='col-span-5 flex h-[75%] flex-col justify-between'>
        <div className='ml-8 space-y-2'>
          <button
            className=' flex items-center justify-start truncate py-2 text-lg font-medium lg:text-xl xl:text-2xl'
            onClick={handleClickItem(item)}
          >
            {item.name}
          </button>
          {item.tag !== 0 && (
            <div className='relative '>
              <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                {itemTag[item.tag]}
              </span>
              <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
            </div>
          )}
        </div>
        <div className='ml-8 flex items-center space-x-4'>
          <button
            className='flex items-center justify-center truncate rounded-lg border border-black/40 px-4 py-1 capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
            onClick={handleChooseFilter('category', item.category)}
          >
            {item.category}
          </button>

          <button
            className='flex items-center justify-center truncate rounded-lg border border-black/40 px-4 py-1 capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
            onClick={handleChooseFilter('collection', item.collection)}
          >
            {item.collection}
          </button>

          <button
            className='flex items-center justify-center truncate rounded-lg border border-black/40 px-4 py-1 capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
            onClick={handleChooseFilter('type', item.type)}
          >
            {item.type}
          </button>
        </div>
      </div>
      <div className='relative col-span-3  h-[75%] '>
        <div className='relative grid w-full grid-cols-2 items-center rounded-md bg-white py-2 dark:bg-black '>
          <span className='col-span-1 flex items-center justify-center text-sm font-medium text-textDark dark:text-textLight lg:text-base'>
            ${formatCurrency(item.price)}
          </span>
          <div className='absolute left-1/2 h-full border-l border-black/30 dark:border-white/30'></div>
          <button
            className='col-span-1 flex items-center justify-center bg-none text-brownColor/80 hover:text-brownColor dark:text-haretaColor dark:hover:text-haretaColor/80'
            onClick={addToCart(item.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} fontSize={24} onClick={addToCart(item.id)} />
          </button>
        </div>
        <button
          className='absolute bottom-0 right-0 bg-none hover:text-textDark dark:hover:text-textLight'
          onClick={openUnlikeItemDialog(item.id)}
        >
          <p className='text-sm text-textDark/80 hover:text-textDark hover:underline dark:text-textLight/80 dark:hover:text-textLight lg:text-sm'>
            Remove
          </p>
        </button>
      </div>
    </div>
  )
}
