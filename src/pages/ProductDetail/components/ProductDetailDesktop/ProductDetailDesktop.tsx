import {
  faCartPlus,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useRef } from 'react'
import QuantityController from 'src/components/QuantityController'
import { ProductImageWithIndex } from '../../ProductDetail'
import { Product } from 'src/types/product.type'
import itemTag from 'src/constants/itemTag'
import { formatCurrency } from 'src/utils/utils'
import { AppContext } from 'src/contexts/app.context'
import classNames from 'classnames'

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

export default function ProductDetailDesktop(props: Props) {
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

  //? HANDLE ZOOM
  const imageRef = useRef<HTMLImageElement>(null)
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  return (
    <div className='rounded-lg border border-black/20 bg-[#dfdfdf] p-4 shadow dark:border-white/20 dark:bg-[#202020]'>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-5'>
          <div className='rounded-md bg-[#f8f8f8] p-4 dark:bg-[#101010]'>
            {activeImage?.image ? (
              <div
                className='relative w-full cursor-zoom-in  overflow-hidden bg-[#dfdfdf] pt-[100%] dark:bg-[#202020]'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage.image.url}
                  alt={product.name}
                  className='pointer-events-none  absolute left-0 top-0 h-full w-full object-scale-down'
                  ref={imageRef}
                />
              </div>
            ) : (
              <div className='relative w-full overflow-hidden bg-[#dfdfdf] pt-[100%] dark:bg-[#202020]'>
                <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={120} />
                </div>
              </div>
            )}

            <div className='relative mt-3 flex select-none justify-center space-x-2'>
              {imagesWithIndex.length > 5 && currentIndexImages[0] !== 0 && (
                <button
                  className='absolute left-0 top-1/2 z-10 w-8 -translate-y-1/2 bg-black/20 text-textLight'
                  onClick={previousImageList}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className='h-8' />
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
                  className='absolute right-0 top-1/2 z-10 w-8 -translate-y-1/2 bg-black/20 text-textLight'
                  onClick={nextImageList}
                >
                  <FontAwesomeIcon icon={faChevronRight} className='h-8' />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='relative col-span-7 flex min-h-full flex-col rounded-md bg-[#f8f8f8] p-6 text-textDark dark:bg-[#101010] dark:text-textLight'>
          <div className='flex items-center justify-between'>
            <p className='text-4xl font-medium'>{product.name}</p>
            {isAuthenticated && (
              <button onClick={toggleLikeItem} className='text-black/50 dark:text-white/50'>
                <FontAwesomeIcon
                  className={classNames('h-8', {
                    'text-red-500': isLikedByUser
                  })}
                  icon={faHeart}
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

          <div className='mt-4 flex items-center space-x-8 text-lg'>
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
          <div className='mt-4'>
            <span className='text-xl font-medium text-brownColor dark:text-haretaColor'>
              ${formatCurrency(product.price)}
            </span>
          </div>
          <div className='mt-8 h-full text-base lg:text-lg'>
            <p className=''>{product.description}</p>
          </div>

          <div className='w-80'>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-textDark dark:text-textLight'>Quantity</p>
              <QuantityController
                classNameWrapper=''
                value={buyCount}
                max={product.quantity}
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onType={handleBuyCount}
              />
              {product.quantity <= 10 && <p>Only</p>}
              <p className='text-textDark dark:text-textLight'>{product.quantity} available</p>
            </div>

            <div className='mt-4 flex justify-between'>
              <button
                className='flex items-center space-x-2 rounded-md bg-vintageColor/90 px-6 py-2 text-lg hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60'
                onClick={addToCart}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <p>Add to cart</p>
              </button>
              <button className='flex items-center space-x-2 rounded-md bg-vintageColor/90 px-6 py-2 text-lg hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60'>
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
