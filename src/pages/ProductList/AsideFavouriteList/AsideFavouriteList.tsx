import classNames from 'classnames'
import { useState } from 'react'

export default function AsideFavouriteList() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleClick = () => {
    setIsActive(!isActive)
  }
  return (
    <div
      className={classNames(
        'm-4 rounded-lg px-2 py-2 text-base outline-none outline duration-200 hover:outline-haretaColor desktop:text-lg ',
        isActive ? 'bg-vintageColor' : ' bg-[#f8f8f8]  dark:bg-[#444] '
      )}
    >
      <button
        className={classNames(
          'w-full overflow-hidden text-center   duration-200 ',
          isActive ? 'text-textVintage' : 'text-darkText dark:text-lightText '
        )}
        onClick={handleClick}
      >
        Favourite list
      </button>
    </div>
  )
}
