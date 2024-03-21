import TransitionPopup from '../TransitionPopup'

interface Props {
  dialog: boolean
  closeDialog: () => void
  title?: string
  children?: React.ReactNode
  customTitle?: React.ReactNode
}

export default function MessagePopup({ dialog, closeDialog, title, children = <div></div>, customTitle }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  const orangeBgColor = ' bg-[#ff6a00]'
  return (
    <TransitionPopup isOpen={dialog} handleClose={closeDialog} classNameWrapper='rounded-2xl shadow-xl'>
      <div
        className='flex max-w-[470px] flex-col items-center rounded-2xl px-3 py-4 font-newfont 
      dark:bg-black dark:text-darkText tabletSmall:px-14 tabletSmall:py-5'
      >
        <div className={'mb-3 text-xl font-semibold capitalize tabletSmall:text-3xl ' + orangeTextColor}>
          {title || customTitle}
        </div>
        <div className='text-sm tabletSmall:text-xl'>{children}</div>

        <button
          className={
            'mt-7 rounded-xl px-6 py-3 text-xl font-bold outline-none hover:bg-opacity-70 hover:text-white/90 dark:text-white tablet:rounded-2xl tablet:px-10 tablet:py-4 ' +
            orangeBgColor
          }
          onClick={closeDialog}
        >
          OK
        </button>
      </div>
    </TransitionPopup>
  )
}
