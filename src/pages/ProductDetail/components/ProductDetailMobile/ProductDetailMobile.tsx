import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext, useState } from 'react'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import classNames from 'classnames'
import useClickOutside from 'src/hooks/useClickOutside'
import AddTocartPopover from '../../AddTocartPopover'
import { AppContext } from 'src/contexts/app.context'
import MobileProductImageList from './MobileProductImageList'
import ItemTag from 'src/constants/itemTag'

interface Props {
  defaultItem: Product
  itemsInGroup: Product[]
  isLikedByUser: boolean
  addToCart: (itemID: string, quantity: number) => void
  toggleLikeItem: () => void
}

export default function ProductDetailMobile(props: Props) {
  const { defaultItem, isLikedByUser, itemsInGroup, addToCart, toggleLikeItem } = props

  const { isAuthenticated } = useContext(AppContext)

  //? CHOOSE VARIANT
  const [activeItemID, setActiveItemID] = useState<string>(defaultItem.id)
  const handleChooseVariant = (id: string) => () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setActiveItemID(id)
  }

  //? ADD TO CART

  const { ref, visible, setVisible } = useClickOutside(false)
  const openAddToCart = () => {
    setVisible(true)
  }

  return (
    <Fragment>
      <div className={classNames('bg-lightBg dark:bg-darkBg')}>
        <div className=' rounded-lg bg-[#f8f8f8] px-3 py-2 dark:bg-[#202020]'>
          <MobileProductImageList item={defaultItem} itemID={activeItemID} />
          <div className='relative flex flex-col bg-[#f8f8f8] py-3 text-textDark dark:bg-[#202020] dark:text-textLight'>
            <span className='text-2xl text-haretaColor'>${formatCurrency(defaultItem.price)}</span>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-2xl'>{defaultItem.name}</p>
              {isAuthenticated && (
                <button className='text-white/50'>
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={toggleLikeItem}
                    className={classNames('h-6', {
                      'text-textDark/60 dark:text-textLight/60': !isLikedByUser,
                      'text-red-500': isLikedByUser
                    })}
                  />
                </button>
              )}
            </div>

            {defaultItem.tag !== 0 && (
              <div className='relative mt-2'>
                <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                  {ItemTag[defaultItem.tag]}
                </span>
                <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
              </div>
            )}

            <div className='mt-8 w-full rounded-lg border border-black/20 p-4 dark:border-white/20'>
              <div className='flex items-center justify-between'>
                <p className='text-base font-medium lg:text-lg xl:text-xl'>Variant</p>
                <p className='text-sm text-textDark/60 dark:text-textLight/60 lg:text-base '>
                  {itemsInGroup.length} variants
                </p>
              </div>
              <div className='max-h-64 w-full overflow-auto py-4'>
                <div className='grid w-full grid-cols-3 gap-4'>
                  {itemsInGroup.map((item, index) => {
                    const isActive = item.id === activeItemID
                    const avatarURL = item.avatar ? item.avatar.url : null
                    return (
                      <div
                        key={index}
                        className={classNames('col-span-1 rounded-xl', {
                          'border border-brownColor dark:border-haretaColor': isActive
                        })}
                      >
                        <button className='relative w-full pt-[100%]' onClick={handleChooseVariant(item.id)}>
                          <img
                            src={avatarURL || ''}
                            alt={`${defaultItem.name} ${item.color}`}
                            className='absolute left-0 top-0 h-full w-full object-scale-down'
                          />
                          {/* {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />} */}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className='mt-4 h-full text-sm lg:text-lg'>
              <p className=''>{defaultItem.description}</p>
            </div>
          </div>
        </div>

        <div className='fixed bottom-0 left-0 z-10 grid h-10 w-full grid-cols-2 bg-white text-base text-textDark dark:bg-black dark:text-textLight sm:h-12'>
          <button className='col-span-1 flex items-center justify-center text-center' onClick={openAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} className='h-5' />
          </button>
          <button className='col-span-1 rounded-sm bg-vintageColor/90  hover:bg-vintageColor hover:text-textDark dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60'>
            Buy
          </button>
        </div>
      </div>
      {visible && (
        <AddTocartPopover
          item={defaultItem}
          itemID={activeItemID}
          itemsInGroup={itemsInGroup}
          elementRef={ref}
          visible={visible}
          setVisble={setVisible}
          handleAddToCart={addToCart}
        />
      )}
    </Fragment>
  )
}
