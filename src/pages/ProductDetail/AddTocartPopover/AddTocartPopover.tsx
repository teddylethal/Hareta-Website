import { FloatingOverlay, FloatingPortal } from '@floating-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from 'src/App'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { Product } from 'src/types/product.type'

interface Props {
  item: Product
  itemID: string
  buyCount: number
  handleBuyCount: (value: number) => void
  elementRef: React.RefObject<HTMLDivElement>
  visible: boolean
  setVisble: React.Dispatch<React.SetStateAction<boolean>>
  handleAddToCart: (itemID: string, quantity: number) => void
}

export default function AddTocartPopover({
  item,
  itemID,
  buyCount,
  handleBuyCount,
  setVisble,
  elementRef,
  handleAddToCart
}: Props) {
  const { theme } = useContext(ThemeContext)

  const closeAddToCart = () => {
    setVisble(false)
  }

  const addToCart = () => {
    handleAddToCart(itemID, buyCount)
    setVisble(false)
  }
  return (
    <FloatingPortal>
      <FloatingOverlay lockScroll className={theme === 'dark' ? 'dark' : 'light'}>
        <div className='fixed inset-0 bg-black bg-opacity-50' />

        <div
          ref={elementRef}
          className={classNames(
            'fixed left-1/2 top-1/2 flex h-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md px-2 py-4 shadow-sm ',
            { 'bg-white text-textDark ': theme === 'light', 'bg-black text-textLight': theme === 'dark' }
          )}
        >
          <div className='flex items-start'>
            <div className=' grid grow grid-cols-3'>
              <div className='relative col-span-1 w-full overflow-hidden border border-black/10 pt-[100%] dark:border-white/10'>
                <img
                  src={item.avatar ? item.avatar.url : ''}
                  alt={item.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                />
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
          <div className=' mt-4 flex items-center justify-between rounded-lg bg-lightBg px-3 py-2 shadow-sm dark:bg-darkBg'>
            <p className=''>Quantity</p>
            <QuantityController
              classNameWrapper=''
              value={buyCount}
              max={item.quantity}
              onDecrease={handleBuyCount}
              onIncrease={handleBuyCount}
              onType={handleBuyCount}
            />
          </div>
          <div className='flex grow items-end'>
            <Button className='relative bottom-0 py-2' onClick={addToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
