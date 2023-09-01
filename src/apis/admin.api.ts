import { ItemGroup, ItemGroupList } from 'src/types/admin.type'
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
  quantity?: number
  description?: string
  collection?: string
  type?: string
  price?: number
  discount?: number
  product_line?: string
  color?: string
  group_id?: string
}

interface UpdateItemAvatarForm {
  item_id: string
  file: FormData
  color: string
}

export const adminItemGroupApi = {
  getItemGroups() {
    return http.get<ItemGroupList>(`${URL}/group-item`)
  },
  createItemGroup(body: { name: string }) {
    return http.post<SuccessRespone<ItemGroup>>(`${URL}/group-item`, body)
  },
  updateItemGroup(id: string, name: string) {
    return http.put<SuccessRespone<string>>(`${URL}/group-item`, { id: id, name: name })
  },
  deleteItemGroup(body: { id: string }) {
    return http.delete(`${URL}/group-item`, { data: body })
  }
}

export const adminItemApi = {
  createNewItem(body: NewItemForm) {
    return http.post(`${URL}/item`, body)
  },
  updateItem(body: UpdateItemForm) {
    return http.put<SuccessRespone<string>>(`${URL}/item`, body)
  },
  makeDefaultItem(id: string) {
    return http.post<SuccessRespone<string>>(`${URL}/item/default`, { id: id })
  },
  uploadItemAvatar(body: { id: string; file: File }) {
    return http.put<SuccessRespone<string>>(`${URL}/item/avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteItem(body: { id: string }) {
    return http.delete(`${URL}/item`, { data: body })
  }
}

export const adminItemImageApi = {
  addImage(body: UpdateItemAvatarForm) {
    return http.post<SuccessRespone<string>>(`${URL}/item-image`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteImage(body: { id: string }) {
    return http.delete(`${URL}/item-image`, { data: body })
  }
}
