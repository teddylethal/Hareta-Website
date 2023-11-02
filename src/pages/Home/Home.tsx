import useQueryConfig from 'src/hooks/useQueryConfig'
import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import SignatureItemCarousel from './components/SignatureItemCarousel'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'

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
    <div className='space-y-20'>
      <EventCarousel />
      <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
        <div className='container'>
          <div className='space-y-12'>
            <NewReleaseCarousel itemList={itemList} />
            <SignatureItemCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}
