import { faCartPlus, faCheck, faHeartCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import likeItemAPi from 'src/apis/userLikeItem.api'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import DialogPopup from 'src/components/DialogPopup'
import purchaseApi from 'src/apis/cart.api'
import UnlikeItemDialog from './UnlikeItemDialog'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import { ThemeContext } from 'src/App'
import classNames from 'classnames'

export default function WishList() {
  const { theme } = useContext(ThemeContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [unlikeDialog, setUnlikeDialog] = useState<boolean>(false)
  const [unlikedItemId, setUnlikeItemId] = useState<string>('')

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: favouriteListData } = useQuery({
    queryKey: ['favourite_list'],
    queryFn: () => {
      return likeItemAPi.getFavouriteList()
    },
    staleTime: 3 * 60 * 1000
  })
  const favouriteList = favouriteListData?.data.data as Product[]

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
          queryClient.invalidateQueries({ queryKey: ['purchases'] })
        }
      }
    )
  }

  const openUnlikeItemDialog = (id: string) => () => {
    setUnlikeItemId(id)
    setUnlikeDialog(true)
  }

  return (
    <div className=''>
      <div className='grid w-full grid-cols-12  p-4 text-base uppercase text-textDark dark:text-textLight'>
        <div className='col-span-4'>
          <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>Product</p>
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
      <div className=''>
        <div className='w-full border-b border-textDark/80 dark:border-textLight/80'></div>
      </div>
      <div className='h-[530px] overflow-scroll overscroll-none rounded-sm shadow'>
        {favouriteList?.map((item) => (
          <div key={item.id} className='px-4 hover:bg-[#efefef] dark:hover:bg-[#101010]'>
            <div className='grid grid-cols-12 items-center py-4 text-center text-textDark first:mt-0  dark:text-textLight '>
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
                    <div className='flex-grow px-4 text-left'>
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
                        className='bg-none hover:text-brownColor dark:hover:text-haretaColor'
                        onClick={addToCart(item.id)}
                      >
                        <FontAwesomeIcon icon={faCartPlus} fontSize={24} onClick={addToCart(item.id)} />
                      </button>
                      <button
                        className='bg-none hover:text-textDark dark:hover:text-textLight'
                        onClick={openUnlikeItemDialog(item.id)}
                      >
                        <FontAwesomeIcon icon={faHeartCircleXmark} fontSize={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <UnlikeItemDialog
              isOpen={unlikeDialog}
              handleClose={() => setUnlikeDialog(false)}
              classNameWrapper='relative w-96 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-sm transition-all'
              unlikeItemId={unlikedItemId}
              setUnlikeItemId={setUnlikeItemId}
            ></UnlikeItemDialog>
          </div>
        ))}
      </div>
      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all bg-black/90'
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={classNames('text- rounded-full  p-4 text-center text-success ', {
              'bg-black/20': theme === 'light',
              'bg-white/20': theme === 'dark'
            })}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Item was added to cart</p>
        <button
          type='button'
          className={classNames(
            'absolute right-2 top-2 flex justify-center rounded-md p-2 text-sm font-medium  hover:text-red-600 ',
            {
              'text-textDark/50': theme === 'light',
              'text-textLight/50': theme === 'dark'
            }
          )}
        >
          <FontAwesomeIcon icon={faXmark} fontSize={20} />
        </button>
      </DialogPopup>
    </div>
  )
}
