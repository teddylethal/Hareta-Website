import { useContext } from 'react'
import Popover from 'src/components/Popover'
import UserPopover from './UserPopover'
import { AppContext } from 'src/contexts/app.context'

export default function UserNav() {
  const { profile } = useContext(AppContext)

  return (
    <div className='group'>
      <Popover renderPopover={<UserPopover />} className='py-0.5 desktop:py-1.5' offsetValue={12}>
        <div className='flex cursor-default items-center space-x-2'>
          <img
            src={
              profile?.avatar
                ? profile.avatar.url
                : 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'
            }
            alt='avatar'
            className='h-6 w-6 rounded-full object-cover'
          />

          <div className='text-sm font-medium normal-case duration-200 group-hover:text-brownColor  dark:group-hover:text-haretaColor tablet:text-base desktop:text-lg'>
            {profile ? profile.name : ''}
          </div>
        </div>
      </Popover>
    </div>
  )
}
