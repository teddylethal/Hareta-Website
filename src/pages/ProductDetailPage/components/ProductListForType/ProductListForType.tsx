import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ProductListQueryConfig } from 'src/hooks/useProductListQueryConfig'
import ProductCard from 'src/components/ProductCard'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import ProductSekeleton from 'src/components/ProductSkeleton'

interface Props {
  type: string
}

export default function ProductListForType({ type }: Props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  }
  const inTypeQueryConfig: ProductListQueryConfig = { type: type, page: '1', limit: '12' }
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products_in_type', inTypeQueryConfig],
    queryFn: () => {
      return productApi.getProductList(inTypeQueryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(type)
  })
  const itemsInType = productsData?.data.data

  const navigate = useNavigate()
  const handleClick = () => {
    navigate({
      pathname: path.store,
      search: createSearchParams({
        type: type
      }).toString()
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ArrowFix = (arrowProps: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { carouselState, rtl, children, ...restArrowProps } = arrowProps
    return <span {...restArrowProps}>{children}</span>
  }

  if (!itemsInType) return null
  return (
    <div className='rounded-lg border border-black/40 px-2 py-4 text-darkText dark:border-white/40 dark:text-lightText desktop:px-4 desktopLarge:px-6'>
      <button
        onClick={handleClick}
        className='mx-2 text-lg font-bold uppercase hover:text-primaryColor dark:hover:text-primaryColor desktop:mx-4 desktop:text-2xl desktopLarge:mx-6'
      >
        {type}
      </button>
      {isLoading && (
        <div className='mt-4 grid grid-cols-4'>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='col-span-1'>
                <ProductSekeleton />
              </div>
            ))}
        </div>
      )}
      {!isLoading && (
        <div className='mt-4'>
          <Carousel
            responsive={responsive}
            autoPlaySpeed={3000}
            rewind={true}
            rewindWithAnimation
            autoPlay={true}
            transitionDuration={500}
            customLeftArrow={
              <ArrowFix>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className='text-primary-400 absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/40 p-3 text-darkText/60 hover:bg-white hover:text-darkText/80 dark:bg-black/40 dark:text-lightText/60 dark:hover:bg-black dark:hover:text-lightText/80 desktop:h-5 desktop:w-5 desktopLarge:h-6 desktopLarge:w-6 desktopLarge:p-4'
                />
              </ArrowFix>
            }
            customRightArrow={
              <ArrowFix>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-primary-400 absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/40 p-3 text-darkText/60 hover:bg-white hover:text-darkText/80 dark:bg-black/40 dark:text-lightText/60 dark:hover:bg-black dark:hover:text-lightText/80 desktop:h-5 desktop:w-5 desktopLarge:h-6 desktopLarge:w-6 desktopLarge:p-4'
                />
              </ArrowFix>
            }
          >
            {itemsInType.map((product) => (
              <div className='mx-2 desktop:mx-4 desktopLarge:mx-6' key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  )
}