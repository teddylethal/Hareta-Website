/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Button from 'src/components/Button'
import { ThemeContext } from 'src/App'
import useClickOutside from 'src/hooks/useClickOutside'

interface Props {
  className?: string
}

export default function MobileCart({ className }: Props) {
  const { theme } = useContext(ThemeContext)
  const { visible, setVisible, ref } = useClickOutside(false)
  const openCart = () => {
    setVisible(true)
  }
  const closeCart = () => {
    setVisible(false)
  }

  return (
    <div>
      <div className={className} onClick={openCart}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-6 w-6 fill-black dark:fill-white sm:h-8 sm:w-8'
        >
          <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
        </svg>
        <span className='absolute left-4 flex h-4 w-4 items-center justify-center rounded-full bg-haretaColor text-xs text-textDark sm:left-6  sm:h-5 sm:w-5 sm:text-sm'>
          6
        </span>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            className='absolute left-0 top-0 w-full self-center rounded-b-sm py-2 shadow-sm sm:left-[calc(50%-200px)] sm:w-[400px]'
            initial={{ opacity: 0, y: '-20%' }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: theme === 'dark' ? '#333333' : '#dddddd',
              color: theme === 'dark' ? '#eeeeee' : '#222222'
            }}
            exit={{ opacity: 0, y: '-20%' }}
            transition={{ duration: 0.3 }}
            ref={ref}
          >
            <span className='flex w-full cursor-pointer items-center justify-center' onClick={closeCart}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 sm:h-8 sm:w-8'
              >
                <path
                  fillRule='evenodd'
                  d='M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z'
                  clipRule='evenodd'
                />
              </svg>
            </span>

            <div className='mx-3 my-2 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

            <div className='h-[220px] overflow-y-auto'>
              <Link to='/' className='flex items-center p-3 hover:bg-[#ddd] dark:hover:bg-[#222]'>
                <div className='flex shrink-0'>
                  <img
                    src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
                    alt='Product'
                    className='h-12 w-12 object-cover'
                  />
                </div>
                <div className='ml-2 flex flex-grow flex-col space-y-1'>
                  <div className='flex justify-between'>
                    <div className='truncate'>Battle Falcon</div>
                    <span className='flex-shrink-0 text-orange-600'>$100</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500 dark:text-gray-400'>x2</span>
                    <Link
                      to='/'
                      className='self-end text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </Link>
              <Link to='/' className='flex items-center p-3 hover:bg-[#ddd] dark:hover:bg-[#222]'>
                <div className='flex shrink-0'>
                  <img
                    src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
                    alt='Product'
                    className='h-12 w-12 object-cover'
                  />
                </div>
                <div className='ml-2 flex flex-grow flex-col space-y-1'>
                  <div className='flex justify-between'>
                    <div className='truncate'>Battle Falcon</div>
                    <span className='flex-shrink-0 text-orange-600'>$100</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500 dark:text-gray-400'>x2</span>
                    <Link
                      to='/'
                      className='self-end text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </Link>
              <Link to='/' className='flex items-center p-3 hover:bg-[#ddd] dark:hover:bg-[#222]'>
                <div className='flex shrink-0'>
                  <img
                    src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
                    alt='Product'
                    className='h-12 w-12 object-cover'
                  />
                </div>
                <div className='ml-2 flex flex-grow flex-col space-y-1'>
                  <div className='flex justify-between'>
                    <div className='truncate'>Battle Falcon</div>
                    <span className='flex-shrink-0 text-orange-600'>$100</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500 dark:text-gray-400'>x2</span>
                    <Link
                      to='/'
                      className='self-end text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </Link>
              <Link to='/' className='flex items-center p-3 hover:bg-[#ddd] dark:hover:bg-[#222]'>
                <div className='flex shrink-0'>
                  <img
                    src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
                    alt='Product'
                    className='h-12 w-12 object-cover'
                  />
                </div>
                <div className='ml-2 flex flex-grow flex-col space-y-1'>
                  <div className='flex justify-between'>
                    <div className='truncate'>Battle Falcon</div>
                    <span className='flex-shrink-0 text-orange-600'>$100</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500 dark:text-gray-400'>x2</span>
                    <Link
                      to='/'
                      className='self-end text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </Link>
              <Link to='/' className='flex items-center p-3 hover:bg-[#ddd] dark:hover:bg-[#222]'>
                <div className='flex shrink-0'>
                  <img
                    src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
                    alt='Product'
                    className='h-12 w-12 object-cover'
                  />
                </div>
                <div className='ml-2 flex flex-grow flex-col space-y-1'>
                  <div className='flex justify-between'>
                    <div className='truncate'>Battle Falcon</div>
                    <span className='flex-shrink-0 text-orange-600'>$100</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500 dark:text-gray-400'>x2</span>
                    <Link
                      to='/'
                      className='self-end text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </Link>
              <Link to='/' className='flex items-center p-3 hover:bg-[#ddd] dark:hover:bg-[#222]'>
                <div className='flex shrink-0'>
                  <img
                    src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
                    alt='Product'
                    className='h-12 w-12 object-cover'
                  />
                </div>
                <div className='ml-2 flex flex-grow flex-col space-y-1'>
                  <div className='flex justify-between'>
                    <div className='truncate'>Battle Falcon</div>
                    <span className='flex-shrink-0 text-orange-600'>$100</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500 dark:text-gray-400'>x2</span>
                    <Link
                      to='/'
                      className='self-end text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </Link>
            </div>

            <div className='mx-3 my-3 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

            <div className='mx-3 flex items-center justify-between text-xs sm:text-sm'>
              <div className='flex space-x-2'>
                <Link to='/'>
                  <Button className='w-14 py-1'>Store</Button>
                </Link>
                <Link to='/'>
                  <Button className='w-14 py-1'>Cart</Button>
                </Link>
              </div>
              <div>
                <Link to='/'>
                  <Button className='w-20 py-1'>Buy all</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
