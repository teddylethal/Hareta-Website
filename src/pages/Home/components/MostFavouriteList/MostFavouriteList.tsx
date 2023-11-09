import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import likeItemAPi from 'src/apis/userLikeItem.api'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { StoreContext } from 'src/contexts/store.context'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useViewport } from 'src/hooks/useViewport'
import Product from 'src/pages/ProductList/Product'
import ProductSekeleton from 'src/pages/ProductList/ProductSkeleton'

const DESKTOP_LIMIT = 8
const MOBILE_LIMIT = 4

interface Props {
  setPageIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MostFavouriteList({ setPageIsLoading }: Props) {
  const { isAuthenticated } = useContext(AppContext)
  const { setWishlistIDs } = useContext(StoreContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width < 768

  //? GET WISHLIST
  const { data: wishlistData, isInitialLoading } = useQuery({
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

  //? GET FAVOURTIE ITEMS
  const itemsConfig: QueryConfig = { limit: String(DESKTOP_LIMIT) }
  const {
    data: itemsData,
    isFetched,
    isLoading
  } = useQuery({
    queryKey: ['favourtie_items', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const itemList = itemsData?.data.data || []
  const displayedItems = isMobile ? itemList.slice(0, MOBILE_LIMIT) : itemList.slice(0, DESKTOP_LIMIT)

  //? SET LOADING PAGE
  useEffect(() => setPageIsLoading(isLoading), [isLoading, setPageIsLoading])

  //? HANDLE NAVIGATE
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate({
      pathname: path.store,
      search: createSearchParams({
        tag: '3'
      }).toString()
    })
  }

  return (
    <div className='text-textDark dark:text-textLight'>
      <div className='container'>
        <div className='relative rounded-xl border border-black/60 py-4 duration-300 dark:border-white/60 md:py-8 lg:py-10 xl:py-12'>
          <div className='absolute left-2 top-0 -translate-y-1/2 bg-lightBg duration-300 dark:bg-darkBg md:left-4 xl:left-8'>
            <p className='py-2 text-left text-2xl font-bold uppercase text-haretaColor/80 dark:text-sunYellow lg:text-4xl xl:text-5xl'>
              Most favourite
            </p>
          </div>
          <div className='absolute right-2 top-0 -translate-y-1/2 bg-lightBg duration-300 dark:bg-darkBg md:right-4 xl:right-8'>
            <button
              className='flex items-center gap-2 rounded-md border border-black/60 px-2 py-1 text-xs hover:border-transparent hover:bg-haretaColor hover:font-medium hover:text-textDark dark:border-white/60 dark:hover:border-transparent md:gap-3 md:text-base xl:text-lg'
              onClick={handleNavigate}
            >
              {!isMobile && <p className='uppercase'>explore</p>}
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
          <div className='px-2 md:px-8 xl:px-12'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4 xl:grid-cols-4 xl:gap-6'>
              {!isFetched &&
                Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div className='' key={index}>
                      <ProductSekeleton />
                    </div>
                  ))}
              {isFetched &&
                displayedItems.map((item) => (
                  <div className='' key={item.id}>
                    <Product product={item} initialLoading={isInitialLoading} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
