import {
  faCartPlus,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext } from 'react'
import { ProductImageWithIndex } from '../../ProductDetail'
import { Product } from 'src/types/product.type'
import itemTag from 'src/constants/itemTag'
import { formatCurrency } from 'src/utils/utils'
import classNames from 'classnames'
import useClickOutside from 'src/hooks/useClickOutside'
import AddTocartPopover from '../../AddTocartPopover'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  product: Product
  activeImage: ProductImageWithIndex | undefined
  imagesWithIndex: ProductImageWithIndex[]
  currentIndexImages: number[]
  currentImageList: ProductImageWithIndex[]
  isLikedByUser: boolean
  nextImageList: () => void
  previousImageList: () => void
  handleChoosingImage: (image: ProductImageWithIndex) => () => void
  handleCollectionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleTypeClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  buyCount: number
  handleBuyCount: (value: number) => void
  addToCart: () => void
  toggleLikeItem: () => void
}

export default function ProductDetailMobile(props: Props) {
  const {
    activeImage,
    product,
    imagesWithIndex,
    currentIndexImages,
    currentImageList,
    isLikedByUser,
    nextImageList,
    previousImageList,
    handleChoosingImage,
    handleCollectionClick,
    handleTypeClick,
    buyCount,
    handleBuyCount,
    addToCart,
    toggleLikeItem
  } = props

  const { isAuthenticated } = useContext(AppContext)

  //? ADD TO CART
  const { ref, visible, setVisible } = useClickOutside(false)
  const openAddToCart = () => {
    setVisible(true)
  }

  return (
    <Fragment>
      <div className={classNames('bg-lightBg dark:bg-darkBg', { 'opacity-50': visible })}>
        <div className=' rounded-lg bg-[#f8f8f8] px-3 py-2 dark:bg-[#202020]'>
          <div className='relative w-full overflow-hidden bg-[#dfdfdf] pt-[100%] dark:bg-[#101010]'>
            {activeImage?.image ? (
              <img
                src={activeImage.image.url}
                alt={product.name}
                className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
              />
            ) : (
              <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                <FontAwesomeIcon icon={faTriangleExclamation} fontSize={120} />
              </div>
            )}
          </div>
          <div className='relative mt-3 flex select-none justify-center space-x-2'>
            {imagesWithIndex.length > 5 && currentIndexImages[0] !== 0 && (
              <button
                className='absolute left-0 top-1/2 z-[5] h-8 w-4 -translate-y-1/2 bg-black/20 text-textLight'
                onClick={previousImageList}
              >
                <FontAwesomeIcon icon={faChevronLeft} className='h-6' />
              </button>
            )}
            {currentImageList.map((image, index) => {
              const isActive = image === activeImage
              return (
                <button onClick={handleChoosingImage(image)} className='relative w-[20%] pt-[20%]' key={index}>
                  <img
                    src={image.image ? image.image.url : ''}
                    alt={product.name}
                    className='absolute left-0 top-0 h-full w-full object-scale-down'
                  />
                  {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />}
                </button>
              )
            })}
            {imagesWithIndex.length > 5 && currentIndexImages[1] !== imagesWithIndex.length && (
              <button
                className='absolute right-0 top-1/2 z-[5] h-8 w-4 -translate-y-1/2 bg-black/20 text-textLight'
                onClick={nextImageList}
              >
                <FontAwesomeIcon icon={faChevronRight} className='h-6' />
              </button>
            )}
          </div>
          <div className='relative flex flex-col bg-[#f8f8f8] py-3 text-textDark dark:bg-[#202020] dark:text-textLight'>
            <span className='text-2xl text-haretaColor'>${formatCurrency(product.price)}</span>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-2xl'>{product.name}</p>
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

            {product.tag !== 0 && (
              <div className='relative mt-2'>
                <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                  {itemTag[product.tag]}
                </span>
                <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
              </div>
            )}

            <div className='mt-4 flex items-center space-x-8 text-base sm:text-lg'>
              <button
                className='capitalize text-textDark/60 hover:text-brownColor dark:text-textLight/60 dark:hover:text-haretaColor'
                onClick={handleCollectionClick}
              >
                {product.collection}
              </button>
              <button
                className='capitalize text-textDark/60 hover:text-brownColor dark:text-textLight/60 dark:hover:text-haretaColor'
                onClick={handleTypeClick}
              >
                {product.type}
              </button>
            </div>

            <div className='mt-4 h-full text-sm lg:text-lg'>
              <p className=''>{product.description}</p>
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
          item={product}
          elementRef={ref}
          buyCount={buyCount}
          handleBuyCount={handleBuyCount}
          visible={visible}
          setVisble={setVisible}
          handleAddToCart={addToCart}
        />
      )}
    </Fragment>
  )
}
