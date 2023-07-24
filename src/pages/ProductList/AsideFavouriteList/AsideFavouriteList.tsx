import classNames from 'classnames'
import { useState } from 'react'

export default function AsideFavouriteList() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleClick = () => {
    setIsActive(!isActive)
  }
  return (
    <div className='m-4 rounded-sm bg-[#f9f9f9] px-2 py-2 text-base text-textDark duration-500  dark:bg-[#444444]  dark:text-textLight  lg:text-lg'>
      <button
        className={classNames(
          'w-full overflow-hidden text-center ',
          isActive ? ' text-haretaColor' : ' hover:text-haretaColor dark:hover:text-haretaColor'
        )}
        onClick={handleClick}
      >
        Favourite list
      </button>
    </div>
  )
}
