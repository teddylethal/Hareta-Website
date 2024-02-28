import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  currentPage: string
}

export default function EmptyProductList({ currentPage }: Props) {
  //? TRANSLATION
  const { t } = useTranslation('utils')
  return (
    <div className='text-darkText dark:text-lightText my-4 text-center text-2xl uppercase'>
      <p className='md:text-2xl xl:text-4xl w-full text-center text-lg capitalize text-haretaColor'>
        {currentPage == 'store' && t('no products.store.title')}
        {currentPage == 'order' && t('no products.order.title')}
      </p>
      <div className='mt-4 flex w-full justify-center'>
        <img src='/images/cant-find-item.png' alt='No item' className='md:w-72 h-auto w-40 ' />
      </div>
      <p className='md:text-lg lg:text-xl xl:text-2xl mt-4 w-full text-center text-sm'>
        {currentPage == 'store' && t('no products.store.message')}
        {currentPage == 'order' && t('no products.order.message')}
      </p>
      {currentPage == 'order' && (
        <p className='md:text-lg lg:text-xl xl:text-2xl mt-4 w-full text-center text-sm'>
          {t('no products.order.go to')}{' '}
          <NavLink
            to={path.store}
            className='text-vintageColor hover:text-vintageColor/80 dark:text-haretaColor/80 dark:hover:text-haretaColor'
          >
            {t('no products.order.store')}
          </NavLink>
          {` ${t('no products.order.now')}`}
        </p>
      )}
      {/* <div className='round-lg mt-8 md:mt-12 xl:mt-16'>
        <p className='mt-4 w-full text-left text-lg uppercase text-haretaColor md:text-xl xl:text-2xl'>
          You may also like
        </p>
      </div> */}
    </div>
  )
}
