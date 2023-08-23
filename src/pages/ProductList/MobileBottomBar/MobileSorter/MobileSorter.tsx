import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useContext } from 'react'
import { ThemeContext } from 'src/App'
import { StoreContext } from 'src/contexts/store.context'
import useClickOutside from 'src/hooks/useClickOutside'

export default function MobileSorter() {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const { sorting, setSorting } = useContext(StoreContext)

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(event)
    e.preventDefault()
    setSorting((e.target as HTMLInputElement).innerText)
    close()
  }

  return (
    <Fragment>
      <button
        onClick={open}
        className='flex w-[80%] items-center justify-center rounded-md bg-brownColor px-4 py-1 text-textDark dark:bg-haretaColor dark:text-textLight'
      >
        {sorting}
      </button>
      <AnimatePresence>
        {visible && (
          <Fragment>
            <motion.div
              className='fixed inset-0 bg-black'
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.3
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
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Newest',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Newest'
                      }
                    )}
                  >
                    <p>Newest</p>
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Top seller',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Top seller'
                      }
                    )}
                  >
                    Top seller
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Signature',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Signature'
                      }
                    )}
                  >
                    Signature
                  </button>
                </li>
                <li className='w-full '>
                  <button
                    onClick={handleChange}
                    className={classNames(
                      ' flex w-full items-center justify-center rounded-lg border border-black/40 px-3 py-1 dark:border-white/40 ',
                      {
                        'hover:bg-[#eee] hover:text-textDark dark:hover:bg-[#222] dark:hover:text-textLight':
                          sorting !== 'Favourite',
                        'bg-brownColor/80  text-textDark dark:bg-haretaColor/80 dark:text-textLight':
                          sorting === 'Favourite'
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
