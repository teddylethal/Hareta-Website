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
  changePasswordRecovery: '/passwordRecovery/:slug'
} as const

export const adminPath = {
  mainPage: '/admin',
  creatingPage: '/admin/create',
  createItem: '/admin/create/item',
  addItemColor: '/admin/create/add-color',
  updatingPage: '/admin/update',
  uploadItemAvatar: '/admin/update/item-avatar',
  updateItem: '/admin/update/item',
  setDefaultItem: '/admin/update/default-item',
  images: '/admin/item-image',
  addItemImage: '/admin/item-image/add',
  deletingPage: '/admin/delete',
  delteGroup: '/admin/delete/group',
  deleteItem: '/admin/delete/item',
  deleteItemImage: '/admin/delete/item-image'
} as const

export default path
