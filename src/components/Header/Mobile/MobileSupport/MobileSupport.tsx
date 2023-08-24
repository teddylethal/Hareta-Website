import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useClickOutside from 'src/hooks/useClickOutside'
import classNames from 'classnames'

export default function MobileSupport() {
  const { visible, setVisible, ref } = useClickOutside(false)

  return (
    <div ref={ref} className='w-full'>
      <button
        className={classNames('flex w-full items-center border-x border-t border-transparent px-2 py-2 uppercase', {
          'rounded-t-md  border-black/20 dark:border-white/20': visible
        })}
        onClick={() => setVisible(!visible)}
      >
        <span>Support</span>
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
              className='flex w-full flex-col space-y-1 rounded-b-md border-x border-b border-black/20 px-4 pb-2 text-xs font-normal text-textDark dark:border-white/20 dark:text-textLight sm:text-sm'
              // initial={{ opacity: 0, y: '-20%' }}
              // animate={{
              //   opacity: 1,
              //   y: 0,
              //   color: theme === 'dark' ? '#eeeeee' : '#222222'
              // }}
              // exit={{ opacity: 0, y: '-20%' }}
              // transition={{ duration: 0.3 }}
            >
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                About us
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                Privacy & Terms
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                FAQ
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                Contact us
              </Link>
              <Link to='/' className='py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
                Order tracking
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateChangeInHeight>
    </div>
  )
}