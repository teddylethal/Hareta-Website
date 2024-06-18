import { ICountry, IState } from 'country-state-city'
import { ExtendedPurchase } from 'src/types/cart.type'

export const setOrderListToLS = (orderList: ExtendedPurchase[]) => {
  localStorage.setItem('order_list', JSON.stringify(orderList))
}

export const getOrderListFromLS = (): ExtendedPurchase[] => {
  const result = localStorage.getItem('order_list')
  return result ? JSON.parse(result) : []
}

export const setTempOrderListToLS = (orderList: ExtendedPurchase[]) => {
  localStorage.setItem('temp_order_list', JSON.stringify(orderList))
}

export const getTempOrderListFromLS = (): ExtendedPurchase[] => {
  const result = localStorage.getItem('temp_order_list')
  return result ? JSON.parse(result) : []
}

//! Order information functions
export const setCountryAddressToLS = (country: ICountry) => {
  localStorage.setItem('country_address', JSON.stringify(country))
}

export const getCountryAddressFromLS = () => {
  const res = localStorage.getItem('country_address')
  return res ? JSON.parse(res) : null
}

export const setStateAddressToLS = (state: IState | null) => {
  localStorage.setItem('state_address', JSON.stringify(state))
}

export const getStateAddressFromLS = () => {
  const res = localStorage.getItem('state_address')
  return res ? JSON.parse(res) : null
}

//! Order tracking
export const getOrderIdInOrderTrackingPayment = (url: string) => {
  const arr1 = url.split('-i:')
  const arr2 = arr1[arr1.length - 1].split('/')
  return arr2[arr2.length - 1]
}
