import FloatingOnClick from 'src/components/FoatingOnClick'
import SupportPopover from './SupportPopover'
import { useState } from 'react'

export default function SupportNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <FloatingOnClick
      initialOpen
      renderPopover={<SupportPopover />}
      className='flex cursor-pointer select-none items-center lg:py-1'
      isOpen={isOpen}
      handleClick={handleClick}
    >
      <div className=''>Support</div>
      {isOpen && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-7 w-7'>
          <path
            fillRule='evenodd'
            d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
            clipRule='evenodd'
          />
        </svg>
      )}
      {!isOpen && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-7 w-7'>
          <path
            fillRule='evenodd'
            d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
            clipRule='evenodd'
          />
        </svg>
      )}
    </FloatingOnClick>
  )
}
