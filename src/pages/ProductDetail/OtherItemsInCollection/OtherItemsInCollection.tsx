import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import Product from 'src/pages/ProductList/Product'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import ProductSekeleton from 'src/pages/ProductList/ProductSkeleton'

interface Props {
  collectionName: string
}

export default function OtherItemsInCollection({ collectionName }: Props) {
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
      items: 1
    }
  }
  const queryConfig = useQueryConfig()
  const inCollectionQueryConfig: QueryConfig = { collection: collectionName, page: '1', limit: '12' }
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products_in_collection', inCollectionQueryConfig],
    queryFn: () => {
      return productApi.getProductList(inCollectionQueryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(collectionName)
  })
  const productsInCollection = productsData?.data.data

  const navigate = useNavigate()
  const handleClick = () => {
    navigate({
      pathname: path.store,
      search: createSearchParams({
        collection: collectionName
      }).toString()
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ArrowFix = (arrowProps: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { carouselState, rtl, children, ...restArrowProps } = arrowProps
    return <span {...restArrowProps}>{children}</span>
  }

  if (!productsInCollection) return null
  return (
    <div className='rounded-lg border border-black/20 bg-[#e8e8e8] p-4 text-textDark dark:border-white/20 dark:bg-[#222] dark:text-textLight'>
      <button
        onClick={handleClick}
        className='text-lg font-medium uppercase hover:text-brownColor dark:hover:text-haretaColor lg:text-2xl'
      >
        {collectionName}
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
                  className='text-primary-400 absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full bg-white/40 p-4 text-textDark/40 hover:bg-white hover:text-textDark/60 dark:bg-black/40 dark:text-textLight/40 dark:hover:bg-black dark:hover:text-textLight/80'
                />
              </ArrowFix>
            }
            customRightArrow={
              <ArrowFix>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-primary-400 absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full bg-white/40 p-4 text-textDark/40 hover:bg-white hover:text-textDark/60 dark:bg-black/40 dark:text-textLight/40 dark:hover:bg-black dark:hover:text-textLight/80'
                />
              </ArrowFix>
            }
          >
            {productsInCollection.map((product) => (
              <div className='mx-4' key={product.id}>
                <Product product={product} queryConfig={queryConfig} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  )
}
