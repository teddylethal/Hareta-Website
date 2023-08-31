const path = {
  home: '/',
  login: '/login',
  register: '/register',
  requestVerify: '/requestVerify',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  account: '/user/account',
  wishList: '/user/wishlist',
  inventory: '/user/inventory',
  password: '/user/password',
  verifyEmail: '/check-verification-code/:code',
  requestPasswordRecovery: '/passwordRecovery',
  changePasswordRecovery: '/passwordRecovery/:slug',
  admin: '/auth/admin',
  adminCreateItem: '/auth/admin/create-item',
  adminAddColor: '/auth/admin/add-color',
  adminUploadItemAvatar: '/auth/admin/item-avatar'
} as const

export default path
