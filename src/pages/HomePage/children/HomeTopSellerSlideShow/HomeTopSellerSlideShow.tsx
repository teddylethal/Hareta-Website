import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import ProductCard from 'src/components/ProductCard'
import { ProductListQueryConfig } from 'src/hooks/useProductListQueryConfig'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { StoreContext } from 'src/contexts/store.context'
import userLikeProductApi from 'src/apis/userLikeProduct.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import CustomSlideShow from 'src/components/CustomSlideShow'
import { useViewport } from 'src/hooks/useViewport'

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

  const isMobile = useViewport().width < 1024

  //! Get use wish list
  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ['wishlist'],
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
  const itemsConfig: ProductListQueryConfig = { limit: String(LIMIT) }
  const { data: itemsData } = useQuery({
    queryKey: ['default-products', itemsConfig],
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
      search: createSearchParams({ tag: '1' }).toString()
    })
  }

  //! Multi languages
  const { t } = useTranslation('home')

  return (
    <div className=''>
      <div className='flex items-center justify-between px-2 tablet:px-4 desktop:px-8'>
        <span className='select-none px-2 py-2 text-2xl font-bold uppercase tablet:left-4 desktop:left-8 desktop:text-4xl desktopLarge:text-5xl'>
          {t('top seller')}
        </span>
        {displayedItems.length >= 3 && (
          <button
            className=' flex items-center gap-2 rounded-md border px-2 py-1 text-xs hover:border-transparent hover:bg-primaryColor hover:font-medium hover:text-darkText dark:border-white/60 dark:hover:border-transparent tablet:right-4 tablet:gap-3 tablet:text-base desktop:right-8 desktopLarge:text-lg'
            onClick={handleNavigate}
          >
            {!isMobile && <p className='truncate uppercase'>{t('explore')}</p>}
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        )}
      </div>

      <div className='tablet:p-4 desktop:p-8'>
        {length <= 3 && (
          <div
            className={classNames(
              'flex w-full items-center justify-center space-x-4 tablet:space-x-8 desktop:space-x-16'
            )}
          >
            {length == 1 && <div className='col-span-1'></div>}
            {displayedItems.map((product) => (
              <div className='w-1/3' key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {displayedItems.length > 3 && (
          <div className='relative'>
            <CustomSlideShow responsive={responsiveSettings} indicators={false}>
              {displayedItems.map((item) => (
                <div key={item.id} className='select-none tablet:mx-4'>
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
