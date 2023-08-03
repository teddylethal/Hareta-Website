import { ImageListRespone, ImageListConfig } from 'src/types/productImage.type'
import http from 'src/utils/http'

const URL = 'item-image'

const LIMIT = 100

const producImageApi = {
  getImageList(id: string) {
    return http.get<ImageListRespone>(`${URL}/?page=1&limit=${LIMIT}&id=${id}`)
  }
}

export default producImageApi
