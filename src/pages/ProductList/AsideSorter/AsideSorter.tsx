export default function AsideSorter() {
  return (
    <div className='m-4 rounded-sm bg-[#f6f6f6] py-4 text-lg text-textDark duration-500 dark:bg-[#363636] dark:text-textLight lg:text-xl'>
      <ul>
        <li>
          <button className='flex w-full justify-start px-8 py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
            Newest
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
            Oldest
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
            Top seller
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
            Signature
          </button>
        </li>
        <li>
          <button className='flex w-full justify-start px-8 py-2 hover:text-haretaColor dark:hover:text-haretaColor'>
            Favourite
          </button>
        </li>
      </ul>
    </div>
  )
}
