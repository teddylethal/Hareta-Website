import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  totalPage: number
  isMobile?: boolean
}
export default function UsePagination({ queryConfig, totalPage, isMobile }: Props) {
  const currentPage = Number(queryConfig.page)
  const RANGE = isMobile ? 1 : 2

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-textDark shadow-sm dark:text-textLight '
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
            className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-textDark shadow-sm dark:text-textLight '
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
              'mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-textDark px-2 py-2 text-sm text-textDark shadow-sm hover:border-haretaColor dark:border-textLight dark:text-textLight dark:hover:border-haretaColor lg:mx-2 lg:h-8 lg:w-8 lg:text-base ',
              {
                'border-transparent bg-haretaColor text-textDark dark:bg-haretaColor dark:text-textDark':
                  pageNumber === currentPage,
                'border-textDark dark:border-textLight': pageNumber !== currentPage
              }
            )}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap items-center justify-center'>
      {currentPage === 1 ? (
        <span className='group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-lg border border-textDark px-3  py-1 text-sm text-textDark opacity-60 shadow-sm dark:border-textLight dark:text-textLight lg:text-base '>
          <FontAwesomeIcon icon={faAngleLeft} className='text-textDark dark:text-textLight' />
          {!isMobile && <p>Prev</p>}
        </span>
      ) : (
        <Link
          to={{
            pathname: path.store,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className='group mx-2 flex cursor-pointer items-center space-x-1 rounded-lg border border-textDark px-3  py-1 text-sm text-textDark shadow-sm hover:border-haretaColor  hover:text-haretaColor dark:border-textLight dark:text-textLight dark:hover:border-haretaColor dark:hover:text-haretaColor lg:text-base '
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className='text-textDark group-hover:text-haretaColor dark:text-textLight dark:group-hover:text-haretaColor'
          />
          {!isMobile && <p>Prev</p>}
        </Link>
      )}

      {renderPagination()}

      {currentPage === totalPage ? (
        <span className='group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-lg border border-textDark px-3  py-1 text-sm text-textDark opacity-60 shadow-sm dark:border-textLight dark:text-textLight lg:text-base '>
          {!isMobile && <p>Next</p>}
          <FontAwesomeIcon icon={faAngleRight} className='text-textDark dark:text-textLight' />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.store,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className='group mx-2 flex cursor-pointer items-center space-x-1 rounded-lg border border-textDark px-3  py-1 text-sm text-textDark shadow-sm hover:border-haretaColor  hover:text-haretaColor dark:border-textLight dark:text-textLight dark:hover:border-haretaColor dark:hover:text-haretaColor lg:text-base '
        >
          {!isMobile && <p>Next</p>}
          <FontAwesomeIcon
            icon={faAngleRight}
            className='py-1 text-textDark group-hover:text-haretaColor dark:text-textLight dark:group-hover:text-haretaColor'
          />
        </Link>
      )}
    </div>
  )
}
