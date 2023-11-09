import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HEADER_EN from 'src/locales/en/header.json'
import STORE_EN from 'src/locales/en/store.json'
import HEADER_VI from 'src/locales/vi/header.json'
import STORE_VI from 'src/locales/vi/store.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    header: HEADER_EN,
    store: STORE_EN
  },
  vi: {
    header: HEADER_VI,
    store: STORE_VI
  }
} as const

export const defaultNS = 'header'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['header', 'home', 'store'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
