const mainPath = {
  home: '/',
  login: '/login',
  register: '/register',
  requestVerify: '/request-verify',
  store: '/store',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  blogs: '/blogs',
  events: '/events',
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
  products: '/admin/products',
  productList: '/admin/products/list',
  productDetail: '/admin/products/:nameId',
  createProductGroup: '/admin/products/create-group',
  createProduct: '/admin/products/create-product',
  updateProduct: '/admin/products/update/item',
  productImage: '/admin/products/image',
  uploadProductAvatar: '/admin/products/image/avatar',
  addProductImage: '/admin/products/image/add',
  deleteProductImage: '/admin/products/image/delete',
  deleteProductPage: '/admin/products/delete',
  deleteGroup: '/admin/products/delete/delete-group',
  deleteProduct: '/admin/products/delete/delete-product',

  // Image
  images: '/admin/images',
  uploadImages: '/admin/images/upload',
  deleteImages: '/admin/images/delete',

  // Order
  orders: '/admin/orders',

  // Blog
  blogs: '/admin/blogs',
  blogDetail: '/admin/blogs/:blogId',
  blogCreate: '/admin/blogs/create'
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
