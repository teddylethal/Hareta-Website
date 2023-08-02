import { ImageListRespone, ImageListConfig } from 'src/types/productImage.type'
import http from 'src/utils/http'

const URL = 'item-image'

const producImageApi = {
  getImageList(params: ImageListConfig) {
    return http.get<ImageListRespone>(`${URL}/`, { params })
  }
}

export default producImageApi
