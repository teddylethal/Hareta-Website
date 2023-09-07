import { createContext, useState } from 'react'
import { ExtendsPurchase } from './cart.context'
import { ExtendedTemporaryPurchase } from 'src/pages/Cart/UnauthenticatedCart/UnauthenticatedCart'

interface OrderContextInterface {
  purchaseList: ExtendsPurchase[]
  setPurchaseList: React.Dispatch<React.SetStateAction<ExtendsPurchase[]>>
  tempPurchaseList: ExtendedTemporaryPurchase[]
  setTempPurchaseList: React.Dispatch<React.SetStateAction<ExtendedTemporaryPurchase[]>>
}

const initialOrderContext: OrderContextInterface = {
  purchaseList: [],
  setPurchaseList: () => null,
  tempPurchaseList: [],
  setTempPurchaseList: () => null
}

export const OrderContext = createContext<OrderContextInterface>(initialOrderContext)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchaseList, setPurchaseList] = useState<ExtendsPurchase[]>(initialOrderContext.purchaseList)
  const [tempPurchaseList, setTempPurchaseList] = useState<ExtendedTemporaryPurchase[]>(
    initialOrderContext.tempPurchaseList
  )

  return (
    <OrderContext.Provider value={{ purchaseList, setPurchaseList, tempPurchaseList, setTempPurchaseList }}>
      {children}
    </OrderContext.Provider>
  )
}
