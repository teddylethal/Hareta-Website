import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ProductListQueryConfig } from 'src/hooks/useProductListQueryConfig'
import ProductCard from 'src/components/ProductCard'
import 'react-multi-carousel/lib/styles.css'
import { createSearchParams, useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import ProductSekeleton from 'src/components/ProductSkeleton'
import { Fragment } from 'react'
import { useViewport } from 'src/hooks/useViewport'
import CustomSlideShow from 'src/components/CustomSlideShow'

interface Props {
  type: string
}

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 425,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 0,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]

export default function ProductListForType({ type }: Props) {
  //! Responsive
  const width = useViewport().width
  const isSmall = width < 425
  const isNormal = width >= 425 && width < 768
  const isMedium = width >= 768 && width < 1024
  const isLarge = width >= 1024

  //! Get product list in type
  const inTypeQueryConfig: ProductListQueryConfig = { type: type, page: '1', limit: '12' }
  const { data: productsData } = useQuery({
    queryKey: ['products_in_type', inTypeQueryConfig],
    queryFn: () => {
      return productApi.getProductList(inTypeQueryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(type)
  })
  const productList = productsData?.data.data || []

  const navigate = useNavigate()
  const handleClick = () => {
    navigate({
      pathname: path.store,
      search: createSearchParams({
        type: type
      }).toString()
    })
  }

  //! Check if need to use slide show
  const len = productList.length
  const noSlideShow = (isSmall && len <= 1) || (isNormal && len <= 2) || (isMedium && len <= 3) || (isLarge && len <= 4)

  return (
    <div className='rounded-lg border border-black/40 px-2 py-4 text-darkText dark:border-white/40 dark:text-lightText desktop:px-4 desktopLarge:px-6'>
      <button
        onClick={handleClick}
        className='mx-2 text-lg font-bold uppercase hover:text-primaryColor dark:hover:text-primaryColor desktop:mx-4 desktop:text-2xl desktopLarge:mx-6'
      >
        {type}
      </button>

      {!productsData && (
        <div className='mt-4 grid grid-cols-4'>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='col-span-1'>
                <ProductSekeleton />
              </div>
            ))}
        </div>
      )}
      {productsData && (
        <Fragment>
          {noSlideShow && (
            <div className='mt-4 grid grid-cols-1 gap-4 mobileLarge:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-6'>
              {productsData.data.data.map((product) => (
                <div key={product.id} className='col-span-1 '>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {!noSlideShow && (
            <div className='relative mt-4 w-full'>
              <CustomSlideShow responsive={responsiveSettings} indicators={false}>
                {productsData.data.data.map((product) => (
                  <div key={product.id} className='mx-2 desktop:mx-4 desktopLarge:mx-6'>
                    <ProductCard product={product} />
                  </div>
                ))}
              </CustomSlideShow>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
