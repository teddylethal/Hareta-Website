import MessagePopup from '../LowerComponent/MessagePopup'

interface Props {
  dialog: boolean
  closeDialog: () => void
  title: string
}

export default function RecoveryEmailSentPopup({ dialog, closeDialog, title }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  return (
    <MessagePopup dialog={dialog} closeDialog={closeDialog} title={title}>
      <p>
        A password reset <span className={orangeTextColor}>link</span> has been sent
      </p>
      <p>
        {' '}
        to your
        <span className={orangeTextColor}> email inbox</span>
      </p>
      <p>
        Follow the link to
        <span className={orangeTextColor}> reset your password</span>
      </p>
    </MessagePopup>
  )
}
