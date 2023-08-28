import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePopup from '../LowerComponent/MessagePopup'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

interface Props {
  dialog: boolean
  closeDialog: () => void
}

export default function SuccessAccountCreatePopup({ dialog, closeDialog }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  return (
    <MessagePopup
      dialog={dialog}
      closeDialog={closeDialog}
      customTitle={
        <p>
          Account <span className='text-[#88b300]'>created</span>
        </p>
      }
    >
      <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#88b300' }} className='mt-2 h-1/4 w-1/4' />
      <p>
        Please <span className={orangeTextColor}>send</span> an email verification
      </p>
    </MessagePopup>
  )
}
