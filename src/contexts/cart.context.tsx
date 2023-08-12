import { createContext, useState } from 'react'
import { Purchase } from 'src/types/cart.type'

export interface ExtendsPurchase extends Purchase {
  disabled: boolean
  checked: boolean
  previousQuantity: number
}

interface CartContextInterface {
  extendedPurchases: ExtendsPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendsPurchase[]>>
}

const initialcartContext: CartContextInterface = {
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const CartContext = createContext<CartContextInterface>(initialcartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendsPurchase[]>([])

  return <CartContext.Provider value={{ extendedPurchases, setExtendedPurchases }}>{children}</CartContext.Provider>
}
