import { isUndefined, omitBy } from 'lodash'
import { useState, createContext } from 'react'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import {
  getCategoryFilteringFromLS,
  getCollectionFilteringFromLS,
  getQueryConfigFromLS,
  getTypeFilteringFromLS
} from 'src/utils/store'

interface StoreContextInterface {
  sorting: string
  setSorting: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  collection: string
  setCollection: React.Dispatch<React.SetStateAction<string>>
  type: string
  setType: React.Dispatch<React.SetStateAction<string>>
  isFavouriteList: boolean
  setIsFavouriteList: React.Dispatch<React.SetStateAction<boolean>>
}

const initialStoreContext: StoreContextInterface = {
  sorting: 'Newest',
  setSorting: () => null,
  category: getCategoryFilteringFromLS(),
  setCategory: () => null,
  collection: getCollectionFilteringFromLS(),
  setCollection: () => null,
  type: getTypeFilteringFromLS(),
  setType: () => null,
  isFavouriteList: false,
  setIsFavouriteList: () => null
}

export const StoreContext = createContext<StoreContextInterface>(initialStoreContext)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [sorting, setSorting] = useState<string>(initialStoreContext.sorting)
  const [category, setCategory] = useState<string>(initialStoreContext.category)
  const [collection, setCollection] = useState<string>(initialStoreContext.collection)
  const [type, setType] = useState<string>(initialStoreContext.type)
  const [isFavouriteList, setIsFavouriteList] = useState<boolean>(initialStoreContext.isFavouriteList)

  // const queryParams: QueryConfig = useQueryParams()
  // const initialQueryConfig: QueryConfig = omitBy(
  //   {
  //     page: queryParams.page || '1',
  //     limit: queryParams.limit || 12,
  //     category: category,
  //     collection: collection,
  //     type: type,
  //     product_line: queryParams.product_line,
  //     lower_price: queryParams.lower_price,
  //     upper_price: queryParams.upper_price
  //   },
  //   isUndefined
  // )

  // const [queryConfig, setQueryConfig] = useState<QueryConfig>(initialQueryConfig)
  // const queryConfig: QueryConfig = omitBy(
  //   {
  //     page: queryParams.page || '1',
  //     limit: queryParams.limit || 12,
  //     category: queryParams.category,
  //     collection: queryParams.collection,
  //     type: queryParams.type,
  //     product_line: queryParams.product_line,
  //     lower_price: queryParams.lower_price,
  //     upper_price: queryParams.upper_price
  //   },
  //   isUndefined
  // )

  return (
    <StoreContext.Provider
      value={{
        sorting,
        setSorting,
        category,
        setCategory,
        collection,
        setCollection,
        type,
        setType,
        isFavouriteList,
        setIsFavouriteList
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
