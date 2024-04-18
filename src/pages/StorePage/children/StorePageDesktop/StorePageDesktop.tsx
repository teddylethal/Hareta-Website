import { AxiosResponse } from 'axios'
import { ceil } from 'lodash'
import EmptyProductList from 'src/components/EmptyProductList'
import UsePagination from 'src/components/UsePagination'
import useProductListQueryConfig, { ITEM_LIMIT } from 'src/hooks/useProductListQueryConfig'
import AsideFilter from 'src/pages/ProductList/AsideFilter'
import PriceRange from 'src/pages/ProductList/AsideFilter/PriceRange'
import Product from 'src/pages/ProductList/Product'
import ProductListSkeleton from 'src/pages/ProductList/ProductListSkeleton'
import ProductSekeleton from 'src/pages/ProductList/ProductSkeleton'
import StoreSearchBar from 'src/pages/ProductList/StoreSearchBar'
import { ProductList } from 'src/types/product.type'
import StoreAsideSorter from 'src/pages/StorePage/components/StoreAsideSorter'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeData?: AxiosResponse<ProductList, any>
  isFetching: boolean
  isLoading: boolean
}

export default function StorePageDesktop({ storeData, isFetching, isLoading }: Props) {
  const queryConfig = useProductListQueryConfig()

  return (
    <div className='relative grid grid-cols-12 gap-2 desktop:gap-4 desktopLarge:gap-6'>
      <div className='col-span-3'>
        <div className='sticky left-0 top-8 mt-2 flex w-full flex-col space-y-4 overflow-auto rounded-lg border border-black/20 bg-barLightBg px-2 py-4 duration-200 dark:border-white/20 dark:bg-barDarkBg tablet:top-14 desktop:top-20'>
          <StoreSearchBar />
          <StoreAsideSorter />
          <PriceRange queryConfig={queryConfig} />
          <AsideFilter queryConfig={queryConfig} />
        </div>
      </div>
      <div className='col-start-4 col-end-13'>
        {(isFetching || !storeData) && <ProductListSkeleton />}
        {storeData?.data.paging.total == 0 && <EmptyProductList currentPage='store' />}
        {storeData && (
          <div className=''>
            <div className='grid grid-cols-2 gap-4 desktop:grid-cols-3 desktop:gap-6'>
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
                    <Product product={product} initialLoading={isLoading} />
                  </div>
                ))}
            </div>
            <UsePagination queryConfig={queryConfig} totalPage={ceil(storeData.data.paging.total / ITEM_LIMIT)} />
          </div>
        )}
      </div>
    </div>
  )
}
