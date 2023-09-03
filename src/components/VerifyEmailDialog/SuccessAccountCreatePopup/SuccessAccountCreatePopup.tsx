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
        A verification <span className={orangeTextColor}>link</span> has been sent
      </p>
      <p>
        to your
        <span className={orangeTextColor}> email inbox.</span>
      </p>
      <p>
        Follow the link to
        <span className={orangeTextColor}> verify your email.</span>
      </p>
    </MessagePopup>
  )
}
