import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BackButton() {
  return (
    <div className='text-textDark dark:text-textLight '>
      <FontAwesomeIcon icon={faCaretLeft} className='h-6 w-6' />
    </div>
  )
}
