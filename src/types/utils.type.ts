export interface ResponeApi<Data> {
  message: string
  data?: Data
  error_key: string
  status_code: number
  log: string
}
