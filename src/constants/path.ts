const mainPath = {
  home: '/',
  login: '/login',
  register: '/register',
  requestVerify: '/request-verify',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  wishList: '/user/wishlist',
  inventory: '/user/inventory',
  password: '/user/password',
  verifyEmail: '/check-verification-code/:code',
  AuthPasswordRecoveryRequestEmail: '/password-recovery',
  AuthPasswordRecovery: '/password-recovery/:slug',
  order: '/order',
  shippingInfor: '/order/shipping-information',
  payment: '/order/payment',
  orderTracking: '/order-tracking',
  orderInformation: '/order-tracking/:orderId',
  privacyAndTerms: '/privacy-and-terms'
} as const
export default mainPath

export const adminPath = {
  mainPage: '/admin',

  // Product
  products: '/admin/product',
  productList: '/admin/product/list',
  productDetail: '/admin/product/:nameId',
  createProductGroup: '/admin/product/create-group',
  createProduct: '/admin/product/create-product',
  updateProduct: '/admin/product/update/item',
  productImage: '/admin/product/image',
  uploadProductAvatar: '/admin/product/image/avatar',
  addProductImage: '/admin/product/image/add',
  deleteProductImage: '/admin/product/image/delete',
  deleteProductPage: '/admin/product/delete',
  deleteGroup: '/admin/product/delete/delete-group',
  deleteProduct: '/admin/product/delete/delete-product',

  // Image
  images: '/admin/images',
  uploadImages: '/admin/images/upload',
  deleteImages: '/admin/images/delete',

  // Order
  orders: '/admin/orders',

  // Blog
  blogs: '/admin/blogs',
  blogDetail: '/admin/blogs/:blogId',
  blogCreate: '/admin/blogs/create',
  blogTags: '/admin/blogs/tags'
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
