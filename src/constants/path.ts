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
