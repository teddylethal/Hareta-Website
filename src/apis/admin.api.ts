import { ProductGroup, ProductGroupList } from 'src/types/admin.type'
import { OrderList } from 'src/types/order.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'auth'

interface NewItemForm {
  name: string
  group_id: string
  category: string
  collection: string
  type: string
  quantity: number
  price: number
  product_line: string
  color: string
  description: string
}

interface UpdateItemForm {
  id: string
  name?: string
  category?: string
  collection?: string
  type?: string
  color?: string
  product_line?: string
  description?: string
  price?: number
  quantity?: number
  discount?: number
  tag?: number
  like_count?: number
  sold?: number
  cron_status?: number
}

interface UpdateProductAvatarForm {
  item_id: string
  file: FormData
  color: string
}

export const adminProductGroupApi = {
  getProductGroups() {
    return http.get<ProductGroupList>(`${URL}/group-item/`)
  },
  createProductGroup(body: { name: string }) {
    return http.post<SuccessRespone<ProductGroup>>(`${URL}/group-item/`, body)
  },
  updateProductGroup(id: string, name: string) {
    return http.put<SuccessRespone<string>>(`${URL}/group-item`, { id: id, name: name })
  },
  deleteProductGroup(body: { id: string }) {
    return http.delete(`${URL}/group-item/`, { data: body })
  }
}

export const adminItemApi = {
  createNewItem(body: NewItemForm) {
    return http.post(`${URL}/item/`, body)
  },
  updateItem(body: UpdateItemForm) {
    return http.put<SuccessRespone<string>>(`${URL}/item/`, body)
  },
  setDefaultItem(body: { id: string }) {
    return http.put<SuccessRespone<string>>(`${URL}/item/default`, body)
  },
  uploadProductAvatar(body: { id: string; file: File }) {
    return http.put<SuccessRespone<string>>(`${URL}/item/avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteItem(body: { id: string }) {
    return http.delete(`${URL}/item/`, { data: body })
  }
}

export const adminItemImageApi = {
  addImage(body: UpdateProductAvatarForm) {
    return http.post<SuccessRespone<string>>(`/item-image/`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteImage(body: { id: string }) {
    return http.delete(`/item-image/`, { data: body })
  }
}

interface OrderListConfig {
  status: number
  page: number
  limit: number
}

export const adminOrderApi = {
  getOrderList(params: OrderListConfig) {
    return http.get<OrderList>(`${URL}/order/admin`, { params })
  },
  updateOrder(body: { id: string; status: number }) {
    return http.put<SuccessRespone<string>>(`${URL}/order/`, body)
  }
}
