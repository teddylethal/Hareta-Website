import { Order } from 'src/types/order.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'
import { OrderSchema } from 'src/utils/rules'

const URL = '/auth/order'

type CreateOrderForm = OrderSchema

export const orderApi = {
  getOrderList() {
    return http.get(URL)
  },
  createOrder(body: CreateOrderForm) {
    return http.post<SuccessRespone<Order>>(URL, body)
  },
  updateOrder(body: { id: string; status: string }) {
    return http.put<SuccessRespone<string>>(URL, body)
  },
  deleteItemGroup(body: { id: string }) {
    return http.delete(`${URL}/group-item`, { data: body })
  }
}
