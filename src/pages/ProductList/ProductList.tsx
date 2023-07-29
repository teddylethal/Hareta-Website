import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined, ceil } from 'lodash'
import useQueryParams from 'src/hooks/useQueryParams'
import AsideFavouriteList from './AsideFavouriteList'
import AsideFilter from './AsideFilter'
import AsideSorter from './AsideSorter'
import Product from './Product'
import SearchBar from './SearchBar'
import productApi from 'src/apis/product.api'
import { useContext, useState } from 'react'
import { ThemeContext } from 'src/App'
import { useViewport } from 'src/hooks/useViewport'
import MobileBottomBar from './MobileBottomBar'
import { StoreProvider } from 'src/contexts/store.context'
import { AppContext } from 'src/contexts/app.context'
import UsePagination from 'src/components/UsePagination'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const { isAuthenticated } = useContext(AppContext)
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 12,
      category: queryParams.category,
      collection: queryParams.collection,
      type: queryParams.type,
      product_line: queryParams.product_line,
      lower_price: queryParams.lower_price,
      upper_price: queryParams.upper_price
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['items', queryParams],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  return (
    <StoreProvider>
      <div className='bg-lightBg py-6 duration-500 dark:bg-darkBg'>
        <div className='container'>
          {!isMobile && (
            <div className='grid grid-cols-12 gap-6'>
              <div className=' col-span-3 mb-auto overflow-hidden rounded-sm bg-[#E8E8E8] duration-500 dark:bg-[#303030]'>
                <AsideSorter queryConfig={queryConfig} />
                <AsideFilter queryConfig={queryConfig} />
              </div>
              <div className='col-span-9'>
                <SearchBar />
                {data && (
                  <div>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-2'>
                      {data.data.data.map((product) => (
                        <div className='col-span-1' key={product.id}>
                          <Product product={product} />
                        </div>
                      ))}
                    </div>
                    <UsePagination queryConfig={queryConfig} totalPage={ceil(data.data.paging.total / 12)} />
                  </div>
                )}
              </div>
            </div>
          )}

          {isMobile && data && (
            <div>
              <div className='gird-cols-1 grid gap-6 sm:grid-cols-2'>
                {data &&
                  data.data.data.map((product) => (
                    <div className='col-span-1' key={product.id}>
                      <Product product={product} />
                    </div>
                  ))}
              </div>
              <UsePagination queryConfig={queryConfig} totalPage={data.data.paging.total} isMobile />
            </div>
          )}
        </div>
        {isMobile && <MobileBottomBar />}
      </div>
    </StoreProvider>
  )
}
