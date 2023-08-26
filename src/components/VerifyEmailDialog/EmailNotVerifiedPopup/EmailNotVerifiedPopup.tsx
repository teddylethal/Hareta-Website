import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePopup from '../LowerComponent/MessagePopup'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
  dialog: boolean
  closeDialog: () => void
}

export default function EmailNotVerifiedPopup({ dialog, closeDialog }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  return (
    <MessagePopup
      dialog={dialog}
      closeDialog={closeDialog}
      customTitle={
        <p>
          Email <span className='text-red-600'> not verified</span>
        </p>
      }
    >
      <FontAwesomeIcon icon={faCircleXmark} fontSize={70} className='mt-4 text-red-600' />
      <p>
        Please send an <span className={orangeTextColor}>email verification</span>
      </p>
    </MessagePopup>
  )
}
