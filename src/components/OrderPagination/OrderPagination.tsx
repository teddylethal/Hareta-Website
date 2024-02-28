import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { OrderConfig } from 'src/pages/Support/pages/OrderTracking/OrderTracking'

interface Props {
  orderConfig: OrderConfig
  totalPage: number
  isMobile?: boolean
}

export default function OrderPagination({ orderConfig, totalPage, isMobile }: Props) {
  const currentPage = Number(orderConfig.page)
  const RANGE = isMobile ? 1 : 2

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
              pathname: path.orderTracking,
              search: createSearchParams({
                ...orderConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              'text-darkText lg:mx-2 lg:h-8 lg:w-8 lg:text-base mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-textDark px-2 py-2 text-sm shadow-sm hover:border-brownColor dark:border-textLight dark:hover:border-haretaColor ',
              {
                'text-darkText dark:text-darkText border-transparent bg-vintageColor dark:bg-haretaColor':
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

  if (totalPage === 0) return
  return (
    <div className='mt-6 flex flex-wrap items-center justify-center'>
      {currentPage > 1 ? (
        <Link
          to={{
            pathname: path.orderTracking,
            search: createSearchParams({
              ...orderConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm  shadow-sm hover:border-brownColor hover:text-brownColor dark:border-textLight dark:hover:border-haretaColor dark:hover:text-haretaColor'
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className='text-darkText dark:text-lightText py-1 group-hover:text-brownColor dark:group-hover:text-haretaColor'
          />
        </Link>
      ) : (
        <span className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm opacity-60 shadow-sm dark:border-textLight '>
          <FontAwesomeIcon icon={faAngleLeft} className='text-darkText dark:text-lightText py-1' />
        </span>
      )}

      {renderPagination()}

      {currentPage < totalPage ? (
        <Link
          to={{
            pathname: path.orderTracking,
            search: createSearchParams({
              ...orderConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm  shadow-sm hover:border-brownColor hover:text-brownColor dark:border-textLight dark:hover:border-haretaColor dark:hover:text-haretaColor'
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className='text-darkText dark:text-lightText py-1 group-hover:text-brownColor dark:group-hover:text-haretaColor'
          />
        </Link>
      ) : (
        <span className='text-darkText lg:text-base dark:text-lightText group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl  border border-textDark px-3 py-1 text-sm opacity-60 shadow-sm dark:border-textLight '>
          <FontAwesomeIcon icon={faAngleRight} className='text-darkText dark:text-lightText py-1' />
        </span>
      )}
    </div>
  )
}
