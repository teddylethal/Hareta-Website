import { createContext, useState } from 'react'
import { Purchase, TemporaryPurchase } from 'src/types/cart.type'
import { getExtendedPurchasesFromLS, getTemporaryPurchasesFromLS } from 'src/utils/cartInLS'

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
  previousQuantity: number
  discount: number
}

export interface ExtendedTemporaryPurchase extends TemporaryPurchase {
  disabled: boolean
  checked: boolean
  previousQuantity: number
  discount: number
}

interface CartContextInterface {
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  temporaryPurchases: Purchase[]
  setTemporaryPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>
  unavailablePurchaseIds: string[]
  setUnavailablePurchaseIds: React.Dispatch<React.SetStateAction<string[]>>
}

const initialcartContext: CartContextInterface = {
  extendedPurchases: getExtendedPurchasesFromLS(),
  setExtendedPurchases: () => null,
  temporaryPurchases: getTemporaryPurchasesFromLS(),
  setTemporaryPurchases: () => null,
  unavailablePurchaseIds: [],
  setUnavailablePurchaseIds: () => null
}

export const CartContext = createContext<CartContextInterface>(initialcartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialcartContext.extendedPurchases)
  const [temporaryPurchases, setTemporaryPurchases] = useState<Purchase[]>(initialcartContext.temporaryPurchases)
  const [unavailablePurchaseIds, setUnavailablePurchaseIds] = useState<string[]>(
    initialcartContext.unavailablePurchaseIds
  )

  return (
    <CartContext.Provider
      value={{
        extendedPurchases,
        setExtendedPurchases,
        temporaryPurchases,
        setTemporaryPurchases,
        unavailablePurchaseIds,
        setUnavailablePurchaseIds
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
