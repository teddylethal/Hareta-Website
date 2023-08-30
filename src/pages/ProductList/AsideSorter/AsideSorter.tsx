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
    <div
      className={classNames(
        'grid h-full grid-cols-12 space-x-2 overflow-hidden rounded-lg bg-[#f8f8f8] px-3 py-2 text-base font-medium duration-500 dark:bg-[#303030] lg:text-lg'
      )}
    >
      <p className='col-span-5 flex h-6 items-center text-left text-sm font-medium uppercase text-textDark duration-500 dark:text-textLight lg:h-7  lg:text-lg'>
        Sort by:
      </p>
      <div className='col-span-7 items-center' ref={ref}>
        <button
          className={classNames(
            'flex  w-full items-center justify-center rounded-xl bg-[#ddd] py-0.5 text-sm font-medium text-textDark duration-300 dark:bg-[#202020] dark:text-textLight lg:px-3  lg:text-base',
            {
              'rounded-b-none border-x border-t border-black/20 duration-500 dark:border-white/10': visible,
              ' bg-vintageColor/90 hover:bg-vintageColor  dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60': !visible
            }
          )}
          onClick={toggleOpenClose}
        >
          {sorting}
        </button>
        <AnimateChangeInHeight>
          {visible && isOpening && (
            <motion.div
              className='gap-2 rounded-xl rounded-t-none border-x border-b border-black/20 px-1 py-4 dark:border-white/10 lg:px-2 xl:px-3'
              initial={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#272727' : '#fff' }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: theme === 'dark' ? '#272727' : '#fff'
              }}
              exit={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#272727' : '#fff' }}
              transition={{ duration: 0.2 }}
            >
              <ul className='flex grow flex-col space-y-2 text-xs text-textDark/80 dark:text-textLight/80 lg:text-base'>
                <li className='w-full'>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Newest',
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Newest'
                      }
                    )}
                  >
                    <p>Newest</p>
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Top seller',
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Top seller'
                      }
                    )}
                  >
                    Top seller
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Signature',
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Signature'
                      }
                    )}
                  >
                    Signature
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Favourite',
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
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
