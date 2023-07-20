import { AuthRespone } from 'src/types/auth.type'
import { User } from 'src/types/user.type'
import { clearLS } from 'src/utils/auth'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string; name: string; phone: string }) => {
  return http.post<AuthRespone>('/register', body)
}

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthRespone>('/login', body)
}

export const logout = () => {
  clearLS()
}
