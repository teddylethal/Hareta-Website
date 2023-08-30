import { FloatingOverlay, FloatingPortal } from '@floating-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import { ThemeContext } from 'src/App'
import productApi from 'src/apis/product.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { Product } from 'src/types/product.type'

interface Props {
  item: Product
  itemID: string
  itemsInGroup: Product[]
  elementRef: React.RefObject<HTMLDivElement>
  visible: boolean
  setVisble: React.Dispatch<React.SetStateAction<boolean>>
  handleAddToCart: (itemID: string, quantity: number) => void
}

export default function AddTocartPopover({ itemID, itemsInGroup, setVisble, elementRef, handleAddToCart }: Props) {
  const { theme } = useContext(ThemeContext)
  const [activeItemID, setActiveItemID] = useState<string>(itemID)

  //? GET ITEM DATA
  const { data: productDetailData, isLoading } = useQuery({
    queryKey: ['previewing_item', activeItemID],
    queryFn: () => productApi.getProductDetail(activeItemID),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const item = productDetailData?.data.data

  //? CHOOSE VARIANT
  const handleChooseVariant = (id: string) => () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setQuantity(1)
    setActiveItemID(id)
  }

  //? ADD TO CART
  const [quantity, setQuantity] = useState<number>(1)
  const handleQuantity = (value: number) => {
    setQuantity(value)
  }

  const addToCart = () => {
    handleAddToCart(itemID, quantity)
    setVisble(false)
  }

  const closeAddToCart = () => {
    setVisble(false)
  }

  const avatarURL = item?.avatar ? item.avatar.url : null

  if (!item) return null
  return (
    <FloatingPortal>
      <FloatingOverlay lockScroll className={theme === 'dark' ? 'dark' : 'light'}>
        <div className='fixed inset-0 bg-black bg-opacity-80' />

        <div
          ref={elementRef}
          className={classNames(
            'fixed left-1/2 top-1/2 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-black/20 px-2 py-4 shadow-sm dark:border-white/20 ',
            { 'bg-white text-textDark ': theme === 'light', 'bg-black text-textLight': theme === 'dark' }
          )}
        >
          <div className='flex items-start'>
            <div className=' grid grow grid-cols-3'>
              <div className='relative col-span-1 w-full overflow-hidden border border-black/10 pt-[100%] dark:border-white/10'>
                {isLoading && (
                  <Skeleton
                    variant='rounded'
                    className='absolute left-0 top-0 dark:bg-white/10'
                    width={'100%'}
                    height={'100%'}
                  />
                )}
                {!isLoading && (
                  <img
                    src={avatarURL || ''}
                    alt={item.name}
                    className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                  />
                )}
              </div>
              <div className='col-span-2 ml-4 flex min-h-full flex-col justify-between truncate'>
                <p className=''>{item.name}</p>
                <span className=' text-haretaColor'>${item.price}</span>

                <p className='flex'>
                  {item.quantity <= 10 && 'Only '}
                  {item.quantity} in store
                </p>
              </div>
            </div>
            <button onClick={closeAddToCart} className='px-2'>
              <FontAwesomeIcon icon={faXmark} className='h-5 opacity-70' />
            </button>
          </div>
          <div className='relative mt-4 flex items-center justify-between rounded-lg bg-lightBg px-3 py-2 shadow-sm dark:bg-darkBg'>
            {isLoading && <div className='absolute left-0 top-0 h-full w-full cursor-not-allowed bg-black/40'></div>}
            <p className=''>Quantity</p>
            <QuantityController
              classNameWrapper=''
              value={quantity}
              max={item.quantity}
              onDecrease={handleQuantity}
              onIncrease={handleQuantity}
              onType={handleQuantity}
            />
          </div>
          <div className='mt-4 w-full rounded-lg border border-black/20 p-4 dark:border-white/20'>
            <div className='max-h-64 w-full overflow-auto py-2'>
              <div className='grid w-full grid-cols-3 gap-4'>
                {itemsInGroup.map((item, index) => {
                  const isActive = item.id === activeItemID
                  const avatarURL = item.avatar ? item.avatar.url : null
                  return (
                    <div
                      key={index}
                      className={classNames('col-span-1 rounded-xl', {
                        'border border-brownColor dark:border-haretaColor': isActive
                      })}
                    >
                      <button className='relative w-full pt-[100%]' onClick={handleChooseVariant(item.id)}>
                        <img
                          src={avatarURL || ''}
                          alt={`${item.name} ${item.color}`}
                          className='absolute left-0 top-0 h-full w-full object-scale-down'
                        />
                        {/* {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />} */}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='mt-2 flex grow items-end'>
            <Button className='relative bottom-0 py-2' onClick={addToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
