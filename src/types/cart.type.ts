import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
  id: string
  status: number
  created_at: string
  updated_at: string
  quantity: number
  item: Product
}

export interface TemporaryPurchase {
  id: string
  quantity: number
  item: Product
}

export interface PurchaseList {
  data: Purchase[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}
