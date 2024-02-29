const path = {
  home: '/',
  login: '/login',
  register: '/register',
  requestVerify: '/request-verify',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  profile: '/user/profile',
  wishList: '/user/wishlist',
  inventory: '/user/inventory',
  password: '/user/password',
  verifyEmail: '/check-verification-code/:code',
  requestPasswordRecovery: '/password-recovery',
  changePasswordRecovery: '/password-recovery/:slug',
  order: '/order',
  shippingInfor: '/order/shipping-information',
  payment: '/order/payment',
  orderTracking: '/order-tracking',
  orderInformation: '/order-tracking/:orderId',
  privacyAndTerms: '/privacy-and-terms'
} as const
export default path

export const adminPath = {
  mainPage: '/admin',

  //? Item
  products: '/admin/products',
  productDetail: '/admin/products/:nameId',
  createProductGroup: '/admin/products/create-item',
  addProduct: '/admin/products/create-color',
  uploadProductAvatar: '/admin/products/update/item-avatar',
  updateProduct: '/admin/products/update/item',
  setDefaultProduct: '/admin/products/update/set-default-item',
  addItemImage: '/admin/products/item-image/add',
  deleteItemImage: '/admin/products/item-image/delete',
  deleteGroup: '/admin/products/delete-group',
  deleteItem: '/admin/products/delete-item',

  //? Image
  image: '/admin/images',
  orderManagemnet: '/admin/order'
} as const

export const privacyPath = {
  ProductInformation: 'productInformation',
  OrderingAndPayments: 'orderingAndPayments',
  ShippingAndDelivery: 'shippingAndDelivery',
  ReturnsAndRefunds: 'returnsAndRefunds',
  ProductWarranty: 'productWarranty',
  IntellectualProperty: 'intellectualProperty',
  InformationCollection: 'informationCollection',
  UseOfInformation: 'useOfInformation',
  DataProtection: 'dataProtection',
  SharingOfInformation: 'sharingOfInformation',
  CookiesAndTracking: 'cookiesAndTracking',
  ThirdPartyLinks: 'thirdPartyLinks',
  ChildrenPrivacy: 'childrenPrivacy',
  ChangeToThePrivacyPolicy: 'changeToThePrivacyPolicy',
  TermAndConditions: 'termAndConditions'
}
