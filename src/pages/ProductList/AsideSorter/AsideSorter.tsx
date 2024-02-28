import classNames from 'classnames'
import { useContext, useState } from 'react'

import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import { motion } from 'framer-motion'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

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

  //? TRANSLATION
  const { t } = useTranslation('store')
  const classNameForItem =
    'flex w-full flex-wrap items-center justify-center space-x-2 rounded-lg border border-black/20 px-1 py-0.5 capitalize dark:border-white/20 lg:px-2'

  return (
    <div
      className={classNames(
        'lg:text-lg grid h-full grid-cols-12 space-x-2 overflow-hidden rounded-lg bg-sidebarItemLight px-3 py-2 text-base font-medium duration-200 dark:bg-sidebarItemDark'
      )}
    >
      <p className='text-darkText lg:h-7 lg:text-base xl:text-lg dark:text-lightText col-span-5 flex h-6 items-center text-left text-xs font-medium uppercase duration-200'>
        {t('aside filter.sort by')}
      </p>
      <div className='col-span-7 items-center' ref={ref}>
        <button
          className={classNames(
            'text-darkText lg:px-3 lg:text-base flex w-full items-center justify-center rounded-xl py-0.5 text-sm font-medium capitalize duration-200',
            {
              'text-darkText dark:text-lightText rounded-b-none border-x border-t border-black/20 duration-200 dark:border-white/20':
                visible,
              'bg-haretaColor hover:bg-primaryColor': !visible
            }
          )}
          onClick={toggleOpenClose}
        >
          {tagEnum === 0 && t('aside filter.newest')}
          {tagEnum == 1 && t('aside filter.top seller')}
          {tagEnum == 2 && t('aside filter.signature')}
          {tagEnum == 3 && t('aside filter.favourite')}
        </button>
        <AnimateChangeInHeight>
          {visible && isOpening && (
            <motion.div
              className='lg:px-2 xl:px-3 gap-2 rounded-xl rounded-t-none border-x border-b border-black/20 px-1 py-4 dark:border-white/20'
              initial={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#1d1d22' : '#e9e9e8' }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: theme === 'dark' ? '#1d1d22' : '#e9e9e8'
              }}
              exit={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#1d1d22' : '#e9e9e8' }}
              transition={{ duration: 0.2 }}
            >
              <ul className='lg:text-base flex grow flex-col space-y-2 text-xs'>
                <li className='w-full'>
                  <button
                    onClick={handleChange(0)}
                    className={classNames(classNameForItem, {
                      'text-darkText dark:text-lightText hover:bg-[#d6d6d5] dark:hover:bg-[#2c2c32]': tagEnum !== 0,
                      'text-darkText bg-primaryColor': tagEnum === 0
                    })}
                  >
                    {t('aside filter.newest')}
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange(1)}
                    className={classNames(classNameForItem, {
                      'text-darkText dark:text-lightText hover:bg-[#d6d6d5] dark:hover:bg-[#2c2c32]': tagEnum !== 1,
                      'text-darkText bg-primaryColor': tagEnum === 1
                    })}
                  >
                    {t('aside filter.top seller')}
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange(2)}
                    className={classNames(classNameForItem, {
                      'text-darkText dark:text-lightText hover:bg-[#d6d6d5] dark:hover:bg-[#2c2c32]': tagEnum !== 2,
                      'text-darkText bg-primaryColor': tagEnum === 2
                    })}
                  >
                    {t('aside filter.signature')}
                  </button>
                </li>
                <li className='w-full'>
                  <button
                    onClick={handleChange(3)}
                    className={classNames(classNameForItem, {
                      'text-darkText dark:text-lightText hover:bg-[#d6d6d5] dark:hover:bg-[#2c2c32]': tagEnum !== 3,
                      'text-darkText bg-primaryColor': tagEnum === 3
                    })}
                  >
                    {t('aside filter.favourite')}
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
