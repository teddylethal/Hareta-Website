import { Purchase, PurchaseList } from 'src/types/cart.type'
import http from 'src/utils/http'

const URL = 'auth/cart/'

const purchaseApi = {
  addToCart(body: { item_id: string; quantity: number }) {
    return http.post<Purchase>(URL, body)
  },
  getPurchases() {
    return http.get<PurchaseList>(URL)
  }
}

export default purchaseApi
