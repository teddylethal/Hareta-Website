import { faCartPlus, faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { StoreContext } from 'src/contexts/store.context'
import { setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import path from 'src/constants/path'
import { ProductImage } from 'src/types/productImage.type'
import producImageApi from 'src/apis/productImage.api'
import { formatCurrency, getIdFromNameId } from 'src/utils/utils'
import useQueryConfig from 'src/hooks/useQueryConfig'
import QuantityController from 'src/components/QuantityController'
import OtherItemsInCollection from './OtherItemsInCollection'
import purchaseApi from 'src/apis/cart.api'
import { toast } from 'react-toastify'
import { useViewport } from 'src/hooks/useViewport'
import useClickOutside from 'src/hooks/useClickOutside'
import AddTocartPopover from './AddTocartPopover'
import classNames from 'classnames'

interface ProductImageWithIndex extends ProductImage {
  index: number
}

export default function ProductDetail() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const { setCollection, setType } = useContext(StoreContext)
  const [activeImage, setActiveImage] = useState<ProductImageWithIndex>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [buyCount, setBuyCount] = useState(1)
  const { ref, visible, setVisible } = useClickOutside(false)

  const imageRef = useRef<HTMLImageElement>(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const queryConfig = useQueryConfig()
  const { nameId } = useParams()

  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['item', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const { data: productImages } = useQuery({
    queryKey: ['product_images', id],
    queryFn: () => producImageApi.getImageList(id as string),
    keepPreviousData: true
  })

  const product = productDetailData?.data.data
  const imagesData = productImages?.data.data

  const imagesWithIndex = useMemo(
    () =>
      imagesData
        ? imagesData.map((image, index) => {
            return { ...image, index: index }
          })
        : [],
    [imagesData]
  )

  const currentImageList = useMemo(
    () => (imagesWithIndex ? imagesWithIndex.slice(...currentIndexImages) : []),
    [currentIndexImages, imagesWithIndex]
  )

  useEffect(() => {
    setActiveImage(imagesWithIndex[0])
    setActiveImageIndex(0)
    setCurrentIndexImages([0, 5])
  }, [imagesWithIndex])

  const nextImageList = () => {
    setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    if (currentIndexImages[0] === activeImageIndex) {
      setActiveImage(imagesWithIndex[activeImageIndex + 1])
      setActiveImageIndex((prev) => prev + 1)
    }
  }

  const previousImageList = () => {
    setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    if (currentIndexImages[1] - 1 === activeImageIndex) {
      setActiveImage(imagesWithIndex[activeImageIndex - 1])
      setActiveImageIndex((prev) => prev - 1)
    }
  }

  const handleChosingImage = (image: ProductImageWithIndex) => () => {
    setActiveImage(image)
    setActiveImageIndex(image.index)
  }

  const handleCollectionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedCollection = String((e.target as HTMLInputElement).innerText)

    setCollection(selectedCollection)
    setCollectionFilteringToLS(selectedCollection)
    setType('All')
    setTypeFilteringToLS('All')

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    navigate({
      pathname: path.store,
      search: createSearchParams({
        ...queryConfig,
        collection: selectedCollection
      }).toString()
    })
  }

  const handleTypeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedType = String((e.target as HTMLInputElement).innerText)

    setType(selectedType)
    setTypeFilteringToLS(selectedType)
    setCollection('All')
    setCollectionFilteringToLS('All')

    navigate({
      pathname: path.store,
      search: createSearchParams({
        ...queryConfig,
        type: selectedType
      }).toString()
    })
  }

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

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = () => {
    addToCartMutation.mutate(
      { item_id: product?.id as string, quantity: buyCount },
      {
        onSuccess: () => {
          setBuyCount(1)
          toast.success('Item was added', {
            autoClose: 1000
          })
          queryClient.invalidateQueries({ queryKey: ['items_in_cart'] })
        }
      }
    )
  }

  // ? MOBILE
  const openAddToCart = () => {
    setVisible(true)
  }

  if (!product) return null
  return (
    <div className='bg-lightBg py-2 dark:bg-darkBg xl:py-6'>
      {!isMobile && (
        <div className='container'>
          <div className='bg-[#dfdfdf] p-4 shadow dark:bg-[#202020]'>
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-5'>
                <div className='bg-[#efefef] p-2 dark:bg-[#101010]'>
                  <div
                    className='relative w-full cursor-zoom-in overflow-hidden bg-[#dfdfdf] pt-[100%] dark:bg-[#202020]'
                    onMouseMove={handleZoom}
                    onMouseLeave={handleRemoveZoom}
                  >
                    <img
                      src={activeImage?.image ? activeImage.image.url : ''}
                      alt={product.name}
                      className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                      ref={imageRef}
                    />
                  </div>
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
                        <button onClick={handleChosingImage(image)} className='relative w-[20%] pt-[20%]' key={index}>
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

                  {/* <div className='col-span-1 flex h-0 min-h-full flex-col space-y-2 overflow-y-auto bg-[#dfdfdf] p-2 dark:bg-[#202020]'>
                  {colorArray.map((color, index) => {
                    const isActive = color === currentColor
                    const handleClick = () => {
                      setCurrentColor(color)
                    }
                    return (
                      <div className='relative w-full pt-[100%]' key={index}>
                        <button
                          onClick={handleClick}
                          className={classNames('absolute left-0 top-0 h-full w-full object-cover')}
                          style={{
                            backgroundColor: color === 'default' ? undefined : color
                          }}
                        />
                        {isActive && <div className='absolute -inset-1 border-2 border-haretaColor' />}
                      </div>
                    )
                  })}
                </div> */}
                </div>
              </div>

              <div className='relative col-span-7 flex min-h-full flex-col bg-[#efefef] p-6 text-textDark dark:bg-[#101010] dark:text-textLight'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-4xl'>{product.name}</p>
                  </div>
                  <button>
                    <FontAwesomeIcon className='h-8' icon={faHeart} />
                  </button>
                </div>
                <div className='relative mt-2'>
                  <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                    Favourite
                  </span>
                  <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
                </div>

                <div className='mt-4 flex items-center space-x-8 text-lg'>
                  <button
                    className='capitalize text-textDark/60 hover:text-haretaColor dark:text-textLight/60 dark:hover:text-haretaColor'
                    onClick={handleCollectionClick}
                  >
                    {product.collection}
                  </button>
                  <button
                    className='capitalize text-textDark/60 hover:text-haretaColor dark:text-textLight/60 dark:hover:text-haretaColor'
                    onClick={handleTypeClick}
                  >
                    {product.type}
                  </button>
                </div>
                <div className='mt-4'>
                  <span className='text-xl text-haretaColor'>${formatCurrency(product.price)}</span>
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
                      className='flex items-center space-x-2 rounded-sm bg-vintageColor px-4 py-1 text-lg hover:bg-haretaColor hover:text-textDark'
                      onClick={addToCart}
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                      <p>Add to cart</p>
                    </button>
                    <button className='rounded-sm bg-vintageColor px-4 py-1 text-lg hover:bg-haretaColor hover:text-textDark'>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OtherItemsInCollection collectionName={product.collection} />
        </div>
      )}

      {isMobile && (
        <>
          <div className={classNames('bg-lightBg dark:bg-darkBg', { 'opacity-50': visible })}>
            <div className=' bg-[#efefef] p-2 dark:bg-[#202020]'>
              <div className='relative w-full cursor-zoom-in overflow-hidden bg-[#dfdfdf] pt-[100%] dark:bg-[#101010]'>
                <img
                  src={activeImage?.image ? activeImage.image.url : ''}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                />
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
                    <button onClick={handleChosingImage(image)} className='relative w-[20%] pt-[20%]' key={index}>
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
            </div>

            <div className='relative flex flex-col bg-[#efefef] px-4 py-3 text-textDark dark:bg-[#202020] dark:text-textLight'>
              <span className='text-2xl text-haretaColor'>${formatCurrency(product.price)}</span>
              <div className='mt-4 flex items-center justify-between'>
                <p className='text-2xl'>{product.name}</p>
                <button>
                  <FontAwesomeIcon className='h-6' icon={faHeart} />
                </button>
              </div>
              <div className='relative mt-2'>
                <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                  Favourite
                </span>
                <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
              </div>

              <div className='mt-4 h-full text-sm lg:text-lg'>
                <p className=''>{product.description}</p>
              </div>
            </div>
            <div className='fixed bottom-0 z-10 grid w-full grid-cols-2 bg-white text-base text-textDark dark:bg-black dark:text-textLight'>
              <button className='col-span-1 flex items-center justify-center py-3 text-center' onClick={openAddToCart}>
                <FontAwesomeIcon icon={faCartPlus} className='h-5' />
              </button>
              <button className='col-span-1 rounded-sm bg-vintageColor  hover:bg-haretaColor hover:text-textDark'>
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
        </>
      )}
    </div>
  )
}
