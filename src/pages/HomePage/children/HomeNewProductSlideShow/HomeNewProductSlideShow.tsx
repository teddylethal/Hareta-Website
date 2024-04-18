import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QueryConfig } from 'src/hooks/useProductListQueryConfig'
import { Slide } from 'react-slideshow-image'
import HomeNewProductCard from '../../components/HomeNewProductCard'

export default function HomeNewProductSlideShow() {
  const [dragging, setDragging] = useState<boolean>(false)

  //? GET ITEMS
  const itemsConfig: QueryConfig = {}
  const { data: productListData } = useQuery({
    queryKey: ['new_release_list', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const productList = productListData?.data.data || []

  // const newRelaseList = productList.filter((product) => date.getTime() - new Date(product.created_at).getTime() <= IsNewReleased)
  const newRelaseList = productList.slice(0, 5)

  //! Multi languages
  const { t } = useTranslation('home')

  return (
    <div className='container'>
      <div className='text-darkText duration-200 dark:text-lightText'>
        <div className='w-full text-center'>
          <p className='text-2xl font-bold uppercase text-primaryColor desktop:text-4xl desktopLarge:text-5xl'>
            {t('new release')}
          </p>
        </div>
        <div className='relative mt-4 pb-8 desktop:mt-6 desktopLarge:mt-8'>
          <Slide>
            {newRelaseList.map((product) => (
              <div className='' key={product.id}>
                <HomeNewProductCard product={product} dragging={dragging} />
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </div>
  )
}
