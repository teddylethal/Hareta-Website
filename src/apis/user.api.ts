import { User } from 'src/types/user.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

export const userApi = {
  getProfile() {
    return http.get<SuccessRespone<User>>('auth/')
  }
}

export default userApi
