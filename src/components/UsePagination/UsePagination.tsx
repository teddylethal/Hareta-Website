import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  totalPage: number
  isMobile?: boolean
}
export default function UsePagination({ queryConfig, totalPage, isMobile }: Props) {
  const currentPage = Number(queryConfig.page)
  const RANGE = isMobile ? 1 : 2

  //? TRANSLATION
  const { t } = useTranslation('utils')

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            className='text-darkText dark:text-lightText mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] shadow-sm '
            key={index}
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            className='text-darkText dark:text-lightText mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] shadow-sm '
            key={index}
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < totalPage - RANGE + 1) {
          return renderDotAfter(index)
        } else if (currentPage > RANGE * 2 + 1 && currentPage < totalPage - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < totalPage - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (currentPage >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.store,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              'lg:mx-2 lg:h-8 lg:w-8 lg:text-base mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border px-2 py-2 text-sm shadow-sm hover:border-primaryColor dark:hover:border-primaryColor',
              {
                'text-darkText dark:text-darkText border-transparent bg-haretaColor': pageNumber === currentPage,
                'text-darkText dark:text-lightText border-textDark dark:border-textLight ': pageNumber !== currentPage
              }
            )}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  if (totalPage === 0) return
  return (
    <div className='mt-6 flex flex-wrap items-center justify-center'>
      {currentPage > 1 ? (
        <Link
          to={{
            pathname: path.store,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm shadow-sm hover:border-primaryColor hover:text-primaryColor dark:border-textLight dark:hover:border-primaryColor dark:hover:text-primaryColor'
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className='text-darkText dark:text-lightText py-1 group-hover:text-primaryColor dark:group-hover:text-primaryColor'
          />
          {!isMobile && <p>{t('pagination.prev')}</p>}
        </Link>
      ) : (
        <span className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm opacity-40 shadow-sm dark:border-textLight '>
          <FontAwesomeIcon icon={faAngleLeft} className='text-darkText dark:text-lightText py-1' />
          {!isMobile && <p>{t('pagination.prev')}</p>}
        </span>
      )}

      {renderPagination()}

      {currentPage < totalPage ? (
        <Link
          to={{
            pathname: path.store,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm  shadow-sm hover:border-primaryColor hover:text-primaryColor dark:border-textLight dark:hover:border-primaryColor dark:hover:text-primaryColor'
        >
          {!isMobile && <p>{t('pagination.next')}</p>}
          <FontAwesomeIcon
            icon={faAngleRight}
            className='text-darkText dark:text-lightText py-1 group-hover:text-primaryColor dark:group-hover:text-primaryColor'
          />
        </Link>
      ) : (
        <span className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl  border border-textDark px-3 py-1  text-sm opacity-40 shadow-sm dark:border-textLight'>
          {!isMobile && <p>{t('pagination.next')}</p>}
          <FontAwesomeIcon icon={faAngleRight} className='text-darkText dark:text-lightText py-1' />
        </span>
      )}
    </div>
  )
}
