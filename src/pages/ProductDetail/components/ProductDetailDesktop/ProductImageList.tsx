import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import producImageApi from 'src/apis/productImage.api'
import { Product } from 'src/types/product.type'
import { ProductImageWithIndex } from '../../ProductDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBan,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

interface Props {
  itemID: string
  item: Product
}

export default function ProductImageList(props: Props) {
  const { itemID, item } = props

  //? GET IMAGE LIST

  const { data: productImages } = useQuery({
    queryKey: ['item_images', itemID],
    queryFn: () => producImageApi.getImageList(itemID as string),
    keepPreviousData: true
  })

  //? HANDLE IMAGE LIST
  const [activeImage, setActiveImage] = useState<ProductImageWithIndex>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
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

  const handleChoosingImage = (image: ProductImageWithIndex) => () => {
    setActiveImage(image)
    setActiveImageIndex(image.index)
  }

  //? HANDLE ZOOM
  const [zooming, setZooming] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (zooming) {
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
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const turnOffZoom = () => {
    setZooming(false)
    imageRef.current?.removeAttribute('style')
  }

  const toggleZooming = () => {
    if (zooming) turnOffZoom()
    else setZooming(true)
  }

  return (
    <div className='relative'>
      {activeImage?.image ? (
        <div
          className={classNames(
            'relative w-full overflow-hidden rounded-xl border border-black/10 pt-[75%] dark:border-white/10',
            {
              'cursor-zoom-in': zooming
            }
          )}
          onMouseMove={handleZoom}
          onMouseLeave={handleRemoveZoom}
        >
          <img
            src={activeImage.image.url}
            alt={item.name}
            className='pointer-events-none  absolute left-0 top-0 h-full w-full object-scale-down'
            ref={imageRef}
          />
          <div className='absolute right-2 top-2 rounded-lg bg-black/40'>
            <button
              className='flex items-center justify-center p-2 text-textDark duration-500 dark:text-textLight '
              onClick={toggleZooming}
            >
              {!zooming && (
                <FontAwesomeIcon icon={faMagnifyingGlass} className='h-auto w-6 hover:text-haretaColor lg:w-7 xl:w-8' />
              )}
              {zooming && <FontAwesomeIcon icon={faBan} className='h-auto w-6 hover:text-red-600 lg:w-7 xl:w-8' />}
            </button>
          </div>
        </div>
      ) : (
        <div className='relative w-full overflow-hidden bg-[#dfdfdf] pt-[80%] dark:bg-[#202020]'>
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
            <FontAwesomeIcon icon={faTriangleExclamation} fontSize={120} />
          </div>
        </div>
      )}
      <div className='absolute bottom-0 left-1/2 flex w-[80%] -translate-x-1/2 select-none justify-center space-x-2 rounded-xl bg-black/20 p-4'>
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
                alt={item.name}
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
  )
}
