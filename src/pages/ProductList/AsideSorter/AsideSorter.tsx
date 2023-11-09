import classNames from 'classnames'
import { useContext, useState } from 'react'

import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import { motion } from 'framer-motion'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import path from 'src/constants/path'
import ItemTag from 'src/constants/itemTag'
import { AppContext } from 'src/contexts/app.context'

// interface Props {
//   queryConfig: QueryConfig
// }

export default function AsideSorter() {
  const { theme } = useContext(AppContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const [isOpening, setIsopening] = useState<boolean>(false)

  const queryConfig = useQueryConfig()
  const { tag } = queryConfig
  const tagEnum = tag ? Number(tag) : 0

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

  //? HANDLE CHOOSE SORT
  const navigate = useNavigate()
  const handleChange = (tagIndex: number) => () => {
    // console.log(event)
    if (tagIndex === 0) {
      navigate({
        pathname: path.store,
        search: createSearchParams(
          omit(
            {
              ...queryConfig
            },
            ['page', 'limit', 'tag']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: path.store,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              tag: String(tagIndex)
            },
            ['page', 'limit']
          )
        ).toString()
      })
    }

    close()
  }

  return (
    <div
      className={classNames(
        'grid h-full grid-cols-12 space-x-2 overflow-hidden rounded-lg bg-[#f8f8f8] px-3 py-2 text-base font-medium duration-500 dark:bg-[#202020] lg:text-lg'
      )}
    >
      <p className='col-span-5 flex h-6 items-center text-left text-sm font-medium uppercase text-textDark duration-500 dark:text-textLight lg:h-7  lg:text-lg'>
        Sort by:
      </p>
      <div className='col-span-7 items-center' ref={ref}>
        <button
          className={classNames(
            'flex w-full items-center justify-center rounded-xl bg-[#ddd] py-0.5 text-sm font-medium capitalize text-textDark duration-300 dark:bg-[#202020] dark:text-textLight lg:px-3  lg:text-base',
            {
              'rounded-b-none border-x border-t border-black/20 duration-500 dark:border-white/10': visible,
              ' bg-vintageColor/90 hover:bg-vintageColor  dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60': !visible
            }
          )}
          onClick={toggleOpenClose}
        >
          {tagEnum === 0 ? 'Newest' : ItemTag[tagEnum]}
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
                    onClick={handleChange(0)}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 capitalize dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum !== 0,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum === 0
                      }
                    )}
                  >
                    Newest
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange(1)}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 capitalize dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum !== 1,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum === 1
                      }
                    )}
                  >
                    Top seller
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange(2)}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 capitalize dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum !== 2,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum === 2
                      }
                    )}
                  >
                    Signature
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange(3)}
                    className={classNames(
                      ' flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/40 px-1 py-0.5 capitalize dark:border-white/40 lg:px-2 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum !== 3,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum === 3
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
