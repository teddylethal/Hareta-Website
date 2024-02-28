import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import Product from 'src/pages/ProductList/Product'
import { ProductListConfig } from 'src/types/product.type'

const ITEMSHOW = 4 as const

export default function EventCarouselItem() {
  //? GET STORE DATA
  const queryConfig = useQueryConfig()
  const { data: storeData } = useQuery({
    queryKey: ['items', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },

    staleTime: 3 * 60 * 1000
  })
  const itemList = storeData?.data.data || []
  const showedItems = itemList.length > ITEMSHOW ? itemList.slice(0, ITEMSHOW) : itemList

  return (
    <div className='xl:gap-6 xl:px-10 xl:py-12 text-darkText dark:text-lightText grid grid-cols-12 gap-4 px-8 py-6'>
      <div className='col-span-7'>
        <div className='foont-bold lg:text-2xl xl:text-4xl text-lg uppercase text-brownColor dark:text-haretaColor'>
          Mild winter
        </div>
        <div className='lg:text-base xl:text-lg mt-6 text-left text-sm'>
          The 2022-2023 winter in many ways could be described as volatile or perhaps even abnormal in terms of
          temperatures. When someone mentions a mild winter, they are often referring to average temperatures being
          higher than normal measured against historical trends in a region. The term “mild winter” can be subjective to
          each person. However, there is data that we can analyze to determine how this winter compares with past
          winters. The goal of this weather analysis is for agricultural professionals to use this information to make
          informed decisions about this upcoming production year. Weather-related analysis is particularly useful for
          forecasting potential integrated pest management and pathogen challenges in crop production.
        </div>
      </div>

      <div className='col-span-5'>
        <div className='xl:px-8 rounded-xl border border-brownColor/60 bg-lightBg px-6 py-6 dark:border-haretaColor/60 dark:bg-darkBg'>
          <div className='xl:tetx-xl lg:text-lg w-full text-center text-base font-medium uppercase'>
            discount 15% for eveery item included in the event
          </div>
          <div className='xl:gap-6 mt-6 grid w-full grid-cols-2 gap-4'>
            {showedItems.map((product) => (
              <div className='mx-6' key={product.id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
