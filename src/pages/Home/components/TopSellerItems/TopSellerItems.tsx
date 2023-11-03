import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Product from 'src/pages/ProductList/Product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import Carousel from 'react-multi-carousel'
import classNames from 'classnames'

const LIMIT = 4
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

export default function TopSellerItems() {
  //? GET TOP SELLER ITEMS
  const itemsConfig: QueryConfig = { tag: '1', limit: String(LIMIT) }
  const { data: itemsData } = useQuery({
    queryKey: ['top_seller_items', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const topsellerItems = itemsData?.data.data || []
  const length = topsellerItems.length

  return (
    <div className='bg-[#dfdfdf] text-textDark duration-500 dark:bg-[#202020] dark:text-textLight'>
      <div className='container'>
        <div className='py-4 md:py-8 lg:py-10 xl:py-12'>
          <div className='flex items-center justify-between'>
            <p className='w-full py-2 text-left text-2xl font-bold uppercase lg:text-4xl xl:text-5xl '>Top seller</p>
            {topsellerItems.length >= 3 && (
              <button className='flex items-center gap-2 rounded-md border border-black/60 px-2 py-1 text-xs hover:border-transparent hover:bg-haretaColor hover:font-medium hover:text-textDark dark:border-white/60 dark:hover:border-transparent md:gap-3 md:text-base xl:text-lg'>
                <p className='uppercase'>explore</p>
                <FontAwesomeIcon icon={faAnglesRight} />
              </button>
            )}
          </div>

          {/* <div className='py-4 md:py-8 lg:py-10 xl:py-12'>
            <div className='grid grid-cols-4 gap-4 md:grid-cols-5'>
              {displayItems.map((item) => (
                <div className='col-span-1' key={item.id}>
                  <Product product={item} />
                </div>
              ))}
              {displayItems.length < 3 && (
                <div className='col-span-1 flex items-center justify-center'>
                  <div className='relative w-[80%] rounded-full border pt-[80%] hover:border-transparent hover:bg-haretaColor hover:font-semibold hover:text-textDark '>
                    <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-2 py-1 text-xs duration-500 sm:text-sm lg:text-base  xl:text-lg'>
                      <p className='text-center uppercase'>explore more</p>
                      <FontAwesomeIcon icon={faAnglesRight} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> */}

          <div className='p-2 md:p-4 lg:p-8 xl:p-12'>
            {/* {topsellerItems.length == 1 && (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3 '>
                <div className='col-span-1'></div>
                {topsellerItems.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
            {topsellerItems.length == 2 && (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-12 xl:gap-24 '>
                {topsellerItems.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
            {topsellerItems.length == 3 && (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3 '>
                {topsellerItems.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )} */}
            {length <= 3 && (
              <div
                className={classNames('grid grid-cols-1 gap-4', {
                  'md:grid-cols-3': length == 1 || length == 3,
                  'md:grid-cols-2 lg:gap-12 xl:gap-24': length == 2
                })}
              >
                {length == 1 && <div className='col-span-1'></div>}
                {topsellerItems.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}

            {topsellerItems.length > 3 && (
              <Carousel
                // showDots
                arrows={false}
                responsive={responsive}
                autoPlaySpeed={5000}
                infinite={true}
                autoPlay={true}
                transitionDuration={500}
                centerMode
              >
                {topsellerItems.map((product) => (
                  <div className='' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
