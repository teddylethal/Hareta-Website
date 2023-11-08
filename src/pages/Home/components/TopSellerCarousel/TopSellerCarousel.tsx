import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Product from 'src/pages/ProductList/Product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import Carousel from 'react-multi-carousel'
import classNames from 'classnames'
import { DotProps } from 'react-multi-carousel/lib/types'
import { toArray } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { StoreContext } from 'src/contexts/store.context'
import likeItemAPi from 'src/apis/userLikeItem.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

const LIMIT = 10

interface Props {
  setPageIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TopSellerCarousel({ setPageIsLoading }: Props) {
  const [disableClick, setDisableClick] = useState<boolean>(false)
  const { isAuthenticated } = useContext(AppContext)
  const { setWishlistIDs } = useContext(StoreContext)

  //? GET WISHLIST
  const {
    data: wishlistData,
    isInitialLoading,
    isLoading
  } = useQuery({
    queryKey: ['user_wish_list'],
    queryFn: () => {
      return likeItemAPi.getWishList()
    },
    enabled: isAuthenticated
  })

  useEffect(() => {
    const wishlist = wishlistData?.data.data
    if (wishlist) {
      setWishlistIDs(wishlist.map((item) => item.id))
    }
  }, [setWishlistIDs, wishlistData])

  //? SET LOADING PAGE
  useEffect(() => setPageIsLoading(isLoading), [isLoading, setPageIsLoading])

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

  //? HANDLE NAVIGATE
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate({
      pathname: path.store,
      search: createSearchParams({
        tag: '1'
      }).toString()
    })
  }

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
          className={classNames('mx-0.5 h-1 w-8 rounded-md  duration-500', {
            ' bg-haretaColor': active,
            ' bg-haretaColor/40': !active
          })}
        >
          {toArray(dots)[index as number]}
        </div>
      </button>
    )
  }

  //? Responsive for carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      partialVisibilityGutter: 0
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 0
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 0
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 0
    }
  }

  return (
    <div className='bg-[#f8f8f8] text-textDark duration-500 dark:bg-[#282828] dark:text-textLight'>
      <div className='container'>
        <div className='py-4 md:py-8 lg:py-10 xl:py-12'>
          <div className='flex items-center justify-between'>
            <p className='w-full select-none py-2 text-left text-2xl font-bold uppercase lg:text-4xl xl:text-5xl'>
              Top seller
            </p>
            {displayedItems.length >= 3 && (
              <button
                className='flex items-center gap-2 rounded-md border border-black/60 px-2 py-1 text-xs hover:border-transparent hover:bg-haretaColor hover:font-medium hover:text-textDark dark:border-white/60 dark:hover:border-transparent md:gap-3 md:text-base xl:text-lg'
                onClick={handleNavigate}
              >
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
              <div className='relative pb-8'>
                <Carousel
                  beforeChange={() => setDisableClick(true)}
                  afterChange={() => setDisableClick(false)}
                  className='cursor-grab overflow-hidden'
                  showDots
                  renderDotsOutside
                  autoPlay
                  draggable={false}
                  arrows={false}
                  autoPlaySpeed={5000}
                  responsive={responsive}
                  transitionDuration={500}
                  slidesToSlide={1}
                  partialVisible
                  infinite
                  pauseOnHover={false}
                  customDot={<CustomDot />}
                >
                  {displayedItems.map((item) => (
                    <div key={item.id} className='mx-4 select-none'>
                      <Product product={item} disableClick={disableClick} initialLoading={isInitialLoading} />
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
