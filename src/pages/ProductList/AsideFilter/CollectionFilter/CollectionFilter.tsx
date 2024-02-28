import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'

import useQueryParams from 'src/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import classNames from 'classnames'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  isMobile?: boolean
  setMobileFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CollectionFilter({ queryConfig, setMobileFilterOpen, isMobile = false }: Props) {
  const { theme } = useContext(AppContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const [isOpening, setIsopening] = useState<boolean>(false)
  const { category, collection, type } = queryConfig

  //? translation
  const { t } = useTranslation('store')

  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['collections', queryParams],
    queryFn: () => {
      return productApi.getFilteringList('collection', category, '', type)
    }
  })

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
    const selectedCollection = String((e.target as HTMLInputElement).innerText)
    close()
    if (isMobile && setMobileFilterOpen) {
      setMobileFilterOpen(false)
    }

    if (selectedCollection.toUpperCase() === t('aside filter.all').toUpperCase()) {
      navigate({
        pathname: path.store,
        search: createSearchParams(
          omit(
            {
              ...queryConfig
            },
            ['collection', 'page', 'limit']
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
              collection: selectedCollection
            },
            ['page', 'limit']
          )
        ).toString()
      })
    }
  }

  return (
    <div
      className='overflow-hidden rounded-md bg-barLightBg p-2 outline outline-1 outline-black/20 duration-200 dark:bg-barDarkBg dark:outline-white/20'
      ref={ref}
    >
      <button className='sm:text-base flex w-full flex-col items-start text-sm' onClick={toggleOpenClose}>
        <div
          className={classNames(
            'text-darkText/80 dark:text-lightText/80 flex items-center capitalize hover:text-primaryColor dark:hover:text-primaryColor',
            {
              'mb-2': visible || collection
            }
          )}
        >
          {t('aside filter.collection')}
          {(!visible || !isOpening) && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='lg:h-4 lg:w-4 ml-1 h-3 w-3'
            >
              <path
                fillRule='evenodd'
                d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {visible && isOpening && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='lg:h-4 lg:w-4 ml-1 h-3 w-3'
            >
              <path
                fillRule='evenodd'
                d='M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        {collection && (
          <div
            className={classNames(
              'text-darkText sm:text-base lg:text-lg dark:text-lightText flex min-h-[36px] w-full select-none items-center justify-start truncate rounded-t-md border border-black/20 bg-sidebarItemLight px-2 py-1 text-sm capitalize duration-200 dark:border-white/20 dark:bg-sidebarItemDark',
              {
                'rounded-b-md': !isOpening || !visible
              }
            )}
          >
            {collection}
          </div>
        )}
      </button>
      <AnimateChangeInHeight>
        {visible && isOpening && (
          <motion.div
            className={classNames(
              'text-darkText sm:text-base lg:text-lg dark:text-lightText max-h-32 overflow-auto overscroll-contain rounded-b-md border-x border-b border-black/20 text-sm dark:border-white/20',
              {
                'rounded-t-md border-t': !collection
              }
            )}
            initial={{ opacity: 0, y: '-40%' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#2c2c32' : '#fbfbff'
            }}
            exit={{ opacity: 0, y: '-40%' }}
            transition={{ duration: 0.2 }}
          >
            <div className='flex flex-col'>
              <button
                className='flex items-center justify-start px-2 py-1 capitalize hover:text-primaryColor dark:hover:text-primaryColor'
                onClick={handleChange}
              >
                {t('aside filter.all')}
              </button>
              {data &&
                data.data.data.map((name, index) => (
                  <button
                    className={classNames(
                      'flex items-center justify-start px-2 py-1 capitalize hover:text-primaryColor dark:hover:text-primaryColor'
                    )}
                    key={index}
                    onClick={handleChange}
                  >
                    {name}
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimateChangeInHeight>
    </div>
  )
}
