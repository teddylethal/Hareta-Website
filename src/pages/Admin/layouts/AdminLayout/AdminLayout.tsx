import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className='bg-darkBg'>
      <div className='container'>
        <div className='py-8'>
          <div className='relative flex items-center justify-around rounded-xl  border border-white/40 py-2 text-base font-semibold text-textLight/80 lg:text-xl'>
            <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div>
            <NavLink to={''} className={classNames('px-4 py-1 uppercase hover:text-textLight')}>
              Create
            </NavLink>
            <NavLink to={''} className={classNames('px-4 py-1 uppercase hover:text-textLight')}>
              Delete
            </NavLink>
          </div>
          <div className='py-6 text-textLight lg:py-12'>{children}</div>
        </div>
      </div>
    </div>
  )
}
