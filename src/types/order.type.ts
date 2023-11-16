export interface Order {
  id: string
  status: number
  created_at: string
  updated_at: string
  address: string
  name: string
  email: string
  phone: string
  total: number
}

export interface OrderList {
  data: Order[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}

export interface ItemOrderConfig {
  order_id: string
  page: number | string
  limit: number | string
}
