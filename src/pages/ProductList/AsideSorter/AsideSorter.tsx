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
    <div className='ml-4 overflow-hidden rounded-md bg-[#f8f8f8] px-3 py-2 text-base font-medium duration-500 dark:bg-[#303030] lg:text-lg'>
      <p className='uppercase text-textDark dark:text-textLight'>Sort by:</p>
      <ul className='mt-2 flex flex-col space-y-2 text-sm text-textDark/80 dark:text-textLight/80 lg:text-base'>
        <li className='w-full px-10'>
          <button
            onClick={handleChange}
            className={classNames(
              ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
              {
                'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                  sorting !== 'Newest',
                'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight': sorting === 'Newest'
              }
            )}
          >
            <p>Newest</p>
          </button>
        </li>
        <li className='w-full px-10'>
          <button
            onClick={handleChange}
            className={classNames(
              ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
              {
                'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                  sorting !== 'Top seller',
                'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight': sorting === 'Top seller'
              }
            )}
          >
            Top seller
          </button>
        </li>
        <li className='w-full px-10'>
          <button
            onClick={handleChange}
            className={classNames(
              ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
              {
                'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                  sorting !== 'Signature',
                'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight': sorting === 'Signature'
              }
            )}
          >
            Signature
          </button>
        </li>
        <li className='w-full px-10'>
          <button
            onClick={handleChange}
            className={classNames(
              ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
              {
                'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                  sorting !== 'Favourite',
                'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight': sorting === 'Favourite'
              }
            )}
          >
            Favourite
          </button>
        </li>
      </ul>
    </div>
  )
}
