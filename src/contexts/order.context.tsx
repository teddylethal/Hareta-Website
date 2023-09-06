import { createContext, useState } from 'react'
import { Purchase } from 'src/types/cart.type'

interface OrderContextInterface {
  purchaseList: Purchase[]
  setPurchaseList: React.Dispatch<React.SetStateAction<Purchase[]>>
}

const initialOrderContext: OrderContextInterface = {
  purchaseList: [],
  setPurchaseList: () => null
}

export const OrderContext = createContext<OrderContextInterface>(initialOrderContext)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchaseList, setPurchaseList] = useState<Purchase[]>([])

  return <OrderContext.Provider value={{ purchaseList, setPurchaseList }}>{children}</OrderContext.Provider>
}
