import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import DialogPopup from 'src/components/DialogPopup'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  isOpen: boolean
  handleClose: () => void
  handleConfirm: () => void
}

export default function OrderSuccessDialog({ isOpen, handleClose, handleConfirm }: Props) {
  const { theme } = useContext(AppContext)

  //! Multi languages
  const { t } = useTranslation('order')

  return (
    <DialogPopup
      isOpen={isOpen}
      handleClose={handleClose}
      classNameWrapper='relative w-10/12 tablet:w-8/12 max-w:lg transform overflow-hidden rounded-2xl py-6 px-4 align-middle shadow-xl transition-all'
      closeButton={false}
    >
      <div className={theme === 'dark' ? 'dark' : 'light'}>
        <div className='mb-4 text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            className='text- h-auto w-8 rounded-full text-center text-successGreen tablet:w-10 desktop:w-12 desktopLarge:w-16'
          />
        </div>
        <p className='mt-6 text-center text-base font-bold uppercase leading-6 tablet:text-lg desktopLarge:text-xl'>
          {t('layout.Your order was created successfully')}
        </p>
        <div className='mt-4 flex flex-col items-center justify-center space-y-2 text-sm font-medium tablet:text-base desktopLarge:text-lg'>
          <p className='text-center'>{t('layout.A payment instruction email was sent to your email address')}</p>
          <p className='text-center'>{t('layout.Please complete transaction in 48 hours to complete your order')}</p>
          <p className='text-center text-base font-semibold tablet:text-lg desktopLarge:text-xl'>
            {t('layout.Sincerely thanks!')}
          </p>
        </div>
        <div className='mt-4 flex w-full items-center justify-center'>
          <button
            className='rounded-lg bg-haretaColor px-4 py-2 font-medium hover:bg-primaryColor'
            onClick={handleConfirm}
          >
            {t('layout.Confirm')}
          </button>
        </div>
      </div>
    </DialogPopup>
  )
}
