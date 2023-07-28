import { ProductList } from 'src/types/product.type'

export const setFavouriteListToLS = (data: ProductList) => {
  localStorage.setItem('favourite_list', JSON.stringify(data))
}

export const getFavouriteListFromLS = () => {
  const data = localStorage.getItem('favourite_list')
  return data ? JSON.parse(data) : null
}
