import useQueryConfig from 'src/hooks/useQueryConfig'
import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import TopSellerItems from './components/TopSellerItems'

export default function Home() {
  //? GET PRODUCT LIST
  const queryConfig = useQueryConfig()
  const { data: itemListData, isFetching } = useQuery({
    queryKey: ['items', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const itemList = itemListData?.data.data || []

  return (
    <div className='bg-lightBg duration-500 dark:bg-darkBg'>
      <EventCarousel />
      <div className='container'>
        <div className='my-10 xl:my-14'>
          <NewReleaseCarousel itemList={itemList} />
        </div>
        <div className='my-10 xl:my-14'>
          <TopSellerItems />
        </div>
      </div>
    </div>
  )
}
