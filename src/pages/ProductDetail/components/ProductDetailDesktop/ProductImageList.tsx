import { useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import producImageApi from 'src/apis/productImage.api'
import { Product } from 'src/types/product.type'
import { ProductImageWithIndex } from '../../ProductDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBan,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassPlus,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { ColorRing } from 'react-loader-spinner'
import { Skeleton } from '@mui/material'

interface Props {
  itemID: string
  item: Product
}

export default function ProductImageList(props: Props) {
  const { itemID, item } = props

  //? GET IMAGE LIST

  const {
    data: productImages,
    isLoading,
    isFetching
  } = useQuery({
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
    <div className='relative w-full overflow-auto rounded-xl bg-[#dfdfdf] pt-[75%] dark:bg-[#202020]'>
      {(isLoading || isFetching) && (
        <div className='absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-lg bg-black/50'>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#ADD8E6', '#ADD8E6', '#ADD8E6', '#ADD8E6', '#ADD8E6']}
          />
        </div>
      )}
      {!isLoading &&
        !isFetching &&
        activeImage &&
        (activeImage.image ? (
          <div
            className={classNames('absolute left-0 top-0 h-full w-full', {
              'cursor-zoom-in': zooming
            })}
            onMouseMove={handleZoom}
            onMouseLeave={handleRemoveZoom}
          >
            <img
              src={activeImage.image.url}
              alt={item.name}
              className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
              ref={imageRef}
            />

            <div className='absolute right-2 top-2 rounded-lg bg-black/40'>
              <button
                className='flex items-center justify-center p-2 text-textDark duration-500 dark:text-textLight '
                onClick={toggleZooming}
              >
                {!zooming && (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassPlus}
                    className='h-auto w-6 hover:text-haretaColor lg:w-7 xl:w-8'
                  />
                )}
                {zooming && <FontAwesomeIcon icon={faBan} className='h-auto w-6 hover:text-red-600 lg:w-7 xl:w-8' />}
              </button>
            </div>
          </div>
        ) : (
          <div className='relative w-full overflow-hidden bg-[#dfdfdf] pt-[75%] dark:bg-[#202020]'>
            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
              <FontAwesomeIcon icon={faTriangleExclamation} fontSize={120} />
            </div>
          </div>
        ))}
      <div className='absolute bottom-0 left-1/2 flex w-[80%] -translate-x-1/2 select-none justify-center space-x-2 rounded-xl bg-black/40 p-4'>
        {(isFetching || isLoading) &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div className='relative w-[20%] overflow-hidden rounded-lg bg-white/10 pt-[20%]' key={index}>
                <Skeleton variant='rounded' className='absolute left-0 top-0' width={'100%'} height={'100%'} />
              </div>
            ))}
        {!isLoading && !isFetching && (
          <Fragment>
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
                <button
                  onClick={handleChoosingImage(image)}
                  className='rouded-lg relative w-[20%] overflow-hidden pt-[20%]'
                  key={index}
                >
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
          </Fragment>
        )}
      </div>
    </div>
  )
}
