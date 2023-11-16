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
    <div className='my-4 text-center text-2xl uppercase text-textDark dark:text-textLight'>
      <p className='w-full text-center text-lg capitalize text-haretaColor md:text-2xl xl:text-4xl'>
        {currentPage == 'store' && t('no products.store.title')}
        {currentPage == 'order' && t('no products.order.title')}
      </p>
      <div className='mt-4 flex w-full justify-center'>
        <img src='/images/cant-find-item.png' alt='No item' className='h-auto w-40 md:w-72 ' />
      </div>
      <p className='mt-4 w-full text-center text-sm md:text-lg lg:text-xl xl:text-2xl'>
        {currentPage == 'store' && t('no products.store.message')}
        {currentPage == 'order' && t('no products.order.message')}
      </p>
      {currentPage == 'order' && (
        <p className='mt-4 w-full text-center text-sm md:text-lg lg:text-xl xl:text-2xl'>
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
