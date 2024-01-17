import { Fragment, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useClickOutside from 'src/hooks/useClickOutside'

import CategoryFilter from '../../AsideFilter/CategoryFilter'
import CollectionFilter from '../../AsideFilter/CollectionFilter'
import TypeFilter from '../../AsideFilter/TypeFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import PriceRange from '../../AsideFilter/PriceRange'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import classNames from 'classnames'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
}

export default function MobileBottomBar({ queryConfig }: Props) {
  const { theme } = useContext(AppContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const { category, collection, type } = queryConfig

  const isFiltering = category || collection || type
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = () => {
    setVisible(true)
    setIsOpen(true)
  }
  const close = () => {
    setVisible(false)
    setIsOpen(false)
  }

  const navigate = useNavigate()
  const handleClear = () => {
    close()

    navigate({
      pathname: path.store
    })
  }

  //? TRANSLATION
  const { t } = useTranslation('store')

  return (
    <Fragment>
      <button
        onClick={open}
        className='group relative col-span-1 flex items-center text-textDark hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor '
      >
        <FontAwesomeIcon
          icon={faFilter}
          className='mr-1 h-6 w-6 text-textDark group-hover:text-haretaColor dark:text-textLight dark:group-hover:text-haretaColor'
        />
      </button>
      <AnimatePresence>
        {visible && isOpen && (
          <Fragment>
            <motion.div
              className='fixed inset-0 '
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.4
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='fixed bottom-0 right-0 z-10  h-full w-[60%] rounded-l-md px-2 py-12 shadow-sm'
              initial={{ opacity: 0, x: '20%' }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: theme === 'dark' ? '#303030' : '#f8f8f8',
                color: theme === 'dark' ? '#eeeeee' : '#222222'
              }}
              exit={{ opacity: 0, x: '20%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <div className='rounded-md border border-black/20 dark:border-white/20'>
                <PriceRange queryConfig={queryConfig} />
              </div>
              <div className='mt-12 w-full '>
                <div className='flex w-full flex-col space-y-2'>
                  <CategoryFilter queryConfig={queryConfig} />
                  <CollectionFilter queryConfig={queryConfig} />
                  <TypeFilter queryConfig={queryConfig} />
                </div>
                <div className='flex w-full items-center justify-end'>
                  <button
                    onClick={handleClear}
                    disabled={isFiltering ? false : true}
                    className={classNames(
                      'mt-4 flex items-center justify-center rounded-md border border-red-500 px-4 py-1 text-sm text-red-500 duration-300 sm:text-base ',
                      { 'border-opacity-40 text-opacity-40 ': !isFiltering },
                      {
                        'hover:border-red-500 hover:text-vintageColor dark:hover:border-red-500': isFiltering
                      }
                    )}
                  >
                    {t('aside filter.clear')}
                  </button>
                </div>
              </div>
              <button className='absolute left-2 top-2 text-textDark dark:text-textLight' onClick={close}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Fragment>
  )
}
