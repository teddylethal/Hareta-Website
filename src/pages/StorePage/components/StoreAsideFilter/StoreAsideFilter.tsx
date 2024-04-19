import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useProductListQueryConfig'
import StoreTypeFilter from '../StoreTypeFilter'
import StoreCategoryFilter from '../StoreCategoryFilter'
import StoreCollectionFilter from '../StoreCollectionFilter'

interface Props {
  queryConfig: QueryConfig
}

export default function StoreAsideFilter({ queryConfig }: Props) {
  const navigate = useNavigate()
  const { category, collection, type } = queryConfig

  const isFiltering = category || collection || type

  const handleClear = () => {
    navigate({
      pathname: path.store
    })
  }

  //! Multi languages
  const { t } = useTranslation('store')

  return (
    <div className='rounded-lg bg-sidebarItemLight px-3 py-2 duration-200 dark:bg-sidebarItemDark'>
      <div className='flex items-center space-x-2 text-base font-medium uppercase text-darkText duration-200 dark:text-lightText desktop:text-lg'>
        <p className=''>{t('aside filter.filter')}</p>
      </div>
      <div className='mt-2 flex flex-col space-y-2'>
        <StoreCategoryFilter queryConfig={queryConfig} />
        <StoreCollectionFilter queryConfig={queryConfig} />
        <StoreTypeFilter queryConfig={queryConfig} />
      </div>

      <div className='mt-4'>
        <button
          onClick={handleClear}
          disabled={isFiltering ? false : true}
          className={classNames(
            'flex w-full shrink-0 items-center justify-start rounded-md bg-[#e8e8e8] px-4 py-2 font-normal capitalize  outline outline-1 outline-transparent duration-200 disabled:cursor-not-allowed dark:bg-[#101010]',
            { 'text-red-500/20': !isFiltering },
            {
              'text-red-500 hover:outline-red-500 ': isFiltering
            }
          )}
        >
          {t('aside filter.clear')}
        </button>
      </div>
    </div>
  )
}