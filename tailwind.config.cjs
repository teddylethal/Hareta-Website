/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hareta_color: ' #ffa500',
        text_color: '#eee',
        dark_theme: '#1e1e1e'
      }
    }
  },
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
