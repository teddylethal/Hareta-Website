import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import Product from 'src/pages/ProductList/Product'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import ProductSekeleton from 'src/pages/ProductList/ProductSkeleton'

interface Props {
  type: string
}

export default function OtherItemsInType({ type }: Props) {
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
  const inTypeQueryConfig: QueryConfig = { type: type, page: '1', limit: '12' }
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
    <div className='text-darkText lg:px-4 xl:px-6 dark:text-lightText rounded-lg border border-black/40 px-2 py-4 dark:border-white/40'>
      <button
        onClick={handleClick}
        className='lg:mx-4 lg:text-2xl xl:mx-6 mx-2 text-lg font-bold uppercase hover:text-primaryColor dark:hover:text-primaryColor'
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
                  className='text-primary-400 text-darkText/60 hover:text-darkText/80 lg:h-5 lg:w-5 xl:h-6 xl:w-6 xl:p-4 dark:text-lightText/60 dark:hover:text-lightText/80 absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/40 p-3 hover:bg-white dark:bg-black/40 dark:hover:bg-black'
                />
              </ArrowFix>
            }
            customRightArrow={
              <ArrowFix>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-primary-400 text-darkText/60 hover:text-darkText/80 lg:h-5 lg:w-5 xl:h-6 xl:w-6 xl:p-4 dark:text-lightText/60 dark:hover:text-lightText/80 absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/40 p-3 hover:bg-white dark:bg-black/40 dark:hover:bg-black'
                />
              </ArrowFix>
            }
          >
            {itemsInType.map((product) => (
              <div className='lg:mx-4 xl:mx-6 mx-2' key={product.id}>
                <Product product={product} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  )
}
