import { faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { StoreContext } from 'src/contexts/store.context'
import { setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import { QueryConfig } from '../ProductList/ProductList'
import path from 'src/constants/path'
import { ProductImage } from 'src/types/productImage.type'
import producImageApi from 'src/apis/productImage.api'
import classNames from 'classnames'
import { getIdFromNameId } from 'src/utils/utils'

interface Props {
  queryConfig: QueryConfig
}

interface ProductImageWithIndex extends ProductImage {
  index: number
}

export default function ProductDetail({ queryConfig }: Props) {
  const { setCollection, setType } = useContext(StoreContext)
  const [activeImage, setActiveImage] = useState<ProductImageWithIndex>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [currentColor, setCurrentColor] = useState<string>()

  const imageRef = useRef<HTMLImageElement>(null)
  const navigate = useNavigate()

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['item', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const { data: productImages } = useQuery({
    queryKey: ['product_images', id],
    queryFn: () => producImageApi.getImageList(id as string)
  })

  const product = productDetailData?.data.data
  const imagesData = productImages?.data.data

  const colorArray: string[] = useMemo(() => {
    const newColorArray: string[] = []
    imagesData &&
      imagesData.forEach((image) => {
        if (!newColorArray.includes(image.color)) {
          newColorArray.push(image.color)
        }
      })
    return newColorArray
  }, [imagesData])

  const imagesForCurrentColor: ProductImageWithIndex[] = useMemo(
    () =>
      (imagesData
        ? imagesData.filter((image) => {
            return image.color === currentColor
          })
        : []
      ).map((image, index) => {
        return { ...image, index: index }
      }),
    [currentColor, imagesData]
  )

  const currentImageList = useMemo(
    () => (imagesForCurrentColor ? imagesForCurrentColor.slice(...currentIndexImages) : []),
    [currentIndexImages, imagesForCurrentColor]
  )

  useEffect(() => {
    setActiveImage(imagesForCurrentColor[0])
    setActiveImageIndex(0)
    setCurrentIndexImages([0, 5])
  }, [imagesForCurrentColor])

  useEffect(() => {
    setCurrentColor(colorArray[0])
  }, [colorArray])

  const nextImageList = () => {
    setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    if (currentIndexImages[0] === activeImageIndex) {
      setActiveImage(imagesForCurrentColor[activeImageIndex + 1])
      setActiveImageIndex((prev) => prev + 1)
    }
  }

  const previousImageList = () => {
    setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    if (currentIndexImages[1] - 1 === activeImageIndex) {
      setActiveImage(imagesForCurrentColor[activeImageIndex - 1])
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

  if (!product) return null
  return (
    <div className='bg-lightBg py-6 dark:bg-darkBg'>
      <div className='container'>
        <div className='bg-[#cfcfcf] p-4 shadow dark:bg-[#303030]'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-6'>
              <div className='grid grid-cols-6 gap-3'>
                <div className='col-span-5 bg-[#dfdfdf] p-2 dark:bg-[#202020]'>
                  <div
                    className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                    onMouseMove={handleZoom}
                    onMouseLeave={handleRemoveZoom}
                  >
                    <img
                      src={activeImage ? activeImage.image.url : product.avatar.url}
                      alt={product.name}
                      className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                      ref={imageRef}
                    />
                  </div>
                  <div className='relative mt-3 flex select-none justify-center space-x-2'>
                    {imagesForCurrentColor.length > 5 && currentIndexImages[0] !== 0 && (
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
                            src={image.image.url}
                            alt={product.name}
                            className='absolute left-0 top-0 h-full w-full object-scale-down'
                          />
                          {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />}
                        </button>
                      )
                    })}
                    {imagesForCurrentColor.length > 5 && currentIndexImages[1] !== imagesForCurrentColor.length && (
                      <button
                        className='absolute right-0 top-1/2 z-10 w-8 -translate-y-1/2 bg-black/20 text-textLight'
                        onClick={nextImageList}
                      >
                        <FontAwesomeIcon icon={faChevronRight} className='h-8' />
                      </button>
                    )}
                  </div>
                </div>

                <div className='col-span-1 flex h-0 min-h-full flex-col space-y-2 overflow-y-auto bg-[#dfdfdf] p-2 dark:bg-[#202020]'>
                  {colorArray.map((color, index) => {
                    const isActive = color === currentColor
                    const handleClick = () => {
                      setCurrentColor(color)
                    }
                    // if (color == 'default')
                    //   return (
                    //     <div className='relative w-full pt-[100%]'>
                    //       <button
                    //         onClick={handleClick}
                    //         className={classNames('absolute left-0 top-0 h-full w-full object-cover')}
                    //       >
                    //         Default
                    //       </button>
                    //       {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />}
                    //     </div>
                    //   )

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
                </div>
              </div>
            </div>

            <div className='relative col-span-6 flex flex-col bg-[#dfdfdf] p-6 text-textDark dark:bg-[#202020] dark:text-textLight'>
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
                  className='text-textDark/60 hover:text-haretaColor dark:text-textLight/60 dark:hover:text-haretaColor'
                  onClick={handleCollectionClick}
                >
                  {product.collection}
                </button>
                <button
                  className='text-textDark/60 hover:text-haretaColor dark:text-textLight/60 dark:hover:text-haretaColor'
                  onClick={handleTypeClick}
                >
                  {product.type}
                </button>
              </div>
              <div className='mt-4'>
                <span className='text-xl text-haretaColor'>${product.price}</span>
              </div>
              <div className='mt-8'>
                <p className=''>{product.description}</p>
              </div>

              <div className='absolute bottom-6 space-x-4'>
                <button className='rounded-sm bg-vintageColor px-3 py-1 text-lg hover:bg-haretaColor hover:text-textDark'>
                  Add to cart
                </button>

                <button className='rounded-sm bg-vintageColor px-3 py-1 text-lg hover:bg-haretaColor hover:text-textDark'>
                  Buy item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
