import UserSideNav from '../../components/UserSideNav'
import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'

export default function UserLayout() {
  return (
    <Fragment>
      <div className='bg-lightBg dark:bg-darkBg'>
        <div className='container'>
          <div className='mx-2 xl:mx-4'>
            <div className='grid grid-cols-12 gap-6 py-4 2xl:py-6'>
              <div className='col-span-3'>
                <UserSideNav />
              </div>

              <div className='col-span-9'>
                <div className='min-h-full rounded-md border border-black/10 bg-[#f8f8f8] text-textDark dark:border-white/20 dark:bg-[#181818] dark:text-textLight'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
