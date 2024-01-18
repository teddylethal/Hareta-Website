import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import AsideSorter from './AsideSorter'
import Product from './Product'
import SearchBar from './SearchBar'
import productApi from 'src/apis/product.api'
import { useViewport } from 'src/hooks/useViewport'
import MobileBottomBar from './Mobile/MobileBottomBar'
import UsePagination from 'src/components/UsePagination'
import { ProductListConfig } from 'src/types/product.type'
import useQueryConfig, { ITEM_LIMIT } from 'src/hooks/useQueryConfig'
import ceil from 'lodash/ceil'
import PriceRange from './AsideFilter/PriceRange'
import likeItemAPi from 'src/apis/userLikeItem.api'
import { Fragment, useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ProductSekeleton from './ProductSkeleton'
import ProductListSkeleton from './ProductListSkeleton'
import ActiveFiltering from './Mobile/ActiveFiltering'
import PathBar from 'src/components/PathBar'
import { StoreContext } from 'src/contexts/store.context'
import EmptyProductList from 'src/components/EmptyProductList'
import { useTranslation } from 'react-i18next'

export default function ProductList() {
  const { isAuthenticated } = useContext(AppContext)
  const { setWishlistIDs } = useContext(StoreContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const queryConfig = useQueryConfig()

  //? GET PRODUCT LIST
  const { data: storeData, isFetching } = useQuery({
    queryKey: ['items', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

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

  //? CHANGE TITLE
  useEffect(() => {
    document.title = `${t('path bar.store')} | Hareta Workshop`
  })

  //? TRANSLATION
  const { t } = useTranslation('store')

  return (
    <div className='bg-lightBg py-2 duration-300 dark:bg-darkBg md:py-3 xl:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: t('path bar.home'), url: '/' },
            { pathName: t('path bar.store'), url: '/store' }
          ]}
        />

        {!isMobile && (
          <div className='relative grid grid-cols-12 gap-2 lg:gap-4 xl:gap-6'>
            <div className='col-span-3'>
              <div className='sticky left-0 top-8 mt-2 flex w-full flex-col space-y-4 overflow-auto rounded-lg border border-black/20 bg-barLightBg px-2 py-4 duration-300 dark:border-white/20 dark:bg-barDarkBg md:top-14 lg:top-20'>
                <SearchBar />
                <AsideSorter />
                <PriceRange queryConfig={queryConfig} />
                <AsideFilter queryConfig={queryConfig} />
              </div>
            </div>
            <div className='col-start-4 col-end-13'>
              {(isFetching || !storeData) && <ProductListSkeleton />}
              {storeData?.data.paging.total == 0 && <EmptyProductList currentPage='store' />}
              {storeData && (
                <div className=''>
                  <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6'>
                    {isFetching &&
                      Array(12)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index} className='col-span-1'>
                            <ProductSekeleton />
                          </div>
                        ))}
                    {!isFetching &&
                      storeData.data.data.map((product) => (
                        <div className='col-span-1' key={product.id}>
                          <Product product={product} initialLoading={isInitialLoading} />
                        </div>
                      ))}
                  </div>
                  <UsePagination queryConfig={queryConfig} totalPage={ceil(storeData.data.paging.total / ITEM_LIMIT)} />
                </div>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <Fragment>
            <SearchBar />
            <ActiveFiltering />
            {(isFetching || !storeData) && <ProductListSkeleton />}
            {storeData?.data.paging.total == 0 && <EmptyProductList currentPage='store' />}
            {storeData && (
              <Fragment>
                <div className='grid grid-cols-2 gap-4'>
                  {storeData &&
                    storeData.data.data.map((product) => (
                      <div className='col-span-1' key={product.id}>
                        <Product product={product} initialLoading={isInitialLoading} />
                      </div>
                    ))}
                </div>
                <UsePagination
                  queryConfig={queryConfig}
                  totalPage={ceil(storeData.data.paging.total / ITEM_LIMIT)}
                  isMobile
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      {isMobile && <MobileBottomBar queryConfig={queryConfig} />}
    </div>
  )
}
