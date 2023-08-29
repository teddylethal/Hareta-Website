import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Popover from 'src/components/Popover'
import UserPopover from './UserPopover'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function UserNav() {
  const { profile } = useContext(AppContext)

  return (
    <Popover renderPopover={<UserPopover />} className='py-0.5 lg:py-1.5' offsetValue={8}>
      <Link to={path.account} className='flex items-center space-x-2'>
        <img
          src={
            profile?.avatar
              ? profile.avatar.url
              : 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'
          }
          alt='avatar'
          className='h-6 w-6 rounded-full object-cover'
        />

        <div className='text-sm font-medium normal-case hover:text-brownColor dark:hover:text-haretaColor  md:text-base lg:text-lg'>
          {profile ? profile.name : ''}
        </div>
      </Link>
    </Popover>
  )
}
