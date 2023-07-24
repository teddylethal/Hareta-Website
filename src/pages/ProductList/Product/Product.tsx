import Button from 'src/components/Button'

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
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
            <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
          </svg>
        </button>
      </div>
      <div className='mx-2 my-1 flex items-center justify-between'>
        <span className='text-haretaColor'>$30</span>
        <button className='rounded-md bg-[#ccc] px-2 py-1 text-sm text-textDark hover:bg-haretaColor dark:bg-[#111] dark:text-textLight dark:hover:bg-haretaColor'>
          Add to cart
        </button>
      </div>
    </div>
  )
}
