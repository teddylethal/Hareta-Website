import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'

export default function CartPopover() {
  const navigate = useNavigate()
  const handleBuyItem = () => {
    navigate('profile')
  }
  const handleRemoveItem = () => {
    return
  }

  return (
    <div className='relative -top-1 w-[300px] rounded-md border-gray-200 bg-[#eee] text-sm text-textDark shadow-md dark:bg-[#333] dark:text-textLight lg:top-0'>
      <div className='py-2'>
        <div className='px-3 py-1 capitalize text-gray-500 dark:text-gray-300'>Recently added</div>

        <div className='h-[220px] overflow-y-auto'>
          <div className='flex space-x-3 p-3 hover:bg-[#ccc] dark:hover:bg-[#222]'>
            <img
              src='https://i.pinimg.com/236x/3a/dc/78/3adc7869b0ffcd7f9dd1c7112ea124e3.jpg'
              alt='Product'
              className='h-12 w-12 object-cover'
            />
            <div className='flex grow flex-col justify-between'>
              <div className='flex items-center justify-between'>
                <Link to='/' className='flex'>
                  <p className='truncate px-2 py-1 hover:text-vintageColor dark:hover:text-haretaColor'>
                    Battle Falcon
                  </p>
                </Link>
                <span className='flex-shrink-0 text-orange-600'>$100</span>
              </div>
              <div className='ml-2 flex justify-between'>
                <span className='text-gray-500 dark:text-gray-400'>x2</span>

                <div className='flex space-x-3'>
                  <button
                    className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    onClick={handleBuyItem}
                  >
                    Buy
                  </button>
                  <button
                    className='text-sm text-gray-500 hover:text-[#E76161] dark:text-gray-400 dark:hover:text-haretaColor'
                    onClick={handleRemoveItem}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-3 my-3 border-b-[1px] border-gray-600 border-t-transparent dark:border-gray-400' />

        <div className='mx-3 flex items-center justify-between'>
          <div className='flex space-x-2'>
            <Link to='/'>
              <Button className='w-16 justify-self-start py-1 text-sm'>Store</Button>
            </Link>
            <Link to='/'>
              <Button className='w-16 justify-self-start py-1 text-sm'>Cart</Button>
            </Link>
          </div>
          <div>
            <Link to='/'>
              <Button className='w-20 justify-self-start py-2 text-sm'>Buy all</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
