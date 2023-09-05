import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { omit } from 'lodash'
import { Fragment, useContext } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import ItemTag from 'src/constants/itemTag'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

import useClickOutside from 'src/hooks/useClickOutside'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function MobileSorter() {
  const { theme } = useContext(AppContext)
  const { visible, setVisible, ref } = useClickOutside(false)

  const queryConfig = useQueryConfig()
  const { tag } = queryConfig
  const tagEnum = tag ? Number(tag) : 0

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
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
    <Fragment>
      <button
        onClick={open}
        className='flex w-[60%] items-center justify-center rounded-md bg-vintageColor/90 px-4 py-1 text-sm text-textDark dark:bg-haretaColor/80 dark:text-textLight sm:text-base'
      >
        {tagEnum === 0 ? 'Newest' : ItemTag[tagEnum]}
      </button>
      <AnimatePresence>
        {visible && (
          <Fragment>
            <motion.div
              className='fixed inset-0'
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.4
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='fixed bottom-0 left-0 z-10 flex h-full w-[45%] flex-col justify-center self-center rounded-lg rounded-l-none py-2 shadow-sm'
              initial={{ opacity: 0, x: '-20%' }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: theme === 'dark' ? '#303030' : '#f8f8f8',
                color: theme === 'dark' ? '#eeeeee' : '#222222'
              }}
              exit={{ opacity: 0, x: '-20%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <p className='flex items-center justify-center text-lg font-medium uppercase'>Sort by:</p>
              <ul className='flex flex-col space-y-2 px-4 py-2 text-sm text-textDark/80 dark:text-textLight/80 lg:text-base'>
                <li className='w-full'>
                  <button
                    onClick={handleChange(0)}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum === 0,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum !== 0
                      }
                    )}
                  >
                    <p>Newest</p>
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange(1)}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum === 1,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum !== 1
                      }
                    )}
                  >
                    Top seller
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange(2)}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum === 2,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum !== 2
                      }
                    )}
                  >
                    Signature
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange(3)}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          tagEnum === 3,
                        'bg-vintageColor/90  text-textDark dark:bg-haretaColor/80 dark:text-textLight': tagEnum !== 3
                      }
                    )}
                  >
                    Favourite
                  </button>
                </li>
              </ul>
              <button className='absolute right-2 top-2 text-textDark dark:text-textLight' onClick={close}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Fragment>
  )
}
