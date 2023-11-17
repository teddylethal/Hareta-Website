import { PurchaseList } from 'src/types/cart.type'
import { ItemOrderConfig, Order, OrderList } from 'src/types/order.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'
import { OrderSchema, OrderSchemaForGuest } from 'src/utils/rules'

const orderURL = '/auth/order/'
const itemOrderURL = '/auth/item-order/'

type CreateOrderForm = OrderSchema

type CreateOrderFormForGuest = OrderSchemaForGuest

export const orderApi = {
  getOrderList() {
    return http.get<OrderList>(orderURL)
  },
  createOrder(body: CreateOrderForm) {
    return http.post<SuccessRespone<Order>>(orderURL, body)
  },
  updateOrder(body: { id: string; status: string }) {
    return http.put<SuccessRespone<string>>(orderURL, body)
  },
  createOrderWithouLogin(body: CreateOrderFormForGuest) {
    return http.post<SuccessRespone<string>>('/order', body)
  },
  getItemListOfOrder(params: ItemOrderConfig) {
    return http.get<PurchaseList>(itemOrderURL, { params })
  },
  getOrderById(id: string) {
    return http.get<SuccessRespone<Order>>(`${orderURL}${id}`)
  },
  getOrderOfGuestById(id: string) {
    return http.get<SuccessRespone<Order>>(`/order/${id}`)
  }
}
