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

export default function WishlistItemMobile({
  item,
  handleClickItem,
  handleChooseFilter,
  addToCart,
  openUnlikeItemDialog
}: Props) {
  return (
    <div className='py-2'>
      <div className='grid grid-cols-12 items-center text-center text-textDark dark:text-textLight '>
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
        <div className='col-span-8 '>
          <div className='ml-2 flex min-h-full flex-col justify-start'>
            <button
              className='flex items-center justify-start truncate px-2 py-1 text-base font-medium sm:text-lg'
              onClick={handleClickItem(item)}
            >
              {item.name}
            </button>
            <div>
              {item.tag !== 0 && (
                <div className='relative ml-2'>
                  <span className=' flex h-4 w-16 items-center justify-center bg-red-600 text-center text-xs text-textDark md:h-6 md:w-20  md:text-sm'>
                    {itemTag[item.tag]}
                  </span>
                  <div className='absolute left-16 top-0 h-0 w-0 border-[8px] border-y-red-600 border-l-red-600 border-r-transparent md:left-20 md:border-[12px]' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2 flex items-center justify-between  sm:space-x-3'>
        <button
          className='flex items-center justify-start  truncate rounded-lg border border-black/40 px-2 py-1 text-xs capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
          onClick={handleChooseFilter('category', item.category)}
        >
          {item.category}
        </button>

        <button
          className='flex items-center justify-start  truncate rounded-lg border border-black/40 px-2 py-1 text-xs capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
          onClick={handleChooseFilter('collection', item.collection)}
        >
          {item.collection}
        </button>

        <button
          className='flex items-center justify-start  truncate rounded-lg border border-black/40 px-2 py-1 text-xs capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
          onClick={handleChooseFilter('type', item.type)}
        >
          {item.type}
        </button>
      </div>
      <div className='relative mt-3 flex items-center space-x-8 '>
        <div className='relative grid w-full grid-cols-2 items-center rounded-md bg-white py-1.5 dark:bg-black sm:py-2 '>
          <span className='col-span-1 flex items-center justify-center text-xs font-medium text-textDark dark:text-textLight sm:text-sm'>
            ${formatCurrency(item.price)}
          </span>
          <div className='absolute left-1/2 h-full border-l border-black/30 dark:border-white/30'></div>
          <button
            className='col-span-1 flex items-center justify-center bg-none text-brownColor/80 hover:text-brownColor dark:text-haretaColor dark:hover:text-haretaColor/80'
            onClick={addToCart(item.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} className='h-4 w-auto sm:h-5' onClick={addToCart(item.id)} />
          </button>
        </div>
        <button
          className='bg-none hover:text-textDark dark:hover:text-textLight'
          onClick={openUnlikeItemDialog(item.id)}
        >
          <p className='text-xs text-textDark/80 hover:text-textDark hover:underline dark:text-textLight/80 dark:hover:text-textLight sm:text-sm lg:text-sm'>
            Remove
          </p>
        </button>
      </div>
    </div>
  )
}
