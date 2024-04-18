import { AxiosResponse } from 'axios'
import { ceil } from 'lodash'
import { Fragment } from 'react'
import EmptyProductList from 'src/components/EmptyProductList'
import UsePagination from 'src/components/UsePagination'
import useProductListQueryConfig, { ITEM_LIMIT } from 'src/hooks/useProductListQueryConfig'
import ActiveFiltering from 'src/pages/ProductList/Mobile/ActiveFiltering'
import Product from 'src/pages/ProductList/Product'
import ProductListSkeleton from 'src/pages/ProductList/ProductListSkeleton'
import StoreSearchBar from 'src/pages/ProductList/StoreSearchBar'
import { ProductList } from 'src/types/product.type'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeData?: AxiosResponse<ProductList, any>
  isFetching: boolean
  isLoading: boolean
}

export default function StorePageMobile({ storeData, isFetching, isLoading }: Props) {
  const queryConfig = useProductListQueryConfig()

  return (
    <Fragment>
      <StoreSearchBar />
      <ActiveFiltering />
      {(isFetching || !storeData) && <ProductListSkeleton />}
      {storeData?.data.paging.total == 0 && <EmptyProductList currentPage='store' />}
      {storeData && (
        <Fragment>
          <div className='grid grid-cols-2 gap-4'>
            {storeData &&
              storeData.data.data.map((product) => (
                <div className='col-span-1' key={product.id}>
                  <Product product={product} initialLoading={isLoading} />
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
  )
}
