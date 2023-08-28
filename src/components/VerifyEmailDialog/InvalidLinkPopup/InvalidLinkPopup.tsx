import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePopup from '../LowerComponent/MessagePopup'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
  dialog: boolean
  closeDialog: () => void
}

export default function InvalidLinkPopup({ dialog, closeDialog }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  return (
    <MessagePopup dialog={dialog} closeDialog={closeDialog} title='Invalid Link'>
      <FontAwesomeIcon icon={faCircleXmark} fontSize={70} className=' text-red-600' />
      <p>
        The <span className={orangeTextColor}>link</span> {`you've tried appears to be invalid. Please `}
        <span className={orangeTextColor}>check and try again</span>
      </p>
    </MessagePopup>
  )
}
