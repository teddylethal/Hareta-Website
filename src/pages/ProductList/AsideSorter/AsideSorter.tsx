export default function AsideSorter() {
  return (
    <div className='m-4 overflow-hidden rounded-sm bg-[#f9f9f9] py-2 text-base text-textDark duration-500 dark:bg-[#444444] dark:text-textLight lg:text-lg'>
      <ul>
        <li>
          <button className='flex w-full justify-start px-8 py-1 text-haretaColor duration-500 hover:text-haretaColor dark:hover:text-haretaColor'>
            Newest
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            Oldest
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            Top seller
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            Signature
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-1 hover:text-haretaColor dark:hover:text-haretaColor'>
            Favourite
          </button>
        </li>
      </ul>
    </div>
  )
}
