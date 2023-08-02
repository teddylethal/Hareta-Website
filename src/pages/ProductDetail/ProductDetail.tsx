import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { StoreContext } from 'src/contexts/store.context'
import { setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import { QueryConfig } from '../ProductList/ProductList'
import path from 'src/constants/path'
import ColorBar from './ColorBar'
import { ImageListConfig, ProductImage } from 'src/types/productImage.type'
import producImageApi from 'src/apis/productImage.api'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
}

export default function ProductDetail({ queryConfig }: Props) {
  const { setCollection, setType } = useContext(StoreContext)
  const [currentColor, setCurrentColor] = useState<string>('default')
  const [currentImage, setCurrentImage] = useState<ProductImage>()

  const navigate = useNavigate()

  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['item', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data

  const imageListConfig: ImageListConfig = {
    id: product?.id as string,
    page: 1,
    limit: 100
  }
  const { data: imageListRespone } = useQuery({
    queryKey: ['image_list', imageListConfig],
    queryFn: () => producImageApi.getImageList(imageListConfig)
  })

  const imageArray = imageListRespone?.data.data
  const colorArray: string[] = []
  imageArray &&
    imageArray.forEach((image) => {
      if (!colorArray.includes(image.color)) {
        colorArray.push(image.color)
      }
    })
  let imagesForColor: ProductImage[] = []
  if (imageArray) {
    imagesForColor = imageArray.filter((image) => {
      return image.color === currentColor
    })
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

  if (!product) return null
  return (
    <div className='bg-lightBg py-6 dark:bg-darkBg'>
      <div className='bg-[#cfcfcf] p-4 shadow dark:bg-[#303030]'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-6'>
              <div className='grid grid-cols-6 gap-3'>
                <div className='col-span-5 bg-[#dfdfdf] p-2 dark:bg-[#202020]'>
                  <div className='relative w-full pt-[100%] shadow'>
                    <img
                      src={currentImage ? currentImage.image.url : product.avatar.url}
                      alt={product.name}
                      className='absolute left-0 top-0 h-full w-full object-scale-down'
                    />
                  </div>
                  <div className='relative mt-3 flex justify-center space-x-2'>
                    <button className='absolute left-0 top-1/2 z-10 w-8 -translate-y-1/2 bg-black/20 text-textLight'>
                      <FontAwesomeIcon icon={faChevronLeft} className='h-8' />
                    </button>
                    {imagesForColor.map((image, index) => {
                      const isActive = image === currentImage
                      return (
                        <button onClick={() => setCurrentImage(image)} className='relative w-20 pt-20' key={index}>
                          <img
                            src={image.image.url}
                            alt={product.name}
                            className='absolute left-0 top-0 h-full w-full object-scale-down'
                          />
                          {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />}
                        </button>
                      )
                    })}
                    <button className='absolute right-0 top-1/2 z-10 w-8 -translate-y-1/2 bg-black/20 text-textLight'>
                      <FontAwesomeIcon icon={faChevronRight} className='h-8' />
                    </button>
                  </div>
                </div>

                <div className='col-span-1 flex flex-col space-y-2 bg-[#dfdfdf] p-2 dark:bg-[#202020]'>
                  {colorArray.map((color, index) => {
                    const isActive = color === currentColor
                    const handleClick = () => {
                      setCurrentColor(color)
                      if (imageArray) {
                        imagesForColor = imageArray.filter((image) => {
                          return image.color === color
                        })
                        setCurrentImage(imagesForColor[0])
                      }
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
                        {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />}
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
