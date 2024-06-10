import axios, { AxiosHeaders } from 'axios'
import { Country } from 'src/types/location.type'

export const locationApi = {
  getCountryList() {
    const headers = {
      'X-CSCAPI-KEY': 'API_KEY'
    }
    return axios.get<Country[]>('https://api.countrystatecity.in/v1/countries', {
      headers: {
        'X-CSCAPI-KEY': 'API_KEY'
      }
    })
  },

  testApi() {
    return axios.get(
      'http://a63b08641a04348858b07d0c71ac3eba-733487664.ap-southeast-1.elb.amazonaws.com:3000/v1/message?thread_id=thread_BLkBP2UQrn6PTuemDfKKigxv',
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOiIwMThmZTJjOS1kOGZmLTdhZTctOTEwOC0xYTAzZThlYTU1ZDEiLCJyb2xlIjoidXNlciIsInNlc3Npb25faWQiOiJmYllVZ1lhZWxPS1ZzY0p2dkhpZyJ9LCJleHAiOjE3MzMzMjczNTYsImlhdCI6MTcxNzU1OTM1Nn0.FRTCNxeFjqdl0GSRr9DYXLE8Qg6tE_ZU9Oj-e4HDF30`,
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
