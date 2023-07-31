import { Product } from './product.type'
import { SuccessRespone } from './utils.type'

export interface StoreRespone {
  data: string[]
}

export type ProductRespone = SuccessRespone<{
  data: Product
}>
