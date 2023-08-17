import axios, { AxiosError, type AxiosInstance } from 'axios'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth'
import path from 'src/constants/path'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { ErrorRespone } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api.hareta.me/',
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
        if (url === path.login || url === path.register) {
          this.accessToken = response.data.data.token
          setAccessTokenToLS(this.accessToken)
          // const headers = response.config.headers
          // axios.get<ProfileRespone>('https://api.hareta.me/auth/', { headers }).then((userResponse) => {
          //   console.log(userResponse.data.data)
          //   setProfileToLS(userResponse.data.data)
          // })
        }
        // else if (url === '/logout') {
        //   this.accessToken = ''
        //   clearLS()
        // }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.BadRequest) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        console.log(error)
        if ((error.response?.data as ErrorRespone).status_code === 500) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
