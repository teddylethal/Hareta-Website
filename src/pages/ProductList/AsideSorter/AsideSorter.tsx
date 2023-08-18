import classNames from 'classnames'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'

// interface Props {
//   queryConfig: QueryConfig
// }

export default function AsideSorter() {
  const { sorting, setSorting } = useContext(StoreContext)

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(event)
    e.preventDefault()
    setSorting((e.target as HTMLInputElement).innerText)
  }

  return (
    <div className='ml-4 overflow-hidden rounded-md bg-[#ddd] py-2 text-base text-textDark duration-500 dark:bg-[#303030] dark:text-textLight lg:text-lg'>
      <ul className=''>
        <li>
          <button
            onClick={handleChange}
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-brownColor dark:hover:text-haretaColor ',
              { 'text-brownColor dark:text-haretaColor': sorting === 'Newest' }
            )}
          >
            Newest
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-brownColor dark:hover:text-haretaColor ',
              { 'text-brownColor dark:text-haretaColor': sorting === 'Top seller' }
            )}
            onClick={handleChange}
          >
            Top seller
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-brownColor dark:hover:text-haretaColor ',
              { 'text-brownColor dark:text-haretaColor': sorting === 'Signature' }
            )}
            onClick={handleChange}
          >
            Signature
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-4 py-1 hover:text-brownColor dark:hover:text-haretaColor ',
              { 'text-brownColor dark:text-haretaColor': sorting === 'Favourite' }
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
