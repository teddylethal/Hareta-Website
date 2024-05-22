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
  }
}
