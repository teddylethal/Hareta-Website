import TransitionPopup from '../TransitionPopup'

interface Props {
  dialog: boolean
  closeDialog: () => void
  title: string
  children?: React.ReactNode
}

export default function MessagePopup({ dialog, closeDialog, title, children = <div></div> }: Props) {
  const orangeTextColor = ' text-[#ff6a00]'
  const orangeBgColor = ' bg-[#ff6a00]'
  return (
    <TransitionPopup isOpen={dialog} handleClose={closeDialog} classNameWrapper='rounded-2xl shadow-xl'>
      <div
        className='flex max-w-[450px] flex-col items-center rounded-2xl px-6 py-4 font-newfont 
      dark:bg-black dark:text-textDark sm:px-14 sm:py-5'
      >
        <p className={'mb-3 text-2xl font-semibold sm:text-3xl ' + orangeTextColor}>{title}</p>
        <div className='text-sm sm:text-xl'>{children}</div>

        <button
          className={
            'mt-7 rounded-xl px-6 py-3 text-xl font-semibold text-white outline-none hover:bg-opacity-70 hover:text-white/90 md:rounded-2xl md:px-10 md:py-4 ' +
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
