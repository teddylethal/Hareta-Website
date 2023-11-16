import { faCartPlus, faCheck, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext, useState } from 'react'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import classNames from 'classnames'
import useClickOutside from 'src/hooks/useClickOutside'
import AddTocartPopover from '../../AddTocartPopover'
import { AppContext } from 'src/contexts/app.context'
import MobileProductImageList from './MobileProductImageList'
import DialogPopup from 'src/components/DialogPopup'
import ProductDescription from '../ProductDetailDesktop/ProductDescription'
import OtherItemsInCollection from '../../OtherItemsInCollection'
import OtherItemsInType from '../../OtherItemsInType'
import { useTranslation } from 'react-i18next'

interface Props {
  defaultItem: Product
  itemsInGroup: Product[]
  isLikedByUser: boolean
  addToCart: (itemID: string, quantity: number) => void
  toggleLikeItem: () => void
}

export default function ProductDetailMobile(props: Props) {
  const { defaultItem, isLikedByUser, itemsInGroup, addToCart, toggleLikeItem } = props

  const { isAuthenticated, theme } = useContext(AppContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [errorDialog, setErrorDialog] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<Product>(defaultItem)

  //? CHOOSE VARIANT
  const handleChooseVariant = (item: Product) => () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setActiveItem(item)
  }

  //? ADD TO CART
  const { ref, visible, setVisible } = useClickOutside(false)
  const openAddToCart = () => {
    setVisible(true)
  }

  const tag = defaultItem.tag
  //? translation
  const { t } = useTranslation('productdetail')

  return (
    <Fragment>
      <div className={classNames('bg-lightBg dark:bg-darkBg')}>
        <div className=' rounded-lg bg-[#f8f8f8] px-3 py-2 dark:bg-[#202020]'>
          <MobileProductImageList item={defaultItem} itemID={activeItem.id} />
          <div className='relative flex flex-col bg-[#f8f8f8] py-3 text-textDark dark:bg-[#202020] dark:text-textLight'>
            <span className='text-2xl text-haretaColor'>${formatCurrency(defaultItem.price)}</span>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-2xl'>{defaultItem.name}</p>
              {isAuthenticated && (
                <button className=''>
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={toggleLikeItem}
                    className={classNames('h-6 hover:text-red-500', {
                      'text-textDark/40 dark:text-textLight/40': !isLikedByUser,
                      'text-red-500': isLikedByUser
                    })}
                  />
                </button>
              )}
            </div>

            {defaultItem.tag !== 0 && (
              <div className='relative mt-2'>
                <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                  {tag == 1 && t('tag.top seller')}
                  {tag == 2 && t('tag.signature')}
                  {tag == 3 && t('tag.favourite')}
                </span>
                <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
              </div>
            )}

            <div className='mt-8 w-full rounded-lg border border-black/60 p-4 dark:border-white/60'>
              <div className='flex items-center justify-between'>
                <p className='text-base font-medium sm:text-lg'>{t('sidebar.variant')}</p>
                <p className='text-sm text-textDark/60 dark:text-textLight/60 sm:text-base '>
                  {itemsInGroup.length} {t('sidebar.variants')}
                </p>
              </div>
              <div className='mt-4 max-h-64 w-full overflow-auto rounded-lg border border-black/40 p-2 dark:border-white/40'>
                <div className='grid w-full grid-cols-3 gap-4'>
                  {itemsInGroup.map((item, index) => {
                    const isActive = item.id === activeItem.id
                    const avatarURL = item.avatar ? item.avatar.url : null
                    return (
                      <div
                        key={index}
                        className={classNames('col-span-1 rounded-xl border', {
                          'border-brownColor dark:border-haretaColor': isActive,
                          'border-black/20 dark:border-white/20': !isActive
                        })}
                      >
                        <button className='relative w-full pt-[100%]' onClick={handleChooseVariant(item)}>
                          <img
                            src={avatarURL || ''}
                            alt={`${defaultItem.name} ${item.color}`}
                            className='absolute left-0 top-0 h-full w-full object-scale-down'
                          />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className='mt-4 h-full text-sm lg:text-lg'>
              <ProductDescription item={defaultItem} />
            </div>
          </div>
        </div>

        <div className='mt-8 space-y-4 rounded-lg bg-[#f8f8f8] p-3 dark:bg-[#202020]'>
          <OtherItemsInCollection collectionName={defaultItem.collection} />
          <OtherItemsInType type={defaultItem.type} />
        </div>

        <div className='fixed bottom-0 left-0 z-10 grid h-10 w-full grid-cols-2 bg-white text-base text-textDark dark:bg-black dark:text-textLight sm:h-12'>
          <button className='col-span-1 flex items-center justify-center text-center' onClick={openAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} className='h-5' />
          </button>
          <button
            disabled={visible}
            className={classNames('col-span-1 rounded-sm ', {
              'bg-vintageColor/80  hover:bg-vintageColor hover:text-textDark dark:bg-haretaColor/80 dark:hover:bg-haretaColor':
                !visible,
              'bg-vintageColor/40 text-textDark/60 dark:bg-haretaColor/40 dark:text-textLight/60': visible
            })}
          >
            {t('sidebar.buy')}
          </button>
        </div>
      </div>
      {visible && (
        <AddTocartPopover
          item={defaultItem}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          itemsInGroup={itemsInGroup}
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
            className={classNames('text- rounded-full  p-4 text-center text-success ', {
              'bg-black/20': theme === 'light',
              'bg-white/20': theme === 'dark'
            })}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>{t('message.Added successfully')}</p>
      </DialogPopup>
      <DialogPopup
        isOpen={errorDialog}
        handleClose={() => setErrorDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className='text-center'>
          <FontAwesomeIcon icon={faXmark} className={classNames('h-auto w-8 text-red-700 md:w-10 lg:w-12 xl:w-16')} />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>
          {t('message.The quantity of the current item you are trying to add exceed our store')}
        </p>
      </DialogPopup>
    </Fragment>
  )
}
