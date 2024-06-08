import { faCartPlus, faCheck, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext, useState } from 'react'
import { ProductType } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import classNames from 'classnames'
import useClickOutside from 'src/hooks/useClickOutside'
import { AppContext } from 'src/contexts/app.context'
import ProductMobileImageList from '../../components/ProductMobileImageList/ProductMobileImageList'
import DialogPopup from 'src/components/DialogPopup'
import ProductListForCollection from '../../components/ProductListForCollection'
import ProductListForType from '../../components/ProductListForType'
import { useTranslation } from 'react-i18next'
import ProductMobileAddTocartPopover from '../../components/ProductMobileAddTocartPopover'
import ProductDetailVariantList from '../../components/ProductDetailVariantList'
import ProductDetailDescription from '../../components/ProductDetailDescription/ProductDetailDescription'
import ProductTag from 'src/components/ProductTag'

interface Props {
  defaultProduct: ProductType
  productsInGroup: ProductType[]
  isLikedByUser: boolean
  addToCart: (itemID: string, quantity: number) => void
  toggleLikeProduct: () => void
}

export default function ProductDetailMobile(props: Props) {
  const { defaultProduct, isLikedByUser, productsInGroup, addToCart, toggleLikeProduct } = props

  const { isAuthenticated, theme } = useContext(AppContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [errorDialog, setErrorDialog] = useState<boolean>(false)
  const [activeProduct, setActiveProduct] = useState<ProductType>(defaultProduct)

  //! CHOOSE VARIANT
  const handleChooseVariant = (product: ProductType) => () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setActiveProduct(product)
  }

  //! ADD TO CART
  const { ref, visible, setVisible } = useClickOutside(false)
  const openAddToCart = () => {
    setVisible(true)
  }

  const tag = defaultProduct.tag
  //! Multi languages
  const { t } = useTranslation('productdetail')

  return (
    <Fragment>
      <div className='bg-lightBg pb-10 dark:bg-darkBg'>
        <div className=' overflow-hidden rounded-lg bg-lightColor700 dark:bg-darkColor700'>
          <ProductMobileImageList item={defaultProduct} itemID={activeProduct.id} />
          <div className='relative flex flex-col bg-lightColor700 px-3 py-3 text-darkText dark:bg-darkColor700 dark:text-lightText'>
            <span className='text-2xl text-haretaColor'>${formatCurrency(defaultProduct.price)}</span>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-2xl'>{defaultProduct.name}</p>
              {isAuthenticated && (
                <button className=''>
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={toggleLikeProduct}
                    className={classNames('h-6', {
                      'text-darkText/40 dark:text-lightText/40': !isLikedByUser,
                      'text-favouriteRed': isLikedByUser
                    })}
                  />
                </button>
              )}
            </div>

            {defaultProduct.tag !== 0 && <ProductTag tag={tag} />}

            <ProductDetailVariantList
              defaultProduct={defaultProduct}
              productsInGroup={productsInGroup}
              activeProductID={activeProduct.id}
              handleChooseVariant={handleChooseVariant}
            />

            <div className='mt-4 h-full text-sm desktop:text-lg'>
              <ProductDetailDescription product={defaultProduct} />
            </div>
          </div>
        </div>

        <div className='mt-8 space-y-6 rounded-lg tabletSmall:space-y-8'>
          <ProductListForCollection collectionName={defaultProduct.collection} />
          <ProductListForType type={defaultProduct.type} />
        </div>

        <div className='fixed bottom-0 left-0 z-10 grid h-10 w-full grid-cols-2 bg-white text-base text-darkText dark:bg-black dark:text-lightText tabletSmall:h-12'>
          <button className='col-span-1 flex items-center justify-center text-center' onClick={openAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} className='h-5' />
          </button>
          <button
            disabled={visible}
            className={classNames('col-span-1 rounded-sm bg-haretaColor text-darkText ', {
              'opacity-40': visible
            })}
          >
            {t('sidebar.buy')}
          </button>
        </div>
      </div>
      {visible && (
        <ProductMobileAddTocartPopover
          item={defaultProduct}
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
          productsInGroup={productsInGroup}
          elementRef={ref}
          visible={visible}
          setVisible={setVisible}
          handleAddToCart={addToCart}
          setDialogIsOpen={setDialogIsOpen}
          setErrorDialog={setErrorDialog}
        />
      )}

      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={classNames('text- rounded-full  p-4 text-center text-successGreen ', {
              'bg-black/20': theme === 'light',
              'bg-white/20': theme === 'dark'
            })}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>{t('message.Product was added to cart')}</p>
      </DialogPopup>

      <DialogPopup
        isOpen={errorDialog}
        handleClose={() => setErrorDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className='text-center'>
          <FontAwesomeIcon
            icon={faXmark}
            className={classNames('h-auto w-8 text-alertRed tablet:w-10 desktop:w-12 desktopLarge:w-16')}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>
          {t('message.The quantity of the current item you are trying to add exceed our store')}
        </p>
      </DialogPopup>
    </Fragment>
  )
}
