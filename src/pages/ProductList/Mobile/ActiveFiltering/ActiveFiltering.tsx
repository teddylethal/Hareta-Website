import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { omit } from 'lodash'
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
    <div className='grid grid-cols-3 gap-1.5 py-2 text-textDark/80 dark:text-textLight/80'>
      {category && (
        <div className='col-span-1'>
          <div className='flex items-center justify-between rounded-lg border border-black/20 px-2 py-1 dark:border-white/20'>
            <div className='truncate px-0.5 text-sm sm:text-base'>{category}</div>
            <button
              className='flex items-center justify-center font-light text-textDark/80 dark:text-textLight/20'
              onClick={handleClick('category')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
      {collection && (
        <div className='col-span-1'>
          <div className='flex items-center justify-between rounded-lg border border-black/20 px-2 py-1 dark:border-white/20'>
            <div className='truncate px-0.5 text-sm sm:text-base'>{collection}</div>
            <button
              className='flex items-center justify-center font-light text-textDark/80 dark:text-textLight/20'
              onClick={handleClick('collection')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
      {type && (
        <div className='col-span-1'>
          <div className='flex items-center justify-between rounded-lg border border-black/20 px-2 py-1 dark:border-white/20'>
            <div className='truncate px-0.5 text-sm sm:text-base'>{type}</div>
            <button
              className='flex items-center justify-center font-light text-textDark/80 dark:text-textLight/20'
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
