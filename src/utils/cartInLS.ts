import { ExtendedTemporaryPurchase } from 'src/pages/Cart/UnauthenticatedCart/UnauthenticatedCart'

export const getCartFromLS = (): ExtendedTemporaryPurchase[] => {
  const res = localStorage.getItem('temporary_cart')
  return res ? JSON.parse(res) : []
}

export const setTemporaryCartToLs = (cart: ExtendedTemporaryPurchase[]) => {
  // const index = cart.findIndex((itemInCart) => itemInCart.id === item.id)
  // console.log(index)
  // if (index) {
  //   const newQuantity = cart[index].quantity + 1
  //   const newPrevQuantity = cart[index].previousQuantity + 1
  //   cart[index].quantity = newQuantity
  //   cart[index].previousQuantity = newPrevQuantity
  // } else {
  //   cart.push({ ...item, quantity: 1, previousQuantity: 0 })
  // }
  localStorage.setItem('temporary_cart', JSON.stringify(cart))
}
