import usePagination from '@mui/material/usePagination'
import { styled } from '@mui/material/styles'
import { render } from 'react-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex'
})

interface Props {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}
const RANGE = 2
export default function UsePagination({ currentPage, setCurrentPage, totalPage }: Props) {
  const handleNextButton = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-textDark shadow-sm dark:text-textLight '
            key={index}
          >
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button
            className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-textDark shadow-sm dark:text-textLight '
            key={index}
          >
            ...
          </button>
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
          <button
            className={classNames(
              'mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-textDark px-2 py-2 text-sm text-textDark shadow-sm hover:border-haretaColor dark:border-textLight dark:text-textLight dark:hover:border-haretaColor lg:mx-2 lg:h-8 lg:w-8 lg:text-base ',
              {
                'border-transparent bg-haretaColor text-textDark dark:bg-haretaColor dark:text-textDark':
                  pageNumber === currentPage,
                'border-textDark dark:border-textLight': pageNumber !== currentPage
              }
            )}
            key={index}
            onClick={() => {
              setCurrentPage(pageNumber)
            }}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap items-center justify-center'>
      <button
        className='group mx-2 flex cursor-pointer items-center rounded-lg border border-textDark px-3 py-1  text-sm text-textDark shadow-sm hover:border-haretaColor hover:text-haretaColor  dark:border-textLight dark:text-textLight dark:hover:border-haretaColor dark:hover:text-haretaColor lg:text-base '
        onClick={handlePrevButton}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className='mr-1 text-textDark group-hover:text-haretaColor dark:text-textLight dark:group-hover:text-haretaColor'
        />
        Prev
      </button>
      {renderPagination()}
      <button
        className='group mx-2 flex cursor-pointer items-center rounded-lg border border-textDark px-3 py-1 text-sm text-textDark shadow-sm hover:border-haretaColor hover:text-haretaColor dark:border-textLight dark:text-textLight dark:hover:border-haretaColor dark:hover:text-haretaColor lg:text-base'
        onClick={handleNextButton}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          className='mr-1 text-textDark group-hover:text-haretaColor dark:text-textLight dark:group-hover:text-haretaColor'
        />
        Next
      </button>
    </div>
  )
}
