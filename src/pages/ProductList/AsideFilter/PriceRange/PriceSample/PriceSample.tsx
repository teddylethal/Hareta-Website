import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { motion } from 'framer-motion'
import useClickOutside from 'src/hooks/useClickOutside'
import { ThemeContext } from 'src/App'
import { priceRanges } from '../priceRangeSample'

interface Props {
  handleChoosePrice: (index: number) => void
}

export default function PriceSample({ handleChoosePrice }: Props) {
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

  const handleSelect = (index: number) => () => {
    close()
    handleChoosePrice(index)
  }

  return (
    <div className='duration-500' ref={ref}>
      <button
        className='flex items-center space-x-2 text-left text-base font-medium text-textDark duration-500 hover:text-brownColor dark:text-textLight dark:hover:text-haretaColor lg:text-lg'
        onClick={toggleOpenClose}
      >
        <p className=' uppercase '>Price</p>
        {(!visible || !isOpening) && <FontAwesomeIcon icon={faCaretDown} />}
        {visible && isOpening && <FontAwesomeIcon icon={faCaretUp} />}
      </button>
      <AnimateChangeInHeight>
        {visible && isOpening && (
          <motion.div
            className=' flex max-h-32 flex-wrap gap-2 overflow-auto overscroll-contain rounded-md border border-black/40 px-3 py-4 dark:border-white/40'
            initial={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#272727' : '#fff' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#272727' : '#fff'
            }}
            exit={{ opacity: 1, y: '-40%', backgroundColor: theme === 'dark' ? '#272727' : '#fff' }}
            transition={{ duration: 0.2 }}
          >
            {priceRanges.map((range, index) => (
              <button
                key={index}
                onClick={handleSelect(index)}
                className='shrink rounded-xl bg-lightBg/60 px-3 py-2 text-textDark/70 outline outline-1 outline-black/20 hover:bg-lightBg hover:text-textDark dark:bg-darkBg/60 dark:text-textLight/70 dark:outline-white/20 dark:hover:bg-darkBg dark:hover:text-textLight'
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
