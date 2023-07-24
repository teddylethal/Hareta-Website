import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Product() {
  return (
    <div className='h-full w-full bg-[#e8e8e8] p-1 duration-500 dark:bg-[#303030]'>
      <img
        src='https://cdn.pixabay.com/photo/2020/01/26/18/52/porsche-4795517_640.jpg'
        alt='katana'
        className='h-auto w-full'
      />
      <div className='mx-2 my-3 flex items-center justify-between'>
        <div className='flex flex-col space-y-1'>
          <p className='text-textDark duration-500 dark:text-textLight'>Porsche 911</p>
          <button className='text-xs text-gray-500 hover:text-haretaColor'>Porsche collection</button>
        </div>
        <button>
          <FontAwesomeIcon icon={faHeart} fontSize={24} />
        </button>
      </div>
      <div className='mx-2 my-1 flex items-center justify-between'>
        <span className='text-haretaColor'>$30</span>
        <button className=''>
          <FontAwesomeIcon
            icon={faCartPlus}
            fontSize={24}
            className='text-textDark hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor'
          />
        </button>
      </div>
    </div>
  )
}
