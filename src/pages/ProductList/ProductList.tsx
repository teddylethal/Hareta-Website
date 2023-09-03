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
import { Fragment, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import ProductSekeleton from './ProductSkeleton'
import ProductListSkeleton from './ProductListSkeleton'
import ActiveFiltering from './Mobile/ActiveFiltering'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function ProductList() {
  const { isAuthenticated } = useContext(AppContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const queryConfig = useQueryConfig()

  const { data: storeData, isFetching } = useQuery({
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
      return likeItemAPi.getWishList()
    },
    staleTime: 3 * 60 * 1000,
    enabled: isAuthenticated
  })
  const favouriteList = favouriteListData?.data.data
  const favouriteListId = favouriteList ? favouriteList.map((item) => item.id) : []

  return (
    <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg bg-[#efefef] px-2 py-1 text-xs font-light uppercase text-textDark duration-500 dark:bg-[#202020] dark:text-textLight lg:mb-3 lg:space-x-2 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
          <NavLink
            to={path.home}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            home
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.store}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            store
          </NavLink>
        </div>

        {!isMobile && (
          <div className='relative grid grid-cols-12 gap-2 lg:gap-4 xl:gap-6'>
            <div className='col-span-3'>
              <div className='sticky left-0 top-8 mt-2 flex w-full flex-col space-y-4 overflow-auto rounded-lg bg-[#efefef] px-2 py-4 duration-500 dark:bg-[#202020] md:top-10 lg:top-16'>
                <SearchBar />
                <AsideSorter />
                <PriceRange queryConfig={queryConfig} />
                <AsideFilter queryConfig={queryConfig} />
              </div>
            </div>
            <div className='col-start-4 col-end-13'>
              {(isFetching || !storeData) && <ProductListSkeleton />}
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
                          <Product
                            product={product}
                            queryConfig={queryConfig}
                            likedByUser={favouriteListId.includes(product.id)}
                          />
                        </div>
                      ))}
                  </div>
                  <UsePagination queryConfig={queryConfig} totalPage={ceil(storeData.data.paging.total / 24)} />
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
            {storeData && (
              <Fragment>
                <div className='grid grid-cols-2 gap-4'>
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
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      {isMobile && <MobileBottomBar queryConfig={queryConfig} />}
    </div>
  )
}
