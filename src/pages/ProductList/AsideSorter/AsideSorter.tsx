import classNames from 'classnames'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'

export default function AsideSorter() {
  const { sorting, setSorting } = useContext(StoreContext)

  const handleChange = (event: any) => {
    // console.log(event)
    event.preventDefault()
    setSorting(event.target.innerText)
  }

  return (
    <div className='m-4 overflow-hidden rounded-sm bg-[#f9f9f9] py-2 text-base text-textDark duration-500 dark:bg-[#444444] dark:text-textLight lg:text-lg'>
      <ul className=''>
        <li>
          <button
            onClick={handleChange}
            className={classNames(
              'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
              sorting === 'Newest' ? 'text-haretaColor' : ''
            )}
          >
            Newest
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
              sorting === 'Oldest' ? 'text-haretaColor' : ''
            )}
            onClick={handleChange}
          >
            Oldest
          </button>
        </li>
        <li>
          <button
            className={classNames(
              'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
              'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
              'flex w-full justify-start px-2 py-2 hover:text-haretaColor dark:hover:text-haretaColor ',
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
