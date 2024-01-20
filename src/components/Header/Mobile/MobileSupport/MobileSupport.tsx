import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useClickOutside from 'src/hooks/useClickOutside'
import classNames from 'classnames'
import ChangeLanguage from 'src/components/ChangeLanguage'
import { useTranslation } from 'react-i18next'
import path from 'src/constants/path'
import ToggleTheme from 'src/components/ToggleTheme'

export default function MobileSupport() {
  const { visible, setVisible, ref } = useClickOutside(false)

  const closeExtend = () => {
    setVisible(false)
  }

  //? Use translation
  const { t } = useTranslation('header')

  return (
    <div ref={ref} className='w-full'>
      <button
        className={classNames('flex w-full items-center border-x border-t px-2 py-2 uppercase', {
          'border-transparent ': !visible,
          'rounded-t-md border-black/20 dark:border-white/20': visible
        })}
        onClick={() => setVisible(!visible)}
      >
        <span>{t('navbar.support')}</span>
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
              className='flex w-full flex-col space-y-1 rounded-b-md border-x border-b border-black/20 px-4 pb-2 text-xs font-medium  text-textDark dark:border-white/20 dark:text-textLight sm:text-sm'
              // initial={{ opacity: 0, y: '-20%' }}
              // animate={{
              //   opacity: 1,
              //   y: 0,
              //   color: theme === 'dark' ? '#eeeeee' : '#222222'
              // }}
              // exit={{ opacity: 0, y: '-20%' }}
              // transition={{ duration: 0.3 }}
            >
              {/* <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                {t('support.about us')}
              </Link> */}

              <Link to='/' className='py-1'>
                {t('support.privacy & terms')}
              </Link>

              {/* <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                {t('support.faq')}
              </Link> */}

              {/* <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                {t('support.contact us')}
              </Link> */}

              <Link to={path.orderTracking} className='py-1'>
                {t('support.order tracking')}
              </Link>

              <div className=''>
                <ChangeLanguage closePopover={closeExtend} />
              </div>

              <div className=''>
                <ToggleTheme className='h-5 w-5 sm:h-6 sm:w-6' />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateChangeInHeight>
    </div>
  )
}
