/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      newfont: [
        'Inter var',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    extend: {
      colors: {
        //? Header
        darkHeader: '#1d1d22',
        lightHeader: '#fbfbff',

        //? Main interface
        lightBg: '#ffffff',
        lightWhite900: '#fbfbff',
        lightWhite700: '#e9e9e8',
        lightWhite500: '#d6d6d5',
        darkBg: '#0e0e12',
        darkGray900: '#1d1d22',
        darkGray700: '#2c2c32',
        darkGray500: '#59595f',
        darkGray300: '#a7a7ab',

        //? Text
        textLight: '#EEEEEE',
        textDark: '#111111',
        haretaColor: '#ff8800',
        primaryColor: '#ff6600',
        textVintage: '#FFFBF5',
        vintageColor: '#A27B5C',

        //? Store sidebar
        barLightBg: '#e9e9e8',
        barDarkBg: '#1d1d22',
        sidebarItemLight: '#fbfbff',
        sidebarItemDark: '#2c2c32',

        //? States and badges
        success: '#4bb543',
        brownColor: '#B77729',
        orangeColor: '#ff6a00',
        sunYellow: '#ffc107',
        alertRed: '#ff0f0f',

        //? Products
        productDarkBg: '#1d1d22',
        productLightBg: '#F4F4F5',
        tagColor: '#ff3333',
        favouriteRed: '#ff2800',

        whiteColor: '#ffffff'
      }
    },
    screens: {
      mobileSmall: '320px',
      mobileLarge: '425px',
      tabletSmall: '640px',
      tablet: '768px',
      tabletLarge: '962px',
      desktop: '1024px',
      desktopLarge: '1440px'
    }
  },
  darkMode: 'class',
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        },
        '.header--dark': {
          backgroundColor: '#000'
        },
        '.header-container--light': {
          backgroundColor: '#eee'
        },
        '.main-session--dark': {
          backgroundColor: '#1e1e1e'
        }
      })
    })
  ]
}
