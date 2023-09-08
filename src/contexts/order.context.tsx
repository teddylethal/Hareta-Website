import { createContext, useState } from 'react'
import { ExtendsPurchase } from './cart.context'
import { ExtendedTemporaryPurchase } from 'src/pages/Cart/UnauthenticatedCart/UnauthenticatedCart'
import { Country, ICity, ICountry, IState } from 'country-state-city'
import { getOrderListFromLS, getTempOrderListFromLS } from 'src/utils/order'

interface OrderContextInterface {
  orderList: ExtendsPurchase[]
  setOrderList: React.Dispatch<React.SetStateAction<ExtendsPurchase[]>>
  tempOrderList: ExtendedTemporaryPurchase[]
  setTempOrderList: React.Dispatch<React.SetStateAction<ExtendedTemporaryPurchase[]>>
  addressCountry: ICountry
  addressState: IState | null
  addressCity: ICity | null
  setAddressCountry: React.Dispatch<React.SetStateAction<ICountry>>
  setAddressState: React.Dispatch<React.SetStateAction<IState | null>>
  setAddressCity: React.Dispatch<React.SetStateAction<ICity | null>>
  confirmPayment: boolean
  setConfirmPayment: React.Dispatch<React.SetStateAction<boolean>>
  noneCity: boolean
  noneState: boolean
  setNoneCity: React.Dispatch<React.SetStateAction<boolean>>
  setNoneState: React.Dispatch<React.SetStateAction<boolean>>
}

const initialOrderContext: OrderContextInterface = {
  orderList: getOrderListFromLS(),
  setOrderList: () => null,
  tempOrderList: getTempOrderListFromLS(),
  setTempOrderList: () => null,
  addressCountry: Country.getCountryByCode('VN') as ICountry,
  addressState: null,
  addressCity: null,
  setAddressCountry: () => null,
  setAddressState: () => null,
  setAddressCity: () => null,
  confirmPayment: false,
  setConfirmPayment: () => null,
  noneCity: false,
  noneState: false,
  setNoneCity: () => null,
  setNoneState: () => null
}

export const OrderContext = createContext<OrderContextInterface>(initialOrderContext)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderList, setOrderList] = useState<ExtendsPurchase[]>(initialOrderContext.orderList)
  const [tempOrderList, setTempOrderList] = useState<ExtendedTemporaryPurchase[]>(initialOrderContext.tempOrderList)
  const [addressCountry, setAddressCountry] = useState<ICountry>(initialOrderContext.addressCountry)
  const [addressState, setAddressState] = useState<IState | null>(initialOrderContext.addressState)
  const [addressCity, setAddressCity] = useState<ICity | null>(initialOrderContext.addressCity)
  const [confirmPayment, setConfirmPayment] = useState<boolean>(initialOrderContext.confirmPayment)
  const [noneState, setNoneState] = useState(false)
  const [noneCity, setNoneCity] = useState(false)

  return (
    <OrderContext.Provider
      value={{
        orderList,
        setOrderList,
        tempOrderList,
        setTempOrderList,
        addressCountry,
        addressState,
        addressCity,
        setAddressCountry,
        setAddressState,
        setAddressCity,
        confirmPayment,
        setConfirmPayment,
        noneState,
        noneCity,
        setNoneState,
        setNoneCity
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
