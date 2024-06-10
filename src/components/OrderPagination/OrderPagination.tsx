import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import mainPath from 'src/constants/path'
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
            className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-darkText shadow-sm dark:text-lightText '
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
            className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-darkText shadow-sm dark:text-lightText '
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
              pathname: mainPath.orderTracking,
              search: createSearchParams({
                ...orderConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              'border-textDark dark:border-textLight mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border px-2 py-2 text-sm text-darkText shadow-sm hover:border-brownColor dark:hover:border-haretaColor desktop:mx-2 desktop:h-8 desktop:w-8 desktop:text-base ',
              {
                'border-transparent bg-vintageColor text-darkText dark:bg-haretaColor dark:text-darkText':
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
            pathname: mainPath.orderTracking,
            search: createSearchParams({
              ...orderConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className='border-textDark dark:border-textLight group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl border  px-3 py-1 text-sm text-darkText shadow-sm  hover:border-brownColor hover:text-brownColor dark:text-lightText dark:hover:border-haretaColor dark:hover:text-haretaColor desktop:text-base'
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className='py-1 text-darkText group-hover:text-brownColor dark:text-lightText dark:group-hover:text-haretaColor'
          />
        </Link>
      ) : (
        <span className='border-textDark dark:border-textLight group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl border  px-3 py-1 text-sm text-darkText opacity-60 shadow-sm dark:text-lightText desktop:text-base '>
          <FontAwesomeIcon icon={faAngleLeft} className='py-1 text-darkText dark:text-lightText' />
        </span>
      )}

      {renderPagination()}

      {currentPage < totalPage ? (
        <Link
          to={{
            pathname: mainPath.orderTracking,
            search: createSearchParams({
              ...orderConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className='border-textDark dark:border-textLight group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl border  px-3 py-1 text-sm text-darkText shadow-sm  hover:border-brownColor hover:text-brownColor dark:text-lightText dark:hover:border-haretaColor dark:hover:text-haretaColor desktop:text-base'
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className='py-1 text-darkText group-hover:text-brownColor dark:text-lightText dark:group-hover:text-haretaColor'
          />
        </Link>
      ) : (
        <span className='border-textDark dark:border-textLight group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl border  px-3 py-1 text-sm text-darkText opacity-60 shadow-sm dark:text-lightText desktop:text-base '>
          <FontAwesomeIcon icon={faAngleRight} className='py-1 text-darkText dark:text-lightText' />
        </span>
      )}
    </div>
  )
}
