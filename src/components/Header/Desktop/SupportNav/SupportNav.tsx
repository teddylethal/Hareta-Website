import FloatingOnClick from 'src/components/FoatingOnClick'
import SupportPopover from './SupportPopover'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SupportNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const closePopover = () => {
    setIsOpen(false)
  }

  //? Use translation
  const { t } = useTranslation('header')

  return (
    <div className='group'>
      <FloatingOnClick
        renderPopover={<SupportPopover closePopover={closePopover} />}
        className='flex cursor-default select-none items-center space-x-0.5 p-1 text-textDark duration-300  dark:text-textLight'
        isOpen={isOpen}
        handleClick={handleClick}
        openChange={setIsOpen}
      >
        <div className='z-10 flex items-center  group-hover:text-primaryColor dark:group-hover:text-primaryColor '>
          <p>{t('navbar.support')}</p>
          {isOpen && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-5 w-5 lg:h-6 lg:w-6'
            >
              <path
                fillRule='evenodd'
                d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {!isOpen && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-5 w-5 lg:h-6 lg:w-6'
            >
              <path
                fillRule='evenodd'
                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
      </FloatingOnClick>
    </div>
  )
}
