import { faAnglesRight, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Product from 'src/pages/ProductList/Product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import Carousel from 'react-multi-carousel'
import classNames from 'classnames'
import { DotProps } from 'react-multi-carousel/lib/types'
import TopSellerItem from '../TopSellerItem'
import { toArray } from 'lodash'
import { useState } from 'react'

const LIMIT = 10
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    partialVisibilityGutter: 40
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 0
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

export default function TopSellerCarousel() {
  const [currentItem, setCurrentItem] = useState<number>(0)

  //? GET TOP SELLER ITEMS
  const itemsConfig: QueryConfig = { tag: '1', limit: String(LIMIT) }
  const { data: itemsData } = useQuery({
    queryKey: ['top_seller_items', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const displayedItems = itemsData?.data.data || []
  const length = displayedItems.length

  //? CUSTOM DOTS
  const dots = displayedItems.map((item) => <div className='' key={item.id}></div>)
  const CustomDot = ({ index, onClick, active }: DotProps) => {
    return (
      <button
        onClick={(e) => {
          onClick && onClick()
          e.preventDefault()
        }}
        className='py-2'
      >
        <div
          className={classNames('mx-0.5 h-1 w-8 rounded-md duration-500', {
            ' bg-haretaColor': active,
            ' bg-white dark:bg-black': !active
          })}
        >
          {toArray(dots)[index as number]}
        </div>
      </button>
    )
  }

  return (
    <div className='bg-[#dfdfdf] text-textDark duration-500 dark:bg-[#202020] dark:text-textLight'>
      <div className='container'>
        <div className='py-4 md:py-8 lg:py-10 xl:py-12'>
          <div className='flex items-center justify-between'>
            <p className='w-full py-2 text-left text-2xl font-bold uppercase lg:text-4xl xl:text-5xl '>Top seller</p>
            {displayedItems.length >= 3 && (
              <button className='flex items-center gap-2 rounded-md border border-black/60 px-2 py-1 text-xs hover:border-transparent hover:bg-haretaColor hover:font-medium hover:text-textDark dark:border-white/60 dark:hover:border-transparent md:gap-3 md:text-base xl:text-lg'>
                <p className='uppercase'>explore</p>
                <FontAwesomeIcon icon={faAnglesRight} />
              </button>
            )}
          </div>

          <div className='p-2 md:p-4 lg:p-8 xl:p-12'>
            {length <= 3 && (
              <div
                className={classNames('grid grid-cols-1 gap-4', {
                  'md:grid-cols-3': length == 1 || length == 3,
                  'md:grid-cols-2 lg:gap-12 xl:gap-24': length == 2
                })}
              >
                {length == 1 && <div className='col-span-1'></div>}
                {displayedItems.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}

            {displayedItems.length > 3 && (
              <div className='relative pb-8 duration-500'>
                <Carousel
                  className='cursor-grab'
                  showDots
                  renderDotsOutside
                  arrows={false}
                  autoPlay
                  autoPlaySpeed={5000}
                  responsive={responsive}
                  transitionDuration={500}
                  slidesToSlide={1}
                  partialVisible
                  infinite
                  customDot={<CustomDot />}
                  pauseOnHover
                >
                  {displayedItems.map((item) => (
                    <div key={item.id}>
                      <TopSellerItem item={item} currentItem={currentItem} />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
