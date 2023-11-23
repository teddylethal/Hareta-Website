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
  itemManagement: '/admin/item',
  createItem: '/admin/item/create-item',
  addItemColor: '/admin/item/create-color',
  uploadItemAvatar: '/admin/item/update/item-avatar',
  updateItem: '/admin/item/update/item',
  setDefaultItem: '/admin/item/update/set-default-item',
  addItemImage: '/admin/item/item-image/add',
  deleteItemImage: '/admin/item/item-image/delete',
  deleteGroup: '/admin/item/delete-group',
  deleteItem: '/admin/item/delete-item',
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
