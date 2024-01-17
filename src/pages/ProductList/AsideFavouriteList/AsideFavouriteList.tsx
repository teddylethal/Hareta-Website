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
        'm-4 rounded-lg px-2 py-2 text-base outline-none outline duration-300 hover:outline-haretaColor lg:text-lg ',
        isActive ? 'bg-vintageColor' : ' bg-[#f8f8f8]  dark:bg-[#444] '
      )}
    >
      <button
        className={classNames(
          'w-full overflow-hidden text-center   duration-300 ',
          isActive ? 'text-textVintage' : 'text-textDark dark:text-textLight '
        )}
        onClick={handleClick}
      >
        Favourite list
      </button>
    </div>
  )
}
