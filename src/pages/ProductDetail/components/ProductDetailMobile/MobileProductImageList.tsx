import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import producImageApi from 'src/apis/productImage.api'
import { Product } from 'src/types/product.type'
import { ProductImageWithIndex } from '../../ProductDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

interface Props {
  itemID: string
  item: Product
}

export default function MobileProductImageList(props: Props) {
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

  return (
    <div className='relative'>
      <div className='relative w-full overflow-hidden bg-[#dfdfdf] pt-[75%] dark:bg-[#101010]'>
        {activeImage?.image ? (
          <img
            src={activeImage.image.url}
            alt={item.name}
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
                alt={item.name}
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
  )
}
