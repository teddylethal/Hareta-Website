const path = {
  home: '/',
  login: '/login',
  register: '/register',
  requestVerify: '/requestVerify',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  wishList: '/user/wishlist',
  inventory: '/user/inventory',
  password: '/user/password',
  verifyEmail: '/check-verification-code/:code',
  requestPasswordRecovery: '/passwordRecovery',
  changePasswordRecovery: '/passwordRecovery/:slug'
} as const

export default path
