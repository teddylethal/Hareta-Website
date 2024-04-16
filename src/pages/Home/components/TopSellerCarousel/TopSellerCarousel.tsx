import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Product from 'src/pages/ProductList/Product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import Carousel from 'react-multi-carousel'
import classNames from 'classnames'
import { DotProps } from 'react-multi-carousel/lib/types'
import toArray from 'lodash/toArray'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { StoreContext } from 'src/contexts/store.context'
import likeItemAPi from 'src/apis/userLikeItem.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import CustomSlideShow from 'src/components/CustomSlideShow'

const LIMIT = 10

export default function TopSellerCarousel() {
  const { isAuthenticated } = useContext(AppContext)
  const { setWishlistIDs } = useContext(StoreContext)

  //? GET WISHLIST
  const { data: wishlistData, isLoading } = useQuery({
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

  //! Get top seller product list
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
          className={classNames('mx-0.5 h-1 w-8 rounded-md duration-200', {
            ' bg-primaryColor': active,
            ' bg-haretaColor/60': !active
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

  //! Multi languages
  const { t } = useTranslation('home')

  return (
    <div className='container'>
      <div className='flex items-center justify-between'>
        <p className='w-full select-none py-2 text-left text-2xl font-bold uppercase desktop:text-4xl desktopLarge:text-5xl'>
          {t('top seller')}
        </p>
        {displayedItems.length >= 3 && (
          <button
            className='flex items-center gap-2 rounded-md border border-black/60 px-2 py-1 text-xs hover:border-transparent hover:bg-primaryColor hover:font-medium hover:text-darkText dark:border-white/60 dark:hover:border-transparent tablet:gap-3 tablet:text-base desktopLarge:text-lg'
            onClick={handleNavigate}
          >
            <p className='truncate uppercase'>{t('explore')}</p>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        )}
      </div>

      <div className='p-2 tablet:p-4 desktop:p-8 desktopLarge:p-12'>
        {length <= 3 && (
          <div
            className={classNames('grid grid-cols-1 gap-4', {
              'tablet:grid-cols-3': length == 1 || length == 3,
              'tablet:grid-cols-2 desktop:gap-12 desktopLarge:gap-24': length == 2
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
            <CustomSlideShow>
              {displayedItems.map((item) => (
                <div key={item.id} className='mx-4 select-none'>
                  <Product product={item} initialLoading={isLoading} />
                </div>
              ))}
            </CustomSlideShow>
          </div>
        )}
      </div>
    </div>
  )
}
