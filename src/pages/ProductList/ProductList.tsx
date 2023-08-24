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
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ceil } from 'lodash'
import PriceRange from './AsideFilter/PriceRange'
import likeItemAPi from 'src/apis/userLikeItem.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ProductSekeleton from './ProductSkeleton'
import ProductListSkeleton from './ProductListSkeleton'
import ActiveFiltering from './Mobile/ActiveFiltering'

export default function ProductList() {
  const { isAuthenticated } = useContext(AppContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const queryConfig = useQueryConfig()

  const {
    data: storeData,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: ['items', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: favouriteListData } = useQuery({
    queryKey: ['favourite_list'],
    queryFn: () => {
      return likeItemAPi.getFavouriteList()
    },
    staleTime: 3 * 60 * 1000,
    enabled: isAuthenticated
  })
  const favouriteList = favouriteListData?.data.data
  const favouriteListId = favouriteList ? favouriteList.map((item) => item.id) : []

  return (
    <div className='bg-lightBg py-6 duration-500 dark:bg-darkBg'>
      <div className='container'>
        {!isMobile && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='relative col-span-3 mb-auto flex flex-col space-y-4 overflow-hidden px-2 duration-500'>
              <AsideSorter />
              <PriceRange queryConfig={queryConfig} />
              <AsideFilter queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <div className='items-center'>
                <div className='flex grow items-center'>
                  <SearchBar />
                </div>
              </div>
              {isLoading && <ProductListSkeleton />}
              {storeData && (
                <div className='mt-4'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
                          <Product
                            product={product}
                            queryConfig={queryConfig}
                            likedByUser={favouriteListId.includes(product.id)}
                          />
                        </div>
                      ))}
                  </div>
                  <UsePagination queryConfig={queryConfig} totalPage={ceil(storeData.data.paging.total / 12)} />
                </div>
              )}
            </div>
          </div>
        )}

        {isMobile && storeData && (
          <div>
            <SearchBar />
            <ActiveFiltering />
            <div className='gird-cols-1 grid gap-2 sm:grid-cols-2'>
              {storeData &&
                storeData.data.data.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product
                      product={product}
                      queryConfig={queryConfig}
                      likedByUser={favouriteListId.includes(product.id)}
                    />
                  </div>
                ))}
            </div>
            <UsePagination queryConfig={queryConfig} totalPage={ceil(storeData.data.paging.total / 12)} isMobile />
          </div>
        )}
      </div>
      {isMobile && <MobileBottomBar queryConfig={queryConfig} />}
    </div>
  )
}
