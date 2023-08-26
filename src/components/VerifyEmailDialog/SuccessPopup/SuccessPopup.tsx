import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TransitionPopup from '../LowerComponent/TransitionPopup'

interface Props {
  dialog: boolean
  closeDialog: () => void
  title: string
  context: string
  guide: string
}

export default function SuccessPopup({ dialog, closeDialog, title, context, guide }: Props) {
  return (
    <TransitionPopup
      isOpen={dialog}
      handleClose={closeDialog}
      classNameWrapper='rounded-2xl flex flex-col p-5 dark:bg-black dark:text-textDark font-newfont'
    >
      <p className='text-3xl font-semibold '>{title}</p>
      <div className='flex items-center py-2 pl-2'>
        <FontAwesomeIcon icon={faCircleCheck} fontSize={90} style={{ color: '#88b300' }} />
        <div className='h-full pl-5 text-left text-gray-400 '>
          <p className='text-xl'>{context}</p>
          <p className='mb-3 text-xl'>{guide}</p>
          <button
            className='h-9 w-24 rounded-3xl bg-[#039ef0] text-xl font-semibold text-white outline-none hover:bg-[#039ef0]/70 hover:text-white/90'
            onClick={closeDialog}
          >
            Exit
          </button>
        </div>
      </div>
    </TransitionPopup>
  )
}
