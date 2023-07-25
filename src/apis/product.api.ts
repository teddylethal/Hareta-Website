import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import http from 'src/utils/http'

const URL = 'item'

const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<ProductList>(`${URL}/list`, { params })
  },
  getProductDetail(id: string) {
    return http.get<Product>(`${URL}/?id=${id}`)
  }
}

export default productApi
