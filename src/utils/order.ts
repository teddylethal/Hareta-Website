import { ICountry, IState } from 'country-state-city'
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
  localStorage.setItem('temp_order_list', JSON.stringify(orderList))
}

export const getTempOrderListFromLS = (): ExtendedTemporaryPurchase[] => {
  const result = localStorage.getItem('temp_order_list')
  return result ? JSON.parse(result) : []
}

//? Order information functions
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
