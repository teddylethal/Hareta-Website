import { Link } from 'react-router-dom'
import Button from '../Button'

export default function CartPopover() {
  return (
    <div className='relative w-[300px] rounded-md border-gray-200 bg-[#eee] text-sm text-textDark shadow-md dark:bg-[#333] dark:text-textLight'>
      <div className='py-2'>
        <div className='px-3 py-1 capitalize text-gray-500 dark:text-gray-300'>Recently added</div>
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

        <div className='mx-3 my-3 border-b-[1px] border-gray-900 border-t-transparent dark:border-gray-400' />

        <div className='mx-3 flex items-center justify-between'>
          <div className='flex space-x-2'>
            <Link to='/'>
              <Button text='Store' className='w-16 justify-self-start py-1 text-sm' />
            </Link>
            <Link to='/'>
              <Button text='Cart' className='w-16 justify-self-start py-1 text-sm' />
            </Link>
          </div>
          <div>
            <Link to='/'>
              <Button text='Buy all' className='w-20 justify-self-start py-2 text-sm' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
