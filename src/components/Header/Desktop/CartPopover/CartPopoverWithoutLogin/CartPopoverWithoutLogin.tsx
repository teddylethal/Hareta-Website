import Popover from 'src/components/Popover'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { useContext } from 'react'
import { CartContext } from 'src/contexts/cart.context'

export default function CartPopoverWithoutLogin() {
  const { purchasesInLS, setPurchasesInLS } = useContext(CartContext)

  const navigate = useNavigate()

  const handleBuyItem = () => {
    navigate('profile')
  }

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = purchasesInLS[purchaseIndex].id
    const newPurchaseList = purchasesInLS.filter((purchase) => purchase.id !== purchaseId)
    setPurchasesInLS(newPurchaseList)
  }

  return (
    <div className='rounded-md bg-vintageColor/80 text-textVintage hover:bg-vintageColor dark:bg-haretaColor/90 dark:hover:bg-haretaColor/70'>
      <Popover
        className='flex border border-none px-1.5 py-1 lg:px-2'
        renderPopover={
          <div className='relative -top-1 w-[360px] rounded-md border-gray-200 bg-[#efefef] py-2 text-sm text-textDark shadow-md dark:bg-[#202020] dark:text-textLight lg:top-0'>
            <div className=''>
              <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 lg:text-lg'>
                {purchasesInLS.length} items in cart
              </div>
              <div className='m-2 overflow-auto rounded-md bg-[#f8f8f8] dark:bg-[#101010]'>
                {purchasesInLS.length > 0 ? (
                  <div>
                    <div className='max-h-[360px] min-h-[240px] overflow-y-auto '>
                      {purchasesInLS.map((purchase, index) => (
                        <div
                          className='flex items-center  p-3 hover:bg-[#e8e8e8] dark:hover:bg-black'
                          key={purchase.id}
                        >
                          <div className='h-14 w-14'>
                            <div className='relative w-full  pt-[100%]'>
                              <img
                                src={
                                  purchase?.item.avatar
                                    ? purchase?.item.avatar.url
                                    : 'https://cdn-icons-png.flaticon.com/128/5058/5058055.png'
                                }
                                alt={purchase.item.name}
                                className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                              />
                            </div>
                          </div>
                          {/* <img
                      src={
                        item.item.avatar
                          ? item.item.avatar.url
                          : 'https://cdn-icons-png.flaticon.com/128/5058/5058055.png'
                      }
                      alt={item.item.name}
                      className='h-12 w-12 object-cover'
                    /> */}
                          <div className='flex grow flex-col justify-between'>
                            <div className='flex items-center justify-between'>
                              <Link
                                to={`${path.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                                className='flex'
                              >
                                <p className='text-md truncate px-2 capitalize hover:text-[#E76161] dark:hover:text-haretaColor lg:text-base'>
                                  {purchase.item.name}
                                </p>
                              </Link>
                              <span className='flex-shrink-0 text-orange-600'>
                                ${formatCurrency(purchase.item.price)}
                              </span>
                            </div>
                            <div className='ml-2 flex justify-between'>
                              <span className='text-gray-500 dark:text-gray-400'>x{purchase.quantity}</span>

                              <div className='flex space-x-3'>
                                <button
                                  className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                                  onClick={handleBuyItem}
                                >
                                  Buy
                                </button>
                                <button
                                  className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                                  onClick={handleRemove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className=''>
                    <img src='/images/empty_cart.png' alt='Empty cart' className='m-2' />
                  </div>
                )}
              </div>
            </div>
            {/* <div className='mx-3 my-3 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' /> */}

            <div className='mx-3 mb-2 mt-4 flex items-center justify-between'>
              <Link to={path.store}>
                <Button className='justify-self-start px-4 py-1 text-sm'>Store</Button>
              </Link>
              <Link to={path.temporaryCart}>
                <Button className='justify-self-start px-4 py-1 text-sm'>Enter Cart</Button>
              </Link>
            </div>
            <div className='absolute -top-4 right-0 h-4 w-1/4 bg-none'></div>
          </div>
        }
        placement='bottom-end'
      >
        <Link to={path.temporaryCart} className='flex items-center space-x-1'>
          <FontAwesomeIcon icon={faCartShopping} />
          <div>Cart</div>
        </Link>
      </Popover>
    </div>
  )
}