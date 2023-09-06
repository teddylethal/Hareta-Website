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
  order: '/order',
  shippingInfor: '/order/shipping-information',
  payment: '/order/payment'
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
  deleteItemImage: '/admin/item-image/delete',
  deletingPage: '/admin/delete',
  deleteGroup: '/admin/delete/group',
  deleteItem: '/admin/delete/item'
} as const

export default path
