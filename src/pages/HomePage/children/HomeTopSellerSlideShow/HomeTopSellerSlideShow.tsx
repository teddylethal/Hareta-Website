import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Product from 'src/components/ProductCard'
import { QueryConfig } from 'src/hooks/useProductListQueryConfig'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { StoreContext } from 'src/contexts/store.context'
import userLikeProductApi from 'src/apis/userLikeProduct.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import CustomSlideShow from 'src/components/CustomSlideShow'

const LIMIT = 10

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 464,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 0,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]

export default function HomeTopSellerSlideShow() {
  const { isAuthenticated } = useContext(AppContext)
  const { setWishlistIDs } = useContext(StoreContext)

  //! Get use wish list
  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ['user_wish_list'],
    queryFn: () => {
      return userLikeProductApi.getWishList()
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

  //! HANDLE NAVIGATE
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate({
      pathname: path.store,
      search: createSearchParams({
        tag: '1'
      }).toString()
    })
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
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {displayedItems.length > 3 && (
          <div className='relative pb-8'>
            <CustomSlideShow responsive={responsiveSettings}>
              {displayedItems.map((item) => (
                <div key={item.id} className='mx-4 select-none'>
                  <ProductCard product={item} initialLoading={isLoading} />
                </div>
              ))}
            </CustomSlideShow>
          </div>
        )}
      </div>
    </div>
  )
}
