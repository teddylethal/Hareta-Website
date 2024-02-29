import { faCartPlus, faCheck, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import QuantityController from 'src/components/QuantityController'
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

import DialogPopup from 'src/components/DialogPopup'
import { useTranslation } from 'react-i18next'

interface Props {
  defaultItem: Product
  itemsInGroup: Product[]
  isLikedByUser: boolean
  addToCart: (itemID: string, quantity: number) => void
  toggleLikeItem: () => void
}

export default function ProductDetailDesktop(props: Props) {
  const { defaultItem, isLikedByUser, itemsInGroup, addToCart, toggleLikeItem } = props

  const { isAuthenticated, theme } = useContext(AppContext)
  const { tempExtendedPurchase, setTempExtendedPurchase } = useContext(CartContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [errorDialog, setErrorDialog] = useState<boolean>(false)

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
      quantity: quantity,
      item: activeItem
    }
    setTempExtendedPurchase([...tempExtendedPurchase, newPurchase])
    setCreateTempCart(false)
    setQuantity(1)
    showSuccessDialog(setDialogIsOpen)
  }

  const addToTemporaryCart = () => {
    const newPurchase: TemporaryPurchase = {
      id: Date.now().toString(),
      quantity: quantity,
      item: activeItem
    }
    const purchaseIndex = tempExtendedPurchase.findIndex((purchase) => purchase.item.id === newPurchase.item.id)
    if (purchaseIndex !== -1) {
      const purchase = tempExtendedPurchase[purchaseIndex]
      const maxQuanityInStore = purchase.item.quantity
      const currentQuantityInCart = purchase.quantity
      if (currentQuantityInCart + quantity <= maxQuanityInStore) {
        const newQuantity = currentQuantityInCart + quantity
        const newPurchasesList = tempExtendedPurchase.map((purchase, index) => {
          if (index === purchaseIndex) {
            return { ...purchase, quantity: newQuantity }
          } else return purchase
        })
        setTempExtendedPurchase(newPurchasesList)
        setQuantity(1)
      } else {
        setErrorDialog(true)
        setQuantity(1)
      }
    } else {
      setTempExtendedPurchase([...tempExtendedPurchase, newPurchase])
    }
    showSuccessDialog(setDialogIsOpen)
  }
  const tag = defaultItem.tag

  //? CHECK IN STOCK
  const inStock = activeItem.quantity > 0

  //? translation
  const { t } = useTranslation('productdetail')

  return (
    <div className='lg:gap-8 xl:gap-16 relative grid grid-cols-12 gap-4'>
      <div className='col-span-4'>
        <div className='lg:top-20 lg:p-4 xl:p-6 bg-lightColor700 sticky left-0 top-14 flex-col rounded-xl p-2 text-darkText shadow-md dark:bg-darkColor700 dark:text-lightText'>
          <div className='relative flex items-center justify-between'>
            <p className='lg:text-2xl xl:text-3xl line-clamp-2 text-xl font-semibold'>{defaultItem.name}</p>
            {isAuthenticated && (
              <button onClick={toggleLikeItem} className=''>
                <FontAwesomeIcon
                  className={classNames('lg:w-6 xl:w-7 h-auto w-5 hover:text-favouriteRed', {
                    'text-favouriteRed': isLikedByUser,
                    'text-black/40 dark:text-white/40': !isLikedByUser
                  })}
                  icon={faHeart}
                />
              </button>
            )}
          </div>
          {defaultItem.tag !== 0 && (
            <div className='relative mt-2'>
              <span className='flex h-6 w-20 items-center justify-center bg-tagColor text-center text-sm text-darkText'>
                {tag == 1 && t('tag.top seller')}
                {tag == 2 && t('tag.signature')}
                {tag == 3 && t('tag.favourite')}
              </span>
              <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-tagColor border-l-tagColor border-r-transparent' />
            </div>
          )}
          <div className='mt-2'>
            <span className='lg:text-lg xl:text-xl text-base font-medium text-haretaColor'>
              ${formatCurrency(defaultItem.price)}
            </span>
          </div>

          <div className='bg-lightColor900 mt-8 w-full rounded-lg border border-black/60 p-2 dark:border-white/60 dark:bg-darkColor900'>
            <div className='flex items-center justify-between'>
              <p className='lg:text-lg xl:text-xl text-base font-medium'>{t('sidebar.variant')}</p>
              <p className='lg:text-base text-sm text-darkText/60 dark:text-lightText/60 '>
                {itemsInGroup.length} {t('sidebar.variants')}
              </p>
            </div>
            <div className='mt-4 max-h-64 w-full overflow-auto rounded-lg border border-black/40 p-2 dark:border-white/40'>
              <div className='grid w-full grid-cols-3 gap-4'>
                {itemsInGroup.map((item, index) => {
                  const isActive = item.id === activeItemID
                  const avatarURL = item.avatar ? item.avatar.url : null
                  return (
                    <div
                      key={index}
                      className={classNames('col-span-1 rounded-xl border', {
                        ' border-haretaColor dark:border-haretaColor': isActive,
                        ' border-black/20 dark:border-white/20': !isActive
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

          {inStock && (
            <div className='w-full'>
              <div className='lg:flex lg:space-x-2 lg:text-sm xl:text-base mt-6 items-center justify-between text-xs'>
                <div className='flex items-center space-x-2'>
                  <p className='text-darkText dark:text-lightText'>{t('sidebar.quantity')}:</p>
                  <QuantityController
                    classNameWrapper=''
                    value={quantity}
                    max={defaultItem.quantity}
                    onDecrease={handleQuantity}
                    onIncrease={handleQuantity}
                    onType={handleQuantity}
                  />
                </div>
                <p className='lg:text-sm items-center space-x-1 text-xs text-darkText/60 dark:text-lightText/60'>
                  {defaultItem.quantity <= 10 && <span>{t('sidebar.only')}</span>}
                  <span>
                    {defaultItem.quantity} {t('sidebar.available')}
                  </span>
                </p>
              </div>

              <div className='mt-4 flex justify-between text-darkText'>
                <button
                  className='lg:py-1.5 lg:text-base xl:text-lg flex items-center rounded-md bg-haretaColor px-6 py-1 text-sm hover:bg-primaryColor'
                  onClick={
                    isAuthenticated
                      ? handleAddToCart
                      : tempExtendedPurchase.length === 0
                      ? () => {
                          setCreateTempCart(true)
                        }
                      : addToTemporaryCart
                  }
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
                <button className='lg:py-1.5 lg:text-base xl:text-lg flex items-center space-x-2 rounded-md bg-haretaColor px-6 py-1 text-sm font-medium hover:bg-primaryColor'>
                  {t('sidebar.buy')}
                </button>
              </div>
            </div>
          )}
          {!inStock && (
            <div className='lg:mt-4 lg:text-xl xl:mt-6 xl:text-2xl mt-2 flex w-full items-center justify-center text-lg font-semibold uppercase text-brownColor/80 dark:text-haretaColor/80'>
              {t('sidebar.out of stock')}
            </div>
          )}
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

      {/* //? CREATE TEMP CART DIALOG */}
      <DialogPopup
        closeButton={false}
        isOpen={createTempCart}
        handleClose={() => setCreateTempCart(false)}
        classNameWrapper='relative w-md max-w-md transform overflow-hidden rounded-2xl p-8 align-middle shadow-xl transition-all  '
      >
        <p className='text-center text-xl font-semibold uppercase leading-6 text-alertRed'>
          {t('message.Cart expires soon')}
        </p>
        <div className='mt-4 space-y-2 text-center'>
          <div className='inline justify-center space-x-1 '>
            <span>{t('message.Items added without')}</span>
            <span className='text-haretaColor'>{t('message.login')}</span>
            <span>{t('message.are temporary')}</span>
          </div>
          <div className='justify-center space-x-1'>
            <span className='capitalize text-haretaColor'>{t('message.login')}</span>
            <span>{t('message.to')}</span>
            <span className='text-haretaColor'>{t('message.save')}</span>
            <span>{t('message.your items')}</span>
          </div>
        </div>
        <div className='mt-8 flex justify-around'>
          <Link
            to={path.login}
            type='button'
            className='lg:px-6 lg:py-2 justify-center rounded-md border border-transparent bg-haretaColor px-4 py-1 text-sm font-medium capitalize text-darkText hover:bg-primaryColor'
          >
            {t('message.login')}
          </Link>
          <button
            type='button'
            className='lg:px-6 lg:py-2 justify-center rounded-md border border-transparent bg-haretaColor px-4 py-1 text-sm font-medium capitalize text-darkText hover:bg-primaryColor'
            onClick={createTemporaryCart}
          >
            {t('message.Continue')}
          </button>
        </div>
      </DialogPopup>

      {/* //? SUCCESS DIALOG */}
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
        <p className='mt-6 text-center text-xl font-medium leading-6'>{t('message.Added successfully')}</p>
      </DialogPopup>

      {/* //? ERROR DIALOG */}
      <DialogPopup
        isOpen={errorDialog}
        handleClose={() => setErrorDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className='text-center'>
          <FontAwesomeIcon icon={faXmark} className={classNames('md:w-10 lg:w-12 xl:w-16 h-auto w-8 text-alertRed')} />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>
          {t('message.The quantity of the current item you are trying to add exceed our store')}
        </p>
      </DialogPopup>
    </div>
  )
}
