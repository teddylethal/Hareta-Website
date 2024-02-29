import React, { createContext, useState } from 'react'
import { Product, ProductGroup } from 'src/types/product.type'
import { ProductImage } from 'src/types/productImage.type'

interface AdminContextInterface {
  productGroup: ProductGroup | null
  setProductGroup: React.Dispatch<React.SetStateAction<ProductGroup | null>>
  currentProduct: Product | null
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>
  currentProductDetail: Product | null
  setCurrentProductDetail: React.Dispatch<React.SetStateAction<Product | null>>
  currentImage: ProductImage | null
  setCurrentImage: React.Dispatch<React.SetStateAction<ProductImage | null>>
  orderID: string
  setOrderID: React.Dispatch<React.SetStateAction<string>>
}

const initialAdminContext: AdminContextInterface = {
  productGroup: null,
  setProductGroup: () => null,
  currentProduct: null,
  setCurrentProduct: () => null,
  currentProductDetail: null,
  setCurrentProductDetail: () => null,
  currentImage: null,
  setCurrentImage: () => null,
  orderID: '',
  setOrderID: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [productGroup, setProductGroup] = useState<ProductGroup | null>(initialAdminContext.productGroup)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(initialAdminContext.currentProduct)
  const [currentProductDetail, setCurrentProductDetail] = useState<Product | null>(initialAdminContext.currentProduct)
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(initialAdminContext.currentImage)
  const [orderID, setOrderID] = useState<string>(initialAdminContext.orderID)

  return (
    <AdminContext.Provider
      value={{
        productGroup,
        setProductGroup,
        currentProduct,
        setCurrentProduct,
        currentProductDetail,
        setCurrentProductDetail,
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
