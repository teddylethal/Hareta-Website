import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import AsideSorter from './AsideSorter'
import Product from './Product'
import SearchBar from './SearchBar'
import productApi from 'src/apis/product.api'
import { useViewport } from 'src/hooks/useViewport'
import MobileBottomBar from './MobileBottomBar'
import UsePagination from 'src/components/UsePagination'
import { ProductListConfig } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ceil } from 'lodash'
import PriceRange from './AsideFilter/PriceRange'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useContext, useState } from 'react'
import classNames from 'classnames'
import { AppContext } from 'src/contexts/app.context'
import likeItemAPi from 'src/apis/userLikeItem.api'

export default function ProductList() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const { isAuthenticated } = useContext(AppContext)
  const [isFavouriteList, setIsFavouriteList] = useState<boolean>(false)

  const queryConfig = useQueryConfig()

  const { data: storeData } = useQuery({
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
    staleTime: 3 * 60 * 1000
  })
  const favouriteList = favouriteListData?.data.data
  const favouriteListId = favouriteList ? favouriteList.map((item) => item.id) : []

  const toggleFavouriteList = () => {
    setIsFavouriteList(!isFavouriteList)
  }

  return (
    <div className='bg-lightBg py-6 duration-500 dark:bg-darkBg'>
      <div className='container'>
        {!isMobile && (
          <div className='grid grid-cols-12 gap-6'>
            <div className=' col-span-3 mb-auto overflow-hidden rounded-sm bg-[#e0e0e0] duration-500 dark:bg-[#202020]'>
              <AsideSorter />
              <PriceRange queryConfig={queryConfig} />
              <AsideFilter queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <div className='mb-2 flex items-center space-x-4'>
                <div className='flex grow items-center'>
                  <SearchBar />
                </div>
                {isAuthenticated && (
                  <button
                    className={classNames('flex shrink-0 items-center space-x-2 rounded-md border  px-4 py-2', {
                      'border-vintageColor/60 text-textDark dark:border-haretaColor/60 dark:text-textLight':
                        !isFavouriteList,
                      'border-vintageColor bg-white/80 text-vintageColor dark:border-haretaColor dark:bg-black/80 dark:text-haretaColor':
                        isFavouriteList
                    })}
                    onClick={toggleFavouriteList}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={classNames({
                        'text-red-600': isFavouriteList
                      })}
                    />
                    <span className='text-sm '>Favourite list</span>
                  </button>
                )}
              </div>
              {storeData && (
                <div>
                  <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-2'>
                    {storeData.data.data.map((product) => (
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
            <div className='gird-cols-1 grid gap-6 sm:grid-cols-2'>
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
