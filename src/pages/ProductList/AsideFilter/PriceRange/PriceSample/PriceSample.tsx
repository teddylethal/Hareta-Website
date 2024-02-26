import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { motion } from 'framer-motion'
import useClickOutside from 'src/hooks/useClickOutside'

import { priceRanges } from '../priceRangeSample'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

interface Props {
  handleChoosePrice: (index: number) => void
}

export default function PriceSample({ handleChoosePrice }: Props) {
  const { theme } = useContext(AppContext)
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

  const handleSelect = (index: number) => () => {
    close()
    handleChoosePrice(index)
  }

  //? TRANSLATION
  const { t } = useTranslation('store')

  return (
    <div className='duration-200' ref={ref}>
      <button
        className='flex items-center space-x-2 text-left text-base font-medium text-textDark duration-200 hover:text-primaryColor dark:text-textLight dark:hover:text-primaryColor lg:text-lg'
        onClick={toggleOpenClose}
      >
        <p className=' uppercase '>{t('aside filter.price')}</p>
        {(!visible || !isOpening) && <FontAwesomeIcon icon={faCaretDown} />}
        {visible && isOpening && <FontAwesomeIcon icon={faCaretUp} />}
      </button>
      <AnimateChangeInHeight>
        {visible && isOpening && (
          <motion.div
            className=' flex max-h-32 flex-wrap gap-2 overflow-auto overscroll-contain rounded-md border border-black/40 px-3 py-4 dark:border-white/40'
            initial={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#1d1d22' : '#fbfbff' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#1d1d22' : '#fbfbff'
            }}
            exit={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#1d1d22' : '#fbfbff' }}
            transition={{ duration: 0.2 }}
          >
            {priceRanges.map((range, index) => (
              <button
                key={index}
                onClick={handleSelect(index)}
                className='rounded-xl bg-lightBg/60 px-2 py-1 text-xs text-textDark/80 outline outline-1 outline-black/20 hover:bg-lightBg hover:text-textDark dark:bg-darkBg/60 dark:text-textLight/80 dark:outline-white/20 dark:hover:bg-darkBg dark:hover:text-textLight sm:text-sm md:px-3 md:py-2 md:text-base'
              >
                ${range.lowerPrice} - ${range.upperPrice}
              </button>
            ))}
          </motion.div>
        )}
      </AnimateChangeInHeight>
    </div>
  )
}
