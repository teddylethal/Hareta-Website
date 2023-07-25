import classNames from 'classnames'
import { useContext, useState } from 'react'
import { AnimatePresence, color, motion } from 'framer-motion'
import { ThemeContext } from 'src/App'

export default function AsideFavouriteList() {
  const { theme } = useContext(ThemeContext)
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleClick = () => {
    setIsActive(!isActive)
  }
  return (
    <div
      className={classNames(
        'm-4 rounded-lg px-2 py-2 text-base outline-none outline duration-500 hover:outline-haretaColor lg:text-lg ',
        isActive ? 'bg-vintageColor' : ' bg-[#f8f8f8]  dark:bg-[#444] '
      )}
    >
      <button
        className={classNames(
          'w-full overflow-hidden text-center  duration-500 ',
          isActive ? 'text-textVintage' : 'text-textDark dark:text-textLight'
        )}
        onClick={handleClick}
      >
        Favourite list
      </button>
    </div>
  )
}
