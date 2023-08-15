import { User } from 'src/types/user.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

// interface BodyUpdateProfile extends Omit<User, 'id' | 'status' | 'create_at' | 'update_at'> {}

interface BodyChangePassword {
  old_password: string
  new_password: string
  confirm_password: string
}

export const userApi = {
  getProfile() {
    return http.get<SuccessRespone<User>>('auth/')
  },
  updateProfile(body: Omit<User, 'id' | 'status' | 'create_at' | 'update_at'>) {
    return http.put<SuccessRespone<User>>('user', body)
  },
  changePassword(body: BodyChangePassword) {
    return http.post<SuccessRespone<User>>('auth/change-password', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessRespone<string>>('auth/avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
