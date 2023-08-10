import Popover from 'src/components/Popover'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { AxiosResponse } from 'axios'
import { PurchaseList } from 'src/types/cart.type'
import Button from 'src/components/Button'
import emptyCart from 'src/assets/images/empty_cart.png'
import path from 'src/constants/path'

interface Props {
  cartData: AxiosResponse<PurchaseList, unknown> | undefined
}

export default function CartNav({ cartData }: Props) {
  const itemsInCart = cartData?.data.data

  const navigate = useNavigate()

  const handleBuyItem = () => {
    navigate('profile')
  }

  const handleRemoveItem = () => {
    return
  }

  return (
    <Popover
      className='flex border border-none px-1.5 py-1 lg:px-2'
      renderPopover={
        <div className='relative -top-1 w-[360px] rounded-md border-gray-200 bg-[#eee] py-2 text-sm text-textDark shadow-md dark:bg-[#333] dark:text-textLight lg:top-0'>
          {itemsInCart ? (
            <div className=''>
              <div className='px-3 py-1 text-base normal-case text-gray-500 dark:text-gray-300 lg:text-lg'>
                {cartData.data.paging.total} items in cart
              </div>

              <div className='h-[360px] max-h-[440px] overflow-y-auto'>
                {itemsInCart.map((item) => (
                  <div className='flex items-center space-x-3 p-3 hover:bg-[#ccc] dark:hover:bg-[#222]' key={item.id}>
                    <div className='h-14 w-14'>
                      <div className='relative w-full  bg-[#dfdfdf] pt-[100%] dark:bg-[#101010]'>
                        <img
                          src={
                            item?.item.avatar
                              ? item?.item.avatar.url
                              : 'https://cdn-icons-png.flaticon.com/128/5058/5058055.png'
                          }
                          alt={item.item.name}
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
                        <Link to='/' className='flex'>
                          <p className='text-md truncate px-2 capitalize hover:text-vintageColor dark:hover:text-haretaColor lg:text-base'>
                            {item.item.name}
                          </p>
                        </Link>
                        <span className='flex-shrink-0 text-orange-600'>${item.item.price}</span>
                      </div>
                      <div className='ml-2 flex justify-between'>
                        <span className='text-gray-500 dark:text-gray-400'>x{item.quantity}</span>

                        <div className='flex space-x-3'>
                          <button
                            className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                            onClick={handleBuyItem}
                          >
                            Buy
                          </button>
                          <button
                            className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                            onClick={handleRemoveItem}
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
            <div className='p-2'>
              <img src={emptyCart} alt='Empty cart' />{' '}
            </div>
          )}
          <div className='mx-3 my-3 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

          <div className='mx-3 flex items-center justify-between'>
            <div className='flex space-x-2'>
              <Link to={path.store}>
                <Button className='w-16 justify-self-start py-1 text-sm'>Store</Button>
              </Link>
              <Link to='/'>
                <Button className='w-16 justify-self-start py-1 text-sm'>Cart</Button>
              </Link>
            </div>
            <div>
              <Link to='/'>
                <Button className='w-20 justify-self-start py-1 text-sm'>Buy all</Button>
              </Link>
            </div>
          </div>
        </div>
      }
      placement='bottom-end'
    >
      <Link to='/' className='flex items-center space-x-1'>
        <FontAwesomeIcon icon={faCartShopping} />
        <div>Cart</div>
      </Link>
    </Popover>
  )
}
