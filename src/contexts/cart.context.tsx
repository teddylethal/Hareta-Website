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
}

const initialcartContext: CartContextInterface = {
  extendedPurchases: getExtendedPurchasesFromLS(),
  setExtendedPurchases: () => null,
  tempExtendedPurchase: getExtendedTempPurchasesFromLS(),
  setTempExtendedPurchase: () => null
}

export const CartContext = createContext<CartContextInterface>(initialcartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendsPurchase[]>(initialcartContext.extendedPurchases)
  const [tempExtendedPurchase, setTempExtendedPurchase] = useState<TemporaryPurchase[]>(
    initialcartContext.tempExtendedPurchase
  )

  return (
    <CartContext.Provider
      value={{ extendedPurchases, setExtendedPurchases, tempExtendedPurchase, setTempExtendedPurchase }}
    >
      {children}
    </CartContext.Provider>
  )
}
