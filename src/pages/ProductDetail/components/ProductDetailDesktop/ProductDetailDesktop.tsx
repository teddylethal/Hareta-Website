import { faCartPlus, faCheck, faHeart, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext, useState } from 'react'
import QuantityController from 'src/components/QuantityController'
import ItemTag from 'src/constants/itemTag'
import { formatCurrency } from 'src/utils/utils'
import { AppContext } from 'src/contexts/app.context'
import classNames from 'classnames'
import ProductImageList from './ProductImageList'
import ProductDescription from './ProductDescription'
import { TemporaryPurchase } from 'src/types/cart.type'
import { CartContext } from 'src/contexts/cart.context'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import { Product } from 'src/types/product.type'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { ThemeContext } from 'src/App'
import DialogPopup from 'src/components/DialogPopup'

interface Props {
  defaultItem: Product
  itemsInGroup: Product[]
  isLikedByUser: boolean
  addToCart: (itemID: string, quantity: number) => void
  toggleLikeItem: () => void
}

export default function ProductDetailDesktop(props: Props) {
  const { defaultItem, isLikedByUser, itemsInGroup, addToCart, toggleLikeItem } = props

  const { isAuthenticated } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)
  const { purchasesInLS, setPurchasesInLS } = useContext(CartContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [createTempCart, setCreateTempCart] = useState<boolean>(false)

  //? CHOOSE VARIANT
  const [activeItemID, setActiveItemID] = useState<string>(defaultItem.id)
  const [activeItem, setActiveItem] = useState<Product>(defaultItem)
  const handleChooseVariant = (item: Product) => () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setQuantity(1)
    setActiveItemID(item.id)
    setActiveItem(item)
  }

  //? ADD TO CART
  const [quantity, setQuantity] = useState<number>(1)
  const handleQuantity = (value: number) => {
    setQuantity(value)
  }

  const handleAddToCart = () => {
    addToCart(activeItemID, quantity)
    setQuantity(1)
  }

  //? ADD TO TEMPORARY CART
  const createTemporaryCart = () => {
    const newPurchase: TemporaryPurchase = {
      id: Date.now().toString(),
      quantity: 1,
      item: activeItem
    }
    setPurchasesInLS([...purchasesInLS, newPurchase])
    setCreateTempCart(false)
    showSuccessDialog(setDialogIsOpen)
  }

  const addToTemporaryCart = () => {
    const newPurchase: TemporaryPurchase = {
      id: Date.now().toString(),
      quantity: 1,
      item: activeItem
    }
    const purchaseIndex = purchasesInLS.findIndex((purchase) => purchase.item.id === newPurchase.item.id)
    if (purchaseIndex !== -1) {
      const newQuantity = purchasesInLS[purchaseIndex].quantity + 1
      const newPurchasesList = purchasesInLS.map((purchase, index) => {
        if (index === purchaseIndex) {
          return { ...purchase, quantity: newQuantity }
        } else return purchase
      })
      setPurchasesInLS(newPurchasesList)
    } else {
      setPurchasesInLS([...purchasesInLS, newPurchase])
    }
    showSuccessDialog(setDialogIsOpen)
  }

  return (
    <div className='relative grid grid-cols-12 gap-4 lg:gap-8 xl:gap-16'>
      <div className='col-span-4'>
        <div className='sticky left-0 top-8 flex-col rounded-xl bg-[#f8f8f8] p-6 text-textDark dark:bg-[#202020] dark:text-textLight md:top-10 lg:top-16'>
          <div className='relative flex items-center justify-between'>
            <p className='line-clamp-2 text-xl font-semibold lg:text-2xl xl:text-3xl'>{defaultItem.name}</p>
            {isAuthenticated && (
              <Fragment>
                {isLikedByUser && (
                  <FontAwesomeIcon className={classNames('h-auto w-5 text-red-500 lg:w-6 xl:w-7', {})} icon={faHeart} />
                )}
                {!isLikedByUser && (
                  <button onClick={toggleLikeItem} className='text-black/40 dark:text-white/40'>
                    <FontAwesomeIcon
                      className={classNames('h-auto w-5 hover:text-red-500 lg:w-6 xl:w-7', {})}
                      icon={faHeartCirclePlus}
                    />
                  </button>
                )}
              </Fragment>
            )}
          </div>
          {defaultItem.tag !== 0 && (
            <div className='relative mt-2'>
              <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textLight'>
                {ItemTag[defaultItem.tag]}
              </span>
              <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
            </div>
          )}
          <div className='mt-2'>
            <span className='text-base font-medium text-brownColor dark:text-haretaColor lg:text-lg xl:text-xl'>
              ${formatCurrency(defaultItem.price)}
            </span>
          </div>

          <div className='mt-8 w-full rounded-lg border border-black/20 p-4 dark:border-white/20'>
            <div className='flex items-center justify-between'>
              <p className='text-base font-medium lg:text-lg xl:text-xl'>Variant</p>
              <p className='text-sm text-textDark/60 dark:text-textLight/60 lg:text-base '>
                {itemsInGroup.length} variants
              </p>
            </div>
            <div className='max-h-64 w-full overflow-auto py-4'>
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
                      <button className='relative w-full pt-[100%]' onClick={handleChooseVariant(item)}>
                        <img
                          src={avatarURL || ''}
                          alt={`${defaultItem.name} ${item.color}`}
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

          <div className='w-full'>
            <div className='mt-6 items-center justify-between text-xs lg:flex lg:text-sm xl:text-base'>
              <div className='flex items-center space-x-2'>
                <p className='text-textDark dark:text-textLight'>Quantity:</p>
                <QuantityController
                  classNameWrapper=''
                  value={quantity}
                  max={defaultItem.quantity}
                  onDecrease={handleQuantity}
                  onIncrease={handleQuantity}
                  onType={handleQuantity}
                />
              </div>
              <div className='flex items-center space-x-1 text-textDark/60 dark:text-textLight/60'>
                {defaultItem.quantity <= 10 && <p>Only</p>}
                <p>{defaultItem.quantity} available</p>
              </div>
            </div>

            <div className='mt-4 flex justify-between'>
              <button
                className='flex items-center rounded-md bg-vintageColor/80 px-6 py-1 text-sm hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 lg:py-1.5 lg:text-base xl:text-lg'
                onClick={
                  isAuthenticated
                    ? handleAddToCart
                    : purchasesInLS.length === 0
                    ? () => {
                        setCreateTempCart(true)
                      }
                    : addToTemporaryCart
                }
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
              <button className='flex items-center space-x-2 rounded-md bg-vintageColor/80 px-6 py-1 text-sm hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 lg:py-1.5 lg:text-base xl:text-lg'>
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-8'>
        <div className='h-full w-full'>
          <ProductImageList item={defaultItem} itemID={activeItemID} />

          <div className='mt-12'>
            <ProductDescription item={defaultItem} />
          </div>
        </div>
      </div>

      <DialogPopup
        closeButton={false}
        isOpen={createTempCart}
        handleClose={() => setCreateTempCart(false)}
        classNameWrapper='relative w-80 max-w-md transform overflow-hidden rounded-2xl p-8 align-middle shadow-xl transition-all'
      >
        <p className='text-center text-xl font-medium uppercase leading-6 text-red-700'>Cart expires soon</p>
        <div className='mt-4 space-y-2 text-center'>
          <div className='inline justify-center space-x-1 '>
            <span>Items added without</span>
            <span className='text-haretaColor'>login</span>
            <span>are temporary</span>
          </div>
          <div className='justify-center space-x-1'>
            <span className='text-haretaColor'>Login</span>
            <span>to</span>
            <span className='text-haretaColor'>save</span>
            <span>your items</span>
          </div>
        </div>
        <div className='mt-8 flex justify-around'>
          <Link
            to={path.login}
            type='button'
            className={classNames(
              'justify-center rounded-md border border-transparent px-4 py-1 text-sm font-medium lg:px-6 lg:py-2',
              {
                'bg-vintageColor/90 hover:bg-vintageColor': theme === 'light',
                'bg-haretaColor/80 hover:bg-haretaColor/60': theme === 'dark'
              }
            )}
          >
            Login
          </Link>
          <button
            type='button'
            className={classNames(
              'justify-center rounded-md border border-transparent px-4 py-1 text-sm font-medium lg:px-6 lg:py-2',
              {
                'bg-vintageColor/90 hover:bg-vintageColor': theme === 'light',
                'bg-haretaColor/80 hover:bg-haretaColor/60': theme === 'dark'
              }
            )}
            onClick={createTemporaryCart}
          >
            Continue
          </button>
        </div>
      </DialogPopup>

      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
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
        <p className='mt-6 text-center text-xl font-medium leading-6'>Added successfully</p>
      </DialogPopup>
    </div>
  )
}
