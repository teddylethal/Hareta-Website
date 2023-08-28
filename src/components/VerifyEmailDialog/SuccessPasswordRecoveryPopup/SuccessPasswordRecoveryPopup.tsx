import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePopup from '../LowerComponent/MessagePopup'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

interface Props {
  dialog: boolean
  closeDialog: () => void
}

export default function SuccessPasswordRecoveryPopup({ dialog, closeDialog }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  return (
    <MessagePopup
      dialog={dialog}
      closeDialog={closeDialog}
      customTitle={
        <p>
          Your password <span className='text-[#88b300]'>changed</span>
        </p>
      }
    >
      <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#88b300' }} className='mt-2 h-1/4 w-1/4' />
      <p>
        Please <span className={orangeTextColor}>login</span> to continue
      </p>
    </MessagePopup>
  )
}
