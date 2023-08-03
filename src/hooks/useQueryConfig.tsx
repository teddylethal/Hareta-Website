import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || 12,
      name: queryParams.name,
      category: queryParams.category,
      collection: queryParams.collection,
      type: queryParams.type,
      product_line: queryParams.product_line,
      lower_price: queryParams.lower_price,
      upper_price: queryParams.upper_price
    },
    isUndefined
  )
  return queryConfig
}
