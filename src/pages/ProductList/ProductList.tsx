import useQueryParams from 'src/hooks/useQueryParams'
import AsideFavouriteList from './AsideFavouriteList'
import AsideFilter from './AsideFilter'
import AsideSorter from './AsideSorter'
import Product from './Product'
import SearchBar from './SearchBar'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProductList(queryParams)
    }
  })
  // console.log(data?.data.data)
  return (
    <div className='bg-lightBg py-6 duration-500 dark:bg-darkBg'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className=' col-span-3 mb-auto overflow-hidden rounded-sm bg-[#E8E8E8] duration-500 dark:bg-[#303030]'>
            <AsideSorter />
            <AsideFilter />
            <AsideFavouriteList />
          </div>
          <div className='col-span-9'>
            <SearchBar />
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-2'>
              {data &&
                data.data.data.map((product) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
