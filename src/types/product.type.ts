export interface Product {
  id: string
  status: number
  created_at: string
  updated_at: string
  name: string
  category: string
  quantity: number
  discount: number
  description: string
  collection: string
  type: string
  price: number
  like_count: number
  product_line: string
  avatar: {
    id: string
    status: number
    created_at: string
    updated_at: string
    url: string
    file_name: string
    width: number
    height: number
    cloud_name: string
    extension: string
  }
}

export interface ProductList {
  data: Product[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}

export interface ProductListConfig {
  id?: string
  page?: number | string
  limit?: number | string
  category?: string
  collection?: string
  type?: string
  product_line?: string
  lower_price?: number | string
  upper_price?: number | string
}

export interface FavouriteListConfig {
  page: number
  limit: number
}
