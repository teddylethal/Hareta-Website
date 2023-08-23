import classNames from 'classnames'
import { useContext, useState } from 'react'
import { ThemeContext } from 'src/App'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { StoreContext } from 'src/contexts/store.context'
import useClickOutside from 'src/hooks/useClickOutside'
import { motion } from 'framer-motion'

// interface Props {
//   queryConfig: QueryConfig
// }

export default function AsideSorter() {
  const { sorting, setSorting } = useContext(StoreContext)

  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const [isOpening, setIsopening] = useState<boolean>(false)

  const open = () => {
    setVisible(true)
    setIsopening(true)
  }
  const close = () => {
    setVisible(false)
    setIsopening(false)
  }
  const toggleOpenClose = () => {
    if ((isOpening && !visible) || (!isOpening && !visible)) open()
    else close()
  }

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(event)
    e.preventDefault()
    setSorting((e.target as HTMLInputElement).innerText)
    close()
  }

  return (
    <div className='ml-4 grid grid-cols-3 space-x-2 overflow-hidden rounded-md bg-[#f8f8f8] px-3 py-4 text-base font-medium duration-500 dark:bg-[#303030] lg:text-lg'>
      <p className='col-span-1 flex h-8 items-center space-x-2 text-left text-base font-medium uppercase text-textDark duration-500 dark:text-textLight lg:text-lg'>
        Sort by:
      </p>
      <div className='col-span-2' ref={ref}>
        <button
          className={classNames(
            'flex h-8 w-full items-center justify-center rounded-xl bg-[#ddd] px-3 py-2 text-sm font-medium text-textDark duration-300 dark:bg-[#202020] dark:text-textLight lg:text-base',
            {
              'rounded-b-none border-x border-t border-black/20 duration-500 dark:border-white/10': visible,
              ' bg-brownColor/80 hover:bg-brownColor  dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60': !visible
            }
          )}
          onClick={toggleOpenClose}
        >
          {sorting}
        </button>
        <AnimateChangeInHeight>
          {visible && isOpening && (
            <motion.div
              className='gap-2 rounded-xl rounded-t-none border-x border-b border-black/20 px-3 py-4 dark:border-white/10'
              initial={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#272727' : '#fff' }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: theme === 'dark' ? '#272727' : '#fff'
              }}
              exit={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#272727' : '#fff' }}
              transition={{ duration: 0.2 }}
            >
              <ul className='flex grow flex-col space-y-2 text-sm text-textDark/80 dark:text-textLight/80 lg:text-base'>
                <li className='h-10 w-full'>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Newest',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Newest'
                      }
                    )}
                  >
                    <p>Newest</p>
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Top seller',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Top seller'
                      }
                    )}
                  >
                    Top seller
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Signature',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Signature'
                      }
                    )}
                  >
                    Signature
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center space-x-2 rounded-lg border border-black/40 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Favourite',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Favourite'
                      }
                    )}
                  >
                    Favourite
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimateChangeInHeight>
      </div>
    </div>
  )
}
