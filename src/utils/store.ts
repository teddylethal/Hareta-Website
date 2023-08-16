import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductList } from 'src/types/product.type'

export const setFavouriteListToLS = (data: ProductList) => {
  localStorage.setItem('favourite_list', JSON.stringify(data))
}

export const getFavouriteListFromLS = () => {
  const data = localStorage.getItem('favourite_list')
  return data ? JSON.parse(data) : null
}

export const setCategoryFilteringToLS = (data: string) => {
  localStorage.setItem('category_filtering', data)
}

export const setCollectionFilteringToLS = (data: string) => {
  localStorage.setItem('collection_filtering', data)
}

export const setTypeFilteringToLS = (data: string) => {
  localStorage.setItem('type_filtering', data)
}

export const setQueryConfigToLS = (data: QueryConfig) => {
  localStorage.setItem('query_config', JSON.stringify(data))
}

export const getCategoryFilteringFromLS = () => {
  return localStorage.getItem('category_filtering') || 'All'
}

export const getCollectionFilteringFromLS = () => {
  return localStorage.getItem('collection_filtering') || 'All'
}

export const getTypeFilteringFromLS = () => {
  return localStorage.getItem('type_filtering') || 'All'
}

export const getQueryConfigFromLS = () => {
  const data = localStorage.getItem('query_config')
  return data ? JSON.parse(data) : {}
}

export const clearFileringFromLS = () => {
  localStorage.removeItem('category_filtering')
  localStorage.removeItem('collection_filtering')
  localStorage.removeItem('type_filtering')
}

// export const checkCategory = (query: string) => {
//   return query.search('&category=')
// }

// export const checkCollection = (query: string) => {
//   return query.search('&collection=')
// }

// export const checkType = (query: string) => {
//   return query.search('&type=')
// }

// export const getCategoryFromQuery = (query: string, haveCollection: boolean, haveType: boolean) => {
//   const start = query.search('&category=')
//   let end = -1
//   if (haveCollection) {
//   } else if (haveType) {
//   }
//   const arr = query.slice(start, end)
//   return arr
// }