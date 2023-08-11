import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/cart.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { generateNameId } from 'src/utils/utils'

export default function Cart() {
  const { data: cartData } = useQuery({
    queryKey: ['items_in_cart'],
    queryFn: () => purchaseApi.getPurchases()
  })
  const itemsInCart = cartData?.data.data

  return (
    <div className='bg-lightBg py-16 dark:bg-darkBg'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-[#f8f8f8] px-8 py-4 text-base text-textDark dark:bg-[#202020] dark:text-textLight lg:text-lg'>
              <div className='col-span-6'>
                {/* <div className='flex flex-shrink-0 items-center justify-start pr-3'>
                    <input type='checkbox' className='h-4 w-4 accent-haretaColor' />
                  </div> */}
                <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>
                  Product
                </p>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Unit Price</div>
                  <div className='col-span-1'>Quantity</div>
                  <div className='col-span-1'>Subtotal</div>
                  <div className='col-span-1'>Action</div>
                </div>
              </div>
            </div>
            <div className='my-2 h-[900px] rounded-sm bg-[#f8f8f8] p-5 shadow dark:bg-[#202020]'>
              {itemsInCart?.map((purchase) => (
                <div
                  key={purchase.id}
                  className='mt-2 grid grid-cols-12 rounded-sm bg-[#efefef] p-4 text-center text-textDark first:mt-0 dark:bg-[#101010] dark:text-textLight'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-haretaColor' />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex items-center'>
                          <Link
                            className='flex h-24 w-24 flex-shrink-0 items-center'
                            to={`${path.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                          >
                            <img
                              alt={purchase.item.name}
                              src={
                                purchase.item.avatar
                                  ? purchase.item.avatar.url
                                  : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
                              }
                            />
                          </Link>
                          <div className='flex-grow px-2'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                              className='truncate text-base lg:text-lg'
                            >
                              {purchase.item.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-textDark dark:text-textLight'>${purchase.item.price}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.item.quantity}
                          value={purchase.quantity}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-haretaColor'>${purchase.item.price * purchase.quantity}</span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-textDark dark:text-textLight'>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5 shadow dark:bg-black'>
          <div className='flex'>
            <p className='uppercase text-textDark dark:text-textLight'>Total amount</p>
            <span className='text-haretaColor'>$500</span>
          </div>
          <button className='mx-3 h-10 w-40 border-none bg-[#eee] bg-none text-textDark dark:bg-vintageColor dark:text-textDark'>
            Check out
          </button>
        </div>
      </div>
    </div>
  )
}
