import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { ProductRespone, StoreRespone } from 'src/types/store.type'
import http from 'src/utils/http'

const URL = 'item'

const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<ProductList>(`${URL}/list`, { params })
  },
  getProductDetail(id: string) {
    return http.get<ProductRespone>(`${URL}/?id=${id}`)
  },
  getFilteringList(name: string) {
    return http.get<StoreRespone>(`${URL}/type?name=${name}`)
  }
}

export default productApi
