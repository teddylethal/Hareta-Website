import { ExtendsPurchase } from 'src/contexts/cart.context'
import { ExtendedTemporaryPurchase } from 'src/pages/Cart/UnauthenticatedCart/UnauthenticatedCart'

export const setOrderListToLS = (orderList: ExtendsPurchase[]) => {
  localStorage.setItem('order_list', JSON.stringify(orderList))
}

export const getOrderListFromLS = (): ExtendsPurchase[] => {
  const result = localStorage.getItem('order_list')
  return result ? JSON.parse(result) : []
}

export const setTempOrderListToLS = (orderList: ExtendedTemporaryPurchase[]) => {
  localStorage.setItem('order_list', JSON.stringify(orderList))
}

export const getTempOrderListFromLS = (): ExtendedTemporaryPurchase[] => {
  const result = localStorage.getItem('order_list')
  return result ? JSON.parse(result) : []
}
