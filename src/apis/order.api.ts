import { PurchaseList } from 'src/types/cart.type'
import { Order, OrderList, OrderPurchaseListConfig } from 'src/types/order.type'
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
  createOrderForUser(body: CreateOrderForm) {
    return http.post<SuccessRespone<Order>>(orderURL, body)
  },
  createOrderForGuest(body: CreateOrderFormForGuest) {
    return http.post<SuccessRespone<Order>>('/order', body)
  },
  updateOrder(body: { id: string; status: string }) {
    return http.put<SuccessRespone<string>>(orderURL, body)
  },
  getPurchaseListOfOrder(params: OrderPurchaseListConfig) {
    return http.get<PurchaseList>(itemOrderURL, { params })
  },
  findOrderForUser(id: string) {
    return http.get<SuccessRespone<Order>>(`${orderURL}${id}`)
  },
  findOrderForGuest(id: string) {
    return http.get<SuccessRespone<Order>>(`/order/${id}`)
  }
}
