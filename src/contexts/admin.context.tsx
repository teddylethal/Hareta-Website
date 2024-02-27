import React, { createContext, useState } from 'react'
import { Product, ProductGroup } from 'src/types/product.type'
import { ProductImage } from 'src/types/productImage.type'

interface AdminContextInterface {
  ProductGroup: ProductGroup | null
  setProductGroup: React.Dispatch<React.SetStateAction<ProductGroup | null>>
  currentItem: Product | null
  setCurrentItem: React.Dispatch<React.SetStateAction<Product | null>>
  currentImage: ProductImage | null
  setCurrentImage: React.Dispatch<React.SetStateAction<ProductImage | null>>
  orderID: string
  setOrderID: React.Dispatch<React.SetStateAction<string>>
}

const initialAdminContext: AdminContextInterface = {
  ProductGroup: null,
  setProductGroup: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  currentImage: null,
  setCurrentImage: () => null,
  orderID: '',
  setOrderID: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [ProductGroup, setProductGroup] = useState<ProductGroup | null>(initialAdminContext.ProductGroup)
  const [currentItem, setCurrentItem] = useState<Product | null>(initialAdminContext.currentItem)
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(initialAdminContext.currentImage)
  const [orderID, setOrderID] = useState<string>(initialAdminContext.orderID)

  return (
    <AdminContext.Provider
      value={{
        ProductGroup,
        setProductGroup,
        currentItem,
        setCurrentItem,
        currentImage,
        setCurrentImage,
        orderID,
        setOrderID
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
