import { createContext, useState } from 'react'
import { Purchase, TemporaryPurchase } from 'src/types/cart.type'
import { getExtendedPurchasesFromLS, getExtendedTempPurchasesFromLS } from 'src/utils/cartInLS'

export interface ExtendsPurchase extends Purchase {
  disabled: boolean
  checked: boolean
  previousQuantity: number
}

interface CartContextInterface {
  extendedPurchases: ExtendsPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendsPurchase[]>>
  tempExtendedPurchase: TemporaryPurchase[]
  setTempExtendedPurchase: React.Dispatch<React.SetStateAction<TemporaryPurchase[]>>
  unavailablePurchaseIds: string[]
  setUnavailablePurchaseIds: React.Dispatch<React.SetStateAction<string[]>>
}

const initialcartContext: CartContextInterface = {
  extendedPurchases: getExtendedPurchasesFromLS(),
  setExtendedPurchases: () => null,
  tempExtendedPurchase: getExtendedTempPurchasesFromLS(),
  setTempExtendedPurchase: () => null,
  unavailablePurchaseIds: [],
  setUnavailablePurchaseIds: () => null
}

export const CartContext = createContext<CartContextInterface>(initialcartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendsPurchase[]>(initialcartContext.extendedPurchases)
  const [tempExtendedPurchase, setTempExtendedPurchase] = useState<TemporaryPurchase[]>(
    initialcartContext.tempExtendedPurchase
  )
  const [unavailablePurchaseIds, setUnavailablePurchaseIds] = useState<string[]>(
    initialcartContext.unavailablePurchaseIds
  )

  return (
    <CartContext.Provider
      value={{
        extendedPurchases,
        setExtendedPurchases,
        tempExtendedPurchase,
        setTempExtendedPurchase,
        unavailablePurchaseIds,
        setUnavailablePurchaseIds
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
