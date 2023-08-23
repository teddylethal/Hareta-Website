const path = {
  home: '/',
  login: '/login',
  register: '/register',
  requestVerify: '/requestVerify',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  temporaryCart: '/temporary+cart',
  user: '/user',
  profile: '/user/profile',
  wishList: '/user/wishlist',
  inventory: '/user/inventory',
  password: '/user/password',
  verifyEmail: '/check-verification-code/:code',
  passwordRecovery: '/password-recovery'
} as const

export default path
