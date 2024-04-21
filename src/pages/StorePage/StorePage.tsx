import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { useViewport } from 'src/hooks/useViewport'
import { ProductListConfig } from 'src/types/product.type'
import userLikeProductApi from 'src/apis/userLikeItem.api'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import PathBar from 'src/components/PathBar'
import { StoreContext } from 'src/contexts/store.context'
import { useTranslation } from 'react-i18next'
import { PathElement } from 'src/components/PathBar/PathBar'
import mainPath from 'src/constants/path'
import StorePageMobile from './children/StorePageMobile'
import StorePageDesktop from './children/StorePageDesktop'
import useProductListQueryConfig from 'src/hooks/useProductListQueryConfig'
import StoreMobileBottomBar from './components/StoreMobileBottomBar'

export default function StorePage() {
  const { isAuthenticated } = useContext(AppContext)
  const { setWishlistIDs } = useContext(StoreContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const queryConfig = useProductListQueryConfig()

  //! GET PRODUCT LIST
  const { data: storeData, isFetching } = useQuery({
    queryKey: ['items', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },

    staleTime: 3 * 60 * 1000
  })

  //! GET WISHLIST
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
      setWishlistIDs(wishlist.map((product) => product.id))
    }
  }, [setWishlistIDs, wishlistData])

  //? CHANGE TITLE
  useEffect(() => {
    document.title = `${t('path bar.store')} | Hareta Workshop`
  })

  //! Multi languages
  const { t } = useTranslation('store')

  //! PATH LIST
  const pathList: PathElement[] = [
    {
      pathName: t('path bar.store'),
      url: mainPath.store,
      isNotALink: false
    }
  ]

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg tablet:py-3 desktopLarge:py-4'>
      <div className='container'>
        <PathBar pathList={pathList} />

        {!isMobile && <StorePageDesktop storeData={storeData} isFetching={isFetching} isLoading={isLoading} />}

        {isMobile && <StorePageMobile storeData={storeData} isFetching={isFetching} isLoading={isLoading} />}
      </div>
      {isMobile && <StoreMobileBottomBar queryConfig={queryConfig} />}
    </div>
  )
}
