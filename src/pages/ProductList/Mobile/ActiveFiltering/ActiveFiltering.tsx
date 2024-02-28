import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ActiveFiltering() {
  const queryConfig = useQueryConfig()
  const { category, collection, type } = queryConfig

  const navigate = useNavigate()
  const handleClick = (field: string) => () => {
    const searchParams = createSearchParams(
      omit(
        {
          ...queryConfig
        },
        [`${field}`, 'page', 'limit']
      )
    )

    navigate({
      pathname: path.store,
      search: searchParams.toString()
    })
  }

  return (
    <div className='text-darkText/80 dark:text-lightText/80 grid grid-cols-3 gap-1.5 py-2'>
      {category && (
        <div className='col-span-1'>
          <div className='flex items-center justify-between rounded-lg border border-black/40 px-2 py-1 dark:border-white/40'>
            <div className='sm:text-base truncate px-0.5 text-sm text-haretaColor'>{category}</div>
            <button
              className='text-darkText/40 dark:text-lightText/40 flex items-center justify-center font-light'
              onClick={handleClick('category')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
      {collection && (
        <div className='col-span-1'>
          <div className='flex items-center justify-between rounded-lg border border-black/40 px-2 py-1 dark:border-white/40'>
            <div className='sm:text-base truncate px-0.5 text-sm text-haretaColor'>{collection}</div>
            <button
              className='text-darkText/40 dark:text-lightText/40 flex items-center justify-center font-light'
              onClick={handleClick('collection')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
      {type && (
        <div className='col-span-1'>
          <div className='flex items-center justify-between rounded-lg border border-black/40 px-2 py-1 dark:border-white/40'>
            <div className='sm:text-base truncate px-0.5 text-sm text-haretaColor'>{type}</div>
            <button
              className='text-darkText/40 dark:text-lightText/40 flex items-center justify-center font-light'
              onClick={handleClick('type')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
