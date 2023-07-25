export default function SearchBar() {
  return (
    <div className='mb-2 overflow-hidden rounded-lg bg-[#eee] shadow-sm duration-500 dark:bg-[#333]'>
      <form className='flex w-full items-center'>
        <input
          id='search_bar_input'
          type='text'
          className='peer my-1 ml-4 w-full bg-transparent py-1 text-base text-textDark outline-none duration-500 dark:text-textLight dark:caret-white lg:text-lg'
          placeholder='Search'
        />
        <label
          htmlFor='search_bar_input'
          className='mr-4 flex h-8 w-12 items-center justify-center rounded-lg bg-vintageColor duration-500 peer-focus:bg-haretaColor'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </form>
    </div>
  )
}
