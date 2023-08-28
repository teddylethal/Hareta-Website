import MessagePopup from '../LowerComponent/MessagePopup'

interface Props {
  dialog: boolean
  closeDialog: () => void
}

export default function VerificationEmailSentPopup({ dialog, closeDialog }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  return (
    <MessagePopup dialog={dialog} closeDialog={closeDialog} title='Email confirm sent'>
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
