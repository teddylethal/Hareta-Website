export default function EmptyProductList() {
  return (
    <div className='my-4 text-center text-2xl uppercase text-textDark dark:text-textLight'>
      <p className='w-full text-center text-lg capitalize text-haretaColor md:text-2xl xl:text-4xl'>
        No search results found
      </p>
      <div className='mt-4 flex w-full justify-center'>
        <img src='/images/cant-find-item.png' alt='No item' className='h-auto w-40 md:w-72 ' />
      </div>
      <p className='mt-4 w-full text-center text-sm md:text-lg lg:text-xl xl:text-2xl'>
        We are sorry. We can not find the item you are searching for
      </p>
      {/* <div className='round-lg mt-8 md:mt-12 xl:mt-16'>
        <p className='mt-4 w-full text-left text-lg uppercase text-haretaColor md:text-xl xl:text-2xl'>
          You may also like
        </p>
      </div> */}
    </div>
  )
}
