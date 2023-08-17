import { User } from 'src/types/user.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, 'id' | 'role' | 'status' | 'created_at' | 'updated_at'> {
  password?: string
  newPasswird?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessRespone<User>>('/auth/')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessRespone<string>>('/auth/', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessRespone<User>>('/auth/avatar/', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
