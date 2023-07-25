import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Product as ProductType } from 'src/types/product.type'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <div className='relative h-full w-full bg-[#dfdfdf] p-2 duration-500 dark:bg-[#303030]'>
      <div className='relative w-full pt-[75%]'>
        <img
          src='https://images.unsplash.com/photo-1594502184342-2e12f877aa73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8OTExfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
          alt={product.name}
          className='absolute left-0 top-0 h-full w-full object-cover'
        />
      </div>
      <div className='mx-1 my-3 flex items-center justify-between'>
        <div className='flex flex-col space-y-1'>
          <p className='text-lg text-textDark duration-500 dark:text-textLight'>{product.name}</p>
          <button className='flex justify-start text-sm text-gray-500 hover:text-haretaColor'>
            {product.collection}
          </button>
        </div>
        <button>
          <FontAwesomeIcon icon={faHeart} fontSize={24} />
        </button>
      </div>
      <div className='mx-1 my-1 flex items-center justify-between'>
        <span className='text-haretaColor'>${product.price}</span>
        <button className=''>
          <FontAwesomeIcon
            icon={faCartPlus}
            fontSize={24}
            className='text-textDark duration-500 hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor'
          />
        </button>
      </div>
      <span className='absolute left-0 top-4 flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
        Favourite
      </span>
      <div className='absolute left-20 top-4 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
    </div>
  )
}
