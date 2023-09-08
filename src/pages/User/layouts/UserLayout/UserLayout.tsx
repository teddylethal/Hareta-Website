import UserSideNav from '../../components/UserSideNav'
import { Outlet } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { useViewport } from 'src/hooks/useViewport'
import UserMobileNavBar from '../../components/UserMobileNavBar'
import PathBar from 'src/components/PathBar'

export default function UserLayout() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'User | Hareta Workshop'
  })

  if (isMobile) {
    return (
      <Fragment>
        <div className='bg-lightBg dark:bg-darkBg'>
          <div className='container'>
            <div className='pt-2'>
              <PathBar
                pathList={[
                  { pathName: 'home', url: '/' },
                  { pathName: 'user', url: '/user' }
                ]}
              />
              <div className='pb-6'>
                <UserMobileNavBar />

                <div className='mt-2 rounded-md border border-black/10 bg-[#f8f8f8] text-textDark dark:border-white/20 dark:bg-[#181818] dark:text-textLight'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='bg-lightBg dark:bg-darkBg'>
          <div className='container'>
            <div className='pb-6 pt-2 lg:pb-8 xl:pb-10'>
              <PathBar
                pathList={[
                  { pathName: 'home', url: '/' },
                  { pathName: 'user', url: '/user' }
                ]}
              />

              <div className='grid grid-cols-12 gap-6 '>
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
}
