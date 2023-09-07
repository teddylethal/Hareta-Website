import { createContext, useState } from 'react'
import { ExtendsPurchase } from './cart.context'
import { ExtendedTemporaryPurchase } from 'src/pages/Cart/UnauthenticatedCart/UnauthenticatedCart'
import { Country, ICity, ICountry, IState } from 'country-state-city'

interface OrderContextInterface {
  purchaseList: ExtendsPurchase[]
  setPurchaseList: React.Dispatch<React.SetStateAction<ExtendsPurchase[]>>
  tempPurchaseList: ExtendedTemporaryPurchase[]
  setTempPurchaseList: React.Dispatch<React.SetStateAction<ExtendedTemporaryPurchase[]>>
  addressCountry: ICountry
  addressState: IState | null
  addressCity: ICity | null
  setAddressCountry: React.Dispatch<React.SetStateAction<ICountry>>
  setAddressState: React.Dispatch<React.SetStateAction<IState | null>>
  setAddressCity: React.Dispatch<React.SetStateAction<ICity | null>>
  confirmPayment: boolean
  setConfirmPayment: React.Dispatch<React.SetStateAction<boolean>>
}

const initialOrderContext: OrderContextInterface = {
  purchaseList: [],
  setPurchaseList: () => null,
  tempPurchaseList: [],
  setTempPurchaseList: () => null,
  addressCountry: Country.getCountryByCode('VN') as ICountry,
  addressState: null,
  addressCity: null,
  setAddressCountry: () => null,
  setAddressState: () => null,
  setAddressCity: () => null,
  confirmPayment: false,
  setConfirmPayment: () => null
}

export const OrderContext = createContext<OrderContextInterface>(initialOrderContext)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchaseList, setPurchaseList] = useState<ExtendsPurchase[]>(initialOrderContext.purchaseList)
  const [tempPurchaseList, setTempPurchaseList] = useState<ExtendedTemporaryPurchase[]>(
    initialOrderContext.tempPurchaseList
  )
  const [addressCountry, setAddressCountry] = useState<ICountry>(initialOrderContext.addressCountry)
  const [addressState, setAddressState] = useState<IState | null>(initialOrderContext.addressState)
  const [addressCity, setAddressCity] = useState<ICity | null>(initialOrderContext.addressCity)
  const [confirmPayment, setConfirmPayment] = useState<boolean>(initialOrderContext.confirmPayment)

  return (
    <OrderContext.Provider
      value={{
        purchaseList,
        setPurchaseList,
        tempPurchaseList,
        setTempPurchaseList,
        addressCountry,
        addressState,
        addressCity,
        setAddressCountry,
        setAddressState,
        setAddressCity,
        confirmPayment,
        setConfirmPayment
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
