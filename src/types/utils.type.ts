export interface ErrorRespone<Data> {
  message: string
  data?: Data
  error_key: string
  status_code: number
  log: string
}

export interface SuccessRespone<Data> {
  message: string
  data: Data
}
