import { faCartPlus, faCheck, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import likeItemAPi from 'src/apis/userLikeItem.api'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { showSuccessDialog } from '../ProductList/Product/Product'
import DialogPopup from 'src/components/DialogPopup'
import purchaseApi from 'src/apis/cart.api'

export default function FavouriteList() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: favouriteListData } = useQuery({
    queryKey: ['favourite_list'],
    queryFn: () => {
      return likeItemAPi.getFavouriteList()
    },
    staleTime: 3 * 60 * 1000
  })
  const favouriteList = favouriteListData?.data.data

  const handleClickItem = (item: Product) => () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: item.name, id: item.id })}` })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = (id: string) => () => {
    addToCartMutation.mutate(
      { item_id: id, quantity: 1 },
      {
        onSuccess: () => {
          showSuccessDialog(setDialogIsOpen)
          queryClient.invalidateQueries({ queryKey: ['items_in_cart'] })
        }
      }
    )
  }

  return (
    <div className=' bg-lightBg py-4 dark:bg-darkBg'>
      <div className='container'>
        <div className='mx-2 xl:mx-4'>
          <div className='min-w-[1000px] rounded-md bg-[#f8f8f8] py-2 dark:bg-[#202020]'>
            <div className='grid w-full grid-cols-12  px-8 py-4 text-base uppercase  text-textDark dark:text-textLight lg:text-lg'>
              <div className='col-span-4'>
                <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>
                  Product
                </p>
              </div>
              <div className='col-span-8 '>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-1'>Category</div>
                  <div className='col-span-1'>Collection</div>
                  <div className='col-span-1'>Type</div>
                  <div className='col-span-1'>Price</div>
                  <div className='col-span-1'>Action</div>
                </div>
              </div>
            </div>
            <div className='px-4'>
              <div className='w-full border-b border-textDark/80 dark:border-textLight/80'></div>
            </div>
            <div className='h-[512px] overflow-scroll overscroll-none rounded-sm  px-4 shadow'>
              {favouriteList?.map((item, index) => (
                <div key={item.id}>
                  <div className='col-span-12 w-full border-t border-textDark/80 dark:border-textLight/80'></div>

                  <div className='grid grid-cols-12 items-center p-4 text-center text-textDark first:mt-0 hover:bg-[#efefef] dark:text-textLight dark:hover:bg-[#171717]'>
                    <div className='col-span-4'>
                      <div className='flex'>
                        <button className='flex flex-grow items-center' onClick={handleClickItem(item)}>
                          <div className='flex h-24 w-24 flex-shrink-0 items-center'>
                            <img
                              alt={item.name}
                              src={
                                item.avatar
                                  ? item.avatar.url
                                  : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
                              }
                            />
                          </div>
                          <div className='ml-4 flex-grow px-2 text-left'>
                            <div className='truncate text-base lg:text-lg'>{item.name}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className='col-span-8'>
                      <div className='grid grid-cols-5 items-center capitalize text-textDark dark:text-textLight'>
                        <div className='col-span-1'>
                          <button className='capitalize'>{item.category}</button>
                        </div>
                        <div className='col-span-1'>
                          <button className='capitalize'>{item.collection}</button>
                        </div>
                        <div className='col-span-1'>
                          <button className='capitalize'>{item.type}</button>
                        </div>
                        <div className='col-span-1'>
                          <span className='text-haretaColor'>${formatCurrency(item.price)}</span>
                        </div>
                        <div className='col-span-1 flex items-center justify-center'>
                          <div className='items-cennter hover: flex h-full w-min flex-col  space-y-4 text-textDark/70  dark:text-textLight/70 '>
                            <button
                              className='bg-none hover:text-orangeColor dark:hover:text-haretaColor'
                              onClick={addToCart(item.id)}
                            >
                              <FontAwesomeIcon icon={faCartPlus} fontSize={24} onClick={addToCart(item.id)} />
                            </button>
                            <button className='bg-none hover:text-textDark dark:hover:text-textLight'>
                              <FontAwesomeIcon icon={faHeartCircleXmark} fontSize={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DialogPopup isOpen={dialogIsOpen} handleClose={() => setDialogIsOpen(false)}>
        <p className='text-center text-xl font-medium leading-6 text-textLight'>Added successful</p>
        <div className='mt-4 text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className='text- rounded-full bg-white/20 p-4 text-center text-success'
          />
        </div>
      </DialogPopup>
    </div>
  )
}
