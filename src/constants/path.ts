const path = {
  home: '/',
  login: '/login',
  register: '/register',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  wishList: '/user/wishlist',
  inventory: '/user/inventory'
} as const

export default path
