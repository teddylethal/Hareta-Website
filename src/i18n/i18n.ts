import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

//? ENGLISH
import HEADER_EN from 'src/locales/en/header.json'
import FOOTER_EN from 'src/locales/en/footer.json'
import HOME_EN from 'src/locales/en/home.json'
import STORE_EN from 'src/locales/en/store.json'
import SUPPORT_EN from 'src/locales/en/support.json'

//? VIETNAMESE
import HEADER_VI from 'src/locales/vi/header.json'
import FOOTER_VI from 'src/locales/vi/footer.json'
import HOME_VI from 'src/locales/vi/home.json'
import STORE_VI from 'src/locales/vi/store.json'
import SUPPORT_VI from 'src/locales/vi/support.json'

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
    footer: FOOTER_EN,
    home: HOME_EN,
    store: STORE_EN,
    support: SUPPORT_EN
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI,
    home: HOME_VI,
    store: STORE_VI,
    support: SUPPORT_VI
  }
} as const

export const defaultNS = 'header'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['header', 'footer', 'home', 'store', 'support'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
