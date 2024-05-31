import axios, { AxiosError, type AxiosInstance } from 'axios'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { ErrorRespone } from 'src/types/utils.type'
import { HttpErrorKeys } from 'src/constants/httpResponeErrorKey'

// export const ApiURL = 'https://api.hareta.online/'
export const ApiURL = 'http://localhost:3000/'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: ApiURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = 'Bearer ' + this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login') {
          const accessToken = response.data.data.token
          if (accessToken !== undefined) {
            this.accessToken = accessToken
            setAccessTokenToLS(accessToken)
          }
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.BadRequest) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // console.log(error)

        const errorKey = (error.response?.data as ErrorRespone).error_key
        if (
          (error.response?.data as ErrorRespone).status_code === HttpStatusCode.InternalServerError ||
          errorKey == HttpErrorKeys.NoPermission
        ) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
