import React, { createContext, useState } from 'react'
import { Product } from 'src/types/product.type'
import { ProductImage } from 'src/types/productImage.type'

interface AdminContextInterface {
  productGroupId: string | null
  setProductGroupId: React.Dispatch<React.SetStateAction<string | null>>
  currentProduct: Product | null
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>
  currentImage: ProductImage | null
  setCurrentImage: React.Dispatch<React.SetStateAction<ProductImage | null>>
  orderID: string
  setOrderID: React.Dispatch<React.SetStateAction<string>>
}

const initialAdminContext: AdminContextInterface = {
  productGroupId: null,
  setProductGroupId: () => null,
  currentProduct: null,
  setCurrentProduct: () => null,
  currentImage: null,
  setCurrentImage: () => null,
  orderID: '',
  setOrderID: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [productGroupId, setProductGroupId] = useState<string | null>(initialAdminContext.productGroupId)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(initialAdminContext.currentProduct)
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(initialAdminContext.currentImage)
  const [orderID, setOrderID] = useState<string>(initialAdminContext.orderID)

  return (
    <AdminContext.Provider
      value={{
        productGroupId,
        setProductGroupId,
        currentProduct,
        setCurrentProduct,
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
