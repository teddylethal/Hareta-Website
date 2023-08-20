import { createContext, useState } from 'react'
import { Purchase, TemporaryPurchase } from 'src/types/cart.type'

export interface ExtendsPurchase extends Purchase {
  disabled: boolean
  checked: boolean
  previousQuantity: number
}

interface CartContextInterface {
  extendedPurchases: ExtendsPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendsPurchase[]>>
  purchasesInLS: TemporaryPurchase[]
  setPurchasesInLS: React.Dispatch<React.SetStateAction<TemporaryPurchase[]>>
}

const initialcartContext: CartContextInterface = {
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  purchasesInLS: [],
  setPurchasesInLS: () => null
}

export const CartContext = createContext<CartContextInterface>(initialcartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendsPurchase[]>([])
  const [purchasesInLS, setPurchasesInLS] = useState<TemporaryPurchase[]>([])

  return (
    <CartContext.Provider value={{ extendedPurchases, setExtendedPurchases, purchasesInLS, setPurchasesInLS }}>
      {children}
    </CartContext.Provider>
  )
}
