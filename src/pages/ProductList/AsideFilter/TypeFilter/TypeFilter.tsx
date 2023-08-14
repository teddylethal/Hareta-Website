import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import useQueryParams from 'src/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  isMobile?: boolean
  setMobileFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TypeFilter({ setMobileFilterOpen, isMobile = false, queryConfig }: Props) {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const [isOpening, setIsopening] = useState<boolean>(false)
  const { category, collection, type } = queryConfig

  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['types', queryParams],
    queryFn: () => {
      return productApi.getFilteringList('type', category, collection, '')
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
    const selectedType = String((e.target as HTMLInputElement).innerText)
    close()
    if (isMobile && setMobileFilterOpen) {
      setMobileFilterOpen(false)
    }

    if (selectedType === 'All') {
      navigate({
        pathname: path.store,
        search: createSearchParams(
          omit(
            {
              ...queryConfig
            },
            ['type', 'page', 'limit']
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
              type: selectedType
            },
            ['page', 'limit']
          )
        ).toString()
      })
    }
  }

  return (
    <div
      className='overflow-hidden bg-[#ddd] p-2 text-textDark  duration-500 dark:bg-[#202020] dark:text-textLight'
      ref={ref}
    >
      <button className='flex w-full flex-col items-start text-sm sm:text-base' onClick={toggleOpenClose}>
        <div className='flex items-center text-gray-500 hover:text-haretaColor dark:text-gray-400 dark:hover:text-haretaColor'>
          Type
          {(!visible || !isOpening) && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='ml-1 h-3 w-3 lg:h-4 lg:w-4'
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
              className='ml-1 h-3 w-3 lg:h-4 lg:w-4'
            >
              <path
                fillRule='evenodd'
                d='M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        <div className='sm:text-bas flex w-full select-none justify-start truncate rounded-sm bg-[#f6f6f6] px-2 py-1 text-sm capitalize text-textDark duration-500 dark:bg-[#444444] dark:text-textLight lg:text-lg'>
          {type ? type : 'All'}
        </div>
      </button>
      <AnimateChangeInHeight>
        {visible && isOpening && (
          <motion.div
            className='max-h-32 overflow-auto overscroll-contain px-2 text-sm text-textDark dark:text-textLight sm:text-base lg:text-lg '
            initial={{ opacity: 0, y: '-40%' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#363636' : '#E8E8E8'
            }}
            exit={{ opacity: 0, y: '-40%' }}
            transition={{ duration: 0.2 }}
          >
            <div className='flex flex-col'>
              <button
                className='flex items-center justify-start py-1 capitalize hover:text-haretaColor'
                onClick={handleChange}
              >
                all
              </button>
              {data &&
                data.data.data.map((name, index) => (
                  <button
                    className='flex items-center justify-start py-1 capitalize hover:text-haretaColor'
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
