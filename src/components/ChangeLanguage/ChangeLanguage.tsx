import classNames from 'classnames'
import useClickOutside from 'src/hooks/useClickOutside'
import AnimateChangeInHeight from '../AnimateChangeInHeight'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

export default function ChangeLanguage() {
  //? Change language
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const { visible, setVisible, ref } = useClickOutside(false)
  return (
    <div ref={ref} className='w-full'>
      <button
        className={classNames('flex w-full items-center uppercase hover:font-semibold', {})}
        onClick={() => setVisible(!visible)}
      >
        <span>{currentLanguage}</span>
        {visible && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
              clipRule='evenodd'
            />
          </svg>
        )}
        {!visible && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </button>
      <AnimateChangeInHeight className='w-full'>
        <AnimatePresence>
          {visible && (
            <motion.div
              className='flex w-full flex-col items-start space-y-1 rounded-b-md px-2 py-1 text-xs font-normal text-textDark dark:text-textLight sm:text-sm'
              // initial={{ opacity: 0, y: '-20%' }}
              // animate={{
              //   opacity: 1,
              //   y: 0,
              //   color: theme === 'dark' ? '#eeeeee' : '#222222'
              // }}
              // exit={{ opacity: 0, y: '-20%' }}
              // transition={{ duration: 0.3 }}
            >
              <button
                className='px-2 py-1 text-sm hover:text-haretaColor sm:text-base md:px-1 md:py-1 md:text-lg xl:px-2 xl:py-2 xl:text-xl'
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
              <button
                className='px-2 py-1 text-sm hover:text-haretaColor sm:text-base md:px-1 md:py-1 md:text-lg xl:px-2 xl:py-2 xl:text-xl'
                onClick={() => changeLanguage('vi')}
              >
                Tiếng Việt
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateChangeInHeight>
    </div>
  )
}
