import { ProductList } from 'src/types/product.type'
import http from 'src/utils/http'

const URL = 'auth/user-like-item/'
const LIMIT = 100

const likeItemAPi = {
  likeItem(body: { item_id: string }) {
    return http.post(URL, body)
  },
  unlikeItem(body: { item_id: string }) {
    return http.delete(URL, { data: body })
  },
  getFavouriteList() {
    const params = {
      page: 1,
      limit: LIMIT
    }
    return http.get<ProductList>(URL, { params })
  }
}

export default likeItemAPi
