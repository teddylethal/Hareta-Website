import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import Product from 'src/pages/ProductList/Product'

interface Props {
  collectionName: string
}

export default function OtherItemsInCollection({ collectionName }: Props) {
  const queryConfig = useQueryConfig()
  const inCollectionQueryConfig: QueryConfig = { collection: collectionName, page: '1', limit: '12' }
  const { data: productsData } = useQuery({
    queryKey: ['products_in_collection', inCollectionQueryConfig],
    queryFn: () => {
      return productApi.getProductList(inCollectionQueryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(collectionName)
  })
  const productsInCollection = productsData?.data.data

  if (!productsInCollection) return null
  return (
    <div className='mt-8 bg-[#f8f8f8] p-4 text-textDark shadow dark:bg-[#202020] dark:text-textLight'>
      <div className='text-lg lg:text-2xl'>{collectionName}</div>
      <div className='mt-4 grid grid-cols-4 gap-4'>
        {productsInCollection.map((product) => (
          <div className='col-span-1' key={product.id}>
            <Product product={product} queryConfig={queryConfig} />
          </div>
        ))}
      </div>
    </div>
  )
}
