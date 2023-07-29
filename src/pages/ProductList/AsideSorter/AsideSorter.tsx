import classNames from 'classnames'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'
import { QueryConfig } from '../ProductList'

interface Props {
  queryConfig: QueryConfig
}

export default function AsideSorter({ queryConfig }: Props) {
  const { sorting, setSorting } = useContext(StoreContext)

  const handleChange = (event: any) => {
    // console.log(event)
    event.preventDefault()
    setSorting(event.target.innerText)
  }

  return (
    <div className='m-4 overflow-hidden rounded-sm bg-[#f0f0f0] py-2 text-base text-textDark duration-500 dark:bg-[#303030] dark:text-textLight lg:text-lg'>
      <ul className=''>
        <li>
          <button
            onClick={handleChange}
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
              sorting === 'Newest' ? 'text-haretaColor' : ''
            )}
          >
            Newest
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
              sorting === 'Top seller' ? 'text-haretaColor' : ''
            )}
            onClick={handleChange}
          >
            Top seller
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
              sorting === 'Signature' ? 'text-haretaColor' : ''
            )}
            onClick={handleChange}
          >
            Signature
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-haretaColor dark:hover:text-haretaColor ',
              sorting === 'Favourite' ? 'text-haretaColor' : ''
            )}
            onClick={handleChange}
          >
            Favourite
          </button>
        </li>
      </ul>
    </div>
  )
}
