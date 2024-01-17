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
        lightHeader: '#ebebee',

        //? Main interface
        darkBg: '#0e0e12',
        lightBg: '#ffffff',

        //? Text
        textLight: '#EEEEEE',
        textDark: '#111111',
        haretaColor: '#ff8800',
        primaryColor: '#ff7700',
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

        //? Cards
        productDarkBg: '#2c2c32',
        productLightBg: '#e6e6e5'
      }
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
